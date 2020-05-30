import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import * as appConfig from '../config';
import CompaniesAndGamesList from './CompaniesAndGamesList';


const TopGames = () => {
    
    let location = useLocation();
    let history = useHistory();

    const [data, setData] = useState([]); // Data state for the companies/games
    const [prevPath, setPrevPath] = useState('');
    
    const onClickSectionTitle = (e) => {
        e.preventDefault();

        const selection = window.getSelection();
        if (selection.toString()) {
            return;
        }
        
        history.push({pathname:'/', search:location.search});
    }
    
    useEffect(() => {
        if(prevPath !== location.pathname)
        {
            let url = appConfig.backendURL('/top_games?limit=100');
            fetch(url)
                .then(res => res.json())
                .then(res => setData(res))

            setPrevPath(location.pathname);
        }
    }, [location, data, prevPath]);
    
    return (
        <div className="TopGamePage">
            <h2 className="SectionTitle"><span className="SectionTitleClickable" onClick={onClickSectionTitle}>Top Companies</span><span className="SectionTitleSplit">|</span><span className="SectionTitleSelected">Top Games</span></h2>
            <CompaniesAndGamesList data={data} />
        </div>
    );
};

export default TopGames;