import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import PageHeader from './PageHeader';

test('PageHeader component: Creation', () => {
    const history = createMemoryHistory()
    
    const { container, getByText, getByAltText } = render(
        <Router history={history}>
            <PageHeader />
        </Router>
    );

    // We have the logo? 
    const logo = getByAltText('logo');
    expect(logo.classList.contains('PageHeaderLogo')).toBeTruthy()

    // We have the Title
    expect(getByText(/Stream Camel/)).toBeTruthy();
});


test('PageHeader component: Return home when clicking on container', () => {
    const history = createMemoryHistory()
    history.push('/company/activision');
    
    const { getByTitle } = render(
            <Router history={history}>
            <PageHeader />
        </Router>
    );

    expect(history.location.pathname).toEqual('/company/activision');

    // Navigate home
    fireEvent.click(getByTitle('PageHeader'));

    expect(history.location.pathname).toEqual('/');
});
