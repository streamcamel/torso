import React, { useEffect, useState } from 'react';
import * as appConfig from '../config'
import ClipsList from './ClipsList';
import SectionHeader from './SectionHeader'

const ClipsCarousel = (props) => {
    const [data, setData] = useState([]); 
    const [filter, setFilter] = useState('');
    
    const onFilter = (str) => {
        setFilter(str);
    }

    useEffect(() => {
        let url = '/clips';

        if (props.slug) {
            if (props.context === "company") {
                url = '/companies/' + props.slug + '/clips';
            } else if (props.context === "game") {
                url = '/games/' + props.slug + '/clips';
            } else if (props.context === "streamer") {
                url = '/users/' + props.slug + '/clips';
            }
        }

        url += '?limit=12';
        url = appConfig.backendURL(url);

        fetch(url)
            .then(res => res.json())
            .then(res => setData(res))
    }, [props.context, props.slug]);

    let headers = [ {title:'Top Clips', selected:true} ];

    return (<div className="TileContainer ClipsCarouselWrapper">
                <SectionHeader headers={headers} onFilter={onFilter} information="Current Top Clips"/>    
                <div className="ClipsCarousel">
                    <ClipsList data={data} filter={filter}/>
                </div>
            </div>);
};

export default ClipsCarousel;
