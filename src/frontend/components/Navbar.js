/* @flow */
import React from 'react';
import {Link, matchPath, Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';

export type Props = {
  pathname: string,
  search: string,
};

class Navbar extends React.Component<Props> {
  getCurrentPage() {
    const match = matchPath(this.props.pathname, {
      path: '/page/:page',
      exact: true,
      strict: false,
    });
    return match ? Number(match.params.page) : 1;
  }

  render() {
    const {entries} = this.props;
    const rootMatch = matchPath(this.props.pathname, {
      path: '/',
      exact: true,
      strict: false,
    });
    const pageMatch = matchPath(this.props.pathname, {
      path: '/page/:page',
      exact: true,
      strict: false,
    });
    if (rootMatch || (pageMatch && (isNaN(pageMatch.params.page) || Number(pageMatch.params.page) < 1))) {
      return <Redirect to="/page/1" />;
    }

    return (
      <nav className="navbar navbar--phat">
        <ul>
          {entries.length > 0 && (
            <Route
              path="/page/:page"
              render={() => (
                <li>
                  <Link to={`/page/${this.getCurrentPage() + 1}${this.props.search}`}>Next</Link>
                </li>
              )}
            />
          )}
          {this.getCurrentPage() > 1 && (
            <Route
              path="/page/:page"
              render={() => (
                <li>
                  <Link to={`/page/${this.getCurrentPage() - 2}${this.props.search}`}>Previous</Link>
                </li>
              )}
            />
          )}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  totalCount: state.entries.totalCount,
  entries: state.entries.entries,
});

// $FlowIgnore
export default connect(mapStateToProps)(Navbar);
