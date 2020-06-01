import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import * as appConfig from '../config'
import * as utils from '../utils'
import CompaniesAndGamesList from './CompaniesAndGamesList'
import SectionHeader from './SectionHeader';

const SearchPage = () => {
    
    let location = useLocation();

    const [data, setData] = useState([]); // Data state for the companies/games
    const [prevPath, setPrevPath] = useState('');
    const [filter, setFilter] = useState('');

    const onFilter = (str) => {
        setFilter(str);
    }
    
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if(prevPath !== location.pathname)
        {
            let slug = utils.pathToSlug(location.pathname);
            let url = appConfig.backendURL('/search_companies?q=' + slug);
            fetch(url)
                .then(res => res.json())
                .then(res => setData(res))
            
            setPrevPath(location.pathname);
        }
    }, [location, data, prevPath, filter]);
    
    let headers = [ {title:'Search Results', selected:true} ];

    return (
        <div className="SearchPage">
            <SectionHeader headers={headers} onFilter={onFilter}/>    
            <CompaniesAndGamesList data={data} filter={filter} />
        </div>
    );
};

export default SearchPage;