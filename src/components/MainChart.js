import React , { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { useLocation } from "react-router-dom";
import * as appConfig from '../config'
import * as utils from '../utils'


const MainChart = (props) => {
    let location = useLocation();

    const [data, setData] = useState([]);
    const [durationMinutes, setDuratationMinutes] = useState(7*20*60);
    const [prevPath, setPrevPath] = useState('');


    useEffect(() => {
        if(prevPath != location.pathname)
        {
            let command = utils.pathToCommand(location.pathname);
            let slug = utils.pathToSlug(location.pathname);


            let datenow = new Date()
            let datethen = new Date()
            datethen.setMinutes(datethen.getMinutes() - (7*24*60))

            let request = `/viewers?before=${datenow.toISOString()}&after=${datethen.toISOString()}`;

            switch(command) {
                case 'company':
                    request += '&company=' + slug;
                    break;

                case 'game':
                    request += '&game=' + slug;
                    break;

            }

            let url = appConfig.backendURL(request);

            fetch(url)
            .then(res => res.json())
            .then(res => setData(res))

            setPrevPath(location.pathname);
        }
    }, [location, data, durationMinutes]);


    let chartData = []
    data.forEach(d => {
        let adate = new Date(Date.parse(d.time));
        chartData.unshift([adate, d.viewers_count])
    });
    chartData.unshift([{type:'date', label:'Date'}, "Viewers"])

    return (
        <div className="ChartArea">
        <h2 className="SectionTitle">Viewers</h2>
        <Chart className="MainChart"
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