import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class AreaChart extends Component {
	render() {
		const options = {
			theme: "light2",
			animationEnabled: true,
			exportEnabled: false,
			title: {
				text: "Average Viewers"
			},
			axisY: {
				title: "Number of viewers",
				includeZero: false,
			},
			axisX: {
				title: "Date"	
			},
			data: [
			{
				type: "area",
				xValueFormatString: "YYYY",
				//yValueFormatString: "#,##0.## Million",
				dataPoints: [
					{ x: new Date(2019, 11, 30, 9, 0), y: 5000},
					{ x: new Date(2019, 11, 30, 9, 10), y: 7300},
					{ x: new Date(2019, 11, 30, 9, 20,), y: 6400},
					{ x: new Date(2019, 11, 30, 9, 30), y: 6300},
					{ x: new Date(2019, 11, 30, 9, 40), y: 7500},
					{ x: new Date(2019, 11, 30, 9, 50), y: 13800},
					{ x: new Date(2019, 11, 30, 10, 0), y: 16200}
				]
			}
			]
		}
		
		return (
		<div>
			<h1><center>Ubisoft</center></h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default AreaChart;                           