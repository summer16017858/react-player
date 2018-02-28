'use strict'
import React,{Component,cloneElement,Children} from 'react';
import {render} from 'react-dom';
import {EventEmitter} from 'fbemitter';
import Player from './pages/player/player';
import MusicList from './pages/list/list';
import Index from './index';

import createBrowserHistory from 'history/createBrowserHistory'
import {HashRouter as Router, Route,IndexRoute, Link,Switch} from 'react-router-dom'

window.contentEmitter = new EventEmitter();
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import { Provider } from "react-redux";
import rootReducer from "../reducer/index";

let history = createBrowserHistory()
let s ={
	spacing: {
		marginTop: '40px'
	}
}

var loggerMiddleware = createLogger();

//创建携带所传入中间件的store
var createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore);

var store = createStoreWithMiddleware(rootReducer);


render(
  <Router history={history}>
    <Provider store = { store }>
        {/* <Switch> */}
        <div>
          <Index/>
          <Switch>
            <Route path="/player" component={Player}/>
            <Route path="/list"  component={MusicList}/>
          </Switch>
        </div>
        {/* </Switch> */}
    </Provider>
   </Router>
  , document.getElementById('my-box')
);
