import React , { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import * as appConfig from '../config'
import * as utils from '../utils'

import {Line, Chart} from 'react-chartjs-2';

const MainChart = (props) => {
    let location = useLocation();
    let history = useHistory();

    const refChart = useRef(null);


    const [data, setData] = useState([]);
    const [prevPath, setPrevPath] = useState('');
    const [duration, setDuration] = useState(0);

    const onChangeRange = (minutes) => {
        history.push({pathname:location.pathname, search:utils.URLSearchAddQuery(location.search, 'chartduration', minutes)});
        setDuration(minutes);
    }

    const convertDataToChartData = (toconvert) => {
        let chartData = []
        chartData.unshift([])
        chartData.unshift([])
        toconvert.forEach(d => {
            let adate = new Date(Date.parse(d.time));
            chartData[0].unshift(adate)
            chartData[1].unshift(d.viewers_count)
        });

        return chartData;
    }

    // Chart.pluginService.register({
    //     afterDraw: function(chartInstance) { console.log('after draw') }
    // });

    Chart.pluginService.register({
        afterDraw: function (chart) {

            if( !('streamcamel_mousedown_x' in chart) ||
                !('streamcamel_mousemove_x' in chart) ||
                chart['streamcamel_mousedown_x'] < 0) {
                    console.log('skipping not set')
                    return;
            }


            // var yScale = chart.scales['y-axis-0'];
            // var helpers = Chart.helpers;
            let chartArea = chart.chartArea;
//            console.log(chart)

            chart.ctx.save();

            let posx = chart['streamcamel_mousemove_x'];
            let sx = chart['streamcamel_mousedown_x'];

            if(sx > posx) {
                let tmp = posx;
                posx = sx;
                sx = posx;
            }

            sx = Math.max(chartArea.left, sx);
            sx = Math.min(chartArea.right, sx);

            posx = Math.max(chartArea.left, posx);
            posx = Math.min(chartArea.right, posx);




            console.log(posx, chartArea.left) 

            chart.ctx.fillStyle = "#FFFFFF55";
            chart.ctx.fillRect(150, 50, 20, 20);

            chart.ctx.fillStyle = "#FF0000";
            chart.ctx.fillRect(0, 0, 20, 20);

            chart.ctx.fillStyle = "#00FF00";
            chart.ctx.fillRect(chartArea.left, chartArea.top, 20, 20);

            let recH = chartArea.bottom - chartArea.top;

            chart.ctx.globalCompositeOperation = 'source-over';
            chart.ctx.fillStyle = 'rgba(0,0,255,0.5)';
            chart.ctx.fillRect(sx, chartArea.top, posx-sx, recH);
            

            chart.ctx.restore();
    
            // // draw labels - all we do is turn on display and call scale.draw
            // yScale.options.display = true;
            // yScale.draw.apply(yScale, [chartArea]);
            // yScale.options.display = false;
    
            // yScale.ctx.save();
            //     // draw under the fill
            // yScale.ctx.globalCompositeOperation = 'destination-over';
            // // draw the grid lines - simplified version of library code
            // helpers.each(yScale.ticks, function (label, index) {
            //     if (label === undefined || label === null) {
            //         return;
            //     }
    
            //     var yLineValue = this.getPixelForTick(index);
            //     yLineValue += helpers.aliasPixel(this.ctx.lineWidth);
    
            //     this.ctx.lineWidth = this.options.gridLines.lineWidth;
            //     this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    
            //     this.ctx.beginPath();
            //     this.ctx.moveTo(chartArea.left + 40, yLineValue);
            //     this.ctx.lineTo(chartArea.right, yLineValue);
            //     this.ctx.stroke();
    
            // }, yScale);
            // yScale.ctx.restore();
        },
    })

    const onMouseDown = (evt) => {
        console.log('onMouseDown')  
        if(refChart && refChart.current) {
            refChart.current.chartInstance.chart['streamcamel_mousedown_x'] = evt.offsetX; 
            refChart.current.chartInstance.chart['streamcamel_mousedown_y'] = evt.offsetY; 
        }
    }
    const onMouseMove = (evt) => {
        console.log('onMouseMove')            
        if(refChart && refChart.current) {
            refChart.current.chartInstance.chart['streamcamel_mousemove_x'] = evt.offsetX; 
            refChart.current.chartInstance.chart['streamcamel_mousemove_y'] = evt.offsetY; 
        }
    }
    const onMouseUp = (evt) => {
        console.log('onMouseUp')        
        if(refChart && refChart.current) {
            refChart.current.chartInstance.chart['streamcamel_mousedown_x'] = -1; 
            refChart.current.chartInstance.chart['streamcamel_mousedown_y'] = -1; 
        }
    }
    const onMouseClick = (evt) => {
        console.log('onMouseClick')        
    }
    
    const safeGetDuration = () => {
        if(duration === 0) {
            let durationMinutes = utils.URLSearchGetQueryInt(location.search, 'chartduration', 7*24*60);
            setDuration(durationMinutes);
            return durationMinutes;
        } 
        
        return duration;
    }

    useEffect(() => {
        if(prevPath !== (location.pathname+location.search))
        {
            let command = utils.pathToCommand(location.pathname);
            let slug = utils.pathToSlug(location.pathname);
            let durationMinutes = safeGetDuration();
            
            let datenow = new Date();
            let datethen = new Date();
            
            if(durationMinutes === -1) {
                datethen = new Date('2020-01-01');
            } else {
                datethen.setMinutes(datethen.getMinutes() - durationMinutes);
            }

            let request = utils.URLSearchAddQuery('', 'before', datenow.toISOString());
            request = utils.URLSearchAddQuery(request, 'after', datethen.toISOString());

            switch(command) {
                case 'company':
                    request = utils.URLSearchAddQuery(request, 'company', slug);
                    break;

                case 'game':
                    request = utils.URLSearchAddQuery(request, 'game', slug);
                    break;
                default:
                    break;
            }

            let url = appConfig.backendURL('/viewers' + request);

            fetch(url)
            .then(res => res.json())
            .then(res => setData(res))

            setPrevPath(location.pathname+location.search);
        }
    }, [location, prevPath, duration]);

    let timeUnit = '';
    let durationMinutes = safeGetDuration();
    let button01Selected = '';
    let button02Selected = '';
    let button03Selected = '';
    let button04Selected = '';
    let button05Selected = '';
    let button06Selected = '';
    switch(durationMinutes){
        case -1:
            button06Selected = 'MainChartButtonSelected'
            timeUnit = 'day';
            break;
        case (8*60):
            button01Selected = 'MainChartButtonSelected'
            timeUnit = 'hour';
            break;
        case (24*60):
            button02Selected = 'MainChartButtonSelected'
            timeUnit = 'hour';
            break;
        case (7*24*60):
            button03Selected = 'MainChartButtonSelected'
            timeUnit = 'day';
            break;
        case (30*24*60):
            button04Selected = 'MainChartButtonSelected'
            timeUnit = 'day';
            break;
        case (3*30*24*60):
        default:
            button05Selected = 'MainChartButtonSelected'
            timeUnit = 'day';
            break;
    }

    let chartData = convertDataToChartData(data);
    const testdata = {
        labels: chartData[0],
        datasets: [{
            label: 'Viewers',
            backgroundColor: 'rgba(0, 145, 255, 0.5)',
            borderColor: 'rgba(0, 145, 255, 0.85)',
            borderCapStyle: 'round',
            borderJoinStyle: 'round',
            pointBorderColor: 'rgba(0, 145, 255, 0.85)',
            pointBackgroundColor: 'rgba(0, 145, 255, 0.85)',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(0, 145, 255, 0.85)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: chartData[1]
          }
        ]
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            display: false
        },
        tooltip:{
            mode: 'index',
            intersect: false,
        },
        hover:{
            mode: 'index',
            intersect: false,
        },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: timeUnit
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value, index, values) {
                        return value.toLocaleString();
                    }
                }
            }]
        },
        // events: ['mousemove', 'mousedown', 'mouseup'],
        // onmousedown: onMouseDown,
        // onmousemove: onMouseMove,
        // mousemove: onMouseMove,
        // onmouseup: onMouseUp,
        // onClick: onMouseClick
    }

    if(refChart && refChart.current) {
        console.log(refChart);
        refChart.current.chartInstance.chart.canvas.onmousedown = onMouseDown;
        refChart.current.chartInstance.chart.canvas.onmousemove = onMouseMove;
        refChart.current.chartInstance.chart.canvas.onmouseup = onMouseUp;
    }

    return (
        <div className="ChartArea">
            <h2 className="ChartTitle">Viewers</h2>

            <div className="MainChart">
                <Line ref={refChart} data={testdata} options={options} />
            </div>

            <div className="MainChartButtons">
                <div className={"MainChartButton " + button01Selected}  onClick={() => onChangeRange(8*60)}>8 Hours</div>
                <div className={"MainChartButton " + button02Selected}  onClick={() => onChangeRange(24*60)}>1 Day</div>
                <div className={"MainChartButton " + button03Selected}  onClick={() => onChangeRange(7*24*60)}>7 Days</div>
                <div className={"MainChartButton " + button04Selected}  onClick={() => onChangeRange(30*24*60)}>1 Month</div>
                <div className={"MainChartButton " + button05Selected}  onClick={() => onChangeRange(3*30*24*60)}>3 Months</div>
                <div className={"MainChartButton " + button06Selected}  onClick={() => onChangeRange(-1)}>All</div>
            </div>
        </div>
    )
}

export default MainChart;
