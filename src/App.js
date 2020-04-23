import React , { useState, useEffect } from 'react';

import './App.css';

import Companies from './components/Companies';
import MainToolbar from './components/MainToolbar';
import { PageHeader, PageFooter } from './components/StaticCompnents';


import {
    BrowserRouter as Router,
    Switch,
    useLocation,
    useHistory, 
} from "react-router-dom";
  

// Valid Routes
//    /
//    /search/companySlug
//    /company/companySlug
//    /game/gameSlug
//    /privacy


const App = () => {
    let location = useLocation();
    let history = useHistory();

    const onGoHome = () => {
        history.push('/');
    };
    
    const onSearch = (keyword) => {
        history.push('/search/' + keyword);
    };

    return (
        <div className="App">
            <PageHeader title="Stream Camel" onGoHome={onGoHome}/>
            <MainToolbar parentOnSearch={onSearch} />
            <div className="MainBodyWrapper">
                <div className="MainBody">
                    <Companies className="Companies" />
                </div>
            </div>
            <PageFooter />
        </div>
    );
};

export default App;
