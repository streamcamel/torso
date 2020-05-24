import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from "react-router-dom";

import * as appConfig from '../config'

import GameTile from './GameTile'
import LoadMore from './LoadMore'

const Carousel = () => {
    
    let location = useLocation();
    let history = useHistory();

    const [data, setData] = useState([]); // Data state for the companies/games
    const [prevPath, setPrevPath] = useState('');
    
    let itemCountIncrement = 18;
    if(window.innerWidth <= 800) {
        itemCountIncrement = 9;
    }
    const [itemCountMax, setItemCountMax] = useState(itemCountIncrement);

    const onLoadMore = () => {
        setItemCountMax(itemCountMax+itemCountIncrement);
    };
    
    const onClickSectionTitle = (e) => {
        e.preventDefault();

        const selection = window.getSelection();
        if (selection.toString()) {
            return;
        }
        
        history.push('/');
    }
    
    
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if(prevPath !== location.pathname)
        {
            let url = appConfig.backendURL('/top_games?limit=100');
            fetch(url)
                .then(res => res.json())
                .then(res => setData(res))

            setPrevPath(location.pathname);
            setItemCountMax(itemCountIncrement);
        }
    }, [location, data, itemCountIncrement, prevPath]);
    
    let tileGrid = null;

    let tiles = [];
    for(var i = 0; i < data.length; i++){
        if(i === itemCountMax)
            break;

        let agame = data[i];
        let key = 'gamekey'+agame.game_id;
        tiles.push(
            <GameTile key={key} game={agame}/>
        );
    }
    tileGrid = <div className="CompaniesGrid"> {tiles} </div>

    return (
        <div className="TopGamePage">
            <h2 className="SectionTitle"><span className="SectionTitleClickable" onClick={onClickSectionTitle}>Top Companies</span><span className="SectionTitleSplit">|</span><span className="SectionTitleSelected">Top Games</span></h2>
            {tileGrid}

            <LoadMore onLoadMore={onLoadMore} />
        </div>
    );
};

export default Carousel;