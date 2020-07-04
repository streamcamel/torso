import React, { useEffect, useState } from 'react';
import * as appConfig from '../config'
import ClipsList from './ClipsList';

const ClipsCarousel = (props) => {
    const [data, setData] = useState([]); 

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

        url = appConfig.backendURL(url);

        fetch(url)
            .then(res => res.json())
            .then(res => setData(res))
    }, [props.context, props.slug]);
   
    return (
        <div className="ClipsCarousel">
            <ClipsList data={data}/>
        </div>
    );
};

export default ClipsCarousel;