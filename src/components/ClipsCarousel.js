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
    }, []);
   
    return (
        <div className="ClipsCarousel">
            <ClipsList data={data}/>
        </div>
    );
};

export default ClipsCarousel;