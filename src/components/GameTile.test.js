import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import GameTile from './GameTile';

// Mocking window.getSelection, because it doesn't exist in test env.
global.getSelection = () => '';

// Mocking data to pass as props
const data = [{
    'alpha_channel': 0,
    'animated': 0,
    'box_art_url': 'https://static-cdn.jtvnw.net/ttv-boxart/World%20of%20Warcraft-{width}x{height}.jpg',
    'game_id': 18122,
    'height': 241,
    'id': 29,
    'igdb_company_id': 51,
    'image_id': 'l9xwk37ap6xzjp4imoyh',
    'name': 'World of Warcraft',
    'slug': 'world-of-warcraft',
    'url': '//images.igdb.com/igdb/image/upload/t_thumb/l9xwk37ap6xzjp4imoyh.jpg',
    'viewers': 1234567,
    'width': 402
}];


test('GameTile component: Creation', () => {
    const history = createMemoryHistory()

    let agame = data[0];
    let key = 'gamekey'+agame.game_id;
    
    const { getByText, getByRole} = render(
        <Router history={history}>
            <GameTile key={key} game={agame}/>
        </Router>
    );

    // Tile Name
    expect(getByText('World of Warcraft')).toBeTruthy();
    
    // Tile Viewers
    expect(getByText('1,234,567 viewers')).toBeTruthy();
    
    // Tile Image
    let icon = getByRole('img');
    expect(icon.src).toEqual('https://static-cdn.jtvnw.net/ttv-boxart/World%20of%20Warcraft-90x120.jpg');
});


test('GameTile component: Click on tile', () => {
    const history = createMemoryHistory();
    history.push('/');

    let agame = data[0];
    let key = 'gamekey'+agame.game_id;
    
    const { getByAltText } = render(
        <Router history={history}>
            <GameTile key={key} game={agame}/>
        </Router>
    );

    //Click on the tile
    userEvent.click(screen.getByRole('img'));

    expect(history.location.pathname).toEqual('/game/world-of-warcraft');
});
