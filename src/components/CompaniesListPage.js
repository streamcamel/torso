import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

import * as appConfig from '../config'
import * as utils from '../utils'

import CompanyTile from './CompanyTile'

const Carousel = () => {
    let location = useLocation();

    const [data, setData] = useState([]); // Data state for the companies/games
    const [prevPath, setPrevPath] = useState('');

    
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if(prevPath !== location.pathname)
        {
            let command = utils.pathToCommand(location.pathname);
            let slug = utils.pathToSlug(location.pathname);
            let url = '';
            switch(command) {
                case 'search':
                    url = appConfig.backendURL('/search_companies?q=' + slug);
                    fetch(url)
                    .then(res => res.json())
                    .then(res => setData(res))
                    break;

                default:
                    url = appConfig.backendURL('/top_companies?period=1w');
                    fetch(url)
                    .then(res => res.json())
                    .then(res => setData(res))
                    break;
            }
            setPrevPath(location.pathname);
        }
    }, [location, data]);
    
    let command = utils.pathToCommand(location.pathname);
    let tileGrid = null;
    let title = '';

    if(command === 'search'){
        title = 'Search results'
    } else {
        title = 'Top companies'
    }

    let tiles = [];
    data.forEach(acompany => {
        let key = 'companykey'+acompany.id
        tiles.push(
            <CompanyTile key={key} company={acompany}/>
        );
    });
    tileGrid = <div className="CompaniesGrid"> {tiles} </div>

    return (
        <div className="CompaniesListPage">
            <h2 className="SectionTitle">{title}</h2>
            {tileGrid}
        </div>
    );
};

export default Carousel;