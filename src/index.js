import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from "react-router-dom";
import Modal from 'react-modal';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import {
  BrowserRouter as Router,
} from "react-router-dom";


Modal.setAppElement('#root')

const reload = () => window.location.reload();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/press/index.php" render={reload} />
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
