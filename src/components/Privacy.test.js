import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Privacy from './Privacy';

test('Privacy component: Creation - Hidden', () => {
    const history = createMemoryHistory()
    
    render(
        <Router history={history}>
            <Privacy />
        </Router>
    );

    // By default, the page should be hidden
    expect(screen.queryByText('Notice and Choice')).toBeFalsy()
    expect(screen.queryByText('Contact Us')).toBeFalsy()
    expect(screen.queryByText('email us')).toBeFalsy()
});


test('Privacy component: Creation - Showing', () => {
    const history = createMemoryHistory()
    history.push('/?privacy=1')
    
    render(
        <Router history={history}>
            <Privacy />
        </Router>
    );

    // looking for many element to show
    expect(screen.getByText('Notice and Choice')).toBeTruthy()
    expect(screen.getByText('Contact Us')).toBeTruthy()
    expect(screen.getByText('email us').closest('a')).toHaveAttribute('href', 'mailto:contact@streamcamel.com')
});


test('Privacy component: Creation - Showing then click to hide', () => {
    const history = createMemoryHistory()
    history.push('/?privacy=1')
    
    render(
        <Router history={history}>
            <Privacy />
        </Router>
    );

    fireEvent.click(screen.getByTitle('X'));


    // all elements should be hidded again
    expect(screen.queryByText('Notice and Choice')).toBeFalsy()
    expect(screen.queryByText('Contact Us')).toBeFalsy()
    expect(screen.queryByText('email us')).toBeFalsy()
});
