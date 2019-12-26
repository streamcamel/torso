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
	
	fetchData(company) {
		this.setState( { loading: true });

		var d = new Date();
        var nowFormatted = d.toISOString();

		// Hard-coded to last 6 hours for now for now
        d.setHours(d.getHours() - 6);
		var beforeFormatted = d.toISOString();
		
		var companyParameter = '';
		if (company) {
			console.log(company);
			companyParameter = '&company=' + company;
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
 
    componentDidMount(){
		this.fetchData(this.props.company);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.company !== this.props.company) {
			this.fetchData(this.props.company);
		}
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
	
		return ( this.state.loading ? "Loading" :
		<div>
			{this.companyName()}
			<CanvasJSChart options = {options} />
		</div>
		);
	}
}



export default AreaChart;                           