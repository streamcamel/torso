import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import SingleGamePage from './SingleGamePage';

import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

// Mocking data to pass as props
const data = [{
    "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Fortnite-{width}x{height}.jpg",
    "company_id": 7,
    "id": 33214,
    "igdb_game_id": 1905,
    "name": "Fortnite",
    "slug": "fortnite",
    "storyline": "Fortnite is the living, action building game from the developer formerly known as Epic MegaGames. You and your friends will lead a group of Heroes to reclaim and rebuild a homeland that has been left empty by mysterious darkness only known as \"the Storm\". \n \nBand together online to build extravagant forts, find or build insane weapons and traps and protect your towns from the strange monsters that emerge during the Storm. In an action experience from the only company smart enough to attach chainsaws to guns, get out there to push back the Storm and save the world. And don't forget to loot all the things.",
    "summary": ""
}];


test('SingleGamePage component: Creation', async () => {

    fetch.mockResponse(JSON.stringify(data));

    const history = createMemoryHistory()
    history.push('/game/fortnite')

    await act( async () => {
        render(
            <Router history={history}>
                <SingleGamePage />
            </Router>
        );
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://api.streamcamel.com/games/fortnite');
        

    // Game Name
    expect(screen.getByText('Fortnite')).toBeTruthy();
    
    // Game Description
    expect(screen.getByText(/Fortnite is the living/i)).toBeTruthy();
    expect(screen.getByText(/to loot all the things/i)).toBeTruthy();
    
    // Title Image
    expect(screen.getByAltText(/fortnite/i)).toHaveAttribute('src', 'https://static-cdn.jtvnw.net/ttv-boxart/Fortnite-300x400.jpg');
});
