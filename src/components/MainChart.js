import React , { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import * as appConfig from '../config'
import * as utils from '../utils'

import {Line, Chart} from 'react-chartjs-2';

const MainChart = (props) => {
    let location = useLocation();
    let history = useHistory();

    const refChart = useRef(null);
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('Viewers')
    const [prevPath, setPrevPath] = useState('');
    const [singleRegister, setSingleRegister] = useState(true);

    const onChangeRangeFromNow = (minutes) => {
        let dateFrom;
        if(minutes === -1){
            dateFrom = new Date('01/01/2020');
        } else {
            dateFrom = new Date();
            dateFrom.setMinutes(dateFrom.getMinutes() - minutes); // 7 days is the default
        }

        let query = location.search;
        
        if(minutes === (7*24*60)){
            query = utils.URLSearchRemoveQuery(query, 'chartFrom');
        } else {
            query = utils.URLSearchAddQuery(query, 'chartFrom', encodeURIComponent(dateFrom.toISOString()));
        }

        query = utils.URLSearchRemoveQuery(query, 'chartTo');
        history.push({pathname:location.pathname, search:query});
    }

    const getChartDatesArrayFromTo = useCallback(() => {
        const strFrom = utils.URLSearchGetQueryString(location.search, 'chartFrom');
        const strTo = utils.URLSearchGetQueryString(location.search, 'chartTo');

        let dateFrom;
        let dateTo;

        if(strFrom) {
            dateFrom = new Date(decodeURIComponent(strFrom));
        } else {
            dateFrom = new Date();
            dateFrom.setMinutes(dateFrom.getMinutes() - (7*24*60)); // 7 days is the default
        }

        if(strTo) {
            dateTo = new Date(decodeURIComponent(strTo));
        } else {
            dateTo = new Date();
        }

        return [dateFrom, dateTo];
    }, [location.search]);

    const selectChartRangeWithPercentage = (perStart, perEnd) => {
        // No sense in have less than 2 points
        if(data.length <= 2) {
            return;
        } 

        let idxFrom = Math.round((data.length-1) * (1.0 - perStart));
        let idxTo = Math.round((data.length-1) * (1.0 - perEnd));

        const newFromT = new Date(data[idxFrom]['time']);
        const newToT = new Date(data[idxTo]['time']);

        if(newFromT >= newToT) {
            return;
        }

        let query = utils.URLSearchAddQuery(location.search, 'chartFrom', encodeURIComponent(newFromT.toISOString()));
        query = utils.URLSearchAddQuery(query, 'chartTo', encodeURIComponent(newToT.toISOString()));
        history.push({pathname:location.pathname, search:query});
    }

    const convertDataToChartData = (toconvert) => {
        let chartData = []
        chartData.unshift([])
        chartData.unshift([])
        chartData.unshift([])
        toconvert.forEach(d => {
            let adate = new Date(Date.parse(d.time));
            chartData[0].unshift(adate)
            chartData[1].unshift(d.viewers_count)
            chartData[2].unshift(d.streams_count)
        });

        return chartData;
    }

    const onAfterDraw = (chart) => {

        if( !('streamcamelMouseDownX' in chart) ||
            !('streamcamelMouseMoveX' in chart) ||
            chart['streamcamelMouseDownX'] < 0) {
                return;
        }

        let chartArea = chart.chartArea;
        let posx = chart['streamcamelMouseMoveX'];
        let sx = chart['streamcamelMouseDownX'];

        if(sx > posx) {
            let tmp = posx;
            posx = sx;
            sx = tmp;
        }

        sx = Math.max(chartArea.left, sx);
        sx = Math.min(chartArea.right, sx);

        posx = Math.max(chartArea.left, posx);
        posx = Math.min(chartArea.right, posx);

        chart['streamcamelSelectionStart'] = (sx-chartArea.left)/(chartArea.right-chartArea.left); 
        chart['streamcamelSelectionEnd'] = (posx-chartArea.left)/(chartArea.right-chartArea.left);

        let ctx = chart.ctx;
        ctx.save();

            ctx.globalAlpha = 0.3;
            ctx.fillStyle = '#DDDDDD';
            ctx.fillRect(sx, chartArea.top, posx-sx, chartArea.bottom - chartArea.top);

            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = '#DDDDDD';
            ctx.rect(sx, chartArea.top, posx-sx, chartArea.bottom - chartArea.top);
            ctx.stroke();

        ctx.restore();    
    }

    useEffect(() => {
        const isCompanyCommand = () => {
            const command = utils.pathToCommand(location.pathname);
            return command === 'company';
        };
    
        const isGameCommand = () => {
            const command = utils.pathToCommand(location.pathname);
            return command === 'game';
        };

        if(singleRegister) {
            Chart.pluginService.register({ afterDraw: onAfterDraw });
            setSingleRegister(false);
        }

        if(prevPath !== (location.pathname+location.search))
        {
            const command = utils.pathToCommand(location.pathname);
            const slug = utils.pathToSlug(location.pathname);
            const fromTo = getChartDatesArrayFromTo();

            let request = utils.URLSearchAddQuery('', 'after', encodeURIComponent(fromTo[0].toISOString()));
            request = utils.URLSearchAddQuery(request, 'before', encodeURIComponent(fromTo[1].toISOString()));

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

            fetch(appConfig.backendURL('/viewers' + request))
                .then(res => res.json())
                .then(res => setData(res))

            let commandUrl = '';
            let titlePrefix = '';
            if (isGameCommand()) {
                commandUrl = '/games/' + slug;
                titlePrefix = 'Game';
            } else if (isCompanyCommand()) {
                commandUrl = '/companies/' + slug;
                titlePrefix = 'Company';
            }

            if (commandUrl !== '') {
                fetch(appConfig.backendURL(commandUrl))
                    .then(res => res.json())
                    .then(res => {
                        if(res.length > 0) {
                            setTitle(res[0].name + ' ' + titlePrefix + ' Viewers');
                        } else {
                            setTitle('Viewers');
                        }
                    });
            } else {
                setTitle('Viewers')
            }

            setPrevPath(location.pathname+location.search);
        }
    }, [location, prevPath, singleRegister, getChartDatesArrayFromTo]);

       
    const eventToPosition = (evt) => {
        if( evt.constructor.name === 'TouchEvent'){
            return [evt.touches[0].clientX, evt.touches[0].clientY];
        } else {
            return [evt.offsetX, evt.offsetY];
        }
    }

    const cleanUpEvents = (chart) => {
        delete chart['streamcamelMouseDownX']; 
        delete chart['streamcamelMouseDownY']; 
        delete chart['streamcamelMouseMoveX']; 
        delete chart['streamcamelMouseMoveY']; 
        delete chart['streamcamelSelectionStart'];
        delete chart['streamcamelSelectionEnd'];
    }

    const onMouseDown = (evt) => {
        if(refChart && refChart.current) {
            let pos = eventToPosition(evt);
            let chart = refChart.current.chartInstance.chart;
            let chartArea = refChart.current.chartInstance.chartArea;

            if(pos[1]>=chartArea['top']  &&  pos[1]<=chartArea['bottom']) {
                chart['streamcamelMouseDownX'] = pos[0]; 
                chart['streamcamelMouseDownY'] = pos[1]; 
                chart['streamcamelSelectionStart'] = 0; 
                chart['streamcamelSelectionEnd'] = 0; 
            }
        }
    }
    const onMouseMove = (evt) => {
        if(refChart && refChart.current) {
            let pos = eventToPosition(evt);
            let chart = refChart.current.chartInstance.chart;
            chart['streamcamelMouseMoveX'] = pos[0]; 
            chart['streamcamelMouseMoveY'] = pos[1]; 

            //Special case for touch event, if the touch started outside of the chart
            if( ('streamcamelMouseDownX' in chart)===false &&
                evt.constructor.name==='TouchEvent' ) {
                chart['streamcamelMouseDownX'] = pos[0]; 
                chart['streamcamelMouseDownY'] = pos[1]; 
            }
        }
    }
    const onMouseUp = (evt) => {
        if(refChart && refChart.current) {
            let chart = refChart.current.chartInstance.chart;

            if( ('streamcamelMouseDownX' in chart) && ('streamcamelMouseMoveX' in chart)) {
                selectChartRangeWithPercentage(chart['streamcamelSelectionStart'], chart['streamcamelSelectionEnd']);
            }

            cleanUpEvents(chart);
            chart.render();
        }
    }
    
    const safeGetDuration = () => {
        const fromTo = getChartDatesArrayFromTo();
        const allDate = new Date('01/01/2020');

        if( (fromTo[0].toISOString() === allDate.toISOString()) &&
            utils.isDateToday(fromTo[1])) {
            return -1;
        }

        return Math.round((fromTo[1]-fromTo[0])/1000/60);
    }

    let durationMinutes = safeGetDuration();
    let selectedButton;
    switch(durationMinutes){
        case (8*60):
            selectedButton = 0;
            break;
        case (24*60):
            selectedButton = 1;
            break;
        case (7*24*60):
            selectedButton = 2;
            break;
        case (30*24*60):
            selectedButton = 3;
            break;
        case (3*30*24*60):
            selectedButton = 4;
            break;
        case -1:
            selectedButton = 5;
            break;
        default:
            selectedButton = -1;
            break;
    }

    let timeUnit = 'day';
    if( (durationMinutes > (60*24*30*3)) || (durationMinutes === -1) ) { // > 3 months
        timeUnit = 'month';
    } else if(durationMinutes <= (60*2)) { // < 2 hours
        timeUnit = 'minute';
    } else if(durationMinutes <= (60*36)) { // < 24 hours
        timeUnit = 'hour';
    }

    let chartData = convertDataToChartData(data);
    const testdata = {
        labels: chartData[0],
        datasets: [{
            label: 'Viewers',
            fill: true,
            backgroundColor: 'rgba(0, 145, 255, 0.5)',
            borderDashOffset: 0.0,
            borderColor: 'rgba(0, 145, 255, 0.85)',
            borderCapStyle: 'butt',
            borderJoinStyle: 'round',
            pointBorderColor: 'rgba(0, 145, 255, 0.85)',
            pointBackgroundColor: 'rgba(0, 145, 255, 0.85)',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(0, 145, 255, 0.85)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1.5,
            pointHitRadius: 10,
            data: chartData[1]
          },
          {
            label: 'Channels',
            fill: true,
            borderDashOffset: 0.0,
            borderColor: 'rgba(0, 255, 145, 0.85)',
            borderCapStyle: 'butt',
            borderJoinStyle: 'round',
            pointBorderColor: 'rgba(0, 255, 145, 0.85)',
            pointBackgroundColor: 'rgba(0, 255, 145, 0.85)',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(0, 255, 145, 0.85)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1.5,
            pointHitRadius: 10,
            data: chartData[2]
            }
        ]
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            display: true,
            position: 'top',
            fullWidth: true,
            reverse: false,
        },
        tooltip:{
            mode: 'nearest',
            intersect: false,
        },
        hover:{
            mode: 'nearest',
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
        animation: {
            duration: 100,
            easing: 'linear'
        }
    }

    if(refChart && refChart.current) {
        let chart = refChart.current.chartInstance.chart;
        chart.canvas.onmousedown = onMouseDown;
        chart.canvas.onmousemove = onMouseMove;
        chart.canvas.onmouseup = onMouseUp;
        chart.canvas.onmouseleave = onMouseUp;
        chart.canvas.ontouchstart = onMouseDown;
        chart.canvas.ontouchmove = onMouseMove;
        chart.canvas.ontouchend = onMouseUp;
    }

    return (
        <div className="ChartArea">
            <h2 className="ChartTitle">{title}</h2>

            <div className="MainChart">
                <Line ref={refChart} data={testdata} options={options} />
            </div>

            <div className="MainChartButtons">
                <div className={"MainChartButton " + (selectedButton===0?'MainChartButtonSelected':'')}  onClick={() => onChangeRangeFromNow(8*60)}>8 Hours</div>
                <div className={"MainChartButton " + (selectedButton===1?'MainChartButtonSelected':'')}  onClick={() => onChangeRangeFromNow(24*60)}>1 Day</div>
                <div className={"MainChartButton " + (selectedButton===2?'MainChartButtonSelected':'')}  onClick={() => onChangeRangeFromNow(7*24*60)}>7 Days</div>
                <div className={"MainChartButton " + (selectedButton===3?'MainChartButtonSelected':'')}  onClick={() => onChangeRangeFromNow(30*24*60)}>1 Month</div>
                <div className={"MainChartButton " + (selectedButton===4?'MainChartButtonSelected':'')}  onClick={() => onChangeRangeFromNow(3*30*24*60)}>3 Months</div>
                <div className={"MainChartButton " + (selectedButton===5?'MainChartButtonSelected':'')}  onClick={() => onChangeRangeFromNow(-1)}>All</div>
            </div>
        </div>
    )
}

export default MainChart;
