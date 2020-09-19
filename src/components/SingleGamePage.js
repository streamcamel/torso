import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import _ from "lodash" 
import * as appConfig from '../config'
import * as utils from '../utils'
import SectionHeader from './SectionHeader';
import FwdBrowsingDrawer from './FwdBrowsingDrawer';
import ClipsCarousel from './ClipsCarousel';
import CompanyStatisticsTable from './CompanyStatisticsTable';

import { URLSearchAddQuery, changeKeyObjects } from '../utils';

const SingleGamePage = () => {
    let location = useLocation();

    const [data, setData] = useState([]); // Data state for the companies/games
    const [prevPath, setPrevPath] = useState('');
    const [gameData, setGameData] = useState([]);

    const [viewerData, setViewerData] = useState([]);
    
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
            .then(res => setData(res['data']));

            url = appConfig.backendURL('/games_stats?game='+slug+'&period=1w');
            fetch(url)
            .then(res => res.json())
            .then(res => setGameData(res));

            let dateFrom = new Date('2020-01-01');
            let dateTo = new Date('2020-12-01');
    
            url = URLSearchAddQuery('', 'after', encodeURIComponent(dateFrom.toISOString()));
            url = URLSearchAddQuery(url, 'before', encodeURIComponent(dateTo.toISOString()));
            url = URLSearchAddQuery(url, 'game', encodeURIComponent(slug));
    
            url = appConfig.backendURL('/viewers' + url);
            fetch(url)
                .then(res => res.json())
                .then(res => setViewerData(res))

            setPrevPath(location.pathname);
        }

    }, [location, viewerData, data, prevPath]);
    
    let title = '';
    let iconurl = '';
    let description = '';
    let summary = '';
    let sourceGameSlug = null;

    if(data.length > 0){
        title = data[0].name;
        iconurl = data[0].box_art_url.replace('-{width}x{height}', '-300x400')
        description = utils.textToParagraphs(data[0].storyline);
        document.title = `${title} - Statistics and Charts | StreamCamel`;
        sourceGameSlug = data[0].slug;
    }

    if (gameData.length > 0) {
        let gameName = gameData[0].name;
        let rank = gameData[0].rank;
        let rankSuffix = utils.rankSuffix(rank);
        let viewers = gameData[0].viewers.toLocaleString();
        let viewer_percentage = (gameData[0].viewer_percentage * 100).toFixed(2);

        summary = `${gameName} is the ${rank}${rankSuffix} most viewed game on Twitch with an average of ${viewers} viewers last week. This is ${viewer_percentage}% of all viewers on Twitch.`;
    }

    let slug = utils.pathToSlug(location.pathname);
    let headers = [ {title:title, selected:true} ];
    let fullDescription = summary + '\n\n' + description;

    let altTitle = title + " Logo";

    const viewersTableData = changeKeyObjects(viewerData, { viewers_count: "value",
    viewers_count_peak: "peak",
    time: "time",});

    const streamsTableData = changeKeyObjects(viewerData, { streams_count: "value",
        streams_count_peak: "peak",
        time: "time",});

    const hoursWatchedTableData = _.cloneDeep(viewersTableData);
    var i;
    for (i = 0; i < hoursWatchedTableData.length; i++) {
        hoursWatchedTableData[i].value *= 24; // TODO this is incorrect for days that are not complete
    }

    return (
        <div className="SingleGamePage">
            <SectionHeader headers={headers} />    
            <div className="SingleGamePageXContent">
                <div className="SingleGamePageIconWrapper">
                    <img className="SingleGamePageIcon" src={iconurl} alt={altTitle} />
                </div>
                <div className="SingleGamePageDescription">{addLineBreaks(fullDescription)}</div>
            </div>
            <div className="CompanyStatisticsTable">
                    <CompanyStatisticsTable data={viewersTableData} title="Concurrent Viewers"/>
                    <CompanyStatisticsTable data={streamsTableData} title="Concurrent Streams"/>
                    <CompanyStatisticsTable data={hoursWatchedTableData} displayPeak={false} valueTitle="Value" title="Hours Watched"/>
                </div>
            <ClipsCarousel className="ClipsCarousel" context="game" slug={slug}></ClipsCarousel>
            <FwdBrowsingDrawer sourceGameSlug={sourceGameSlug} />
        </div>
    );
};

export default SingleGamePage