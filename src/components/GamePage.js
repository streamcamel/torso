import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

import * as appConfig from '../config'
import * as utils from '../utils'


const GamePage = () => {
    let location = useLocation();

    const [data, setData] = useState([]); // Data state for the companies/games
    const [prevPath, setPrevPath] = useState('');
    
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {

        if(prevPath != location.pathname)
        {
            let slug = utils.pathToSlug(location.pathname);

            let url = appConfig.backendURL('/games/'+slug);
            fetch(url)
            .then(res => res.json())
            .then(res => setData(res))

            setPrevPath(location.pathname);
        }

    }, [location, data]);
    
    let title = '';
    let iconurl = '';

    if(data.length > 0){
        title = data[0].name;
        iconurl = data[0].box_art_url.replace('-{width}x{height}', '')
    }

    return (
        <div className="GamePage">
            <h2 className="SectionTitle">{title}</h2>
            <div className="GamePageIconWrapper">
                <img src={iconurl} alt={title} className="GamePageIcon" />
            </div>
        </div>
    );
};

export default GamePage