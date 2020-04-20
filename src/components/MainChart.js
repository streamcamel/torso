import React , { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import * as appConfig from '../config'


const MainChart = (props) => {
    const [data, setData] = useState([]);
    const [durationMinutes, setDuratationMinutes] = useState(7*20*60);

    useEffect(() => {

        let datenow = new Date()
        let datethen = new Date()
        datethen.setMinutes(datethen.getMinutes() - (7*24*60))

        let request = `/viewers?before=${datenow.toISOString()}&after=${datethen.toISOString()}`;
        let addRequest = '';

        if(props.options.mode === 'singlecompany') {
            addRequest = '&company=' + props.options.data.slug;
        } else if (props.options.mode === 'game') {
            addRequest = '&game=' + props.options.data.slug;
        } 

        request += addRequest;
        let url = appConfig.backendURL(request);

        console.log('chart fetching : ' + url)

        fetch(url)
        .then(res => res.json())
        .then(res => setData(res))
    }, [props.options.mode, props.options.data, durationMinutes]);


    let chartData = []
    data.forEach(d => {
        let adate = new Date(Date.parse(d.time));
        chartData.unshift([adate, d.viewers_count])
    });
    chartData.unshift([{type:'date', label:'Date'}, "Viewers"])

    return (
        <div className="ChartArea">
        <h2 className="SectionTitle">Viewers</h2>
        <Chart 
            width={'1000px'}
            height={'400px'}
            chartType="AreaChart"
            loader={<div>Loading Chart</div>}
            formatters={[{type:'', column:0},]}
            data={
                chartData
            }
            options={{
            backgroundColor: '#000',
            fontName: 'montserrat',
            legend: {position: 'none'},
            hAxis: {
                textStyle:{color: '#FFF'},
                gridlines:{color: 'transparent'}
            },
            vAxis: {
                textStyle:{color: '#FFF'}
            },
            chartArea:{'width': '90%', 'height': '65%', 'right':0}
            }}
            rootProps={{ 'data-testid': '1' }}
        />
        </div>
    )
}

export default MainChart;