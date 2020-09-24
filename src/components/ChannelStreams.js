import React, { useEffect, useState } from 'react';
import * as appConfig from '../config';
import StreamSummary from './StreamSummary';


const startTimeTh = {
    paddingLeft: '40px'
}

const ChannelStreams = (props) => {
    const [data, setData] = useState([]); 
    
    useEffect(() => {
        let url = '/users';

        if (props.slug) {
            url += '/' + props.slug + '/streams';
        }

        url += '?limit=15';
        url = appConfig.backendURL(url);

        fetch(url)
            .then(res => res.json())
            .then(res => setData(res['data']))
    }, [props.slug]);

    var streamsList = data.map( (value, i) => {
        return <StreamSummary data={value}/>
    });
  
    return (
            <div className="StatsTable">
                <table>
                    <thead>
                        <tr>
                            <th style={startTimeTh}>Stream Date</th>
                            <th>Peak Viewers</th>
                            <th>Average Viewers</th>
                            <th>Duration</th>
                            <th>Games</th>
                        </tr>
                    </thead>
                    <tbody>
                        {streamsList}
                    </tbody>
                </table>
            </div>
            );
};

export default ChannelStreams;
