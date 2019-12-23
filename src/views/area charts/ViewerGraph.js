import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class AreaChart extends Component {

	state = {
        viewers: [],
        loading: true,
	  };
	  
	companyName() {
		return (<h1><center>{!this.props.company ? "Global" : this.props.company}</center></h1>)
	}
 
    componentDidMount(){
        var d = new Date();
        var nowFormatted = d.toISOString();

		// Hard-coded to last 6 hours for now for now
        d.setHours(d.getHours() - 6);
		var beforeFormatted = d.toISOString();
		
		var companyParameter = '';
		if (this.props.company) {
			console.log(this.props.company);
			companyParameter = '&company=' + this.props.company;
		}

		var apiUrl = 'http://api.streamstracker.com/viewers?before=' + nowFormatted + '&after=' + beforeFormatted + companyParameter;
		console.log(apiUrl);
        fetch(apiUrl)
          .then(res => res.json())
          .then(res => { 
			  const remapped = Object.keys(res).map(key => ({
				  x: new Date(Date.parse(res[key].time)),
				  y: res[key].viewers_count
			  }))

              this.setState({
                  viewers: remapped,
                  loading: false
              })
		  })
		}
		  

	render() {
		const options = {
			theme: "light2",
			animationEnabled: true,
			exportEnabled: false,
			title: {
				text: "Viewers (Last 6 Hours)"
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
				xValueFormatString: "DDDD, MMM D, h:mm   ",
				dataPoints: this.state.viewers
			}
		]
		}
	
		return (
		<div>
			{this.companyName()}
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}



export default AreaChart;                           