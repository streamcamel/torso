import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from "react-router-dom";

import * as appConfig from '../config'
import * as utils from '../utils'
import CompaniesAndGamesList from './CompaniesAndGamesList'

const SearchPage = () => {
    
    let location = useLocation();
    let history = useHistory();

    const [data, setData] = useState([]); // Data state for the companies/games
    const [prevPath, setPrevPath] = useState('');
    const [filter, setFilter] = useState('');
    
    const refInput = useRef(null);

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
            let slug = utils.pathToSlug(location.pathname);
            let url = appConfig.backendURL('/search_companies?q=' + slug);
            fetch(url)
                .then(res => res.json())
                .then(res => setData(res))
            
            setPrevPath(location.pathname);
        }
    }, [location, data, prevPath, filter]);
    
    let command = utils.pathToCommand(location.pathname);
    let title = <h2 className="SectionTitle"><span className="SectionTitleSelected">Search Results</span></h2>

    return (
        <div className="SearchPage">
            <div className="TileListHeader">
                {title}
                <div className="TileListSearch">
                    <span className="TileListTitle">Filter </span>
                    <input ref={refInput} type="text" onChange={onFilter} />
                </div>
            </div>
    
            <CompaniesAndGamesList data={data} filter={filter} />
        </div>
    );
};

export default SearchPage;