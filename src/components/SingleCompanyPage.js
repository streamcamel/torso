import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import * as appConfig from '../config'
import * as utils from '../utils'
import CompaniesAndGamesList from './CompaniesAndGamesList'
import SectionHeader from './SectionHeader';
import FwdBrowsingDrawer from './FwdBrowsingDrawer';
import ClipsCarousel from './ClipsCarousel';


const SingleCompanyPage = () => {
    let location = useLocation();

    const [dataGames, setDataGames] = useState([]); // Data state for the companies/games
    const [dataCompanies, setDataCompanies] = useState([]); // Data state for the companies/games
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
                .then(res => setDataGames(res))

            setDataCompanies([])
            url = appConfig.backendURL('/companies/'+slug);
                fetch(url)
                .then(res => res.json())
                .then(res => setDataCompanies(res))

            setPrevPath(location.pathname);
        }
    }, [location, dataGames, dataCompanies, prevPath, filter]);
    
    let title = '';
    if(dataCompanies.length > 0){
        title = dataCompanies[0].name
        document.title = `${title} - Statistics and Charts | StreamCamel`;
    }
    
    let description = '';
    if(dataCompanies.length>0 && dataCompanies[0].description !== null) {
        description = utils.textToParagraphs(dataCompanies[0].description);
    }

    let iconurl = '';
    if (dataCompanies.length > 0 && dataCompanies[0].url !== null) {
        if (dataCompanies[0].url !== ".jpg") {
            iconurl = dataCompanies[0].url.replace('t_thumb', 't_cover_big');

            // TODO: end-point is not returning alpha_channel here
            // if (props.company.alpha_channel === 1) {
            //     iconurl = iconurl.replace('.jpg', '.png')
            // }

            iconurl = iconurl.replace(/^\/\// , 'https://');
            console.log(iconurl);
        }
    }

    // General statistics here
    let liveViewers = 209179;
    let liveChannels = 10083;
    let rank = 3;
    let averageViewersLastWeek = 147677;
    let averageChannelsLastWeek = 11571;
    let hoursWatchedLastWeek = 24908205;
    let peakViewers = 2277171;
    let peakViewersTime = new Date(2020, 5, 14, 0, 0, 0, 0);
    let peakChannels = 117582;
    let peakCahnnelsTime = new Date(2020, 5, 14, 0, 0, 0, 0);
    let viewersPerChannelLastWeek = 12.8;

    // TODO: Probably should make components here
    let liveViewersComponent = `LIVE VIEWERS: ${liveViewers}`;
    let liveChannelsComponent = `LIVE CHANNELS: ${liveChannels}`;
    let rankComponent = `RANK: #${rank}`;
    let averageViewersLastWeekComponent = `AVG. VIEWERS, 7 DAYS: ${averageViewersLastWeek}`;

    let slug = utils.pathToSlug(location.pathname);
    let headers = [ {title:title, selected:true} ];

    let fullDescription =   liveViewersComponent + '\n\n' + 
                            liveChannelsComponent + '\n\n' +
                            rankComponent + '\n\n' +
                            averageViewersLastWeekComponent + '\n\n' + 
                            description;

    return (
        <div className="SingleCompanyPage">
            <SectionHeader headers={headers} onFilter={onFilter}/>
            <div className="SingleCompanyPageXContent">
                <div className="SingleCompanyPageIconWrapper">
                    <img className="SingleCompanyPageIcon" src={iconurl} alt={title} />
                </div>
                <div className="SingleCompanyPageDescription">{addLineBreaks(fullDescription)}</div>
                {/* <div className="SingleCompanyPageDescription">
                    {liveViewersComponent}
                </div>
                <div className="SingleCompanyPageDescription">
                    {liveChannelsComponent}
                </div> */}
            </div>
            <CompaniesAndGamesList data={dataGames} filter={filter} context="company" slug={slug}/>
            <ClipsCarousel className="ClipsCarousel" context="company" slug={slug}></ClipsCarousel>
            <FwdBrowsingDrawer />
        </div>
    );
};

export default SingleCompanyPage;