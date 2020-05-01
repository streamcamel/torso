import React , { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import * as appConfig from '../config'
import * as utils from '../utils'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const MainChart = (props) => {
    let location = useLocation();
    let history = useHistory();

    const [data, setData] = useState([]);
    const [prevPath, setPrevPath] = useState('');
    const refChart = useRef(null);


    const onChangeRange = (minutes) => {
        history.push({pathname:location.pathname, search:utils.URLSearchAddQuery(location.search, 'chartduration', minutes)});
    }

    const onNewData = (newdata) => {
        setData(newdata);

        if(refChart && refChart.current && refChart.current.chart) {
            refChart.current.chart.series[0].update(convertDataToChartData(newdata));
        }
    }

    const convertDataToChartData = (toconvert) => {
        let chartData = []
        toconvert.forEach(d => {
            let adate = new Date(Date.parse(d.time));
            chartData.unshift([adate.getTime(), d.viewers_count])
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
            .then(res => onNewData(res))

            setPrevPath(location.pathname+location.search);
        }
    }, [location]);

    let chartData = convertDataToChartData(data);

    const options = {
        chart: {
            type: 'area',
            backgroundColor: '#000000',
            style: {
                fontFamily: 'montserrat',
                fontSize: '0.8em'
            },
        },
        title: {
          text: ''
        },
        legend: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: ''
            },
            labels: {
                style:{
                    fontFamily: 'montserrat',
                    fontSize: '1.5em'
                }
            }            
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                style:{
                    fontFamily: 'montserrat',
                    fontSize: '1.5em'
                }
            }            
        },
        tooltip: {
            crosshairs: {
                color: '#FFF',
                dashStyle: 'solid'
            },
            shared: true
        },
        series: [{
            name: 'Viewers',
            color: 'rgba(0, 145, 255, 0.85)',
            fillColor: 'rgba(0, 145, 255, 0.85)',
            data: chartData
        }]
    }
       

    let durationMinutes = utils.URLSearchGetQueryInt(location.search, 'chartduration', 7*24*60);
    let button01Selected = '';
    let button02Selected = '';
    let button03Selected = '';
    let button04Selected = '';
    let button05Selected = '';
    switch(durationMinutes){
        case (8*60):
            button01Selected = 'MainChartButtonSelected'
            break;
        case (24*60):
            button02Selected = 'MainChartButtonSelected'
            break;
        case (7*24*60):
            button03Selected = 'MainChartButtonSelected'
            break;
        case (30*24*60):
            button04Selected = 'MainChartButtonSelected'
            break;
        case (3*30*24*60):
            button05Selected = 'MainChartButtonSelected'
            break;
    }

    return (
        <div className="ChartArea">
            <h2 className="SectionTitle">Viewers</h2>

            <HighchartsReact
                className="MainChart"
                ref={refChart}
                highcharts={Highcharts}
                options={options}
            />

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
