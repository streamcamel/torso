import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import * as appConfig from '../config'
import SectionHeader from './SectionHeader'
import CompaniesAndGamesList from './CompaniesAndGamesList'

const TopCompaniesPage = () => {
    
    let location = useLocation();

    const [data, setData] = useState([]); // Data state for the companies/games
    const [prevPath, setPrevPath] = useState('');
    const [filter, setFilter] = useState('');
    
    const onFilter = (str) => {
        setFilter(str);
    }
    
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        document.title = 'Viewers for Top Companies | StreamCamel';

        if(prevPath !== location.pathname)
        {
            let url = appConfig.backendURL('/top_companies?limit=100&period=1w');

            fetch(url)
                .then(res => res.json())
                .then(res => setData(res))
            
            setPrevPath(location.pathname);
        }
    }, [location, data, prevPath, filter]);
    
    let headers = [ {title:'Top Companies', selected:true, path:'/'},
                    {title:'Top Games', selected:false, path:'/topgames'},
                    {title:'Top Streamers', selected:false, path:'/topstreamers'}
                    ];
    
    return (
        <div className="TopCompaniesPage">
            <SectionHeader headers={headers} onFilter={onFilter} information="Top Companies by Average Viewers"/>    
            <CompaniesAndGamesList data={data} filter={filter} />
        </div>
    );
};

export default TopCompaniesPage;