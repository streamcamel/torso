import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import * as appConfig from '../config'
import * as utils from '../utils'
import CompaniesAndGamesList from './CompaniesAndGamesList'
import SectionHeader from './SectionHeader';


const SingleCompanyPage = () => {
    let location = useLocation();

    const [dataGames, setDataGames] = useState([]); // Data state for the companies/games
    const [dataCompanies, setDataCompanies] = useState([]); // Data state for the companies/games
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
            let url = '';

            setDataGames([])
            url = appConfig.backendURL('/top_games?company='+slug);
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
    }
    
    let description = '';
    if(dataCompanies.length>0 && dataCompanies[0].description !== null) {
        let lines = utils.textToParagraphs(dataCompanies[0].description);
        description =   <div className="CompanyDescription">
                            { lines.map((value, idx) => { 
                                        return <p key={idx}>{value}</p>
                                    }) }
                        </div>
    }

    let headers = [ {title:title, selected:true} ];

    return (
        <div className="SingleCompanyPage">
            <SectionHeader headers={headers} onFilter={onFilter}/> 
            {description}
            <CompaniesAndGamesList data={dataGames} filter={filter}/>
        </div>
    );
};

export default SingleCompanyPage;