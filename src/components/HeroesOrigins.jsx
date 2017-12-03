import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Link } from 'react-router-dom';

import './HeroesOrigins.less';

export default class HeroesOrigins extends React.Component {
  componentDidMount() {
    this.props.fetchHeroesOriginsIfNeeded();
  }

  render() {
    const { fetchingError, isFetching, data } = this.props;
    let content;
    if (fetchingError) {
      content = (
        <div>
          Error while fetching data,
          <button onClick={() => this.props.fetchHeroesOriginsIfNeeded()}>try again</button>.
        </div>
      );
    } else if (isFetching) {
      content = <div>Loading...</div>;
    } else {
      content = (
        <ul className="HeroesOrigins__List">
          {data.map(origin => (
            <li key={origin.get('slug')} className="HeroesOrigins__Item">
              <Link
                to={`/${origin.get('slug')}`}
                className="HeroesOrigins__Link"
              >
                {origin.get('label')}
              </Link>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div className="HeroesOrigins">
        Choose your hero origin
        {content}
      </div>
    );
  }
}

HeroesOrigins.defaultProps = {
  isFetching: true,
  data: null,
  fetchingError: null,
};

HeroesOrigins.propTypes = {
  fetchHeroesOriginsIfNeeded: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  fetchingError: PropTypes.instanceOf(Error),
  data: PropTypes.instanceOf(List),
};

