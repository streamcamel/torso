import React, { useEffect, useState } from 'react';
import * as appConfig from '../config';
import StreamSummary from './StreamSummary';

const tableStyle = {
    borderColor: 'grey',
    borderSpacing: '2px',
    borderCollapse: 'collapse',
    borderRadius: '10px',
    background: 'white',
    overflow: 'hidden',
};

const tableHead = {
    height: '60px',
    background: '#36304a',
};

const tableHeadTh = {
    fontFamily: 'OpenSans-Regular',
    fontSize: '18px',
    color: '#fff',
    lineHeight: '1.2',
    fontWeight: 'unset',
    textAlign: 'left',
};

const startTimeTh = {
    paddingLeft: '40px',
    width: '120px',
}

const peakViewersTh = {
    width: '120px',
}

const averageViewersTh = {
    width: '120px',
}

const durationTh = {
    width: '120px',
}

const ChannelStreams = (props) => {
    const [data, setData] = useState([]); 
    const [filter, setFilter] = useState('');
    
    const onFilter = (str) => {
        setFilter(str);
    }

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

    let title = 'Recent Streams';
    if (props.title) {
        title = props.title;
    }

    let headers = [ {title:title, selected:true} ];

    var streamsList = data.map( (value, i) => {
        return <StreamSummary data={value} isOdd={Boolean(i%2)}/>
    });
  
    return (<table style={tableStyle}>
                <thead>
                    <tr style={tableHead}>
                        <th style={{...tableHeadTh, ...startTimeTh}}>Stream Date</th>
                        <th style={{...tableHeadTh, ...peakViewersTh}}>Peak Viewers</th>
                        <th style={{...tableHeadTh, ...averageViewersTh}}>Average Viewers</th>
                        <th style={{...tableHeadTh, ...durationTh}}>Duration</th>
                        <th style={tableHeadTh}>Games</th>
                    </tr>
                </thead>
                <tbody>
                    {streamsList}
                </tbody>
                
            </table>);
};

export default ChannelStreams;
