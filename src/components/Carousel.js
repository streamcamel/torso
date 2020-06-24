import React from 'react';
import { Route, Switch } from "react-router-dom";

import MainChart from './MainChart'
import IntroText from './IntroText'
import SearchPage from './SearchPage'
import SingleCompanyPage from './SingleCompanyPage'
import SingleGamePage from './SingleGamePage'
import SingleStreamerPage from './SingleStreamerPage'
import TopCompaniesPage from './TopCompaniesPage'
import TopGamesPage from './TopGamesPage'
import TopStreamersPage from './TopStreamersPage'

const Carousel = () => {

    document.title = 'Games and Companies Global Statistics | StreamCamel';

    return (
        <div className="Carousel">
            <Switch>
                <Route exact path="/">
                    <IntroText/>
                </Route>
            </Switch>
            <MainChart />
            <Switch>
                <Route exact path="/">
                    <TopCompaniesPage />
                </Route>
                <Route path="/search">
                    <SearchPage />
                </Route>
                <Route path="/company">
                    <SingleCompanyPage />
                </Route>
                <Route path="/game">
                    <SingleGamePage />
                </Route>
                <Route path="/streamer">
                    <SingleStreamerPage />
                </Route>
                <Route path="/topgames">
                    <TopGamesPage />
                </Route>
                <Route path="/topstreamers">
                    <TopStreamersPage />
                </Route>
            </Switch>
        </div>
    );
};

export default Carousel;