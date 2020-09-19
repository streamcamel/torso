import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import _ from "lodash" 
import * as appConfig from '../config'
import * as utils from '../utils'
import CompaniesAndGamesList from './CompaniesAndGamesList'
import SectionHeader from './SectionHeader';
import FwdBrowsingDrawer from './FwdBrowsingDrawer';
import ClipsCarousel from './ClipsCarousel';
import CompanyStatisticsTable from './CompanyStatisticsTable';

import { URLSearchAddQuery, numberWithCommas, changeKeyObjects } from '../utils';

const SingleCompanyPage = () => {
    let location = useLocation();

    const [dataGames, setDataGames] = useState([]); // Data state for the companies/games
    const [dataCompanies, setDataCompanies] = useState([]); // Data state for the companies
    const [dataCompanyLiveStats, setDataCompanyLiveStats] = useState([]);
    const [dataCompanyWeekStats, setDataCompanyWeekStats] = useState([]);

    const [viewerData, setViewerData] = useState([]); // Data state for the Company

    const [prevPath, setPrevPath] = useState('');
    const [filter, setFilter] = useState('');

    const addLineBreaks = string =>
    string.split('\n').map((text, index) => (
      <React.Fragment key={`${text}-${index}`}>
        {text}
        <br />
      </React.Fragment>
    ));

    const onFilter = (str) => {
        setFilter(str);
    }
    
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if(prevPath !== location.pathname)
        {
            let slug = utils.pathToSlug(location.pathname);
            let url = '';

            setDataGames([])
            url = appConfig.backendURL('/games_stats?company='+slug);
            fetch(url)
                .then(res => res.json())
                .then(res => setDataGames(res));

            setDataCompanies([])
            url = appConfig.backendURL('/companies/'+slug);
            fetch(url)
                .then(res => res.json())
                .then(res => setDataCompanies(res['data']));

            setDataCompanyLiveStats([])
            url = appConfig.backendURL('/companies_stats?company='+slug);
            fetch(url)
                .then(res => res.json())
                .then(res => setDataCompanyLiveStats(res));

            setDataCompanyWeekStats([])
            url = appConfig.backendURL('/companies_stats?company='+slug+'&period=1w');
            fetch(url)
                .then(res => res.json())
                .then(res => setDataCompanyWeekStats(res));

            let dateFrom = new Date('2020-01-01');
            let dateTo = new Date();
    
            url = URLSearchAddQuery('', 'after', encodeURIComponent(dateFrom.toISOString()));
            url = URLSearchAddQuery(url, 'before', encodeURIComponent(dateTo.toISOString()));
            url = URLSearchAddQuery(url, 'company', encodeURIComponent(slug));
    
            fetch(appConfig.backendURL('/viewers' + url))
                .then(res => res.json())
                .then(res => setViewerData(res))

            setPrevPath(location.pathname);
        }
    }, [location, viewerData, dataGames, dataCompanies, dataCompanyLiveStats, dataCompanyWeekStats, prevPath, filter]);
    
    let title = '';
    if(dataCompanies !== null && dataCompanies !== undefined && dataCompanies.length > 0){
        title = dataCompanies[0].name
        document.title = `${title} - Statistics and Charts | StreamCamel`;
    }
    
    let description = '';
    if(dataCompanies !== null && dataCompanies !== undefined && dataCompanies.length>0 && dataCompanies[0].description !== null) {
        description = utils.textToParagraphs(dataCompanies[0].description);
    }

    let iconurl = '';
    if (dataCompanies !== null && dataCompanies !== undefined && dataCompanies.length > 0 && dataCompanies[0].url !== null) {
        if (dataCompanies[0].url !== ".jpg") {
            iconurl = dataCompanies[0].url.replace('t_thumb', 't_cover_big');
            if (dataCompanies[0].alpha_channel === 1) {
                 iconurl = iconurl.replace('.jpg', '.png')
            }

            iconurl = iconurl.replace(/^\/\// , 'https://');
        }
    }

    let liveViewers = '';
    let liveChannels = '';
    let rank = '';
    if (dataCompanyLiveStats.length > 0) {
        liveViewers = dataCompanyLiveStats[0].viewer_count_average;
        liveChannels = dataCompanyLiveStats[0].stream_count_average;
        rank = dataCompanyLiveStats[0].rank;
    }

    let averageViewersLastWeek = '';
    let averageChannelsLastWeek = '';
    let hoursWatchedLastWeek = '';
    if (dataCompanyWeekStats.length > 0) {
        averageViewersLastWeek = dataCompanyWeekStats[0].viewer_count_average;
        averageChannelsLastWeek = dataCompanyWeekStats[0].stream_count_average;
        hoursWatchedLastWeek = averageViewersLastWeek * 24 * 7;
    }

    // General statistics here
    // let peakViewers = 2277171;
    // //let peakViewersTime = new Date(2020, 5, 14, 0, 0, 0, 0);
    // let peakChannels = 117582;
    // //let peakCahnnelsTime = new Date(2020, 5, 14, 0, 0, 0, 0);
    // let viewersPerChannelLastWeek = 12.8;

    // TODO: Probably should make components here
    let liveViewersComponent = `LIVE VIEWERS: ${liveViewers}`;
    let liveChannelsComponent = `LIVE CHANNELS: ${liveChannels}`;
    let rankComponent = `RANK: #${rank}`;
    let averageViewersLastWeekComponent = `AVG. VIEWERS, 7 DAYS: ${averageViewersLastWeek}`;
    let averageChannelsLastWeekComponent = `AVG. CHANNELS, 7 DAYS: ${averageChannelsLastWeek}`;
    let hoursWatchedLastWeekComponent = `HOURS WATCHED, 7 DAYS: ${hoursWatchedLastWeek}`;
    // let peakViewersComponent = `PEAK VIEWERS: ${peakViewers}`;
    // let peakViewersTimeComponent = `AVG. VIEWERS, 7 DAYS: ${peakViewersTime}`;
    // let peakChannelsComponent = `PEAK CHANNELS: ${peakChannels}`;
    // // let peakCahnnelsTimeComponent = `AVG. VIEWERS, 7 DAYS: ${peakCahnnelsTime}`;
    // let viewersPerChannelLastWeekComponent = `VIEWERS PER CHANNEL, 7 DAYS: ${viewersPerChannelLastWeek}`;


    let slug = utils.pathToSlug(location.pathname);
    let headers = [ {title:title, selected:true} ];

    let fullDescription =   numberWithCommas(liveViewersComponent) + '\n\n' + 
                            numberWithCommas(liveChannelsComponent) + '\n\n' +
                            rankComponent + '\n\n' +
                            numberWithCommas(averageViewersLastWeekComponent) + '\n\n' + 
                            numberWithCommas(averageChannelsLastWeekComponent) + '\n\n' +
                            numberWithCommas(hoursWatchedLastWeekComponent) + '\n\n' +
                            // peakViewersComponent + '\n\n' +)
                            // // peakViewersTimeComponent + '\n\n' +
                            // peakChannelsComponent + '\n\n' +
                            // // peakCahnnelsTimeComponent + '\n\n' +
                            // viewersPerChannelLastWeekComponent + '\n\n' +
                            description;

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
        <div className="SingleCompanyPage">
            <SectionHeader headers={headers} onFilter={onFilter}/>
            <div className="SingleCompanyPageXContent">
                <div className="SingleCompanyPageIconWrapper">
                    <img className="SingleCompanyPageIcon" src={iconurl} alt={title} />
                </div>
                <div className="SingleCompanyPageDescription">{addLineBreaks(fullDescription)}</div>
            </div>
            <div className="CompanyDescriptionFooter">
                <CompaniesAndGamesList data={dataGames} filter={filter} context="company" slug={slug}/>
                <div className="CompanyStatisticsTable">
                    <CompanyStatisticsTable data={viewersTableData} title="Concurrent Viewers"/>
                    <CompanyStatisticsTable data={streamsTableData} title="Concurrent Streams"/>
                    <CompanyStatisticsTable data={hoursWatchedTableData} displayPeak={false} valueTitle="Value" title="Hours Watched"/>
                </div>
                <ClipsCarousel className="ClipsCarousel" context="company" slug={slug}></ClipsCarousel>
                <FwdBrowsingDrawer />
            </div>
        </div>
    );
};

export default SingleCompanyPage;