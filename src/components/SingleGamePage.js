import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import * as appConfig from '../config'
import * as utils from '../utils'
import SectionHeader from './SectionHeader';

const SingleGamePage = () => {
    let location = useLocation();

    const [data, setData] = useState([]); // Data state for the companies/games
    const [prevPath, setPrevPath] = useState('');
    
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {

        if(prevPath !== location.pathname)
        {
            let slug = utils.pathToSlug(location.pathname);

            let url = appConfig.backendURL('/games/'+slug);
            fetch(url)
            .then(res => res.json())
            .then(res => setData(res))

            setPrevPath(location.pathname);
        }

    }, [location, data, prevPath]);
    
    let title = '';
    let iconurl = '';
    let description = '';

    if(data.length > 0){
        title = data[0].name;
        iconurl = data[0].box_art_url.replace('-{width}x{height}', '-300x400')
        description = utils.textToParagraphs(data[0].storyline);
    }

    let headers = [ {title:title, selected:true} ];

    return (
        <div className="SingleGamePage">
            <SectionHeader headers={headers} />    
            <div className="SingleGamePageXContent">
                <div className="SingleGamePageIconWrapper">
                    <img className="SingleGamePageIcon" src={iconurl} alt={title} />
                </div>
                <div className="SingleGamePageDescription">{description}</div>
            </div>
        </div>
    );
};

export default SingleGamePage