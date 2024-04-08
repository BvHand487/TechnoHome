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
#define LED_TOGGLE              D3


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
static bool enabled = true;
static const int sensorId = 0;


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
  
  client.subscribe("scan-req", [] (const String &payload)  {
    client.publish("scan-res", String(sensorId));
  });


  // config / 0|1 438
  client.subscribe("config/0", [] (const String &payload)  {

    Serial << "Config topic -> " << payload << '\n';

    if (payload.charAt(0) == '0' || payload.charAt(0) == '1')
    {
      enabled = payload.charAt(0) != '0';
    }
    else
    {
      updateTime = atoi(payload.c_str());
    }
    
    if (client.isConnected())
    {
      client.publish("config", String(sensorId) + ' ' + payload);
    }
  });
}

AsyncTimer t;
static String msg;

void setup()
{
  delay(500);
  
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

    msg = String(sensorId) + ' ' +
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

  if (enabled)
    t.handle();

  // digitalWrite(LED_TOGGLE, HIGH);
  // delay(2000);
  // digitalWrite(LED_TOGGLE, LOW);
  // delay(2000); 
}
