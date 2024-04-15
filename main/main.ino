#include <EspMQTTClient.h>
#include <Wire.h>
#include <ErriezBMX280.h>
#include <MQ135.h>
#include <Streaming.h>
#include <AsyncTimer.h>

#define SEA_LEVEL_PRESSURE_HPA  1026.25
#define BENZENE_RSRO            2.0
#define ALCOHOL_RSRO            1.5
#define SMOKE_RSRO              1.8
#define PIN_MQ135               A0
#define LED_TOGGLE              D7


EspMQTTClient client(
  "f-net",
  "frujin23",
  "192.168.1.132",
  "SmartHomeConnection",
  "SmartHomePassword",
  "TestClient",
  1883
);

ErriezBMX280 bmx280 = ErriezBMX280(0x76);
MQ135 mq135_sensor(PIN_MQ135);

static float temperature;
static float humidity;
static float pressure;
static float altitude;
static float benzene_concentration;
static float alcohol_concentration;
static float smoke_concentration;
static float ppm;

static int updateTime = 60;  // seconds
static bool sensorEnabled = true;
static bool lampEnabled = false;
static int dim = 50;
static const int id = 0;

static bool firstTimeConnecting = true;

void data_read()
{
  temperature = bmx280.readTemperature();
  humidity = bmx280.readHumidity();
  pressure = bmx280.readPressure() / 100.0;
  altitude = bmx280.readAltitude(SEA_LEVEL_PRESSURE_HPA);

  const float Rs = analogRead(PIN_MQ135) * 5.0 / 1023.0;
  ppm = mq135_sensor.getCorrectedPPM(temperature, humidity);
  smoke_concentration = Rs / SMOKE_RSRO;
  alcohol_concentration = Rs / ALCOHOL_RSRO;
  benzene_concentration = Rs / BENZENE_RSRO;
}

void data_print()
{
  Serial << "Temperature: " << temperature << '\n';
  Serial << "Humidity: " << humidity << '\n';
  Serial << "Pressure: " << pressure << '\n';
  Serial << "Altitude: " << altitude << '\n';
  Serial << "Benzene concentration: " << benzene_concentration << '\n';
  Serial << "Alcohol concentration: " << alcohol_concentration << '\n';
  Serial << "Smoke concentration: " << smoke_concentration << '\n';
  Serial << "PPM: " << ppm << '\n';
}


void onConnectionEstablished()
{
  Serial << "Connected to MQTT!\n";

  if (firstTimeConnecting)
  {
    client.publish("scan-res",
      String(id) + " " +
      String(sensorEnabled) + " " +
      String(updateTime) + " " + 
      String(lampEnabled) + " " +
      String(dim));

    firstTimeConnecting = false;
  }

  client.subscribe("scan-req", [] (const String &payload)  {
    client.publish("scan-res",
      String(id) + " " +
      String(sensorEnabled) + " " +
      String(updateTime) + " " + 
      String(lampEnabled) + " " +
      String(dim));
  });


  // sensor/config / 0|1 438
  // Change to sensor/config/%s, id
  client.subscribe("sensor/config/0", [] (const String &payload)  {

    Serial << "Sensor config topic -> " << payload << '\n';

    if (payload.charAt(0) == 'f' || payload.charAt(0) == 't')
    {
      sensorEnabled = payload.charAt(0) == 't';
    }
    else
    {
      updateTime = atoi(payload.c_str());
    }
    
    if (client.isConnected())
    {
      client.publish("sensor/config", String(id) + ' ' + payload);
    }
  });

  // lamp/config / 0|1 0-100
  // Change to lamp/config/%s, id
  client.subscribe("lamp/config/0", [] (const String &payload)  {

    bool change = false;

    Serial << "Lamp config topic -> " << payload << '\n';

    if (payload.charAt(0) == 'f' || payload.charAt(0) == 't')
    {
      auto val = payload.charAt(0) == 't';

      if (val != lampEnabled)
        change = true;

      lampEnabled = val != 0;
    }
    else
    {
      auto val = atoi(payload.c_str());

      if (val != dim)
        change = true;

      dim = val;
    }

    Serial << "Changed: " << change << '\n';

    if (change)
    {
      if (lampEnabled && dim != 0)
        analogWrite(LED_TOGGLE, map(dim, 0, 100, 0, 255));
      else
        digitalWrite(LED_TOGGLE, LOW);
    }
    
    if (client.isConnected())
    {
      client.publish("lamp/config", String(id) + ' ' + payload);
    }
  });
}

AsyncTimer t;
static String msg;

void setup()
{
  delay(1000);
  
  Serial.begin(9600);

  client.enableDebuggingMessages();
  client.enableLastWillMessage("TestClient/lastwill", "Going offline.");

  // Initialize I2C
  Wire.begin();
  Wire.setClock(400000);
  
  while (!bmx280.begin())
  {
    Serial << "Error: Could not detect BME280!\n";
    delay(3000);
  }

  // Async mqtt data transmittion setup
  t.setInterval([]() {
    data_read();
    data_print();

    msg = String(id) + ' ' +
      String(ppm) + ' ' +
      String(temperature) + ' ' +
      String(pressure) + ' ' +
      String(humidity) + ' ' +
      String(altitude) + ' ' +
      String(benzene_concentration) + ' ' +
      String(alcohol_concentration) + ' ' +
      String(smoke_concentration);

    client.publish("measurement", msg);
  }, updateTime * 1000);

  pinMode(LED_TOGGLE, OUTPUT);
}

void loop()
{
  client.loop();

  if (sensorEnabled)
    t.handle();
}
