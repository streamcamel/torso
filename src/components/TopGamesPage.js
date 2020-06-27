import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import * as appConfig from '../config';
import CompaniesAndGamesList from './CompaniesAndGamesList';
import SectionHeader from './SectionHeader';


const TopGamesPage = () => {
    
    let location = useLocation();

    const [data, setData] = useState([]); // Data state for the companies/games
    const [prevPath, setPrevPath] = useState('');
    const [filter, setFilter] = useState('');

    const onFilter = (str) => {
        setFilter(str);
    }
    
    useEffect(() => {
        document.title = 'Viewers for Top Games | StreamCamel';

        if(prevPath !== location.pathname)
        {
            let url = appConfig.backendURL('/games_stats?limit=100&period=1w');
            fetch(url)
                .then(res => res.json())
                .then(res => setData(res))

            setPrevPath(location.pathname);
        }
    }, [location, data, prevPath, filter]);

    let headers = [ {title:'Top Companies', selected:false, path:'/'},
                    {title:'Top Games', selected:true, path:'/topgames'},
                    {title:'Top Streamers', selected:false, path:'/topstreamers'}
                    ];
    
    return (
        <div className="TopGamePage">
            <SectionHeader headers={headers} onFilter={onFilter} information="Top Games by Average Viewers"/>    
            <CompaniesAndGamesList data={data} filter={filter}/>
        </div>
    );
};

export default TopGamesPage;