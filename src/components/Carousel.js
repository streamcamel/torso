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
import ClipsPage from './ClipsPage';

const Carousel = () => {

    document.title = 'Games and Companies Global Statistics | StreamCamel';

    return (
        <div className="Carousel">
            <Switch>
                <Route exact path="/">
                    <IntroText/>
                </Route>
            </Switch>
            <Switch>
                <Route exact path="/">
                    <MainChart />
                    <TopCompaniesPage />
                    <ClipsCarousel className="ClipsCarousel"/>
                </Route>
                <Route exact path="/clips">
                    <ClipsPage />
                </Route>
                <Route path="/search">
                    <MainChart />
                    <SearchPage />
                    <ClipsCarousel className="ClipsCarousel"/>
                </Route>
                <Route path="/company">
                    <MainChart />
                    <SingleCompanyPage />
                </Route>
                <Route path="/game">
                    <MainChart />
                    <SingleGamePage />
                </Route>
                <Route path="/streamer">
                    <MainChart forceRange="all" showChannels="false" streamer="true" showButtons="false"/>
                    <SingleStreamerPage />
                </Route>
                <Route path="/topgames">
                    <MainChart />
                    <TopGamesPage />
                    <ClipsCarousel className="ClipsCarousel"/>
                </Route>
                <Route path="/topstreamers">
                    <MainChart />
                    <TopStreamersPage />
                    <ClipsCarousel className="ClipsCarousel"/>
                </Route>
            </Switch>
        </div>
    );
};

export default Carousel;