import React , { useState, useEffect } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import * as appConfig from '../config'
import * as utils from '../utils'

import {Line} from 'react-chartjs-2';

const MainChart = (props) => {
    let location = useLocation();
    let history = useHistory();

    const [data, setData] = useState([]);
    const [prevPath, setPrevPath] = useState('');

    const onChangeRange = (minutes) => {
        history.push({pathname:location.pathname, search:utils.URLSearchAddQuery(location.search, 'chartduration', minutes)});
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

    useEffect(() => {
        if(prevPath !== (location.pathname+location.search))
        {
            let command = utils.pathToCommand(location.pathname);
            let slug = utils.pathToSlug(location.pathname);

            let durationMinutes = utils.URLSearchGetQueryInt(location.search, 'chartduration', 7*24*60);
            let datenow = new Date()
            let datethen = new Date()
            datethen.setMinutes(datethen.getMinutes() - durationMinutes)

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
    }, [location, prevPath]);

    let timeUnit = '';
    let durationMinutes = utils.URLSearchGetQueryInt(location.search, 'chartduration', 7*24*60);
    let button01Selected = '';
    let button02Selected = '';
    let button03Selected = '';
    let button04Selected = '';
    let button05Selected = '';
    switch(durationMinutes){
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
            timeUnit = 'week';
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
        }
    }

    return (
        <div className="ChartArea">
            <h2 className="SectionTitle">Viewers</h2>

            <div className="MainChart">
                <Line data={testdata} options={options} />
            </div>

            <div className="MainChartButtons">
                <div className={"MainChartButton " + button01Selected}  onClick={() => onChangeRange(8*60)}>8 Hours</div>
                <div className={"MainChartButton " + button02Selected}  onClick={() => onChangeRange(24*60)}>1 Day</div>
                <div className={"MainChartButton " + button03Selected}  onClick={() => onChangeRange(7*24*60)}>7 Days</div>
                <div className={"MainChartButton " + button04Selected}  onClick={() => onChangeRange(30*24*60)}>1 Month</div>
                <div className={"MainChartButton " + button05Selected}  onClick={() => onChangeRange(3*30*24*60)}>3 Months</div>
            </div>
        </div>
    )
}

export default MainChart;
