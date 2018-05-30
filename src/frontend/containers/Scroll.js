/* @flow */
/* global sessionStorage */
import React from 'react';
import {withRouter} from 'react-router-dom';

type Props = {
  location: Object,
  children: Object,
};

class Scroll extends React.Component<Props> {
  componentDidMount() {
    const {key} = this.props.location;
    const scrollPositionY = sessionStorage[`scrollPositionY_${key}`] || 0;
    setTimeout(() => {
      window.scrollTo(0, scrollPositionY);
    }, 100);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      const {key} = this.props.location;
      sessionStorage[`scrollPositionY_${key}`] = window.scrollY;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location && !this.props.location.pathname.startsWith('/context/')) {
      const {key} = this.props.location;
      const scrollPositionY = sessionStorage[`scrollPositionY_${key}`] || 0;
      setTimeout(() => {
        window.scrollTo(0, scrollPositionY);
      }, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

// $FlowIgnore
export default withRouter(Scroll);
