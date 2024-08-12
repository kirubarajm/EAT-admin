import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, history} from './store';
//import { ConnectedRouter } from 'connected-react-router';
import './index.css';
import App from './App';
import {BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import { initializeFirebase } from './push-notification';
import { initializedFirebaseApp } from './init-fcm';
  // "homepage": "http://www.eatalltime.co.in/admin",
  //"homepage": "http://www.eatalltime.in.s3-website.ap-south-1.amazonaws.com/",
  //"homepage": "https://eatalltime.global/eatadmin/",
ReactDOM.render((
  <Provider store={store}>
  {/* <Router history={history} basename="/"> */}
  <Router history={history} basename="/eatadmin">
  <Switch>
    <Route path="/" component={App} />
  </Switch>
  </Router>
    {/* <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter> */}
  </Provider>

), document.getElementById('root'));
//initializeFirebase();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
