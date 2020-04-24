import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

import * as appConfig from '../config'
import * as utils from '../utils'

import GameTile from './GameTile'


const SingleCompanyPage = () => {
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
    }, [location, dataGames, dataCompanies]);
    

    let tileGrid = null;
    let title = '';

    if(dataCompanies.length > 0){
        title = dataCompanies[0].name
    }

    let tiles = []
    dataGames.forEach(agame => {
        let key = 'gamekey'+agame.game_id
        tiles.push(
            <GameTile key={key} game={agame}/>
        );
    });
    tileGrid = <div className="CompaniesGrid"> {tiles} </div>

    return (
        <div className="SingleCompanyPage">
            <h2 className="SectionTitle">{title}</h2>
            {tileGrid}
        </div>
    );
};

export default SingleCompanyPage;