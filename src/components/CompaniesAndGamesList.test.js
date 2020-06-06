import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import CompaniesAndGamesList from './CompaniesAndGamesList';

// Mock data ... 2 companies and 2 games
const data = [
    {
        "alpha_channel": 1,
        "height": 326,
        "id": 41,
        "image_id": "cl2fe",
        "name": "Riot Games",
        "slug": "riot-games",
        "stock_ticker": null,
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "url": "//images.igdb.com/igdb/image/upload/t_thumb/cl2fe.jpg",
        "viewer_count_average": 260030,
        "viewer_count_peak": 0,
        "width": 1024
    },
    {
        "alpha_channel": 1,
        "height": 358,
        "id": 139,
        "image_id": "aqtxrprtkcftl7m8yn0t",
        "name": "Take-Two Interactive",
        "slug": "take-two-interactive",
        "stock_ticker": "TTWO",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "url": "//images.igdb.com/igdb/image/upload/t_thumb/aqtxrprtkcftl7m8yn0t.jpg",
        "viewer_count_average": 154527,
        "viewer_count_peak": 0,
        "width": 500
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-{width}x{height}.jpg",
        "game_id": 509658,
        "name": "Just Chatting",
        "slug": null,
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 251017
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-{width}x{height}.jpg",
        "game_id": 21779,
        "name": "League of Legends",
        "slug": "league-of-legends",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 178437
    }];



test('renders a mix of games and companies', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
            <CompaniesAndGamesList data={data} />
        </Router>
    );

    // Expect NOT to have a Load More Button, because we have only 4 elements
    expect(screen.queryByText('Load More')).toBeFalsy();

    // Expect to find companies
    expect(screen.getByText('Riot Games')).toBeTruthy();
    expect(screen.getByText('Take-Two Interactive')).toBeTruthy();

    // Expect to find games
    expect(screen.getByText('Just Chatting')).toBeTruthy();
    expect(screen.getByText('League of Legends')).toBeTruthy();

    // Tile Viewers
    expect(screen.getByText('260,030')).toBeTruthy();
    expect(screen.getByText('154,527')).toBeTruthy();
    expect(screen.getByText('251,017')).toBeTruthy();
    expect(screen.getByText('178,437')).toBeTruthy();
});



const dataLarge = [
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-{width}x{height}.jpg",
        "game_id": 509658,
        "name": "Just Chatting",
        "slug": null,
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 251017
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-{width}x{height}.jpg",
        "game_id": 21779,
        "name": "League of Legends",
        "slug": "league-of-legends",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 178437
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Grand%20Theft%20Auto%20V-{width}x{height}.jpg",
        "game_id": 32982,
        "name": "Grand Theft Auto V",
        "slug": "grand-theft-auto-v",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 145383
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Fortnite-{width}x{height}.jpg",
        "game_id": 33214,
        "name": "Fortnite",
        "slug": "fortnite",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 135247
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/./Call%20of%20Duty:%20Modern%20Warfare-{width}x{height}.jpg",
        "game_id": 512710,
        "name": "Call of Duty: Modern Warfare",
        "slug": "call-of-duty-modern-warfare",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 100459
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/./Counter-Strike:%20Global%20Offensive-{width}x{height}.jpg",
        "game_id": 32399,
        "name": "Counter-Strike: Global Offensive",
        "slug": "counter-strike-global-offensive--1",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 98441
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/VALORANT-{width}x{height}.jpg",
        "game_id": 516575,
        "name": "VALORANT",
        "slug": "valorant",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 61252
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Dota%202-{width}x{height}.jpg",
        "game_id": 29595,
        "name": "Dota 2",
        "slug": "dota-2",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 59964
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/FIFA%2020-{width}x{height}.jpg",
        "game_id": 512804,
        "name": "FIFA 20",
        "slug": "fifa-20",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 49698
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/World%20of%20Warcraft-{width}x{height}.jpg",
        "game_id": 18122,
        "name": "World of Warcraft",
        "slug": "world-of-warcraft",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 47521
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Minecraft-{width}x{height}.jpg",
        "game_id": 27471,
        "name": "Minecraft",
        "slug": "minecraft",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 47144
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Escape%20From%20Tarkov-{width}x{height}.jpg",
        "game_id": 491931,
        "name": "Escape From Tarkov",
        "slug": "escape-from-tarkov",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 43750
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Apex%20Legends-{width}x{height}.jpg",
        "game_id": 511224,
        "name": "Apex Legends",
        "slug": "apex-legends",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 38897
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Music%20&%20Performing%20Arts-{width}x{height}.jpg",
        "game_id": 26936,
        "name": "Music & Performing Arts",
        "slug": null,
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 27989
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Hearthstone-{width}x{height}.jpg",
        "game_id": 138585,
        "name": "Hearthstone",
        "slug": "hearthstone",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 25175
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Overwatch-{width}x{height}.jpg",
        "game_id": 488552,
        "name": "Overwatch",
        "slug": "overwatch",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 23418
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Dead%20by%20Daylight-{width}x{height}.jpg",
        "game_id": 491487,
        "name": "Dead by Daylight",
        "slug": "dead-by-daylight--1",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 22692
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Chess-{width}x{height}.jpg",
        "game_id": 743,
        "name": "Chess",
        "slug": "chess-plus",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 18611
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Sea%20of%20Thieves-{width}x{height}.jpg",
        "game_id": 490377,
        "name": "Sea of Thieves",
        "slug": "sea-of-thieves",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 17811
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/PLAYERUNKNOWN%27S%20BATTLEGROUNDS-{width}x{height}.jpg",
        "game_id": 493057,
        "name": "PLAYERUNKNOWN'S BATTLEGROUNDS",
        "slug": "playerunknowns-battlegrounds",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 17466
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Slots-{width}x{height}.jpg",
        "game_id": 498566,
        "name": "Slots",
        "slug": "slots",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 16158
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Teamfight%20Tactics-{width}x{height}.jpg",
        "game_id": 513143,
        "name": "Teamfight Tactics",
        "slug": "teamfight-tactics",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 15817
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Talk%20Shows%20&%20Podcasts-{width}x{height}.jpg",
        "game_id": 417752,
        "name": "Talk Shows & Podcasts",
        "slug": null,
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 14560
    },
    {
        "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/./Tom%20Clancy%27s%20Rainbow%20Six:%20Siege-{width}x{height}.jpg",
        "game_id": 460630,
        "name": "Tom Clancy's Rainbow Six: Siege",
        "slug": "tom-clancy-s-rainbow-six-siege--1",
        "stream_count_average": 0,
        "stream_count_peak": 0,
        "viewer_count_peak": 0,
        "viewers": 13749
    },
]


test('renders a limited amount of tiles ( 18 ) with a load more button', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
            <CompaniesAndGamesList data={dataLarge} />
        </Router>
    );

    expect(screen.getByText('Load More')).toBeTruthy();
    expect(screen.getAllByRole('img').length).toBe(36); // Game images and Viewers icon 18x2
});

test('renders more element once load more button is pressed', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
            <CompaniesAndGamesList data={dataLarge} />
        </Router>
    );

    expect(screen.getAllByRole('img').length).toBe(36); // Game images and Viewers icon 18x2

    userEvent.click(screen.getByText('Load More'));

    expect(screen.queryByText('Load More')).toBeFalsy();
    expect(screen.getAllByRole('img').length).toBe(48); // Game images and Viewers icon 24x2
});
