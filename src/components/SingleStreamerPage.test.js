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

test('SingleStreamerPage component: Creation', async () => {

    fetch.mockResponse(async (req) => {
        if(req.url.match(/\/users\//)) {
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

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith('https://api.streamcamel.com/users/summit1g');
    expect(fetch).toHaveBeenCalledWith('https://api.streamcamel.com/users/summit1g/clips?limit=12');
         
    // Title Name
    expect(screen.getByText('summit1g')).toBeTruthy();
    
    // Description
    expect(screen.getByText(/than you at shooting and puzzle games/i)).toBeTruthy();
    
    // Title Image
    expect(screen.getByAltText(/summit1g/i)).toHaveAttribute('src', 'https://static-cdn.jtvnw.net/jtv_user_pictures/200cea12142f2384-profile_image-300x300.png');

    // Page Title 
    expect(document.title).toBe('summit1g - Statistics and Charts | StreamCamel');
});
