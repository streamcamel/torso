import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import * as appConfig from '../config'
import * as utils from '../utils'
import CompaniesAndGamesList from './CompaniesAndGamesList'
import SectionHeader from './SectionHeader';

const SearchPage = () => {
    
    let location = useLocation();

    const [dataCompanies, setDataCompanies] = useState([]);
    const [dataGames, setDataGames] = useState([]);
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
            let urlCompanies = appConfig.backendURL('/search_companies?q=' + slug + '&limit=100');
            fetch(urlCompanies)
                .then(res => res.json())
                .then(res => setDataCompanies(res))

            let urlGames = appConfig.backendURL('/search_games?q=' + slug + '&limit=100');
            fetch(urlGames)
                .then(res => res.json())
                .then(res => setDataGames(res))

            document.title = `Search Results for ${slug} | StreamCamel`;
            
            setPrevPath(location.pathname);
        }
    }, [location, dataCompanies, dataGames, prevPath, filter]);
    
    let headers = [ {title:'Search Results', selected:true} ];
    
    let data = dataCompanies.concat(dataGames);

    return (
        <div className="SearchPage">
            <SectionHeader headers={headers} onFilter={onFilter} information="Companies and Games Results by Average Viewers"/>    
            <CompaniesAndGamesList data={data} filter={filter} />
        </div>
    );
};

export default SearchPage;