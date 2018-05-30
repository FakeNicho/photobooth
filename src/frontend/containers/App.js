/* @flow */
import React from 'react';
import Navbar from './../components/Navbar';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import Entries from './Entries';
import {ConnectedRouter} from 'connected-react-router';
import Scroll from './Scroll';
import {hot} from 'react-hot-loader';

export type Props = {
  store: Object,
  history: Object,
};

class App extends React.Component<Props> {
  render() {
    const {store, history} = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Scroll>
            <div>
              <Switch>
                <Route path="/">
                  <div>
                    <Navbar />
                    <Route path="/page/:page" component={Entries} />
                  </div>
                </Route>
              </Switch>
            </div>
          </Scroll>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default hot(module)(App);
