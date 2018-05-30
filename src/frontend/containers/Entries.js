/* @flow */
import React from 'react';
import {connect} from 'react-redux';

export class Entries extends React.Component {
  render() {
    const {entries} = this.props;
    return (
      <div className="entry__list">
        {entries.map(entry => (
          <div key={entry} className="entry__item">
            <a href={entry}>
              <img src={entry} />
            </a>
            <div style={{color: 'white'}}>{entry.substring(entry.lastIndexOf('/') + 1)}</div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entries: state.entries.entries,
});

export default connect(mapStateToProps)(Entries);
