import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import * as appConfig from '../config'
import * as utils from '../utils'
import SectionHeader from './SectionHeader';

const SingleGamePage = () => {
    let location = useLocation();

    const [data, setData] = useState([]); // Data state for the companies/games
    const [prevPath, setPrevPath] = useState('');
    const [gameData, setGameData] = useState([]);
    
    const addLineBreaks = string =>
    string.split('\n').map((text, index) => (
      <React.Fragment key={`${text}-${index}`}>
        {text}
        <br />
      </React.Fragment>
    ));

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {

        if(prevPath !== location.pathname)
        {
            let slug = utils.pathToSlug(location.pathname);
            let url = appConfig.backendURL('/games/'+slug);
            fetch(url)
            .then(res => res.json())
            .then(res => setData(res));

            url = appConfig.backendURL('/games_stats?game='+slug+'&period=1w');
            fetch(url)
            .then(res => res.json())
            .then(res => setGameData(res));

            setPrevPath(location.pathname);
        }

    }, [location, data, prevPath]);
    
    let title = '';
    let iconurl = '';
    let description = '';
    let summary = '';

    if(data.length > 0){
        title = data[0].name;
        iconurl = data[0].box_art_url.replace('-{width}x{height}', '-300x400')
        description = utils.textToParagraphs(data[0].storyline);
        document.title = `Streamcamel.com: ${title} - Statistics and Charts`;
    }

    if (gameData.length > 0) {
        let gameName = gameData[0].name;
        let rank = gameData[0].rank;
        let rankSuffix = utils.rankSuffix(rank);
        let viewers = gameData[0].viewers.toLocaleString();
        let viewer_percentage = (gameData[0].viewer_percentage * 100).toFixed(2);

        summary = `${gameName} is the ${rank}${rankSuffix} most viewed game on Twitch with an average of ${viewers} viewers last week. This is ${viewer_percentage}% of all viewers on Twitch.`;
    }

    let headers = [ {title:title, selected:true} ];
    let fullDescription = summary + '\n\n' + description;

    return (
        <div className="SingleGamePage">
            <SectionHeader headers={headers} />    
            <div className="SingleGamePageXContent">
                <div className="SingleGamePageIconWrapper">
                    <img className="SingleGamePageIcon" src={iconurl} alt={title} />
                </div>
                <div className="SingleGamePageDescription">{addLineBreaks(fullDescription)}</div>
            </div>
        </div>
    );
};

export default SingleGamePage