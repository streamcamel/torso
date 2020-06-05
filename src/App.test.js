import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom'
import { createMemoryHistory} from 'history'
import App from './App';

// Mock the chart drawing the SVG
jest.mock('react-chartjs-2', () => ({
    Line: () => null,
}))


test('App component: Creation', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
            <App />
        </Router>
    );

    expect(screen.getByText('Stream Camel')).toBeTruthy();

    expect(screen.getByText('Search')).toBeTruthy();

    expect(screen.getByText('Viewers')).toBeTruthy();
    expect(screen.getByText('8 Hours')).toBeTruthy();

    expect(screen.getByText('Top Companies')).toBeTruthy();
    expect(screen.getByText('Top Games')).toBeTruthy();
    expect(screen.getByText('Filter')).toBeTruthy();

    expect(screen.getByText('Stream Camel © 2020')).toBeTruthy();
    expect(screen.getByText('Privacy')).toBeTruthy();
    expect(screen.getByText('About Us')).toBeTruthy();
    expect(screen.getByText('Contact')).toBeTruthy();
});
