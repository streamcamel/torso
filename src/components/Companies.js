import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory, } from "react-router-dom";

import * as appConfig from '../config'
import * as utils from '../utils'

import CompanyTile from './CompanyTile'
import GameTile from './GameTile'
import GamePage from './GamePage'
import MainChart from './MainChart'



const Companies = (props) => {
    let location = useLocation();
    let history = useHistory();

    const [dataGames, setDataGames] = useState([]); // Data state for the companies/games
    const [dataCompanies, setDataCompanies] = useState([]); // Data state for the companies/games
    const [prevPath, setPrevPath] = useState('');

    const getGameFromDataGames = (gameSlug) => {
        if(dataGames.length == 0) 
            return null;

        for(let i = 0; i < dataGames.length; i++){
            if(dataGames[i].slug === gameSlug)
                return dataGames[i];
        }
        return null;
    };

    const getCompanyFromDataCompanies = (companySlug) => {
        if(dataCompanies.length == 0) 
            return null;

        for(let i = 0; i < dataCompanies.length; i++){
            if(dataCompanies[i].slug === companySlug)
                return dataCompanies[i];
        }
        return null;
    };

    
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        console.log('useEffect **************************')
        console.log(location)
        console.log(history)
        console.log(utils.pathToCommand(location.pathname))

        if(prevPath != location.pathname)
        {
            let command = utils.pathToCommand(location.pathname);
            let slug = utils.pathToSlug(location.pathname);
            let url = '';
            switch(command) {
                case 'company':
                    setDataGames([])
                    url = appConfig.backendURL('/top_games?company='+slug);
                    fetch(url)
                    .then(res => res.json())
                    .then(res => setDataGames(res))

                    if(getCompanyFromDataCompanies(slug) === null) {
                        setDataCompanies([])
                        url = appConfig.backendURL('/companies/'+slug);
                        fetch(url)
                        .then(res => res.json())
                        .then(res => setDataCompanies(res))
                    }
                    break;

                case 'game':
                    setDataCompanies([])
                    if(getGameFromDataGames(slug) === null){
                        url = appConfig.backendURL('/games/'+slug);
                        fetch(url)
                        .then(res => res.json())
                        .then(res => setDataGames(res))
                    }
                    break;

                case 'search':
                    setDataGames([])
                    url = appConfig.backendURL('/search_companies?q=' + slug);
                    fetch(url)
                    .then(res => res.json())
                    .then(res => setDataCompanies(res))
                    break;

                default:
                    url = appConfig.backendURL('/top_companies?period=1w');
                    fetch(url)
                    .then(res => res.json())
                    .then(res => setDataCompanies(res))
                    break;
            }
            setPrevPath(location.pathname);
        }
    }, [location, dataCompanies, dataGames]);
    
    let command = utils.pathToCommand(location.pathname);
    let slug = utils.pathToSlug(location.pathname);
    let tileGrid = null;
    let singlePage = null;
    let title = '';

    if (command === 'company') {
        // Show a single company 
        // Show global viewers for that company
        // Show a list of the games of that company

        let acompany = getCompanyFromDataCompanies(slug);
        if(acompany !== null){
            title = acompany.name
        }

        let tiles = []
        dataGames.forEach(agame => {
            let key = 'gamekey'+agame.game_id
            tiles.push(
                <GameTile key={key} game={agame}/>
            );
        });
        tileGrid = <div className="CompaniesGrid"> {tiles} </div>

    } else if (command === 'game') {
        // Show a single game 
        // Show viewers of that game only
        // Show a box art of that game

        console.log('GAME PAGE') 
        let agame = getGameFromDataGames(slug);
        if(agame !== null){
            title = agame.name;
            singlePage = <GamePage game={agame} />
        }

    } else {
        // Show a multiple companies
        // Show global viewers NOT tied to the selected companies
        // Show a list of the companies
        // Get here from homepage or from search
        if(command === 'search'){
            title = 'Search results'
        } else {
            title = 'Top companies'
        }

        let tiles = [];
        dataCompanies.forEach(acompany => {
            let key = 'companykey'+acompany.id
            tiles.push(
                <CompanyTile key={key} company={acompany}/>
            );
        });
        tileGrid = <div className="CompaniesGrid"> {tiles} </div>
    }

    return (
        <div className="companies">
            <MainChart />
            <h2 className="SectionTitle">{title}</h2>
            {tileGrid}
            {singlePage}
        </div>
    );
};

export default Companies;