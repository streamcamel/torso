import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

import * as appConfig from '../config'
import * as utils from '../utils'
import CompaniesAndGamesList from './CompaniesAndGamesList'


const GamesListPage = () => {
    let location = useLocation();

    const [dataGames, setDataGames] = useState([]); // Data state for the companies/games
    const [dataCompanies, setDataCompanies] = useState([]); // Data state for the companies/games
    const [prevPath, setPrevPath] = useState('');
    
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
    }, [location, dataGames, dataCompanies, prevPath]);
    
    let title = '';
    if(dataCompanies.length > 0){
        title = dataCompanies[0].name
    }
    
    let description = '';
    if(dataCompanies.length>0 && dataCompanies[0].description !== null) {
        let lines = utils.textToParagraphs(dataCompanies[0].description);
        let paragraphs = [];
        for(let aline of lines) {
            paragraphs.push(
                <p>{aline}</p>
            );
        }
        
        description = <div className="CompanyDescription">{paragraphs}</div>
    }

    return (
        <div className="GamesListPage">
            <h2 className="SectionTitle">{title}</h2>
            {description}
            <CompaniesAndGamesList data={dataGames} />
        </div>
    );
};

export default GamesListPage;