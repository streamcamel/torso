import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import SingleStreamerPage from './SingleStreamerPage';

import { enableMocks } from 'jest-fetch-mock'
enableMocks()

// Mocking data to pass as props
const data = {
    "data" : [
        {   "broadcaster_type":"partner",
            "description":"I'm a variety streamer(kind of). Been streaming 8 years(another number to change every year).I'm 100% better than you at shooting and puzzle games.@summit1g via Twitter.",
            "display_name":"summit1g",
            "id":26490481,
            "login":"summit1g",
            "offline_image_url":"https://static-cdn.jtvnw.net/jtv_user_pictures/b1f1f1a6-6b89-475f-8831-cfb9f4a4073a-channel_offline_image-1920x1080.png",
            "profile_image_url":"https://static-cdn.jtvnw.net/jtv_user_pictures/200cea12142f2384-profile_image-300x300.png",
            "type":"",
            "view_count":381719376
        }
    ]
};

const dataStats = [{
    "broadcaster_type":"partner",
    "display_name":"summit1g",
    "id":26490481,
    "login":"summit1g",
    "offline_image_url":"https://static-cdn.jtvnw.net/jtv_user_pictures/b1f1f1a6-6b89-475f-8831-cfb9f4a4073a-channel_offline_image-1920x1080.png",
    "profile_image_url":"https://static-cdn.jtvnw.net/jtv_user_pictures/200cea12142f2384-profile_image-300x300.png",
    "rank":4,
    "type":"",
    "viewers":"381719376"
}];

const userStreams = {
	"data": [{
		"id": 39826846654,
		"start_time": "2020-09-23T21:30:00Z",
		"end_time": "2020-09-24T06:40:00Z",
		"peak_view_count": 21482,
		"average_view_count": 17377,
		"game_id": 509658,
		"game_name": "Just Chatting",
		"box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-{width}x{height}.jpg",
		"game_slug": null
	}, {
		"id": 39815211422,
		"start_time": "2020-09-22T22:30:00Z",
		"end_time": "2020-09-23T07:10:00Z",
		"peak_view_count": 22078,
		"average_view_count": 19042,
		"game_id": 509658,
		"game_name": "Just Chatting",
		"box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-{width}x{height}.jpg",
		"game_slug": null
	}, {
		"id": 39802871982,
		"start_time": "2020-09-21T22:10:00Z",
		"end_time": "2020-09-22T07:30:00Z",
		"peak_view_count": 26311,
		"average_view_count": 21410,
		"game_id": 509658,


		"game_name": "Just Chatting",
		"box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-{width}x{height}.jpg",
		"game_slug": null
	}, {
		"id": 39791322526,
		"start_time": "2020-09-20T22:00:00Z",
		"end_time": "2020-09-21T10:20:00Z",
		"peak_view_count": 27372,
		"average_view_count": 21181,
		"game_id": 509658,
		"game_name": "Just Chatting",
		"box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-{width}x{height}.jpg",
		"game_slug": null
	}, {
		"id": 39777492494,
		"start_time": "2020-09-19T22:40:00Z",
		"end_time": "2020-09-20T10:50:00Z",
		"peak_view_count": 27486,
		"average_view_count": 20337,
		"game_id": 509658,
		"game_name": "Just Chatting",
		"box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-{width}x{height}.jpg",
		"game_slug": null
	}, {
		"id": 39758608622,
		"start_time": "2020-09-18T21:30:00Z",
		"end_time": "2020-09-19T09:40:00Z",
		"peak_view_count": 28063,
		"average_view_count": 17147,
		"game_id": 263490,
		"game_name": "Rust",
		"box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Rust-{width}x{height}.jpg",
		"game_slug": "rust"
	}, {
		"id": 39739499406,
		"start_time": "2020-09-17T21:50:00Z",
		"end_time": "2020-09-18T07:00:00Z",
		"peak_view_count": 27301,
		"average_view_count": 18377,
		"game_id": 263490,
		"game_name": "Rust",
		"box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Rust-{width}x{height}.jpg",
		"game_slug": "rust"
	}, {
		"id": 39722350990,
		"start_time": "2020-09-16T22:30:00Z",
		"end_time": "2020-09-17T07:30:00Z",
		"peak_view_count": 25865,
		"average_view_count": 17289,
		"game_id": 498859,
		"game_name": "Mordhau",
		"box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Mordhau-{width}x{height}.jpg",
		"game_slug": "mordhau"
	}, {
		"id": 39704635246,
		"start_time": "2020-09-15T22:50:00Z",
		"end_time": "2020-09-16T09:10:00Z",
		"peak_view_count": 23808,
		"average_view_count": 14889,
		"game_id": 383341,
		"game_name": "Miscreated",
		"box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Miscreated-{width}x{height}.jpg",
		"game_slug": "miscreated"
	}, {
		"id": 39671820414,
		"start_time": "2020-09-13T22:00:00Z",
		"end_time": "2020-09-14T07:50:00Z",
		"peak_view_count": 22639,
		"average_view_count": 18611,
		"game_id": 383341,
		"game_name": "Miscreated",
		"box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Miscreated-{width}x{height}.jpg",
		"game_slug": "miscreated"
	}, {
		"id": 39659374494,
		"start_time": "2020-09-12T23:10:00Z",
		"end_time": "2020-09-13T09:00:00Z",
		"peak_view_count": 22820,
		"average_view_count": 19278,
		"game_id": 383341,
		"game_name": "Miscreated",
		"box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/Miscreated-{width}x{height}.jpg",
		"game_slug": "miscreated"
	}, {
		"id": 39644430942,
		"start_time": "2020-09-11T22:30:00Z",
		"end_time": "2020-09-12T08:30:00Z",
		"peak_view_count": 27327,
		"average_view_count": 21274,
		"game_id": 65632,
		"game_name": "DayZ",
		"box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/DayZ-{width}x{height}.jpg",
		"game_slug": "dayz"
	}, {
		"id": 39631988942,
		"start_time": "2020-09-10T22:10:00Z",
		"end_time": "2020-09-11T10:40:00Z",
		"peak_view_count": 27026,
		"average_view_count": 19079,
		"game_id": 65632,
		"game_name": "DayZ",
		"box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/DayZ-{width}x{height}.jpg",
		"game_slug": "dayz"
	}, {
		"id": 39619634094,
		"start_time": "2020-09-09T21:40:00Z",
		"end_time": "2020-09-10T07:40:00Z",
		"peak_view_count": 29685,
		"average_view_count": 22431,
		"game_id": 65632,
		"game_name": "DayZ",
		"box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/DayZ-{width}x{height}.jpg",
		"game_slug": "dayz"
	}, {
		"id": 39607128526,
		"start_time": "2020-09-08T21:10:00Z",
		"end_time": "2020-09-09T06:50:00Z",
		"peak_view_count": 31376,
		"average_view_count": 25746,
		"game_id": 65632,
		"game_name": "DayZ",
		"box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/DayZ-{width}x{height}.jpg",
		"game_slug": "dayz"
	}],
	"pagination": {
		"cursor": "2020-09-08 21:10:00 +0000 UTC"
	},
	"In": {
		"Cursor": "",
		"Login": "summit1g",
		"Limit": 15
	}
};

test('SingleStreamerPage component: Creation', async () => {

    fetch.mockResponse(async (req) => {
        if(req.url.match(/\/users\/.+\/streams/)) {
            return JSON.stringify(userStreams);
        } else if(req.url.match(/\/users\//)) {
            return JSON.stringify(data);
        } else if (req.url.match(/users_stats/)) {
            return JSON.stringify(dataStats);
        }
    }); 

    const history = createMemoryHistory()
    history.push('/streamer/summit1g')

    await act( async () => {
        render(
            <Router history={history}>
                <SingleStreamerPage />
            </Router>
        );
    });

    expect(fetch).toHaveBeenCalledTimes(3);
    expect(fetch).toHaveBeenCalledWith('https://api.streamcamel.com/users/summit1g');
    expect(fetch).toHaveBeenCalledWith('https://api.streamcamel.com/users/summit1g/clips?limit=12');
    expect(fetch).toHaveBeenCalledWith('https://api.streamcamel.com/users/summit1g/streams?limit=15');
         
    // Title Name
    expect(screen.getByText('summit1g')).toBeTruthy();
    
    // Description
    expect(screen.getByText(/than you at shooting and puzzle games/i)).toBeTruthy();
    
    // Title Image
    expect(screen.getByAltText(/summit1g/i)).toHaveAttribute('src', 'https://static-cdn.jtvnw.net/jtv_user_pictures/200cea12142f2384-profile_image-300x300.png');

    // Page Title 
    expect(document.title).toBe('summit1g - Statistics and Charts | StreamCamel');
});
