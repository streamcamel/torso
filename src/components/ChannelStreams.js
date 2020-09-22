import React, { useEffect, useState } from 'react';
import * as appConfig from '../config';
import StreamSummary from './StreamSummary';

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

    var streamsList = data.map( (value) => {
        return <StreamSummary data={value}/>
    });
  
    return (<>  {streamsList}
                </>);
};

export default ChannelStreams;
