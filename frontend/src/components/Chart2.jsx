import React, { Component, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class Chart2 extends Component {
	constructor({ times, values, yTitle, w, h })
    {
		super({ times, values, yTitle, w, h });
	}
	
	render() {
		let options = {
			animationEnabled: true,
			zoomEnabled: true,
            // dynamic theme
			theme: "dark2",
			title:{
				text: this.props.yTitle
			},
			axisX:{
				valueFormatString: "DD MMM",
				crosshair: {
					enabled: true,
					snapToDataPoint: false
				}
			},
			axisY: {
				title: "Value",
				crosshair: {
					enabled: true,
					snapToDataPoint: false,
				}
			},
			data: [{
				type: "area",
				xValueFormatString: "DD MMM",
				dataPoints: this.props.times.map((t, index) => ({ x: new Date(t), y: this.props.values[index] }))
			}]
		}

        switch (this.props.yTitle)
        {
            case "Humidity":
                options.axisY.valueFormatString = "##0.00% RH";
                options.data.forEach((d) => d.yValueFormatString = "##0.00 RH");
                options.axisY.crosshair.labelFormatter = function(e) {
                    return CanvasJS.formatNumber(e.value, "##0.00") + "% RH";
                }
                break;
            case "Temperature":
                options.axisY.valueFormatString = "##0.00°C";
                options.data.forEach((d) => d.yValueFormatString = "##0.00°C");
                options.axisY.crosshair.labelFormatter = function(e) {
                    return CanvasJS.formatNumber(e.value, "##0.00") + "°C";
                }
                break;
            case "Pressure":
                options.axisY.valueFormatString = "##0.00 ppm";
                options.data.forEach((d) => d.yValueFormatString = "##0.00 ppm");
                options.axisY.crosshair.labelFormatter = function(e) {
                    return CanvasJS.formatNumber(e.value, "##0.00") + " ppm";
                }
                break;
            case "Benzene":
                options.axisY.valueFormatString = "##0.00 ppm";
                options.data.forEach((d) => d.yValueFormatString = "##0.00 ppm");
                options.axisY.crosshair.labelFormatter = function(e) {
                    return CanvasJS.formatNumber(e.value, "##0.00") + " ppm";
                }
                break;
            case "Alcohol":
                options.axisY.valueFormatString = "##0.00 ppm";
                options.data.forEach((d) => d.yValueFormatString = "##0.00 ppm");
                options.axisY.crosshair.labelFormatter = function(e) {
                    return CanvasJS.formatNumber(e.value, "##0.00") + " ppm";
                }
                break;
            case "Smoke":
                options.axisY.valueFormatString = "##0.00 ppm";
                options.data.forEach((d) => d.yValueFormatString = "##0.00 ppm");
                options.axisY.crosshair.labelFormatter = function(e) {
                    return CanvasJS.formatNumber(e.value, "##0.00") + " ppm";
                }
                break;
            case "Altitude":
                options.axisY.valueFormatString = "##0.00 m";
                options.data.forEach((d) => d.yValueFormatString = "##0.00 m");
                options.axisY.crosshair.labelFormatter = function(e) {
                    return CanvasJS.formatNumber(e.value, "##0.00") + " ppm";
                }
                break;
            case "Ppm":
                options.axisY.title = "Air Quality"
                options.axisY.valueFormatString = "##0.00 ppm";
                options.data.forEach((d) => d.yValueFormatString = "##0.00 ppm");
                options.axisY.crosshair.labelFormatter = function(e) {
                    return CanvasJS.formatNumber(e.value, "##0.00") + " ppm";
                }
                break;
        }

        if (this.props.w)
            options.width = this.props.w;

        if (this.props.h)
            options.height = this.props.h;

		return (
		<div>
			<CanvasJSChart options = {options} 
			/>
		</div>
		);
	}
}
 
export default Chart2;