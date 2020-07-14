import React , { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import ReactGA from 'react-ga';

import './App.css';

import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';
import Carousel from './components/Carousel';
import MainToolbar from './components/MainToolbar';
import Privacy from './components/Privacy';

import * as appConfig from './config'


function isReactInDevelomentMode() { 
    return '_self' in React.createElement('div');
}

function isLocalhost() {
    return (window.location.hostname === "localhost" 
            || window.location.hostname === "127.0.0.1"
            || window.location.hostname.search('cloud9')!==-1);
}

if( (isReactInDevelomentMode() === false) && (isLocalhost() === false)) {
    ReactGA.initialize(appConfig.trackingId, { testMode: process.env.NODE_ENV === 'test'});
}

const App = () => {
    let location = useLocation();

    useEffect(() => {
        if( (isReactInDevelomentMode() === false) && (isLocalhost() === false)) {
            ReactGA.set({page: location.pathname});
            ReactGA.pageview(location.pathname); // Record a pageview for the given page
        }
    }, [location]);
    
    return (
        <div className="App">
            <div className="PageFixedTop">
                <PageHeader />
                <MainToolbar />
            </div>
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
