import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import Page from './components/Page';
import Dashboard from './components/dashboard/Dashboard';
import Nougat from './components/android/Nougat';
import Iphone from './components/ios/Iphone';

const routes =
    <Route path={'/'} components={Page}>
        <IndexRedirect to="/app/dashboard/index" />
        <Route path={'app'} component={App}>
            <Route path={'android'}>
                <Route path={'nougat'} component={Nougat} />
            </Route>
            <Route path={'ios'}>
                <Route path={'iphone'} component={Iphone} />
            </Route>
            <Route path={'dashboard/index'} component={Dashboard} />
        </Route>
    </Route>;

ReactDOM.render(
  <Router history={hashHistory}>
      {routes}
  </Router>,
  document.getElementById('root')
);
