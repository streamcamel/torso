import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

jest.mock('react-chartjs-2', () => ({
    Line: () => null,
    Chart: {
        pluginService: {
            register: () => null
        }
    }
}))


import Carousel from './Carousel';


test('creates default page with root url path', async () => {

    fetch.mockResponse(JSON.stringify([]));

    const history = createMemoryHistory()
    history.push('/')

    await act( async () => {
        render(
            <Router history={history}>
                <Carousel />
            </Router>
        );
    });

    expect(fetch).toHaveBeenCalledTimes(3); // Charts and Top Games
    expect(fetch).toHaveBeenCalledWith('https://api.streamcamel.com/top_companies?limit=100&period=1d');
    expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/https:\/\/api\.streamcamel\.com\/viewers\?after\=/));
    expect(fetch).toHaveBeenCalledWith('https://api.streamcamel.com/clips?limit=12');

    // MainChart
    expect(screen.getByText('Viewers')).toBeTruthy();
    expect(screen.getByText('7 Days')).toBeTruthy();
    
    // Listings
    expect(screen.getByText('Top Companies')).toBeTruthy();
    expect(screen.getByText('Top Games')).toBeTruthy();
    expect(screen.getByText('Top Companies by Last Day Average Viewers')).toBeTruthy();

    // Page Title 
    expect(document.title).toBe('Viewers for Top Companies | StreamCamel');
});

test('creates search page', async () => {

    fetch.mockResponse(JSON.stringify([]));

    const history = createMemoryHistory()
    history.push('/search/soft')

    await act( async () => {
        render(
            <Router history={history}>
                <Carousel />
            </Router>
        );
    });

    expect(fetch).toHaveBeenCalledWith('https://api.streamcamel.com/search_companies?q=soft&limit=100');
    expect(fetch).toHaveBeenCalledWith('https://api.streamcamel.com/search_games?q=soft&limit=100');
        

    // MainChart
    expect(screen.getByText('Viewers')).toBeTruthy();
    expect(screen.getByText('7 Days')).toBeTruthy();
    
    // Listings
    expect(screen.getByText('Search Results')).toBeTruthy();
    expect(screen.getByText('Companies and Games Results by Average Viewers')).toBeTruthy();

    // Page Title 
    expect(document.title).toBe('Search Results for soft | StreamCamel');
});


test('creates a single company page', async () => {

    fetch.mockResponse(JSON.stringify([]));

    const history = createMemoryHistory()
    history.push('/company/riot-games')

    await act( async () => {
        render(
            <Router history={history}>
                <Carousel />
            </Router>
        );
    });

    expect(fetch).toHaveBeenCalledWith('https://api.streamcamel.com/games_stats?company=riot-games');
    expect(fetch).toHaveBeenCalledWith('https://api.streamcamel.com/companies/riot-games');        
});

test('creates a single game page', async () => {

    fetch.mockResponse(JSON.stringify([]));

    const history = createMemoryHistory()
    history.push('/game/league-of-legends')

    await act( async () => {
        render(
            <Router history={history}>
                <Carousel />
            </Router>
        );
    });

    expect(fetch).toHaveBeenCalledWith('https://api.streamcamel.com/games/league-of-legends');        
});

test('creates a topgames page', async () => {

    fetch.mockResponse(JSON.stringify([]));

    const history = createMemoryHistory()
    history.push('/topgames')

    await act( async () => {
        render(
            <Router history={history}>
                <Carousel />
            </Router>
        );
    });

    expect(fetch).toHaveBeenCalledWith('https://api.streamcamel.com/games_stats?limit=100&period=1d');  
});
