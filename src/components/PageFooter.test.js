import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import PageFooter from './PageFooter';

test('PageFooter component: Creation', () => {
    const history = createMemoryHistory()
    
    const { getByText } = render(
        <Router history={history}>
            <PageFooter />
        </Router>
    );

    expect(getByText(/Privacy/)).toBeTruthy();
    expect(getByText(/Stream Camel © 2020/)).toBeTruthy();
    expect(getByText(/Contact/)).toBeTruthy();
    expect(getByText(/About Us/)).toBeTruthy();
    expect(getByText(/Contact/).closest('a')).toHaveAttribute('href', 'mailto:contact@streamcamel.com');
});


test('PageFooter component: Clicking on Privacy', () => {
    const history = createMemoryHistory()
    
    const { getByText } = render(
            <Router history={history}>
            <PageFooter />
        </Router>
    );

    fireEvent.click(getByText(/Privacy/));
    expect(history.location.search).toEqual('?privacy=1');
});
