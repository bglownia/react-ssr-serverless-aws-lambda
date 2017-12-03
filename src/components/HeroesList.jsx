import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import './HeroesList.less';

export default class HeroesList extends React.Component {

  componentDidMount() {
    this.fetchHeroesIfNeeded();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.origin !== this.props.origin) {
      this.fetchHeroesIfNeeded(nextProps);
    }
  }

  fetchHeroesIfNeeded(props = this.props) {
    props.fetchHeroesIfNeeded({ origin: props.origin });
  }

  render() {
    const { fetchingError, isFetching, data } = this.props;
    let content;
    if (fetchingError) {
      content = (
        <div>
          Error while fetching data,
          <button onClick={() => this.fetchHeroesIfNeeded()}>try again</button>.
        </div>
      );
    } else if (isFetching) {
      content = <div>Loading...</div>;
    } else {
      content = (
        <ul className="HeroesList__List">
          {data.map(hero => (
            <li key={hero.get('name')}>
              <span>{hero.get('name')}</span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div className="HeroesList">
        <header className="HeroesList__Header">{this.props.origin}</header>
        { content }
      </div>
    );
  }
}

HeroesList.defaultProps = {
  isFetching: true,
  data: null,
  fetchingError: null,
};

HeroesList.propTypes = {
  fetchHeroesIfNeeded: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  fetchingError: PropTypes.instanceOf(Error),
  data: PropTypes.instanceOf(List),
  origin: PropTypes.string.isRequired,
};

