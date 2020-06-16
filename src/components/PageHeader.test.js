import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import PageHeader from './PageHeader';

test('PageHeader component: Creation', () => {
    const history = createMemoryHistory()
    
    render(
        <Router history={history}>
            <PageHeader />
        </Router>
    );

    // We have the logo? 
    expect(screen.getByAltText('logo')).toBeTruthy()

    // We have the Title
    expect(screen.getByText(/Stream Camel/)).toBeTruthy();
});


test('PageHeader component: Return home when clicking on container', () => {
    const history = createMemoryHistory()
    history.push('/company/activision');
    
    render(
        <Router history={history}>
            <PageHeader />
        </Router>
    );

    expect(history.location.pathname).toEqual('/company/activision');

    // Navigate home
    fireEvent.click(screen.getByText(/Stream Camel/));

    expect(history.location.pathname).toEqual('/');
});
