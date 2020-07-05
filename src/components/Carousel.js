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
import ClipsCarousel from './ClipsCarousel';

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
                    <ClipsCarousel className="ClipsCarousel"/>
                </Route>
                <Route path="/search">
                    <SearchPage />
                    <ClipsCarousel className="ClipsCarousel"/>
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
                    <ClipsCarousel className="ClipsCarousel"/>
                </Route>
                <Route path="/topstreamers">
                    <TopStreamersPage />
                    <ClipsCarousel className="ClipsCarousel"/>
                </Route>
            </Switch>
        </div>
    );
};

export default Carousel;