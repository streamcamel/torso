import React, { useEffect, useState } from 'react';
import * as appConfig from '../config'
import ClipsList from './ClipsList';

const ClipsCarousel = () => {
    const [data, setData] = useState([]); 

    useEffect(() => {
        let url = appConfig.backendURL('/clips');
        fetch(url)
            .then(res => res.json())
            .then(res => setData(res))
    }, [data]);
   
    return (
        <div className="ClipsCarousel">
            <ClipsList data={data}/>
        </div>
    );

    // return (
    //     <div className="Clips">
    //             <iframe
    //                 src="https://clips.twitch.tv/embed?clip=QuaintLuckySowResidentSleeper&parent=www.streamcamel.com&parent=localhost"
    //                 height="360"
    //                 width="640"
    //                 frameborder="0"
    //                 scrolling="no"
    //                 allowfullscreen="true">
    //             </iframe>
    //     </div>
    // );
};

export default ClipsCarousel;