import React , { useEffect } from 'react';
import { useLocation, useHistory, } from "react-router-dom";
import ReactGA from 'react-ga';

import './App.css';

import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';
import Carousel from './components/Carousel';
import MainToolbar from './components/MainToolbar';
import Privacy from './components/Privacy';

import * as appConfig from './config'

ReactGA.initialize(appConfig.trackingId);


// Valid Routes
//    /
//    /search/companySlug
//    /company/companySlug
//    /game/gameSlug

const App = () => {
    let location = useLocation();
    let history = useHistory();

    useEffect(() => {
        ReactGA.set({page: location.pathname});
        ReactGA.pageview(location.pathname); // Record a pageview for the given page
    }, [location]);
    
    const onSearch = (keyword) => {
        history.push('/search/' + keyword);
    };

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
