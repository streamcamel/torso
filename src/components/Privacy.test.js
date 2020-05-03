import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { screen } from '@testing-library/react'

import Privacy from './Privacy';

test('Privacy component: Creation - Hidden', () => {
    const history = createMemoryHistory()
    
    const { queryByText } = render(
        <Router history={history}>
            <Privacy />
        </Router>
    );

    // By default, the page should be hidden
    expect(queryByText('Notice and Choice')).toBeFalsy()
    expect(queryByText('Contact Us')).toBeFalsy()
    expect(queryByText('email us')).toBeFalsy()
});


test('Privacy component: Creation - Showing', () => {
    const history = createMemoryHistory()
    history.push('/?privacy=1')
    
    const { queryByText } = render(
        <Router history={history}>
            <Privacy />
        </Router>
    );

    // looking for many element to show
    expect(queryByText('Notice and Choice')).toBeTruthy()
    expect(queryByText('Contact Us')).toBeTruthy()
    expect(queryByText('email us').closest('a')).toHaveAttribute('href', 'mailto://contact@streamcamel.com')
});


test('Privacy component: Creation - Showing then click to hide', () => {
    const history = createMemoryHistory()
    history.push('/?privacy=1')
    
    const { queryByText, getByTitle } = render(
        <Router history={history}>
            <Privacy />
        </Router>
    );

    fireEvent.click(getByTitle('X'));


    // all elements should be hidded again
    expect(queryByText('Notice and Choice')).toBeFalsy()
    expect(queryByText('Contact Us')).toBeFalsy()
    expect(queryByText('email us')).toBeFalsy()
});
