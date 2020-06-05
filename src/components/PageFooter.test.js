import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import PageFooter from './PageFooter';

test('PageFooter component: Creation', () => {
    const history = createMemoryHistory()
    
    render(
        <Router history={history}>
            <PageFooter />
        </Router>
    );

    expect(screen.getByText(/Privacy/)).toBeTruthy();
    expect(screen.getByText(/Stream Camel © 2020/)).toBeTruthy();
    expect(screen.getByText(/Contact/)).toBeTruthy();
    expect(screen.getByText(/About Us/)).toBeTruthy();
    expect(screen.getByText(/Contact/).closest('a')).toHaveAttribute('href', 'mailto:contact@streamcamel.com');
});


test('PageFooter component: Clicking on Privacy', () => {
    const history = createMemoryHistory()
    
    render(
            <Router history={history}>
            <PageFooter />
        </Router>
    );

    fireEvent.click(screen.getByText(/Privacy/));
    expect(history.location.search).toEqual('?privacy=1');
});
