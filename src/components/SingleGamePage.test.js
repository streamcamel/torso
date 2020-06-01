import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import SingleGamePage from './SingleGamePage';

import fetch from 'node-fetch';
global.fetch = fetch;

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



test('SingleGamePage component: Creation', () => {


    // const history = createMemoryHistory()
    // history.push('/game/fortnite')

    // act(() => {
    // const { getByText, getByRole} = render(
    //     <Router history={history}>
    //         <SingleGamePage />
    //     </Router>
    // );

    // // expect(global.fetch).toHaveBeenCalledTimes(1);
    // // expect(global.fetch).toHaveBeenCalledWith('https://url-of-your-server.com/example/json');
    

    // // // Game Name
    // expect(getByText('Fortnite')).toBeTruthy();
    
    // // Game Description
    // expect(getByText("Fortnite is the living, action building game from the developer formerly known as Epic MegaGames. You and your friends will lead a group of Heroes to reclaim and rebuild a homeland that has been left empty by mysterious darkness only known as \"the Storm\". \n \nBand together online to build extravagant forts, find or build insane weapons and traps and protect your towns from the strange monsters that emerge during the Storm. In an action experience from the only company smart enough to attach chainsaws to guns, get out there to push back the Storm and save the world. And don't forget to loot all the things.")).toBeTruthy();
    
    // // Tile Image
    // let icon = getByRole('img');
    // expect(icon.src).toEqual('https://static-cdn.jtvnw.net/ttv-boxart/Fortnite-300x400.jpg');
    // })

        
        
    });
