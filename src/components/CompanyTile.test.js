import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import CompanyTile from './CompanyTile';

// Mocking window.getSelection, because it doesn't exist in test env.
global.getSelection = () => '';

// Mocking data to pass as props
const data = [{
    'alpha_channel': 1,
    'height': 326,
    'id': 41,
    'image_id': 'cl2fe',
    'name': 'Riot Games',
    'slug': 'riot-games',
    'stock_ticker': null,
    'stream_count_average': 0,
    'stream_count_peak': 0,
    'url': '//images.igdb.com/igdb/image/upload/t_thumb/cl2fe.jpg',
    'viewer_count_average': 7654321,
    'viewer_count_peak': 0,
    'width': 1024
}];


test('CompanyTile component: Creation', () => {
    const history = createMemoryHistory()

    let acompany = data[0];
    let key = 'companykey'+acompany.id

    render(
        <Router history={history}>
            <CompanyTile key={key} company={acompany}/>
        </Router>
    );

    // Tile Name
    expect(screen.getByText('Riot Games')).toBeTruthy();
    
    // Tile Viewers
    expect(screen.getByText('7,654,321')).toBeTruthy();
    expect(screen.getByAltText('viewers')).toBeTruthy();
    
    // Tile Image
    expect(screen.getByAltText(/riot/i)).toHaveAttribute('src', 'https://images.igdb.com/igdb/image/upload/t_logo_med/cl2fe.png');
});


test('CompanyTile component: Click on tile', () => {
    const history = createMemoryHistory();
    history.push('/');

    let acompany = data[0];
    let key = 'companykey'+acompany.id
    
    render(
        <Router history={history}>
            <CompanyTile key={key} company={acompany}/>
        </Router>
    );

    //Click on the tile
    userEvent.click(screen.getByAltText(/riot/i));

    expect(history.location.pathname).toEqual('/company/riot-games');
});
