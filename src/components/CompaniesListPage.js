import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from "react-router-dom";

import * as appConfig from '../config'
import * as utils from '../utils'

import CompanyTile from './CompanyTile'
import LoadMore from './LoadMore'

const Carousel = () => {
    
    let location = useLocation();
    let history = useHistory();

    const [data, setData] = useState([]); // Data state for the companies/games
    const [prevPath, setPrevPath] = useState('');
    const [filter, setFilter] = useState('');
    
    const refInput = useRef(null);

    
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
        
        history.push({pathname:'/topgames', search:location.search});
    }
    
    const onFilter = (event) => {
        setFilter(event.target.value.toLocaleLowerCase());
    }
    
    
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
            setItemCountMax(itemCountIncrement);
        }
    }, [location, data, itemCountIncrement, prevPath, filter]);
    
    let command = utils.pathToCommand(location.pathname);
    let tileGrid = null;
    let title = '';

    if(command === 'search'){
        title = <h2 className="SectionTitle"><span className="SectionTitleSelected">Search Results</span></h2>
    } else {
        title = <h2 className="SectionTitle"><span className="SectionTitleSelected">Top Companies</span><span className="SectionTitleSplit">|</span><span className="SectionTitleClickable" onClick={onClickSectionTitle}>Top Games</span></h2>
    }

    let tiles = [];
    for(var i = 0; i < data.length; i++){
        let acompany = data[i];

        if(i >= itemCountMax)
            break;
        
        if(filter!=='' && acompany.name.toLocaleLowerCase().indexOf(filter)===-1){
            continue;
        }
        
        let key = 'companykey'+acompany.id
        tiles.push(
            <CompanyTile key={key} company={acompany}/>
        );
    }
    tileGrid = <div className="CompaniesGrid"> {tiles} </div>

    return (
        <div className="CompaniesListPage">
            <div className="TileListHeader">
                {title}
                <div className="TileListSearch">
                    <span className="TileListTitle">Filter </span>
                    <input ref={refInput} type="text" onChange={onFilter} />
                </div>
            </div>
            {tileGrid}

            <LoadMore onLoadMore={onLoadMore} />
        </div>
    );
};

export default Carousel;