import '../sass/master.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import App from './containers/App';
import {AppContainer} from 'react-hot-loader';
import {INIT} from './constants/ActionTypes';
import history from './utils/history';

const store = configureStore(undefined, history);
store.dispatch({type: INIT, payload: {location: history.location}});

ReactDOM.render(<App store={store} history={history} />, document.getElementById('app'));
