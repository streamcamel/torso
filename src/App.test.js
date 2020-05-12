import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom'
import { createMemoryHistory} from 'history'
import { screen } from '@testing-library/dom'
import App from './App';

test('App component: Creation', () => {
    const history = createMemoryHistory()

    const { getByTitle } = render(
        <Router history={history}>
            <App />
        </Router>
    );

    expect(getByTitle('PageHeader')).toBeTruthy();
    expect(getByTitle('MainToolbar')).toBeTruthy();
    expect(getByTitle('Carousel')).toBeTruthy();
    expect(getByTitle('PageFooter')).toBeTruthy();
});
