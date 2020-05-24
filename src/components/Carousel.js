import React from 'react';
import { Route, Switch } from "react-router-dom";

import CompaniesListPage from './CompaniesListPage'
import GamePage from './GamePage'
import MainChart from './MainChart'
import SingleCompanyPage from './SingleCompanyPage'
import TopGames from './TopGames'


const Carousel = () => {

    return (
        <div title="Carousel" className="Carousel">
            <MainChart />
            <Switch>
                <Route exact path="/">
                    <CompaniesListPage />
                </Route>
                <Route path="/search">
                    <CompaniesListPage />
                </Route>
                <Route path="/company">
                    <SingleCompanyPage />
                </Route>
                <Route path="/game">
                    <GamePage />
                </Route>
                <Route path="/topgames">
                    <TopGames />
                </Route>
            </Switch>
        </div>
    );
};

export default Carousel;