import React from 'react';
import { Route, Switch } from "react-router-dom";

import MainChart from './MainChart'
import SearchPage from './SearchPage'
import SingleCompanyPage from './SingleCompanyPage'
import SingleGamePage from './SingleGamePage'
import TopCompaniesPage from './TopCompaniesPage'
import TopGames from './TopGames'

const Carousel = () => {

    return (
        <div title="Carousel" className="Carousel">
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
                <Route path="/topgames">
                    <TopGames />
                </Route>
            </Switch>
        </div>
    );
};

export default Carousel;