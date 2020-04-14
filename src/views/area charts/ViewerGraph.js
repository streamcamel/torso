import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class AreaChart extends Component {

	state = {
        viewers: [],
        loading: true,
	  };
	  
	headerName() {
		var header = this.props.company ? this.props.company : this.props.game ? this.props.game : "";

		return (<h1><center>
			{header}</center></h1>)
	}
	
	fetchData(company, game) {
		this.setState( { loading: true });

		var d = new Date();
        var nowFormatted = d.toISOString();
		
		var filterParameter = '';
		if (company) {
			filterParameter = '&company=' + company;
		}
		if (game) {
			filterParameter = '&game=' + game;
		}

		if (game || company) {
			d.setFullYear(d.getFullYear() - 1);
		} else {
			d.setHours(d.getHours() - 24 * 7);
		}
		
		var beforeFormatted = d.toISOString();

		var apiUrl = 'https://api.streamcamel.com/viewers?before=' + nowFormatted + '&after=' + beforeFormatted + filterParameter;
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
		this.fetchData(this.props.company, this.props.game);
	}

	componentDidUpdate(prevProps) {
		if ((prevProps.company !== this.props.company) || (prevProps.game !== this.props.game)) {
			this.fetchData(this.props.company, this.props.game);
		}
	}
		  
	render() {
		const options = {
			theme: "light2",
			animationEnabled: true,
			exportEnabled: false,
			title: {
				text: "Twitch Viewers"
			},
			axisY: {
				title: "Viewers",
				includeZero: false,
			},
			axisX: {
				title: "Time"	
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

			<CanvasJSChart options = {options} />
		</div>
		);
	}
}



export default AreaChart;                           