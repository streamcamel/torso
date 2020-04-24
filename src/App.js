import React , { useState, useEffect } from 'react';
import ReactGA from 'react-ga';

import './App.css';

import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';
import Carousel from './components/Carousel';
import MainToolbar from './components/MainToolbar';
import Privacy from './components/Privacy';
import { useLocation, useHistory, } from "react-router-dom";

import * as appConfig from './config'

ReactGA.initialize(appConfig.trackingId);


// Valid Routes
//    /
//    /search/companySlug
//    /company/companySlug
//    /game/gameSlug
//    /privacy

const App = () => {
    let location = useLocation();
    let history = useHistory();

    useEffect(() => {
        console.log('Sending GA analytics : ' + location.pathname);        
        ReactGA.set({page: location.pathname});
        ReactGA.pageview(location.pathname); // Record a pageview for the given page

    }, [location]);

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
                    <Carousel className="Carousel" />
                </div>
            </div>
            <PageFooter />
            <Privacy />
        </div>

    );
};

export default App;
