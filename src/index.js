import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Universes from './components/Universes';
import Universe from './components/Universe';
import Uof from './components/Uof';
import './index.css';
import { Router, Route, IndexRedirect, browserHistory  } from 'react-router'

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="universe" component={Universes}/>
      <Route path="universe/:universeId" component={Universe}/>
      <Route path="uof" component={Uof}/>
      <Route path="uof/:objmap" component={Uof}/>
      <Route path="uof/:objmap/*" component={Uof}/>
      <IndexRedirect to="universe" />
    </Route>
  </Router>
)

ReactDOM.render(
  routes,
  document.getElementById('root')
);
