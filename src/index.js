import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Universes from './components/Universes';
import Uof from './components/Uof';
import './index.css';
import { Router, Route, IndexRedirect, browserHistory  } from 'react-router'

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="uof" component={Universes}/>
      <Route path="uof/:objmap" component={Uof}/>
      <Route path="uof/:objmap/*" component={Uof}/>
      <IndexRedirect to="uof" />
    </Route>
  </Router>
)

ReactDOM.render(
  routes,
  document.getElementById('root')
);
