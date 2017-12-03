import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Redirect } from 'react-router-dom';
import HeroesList from '../containers/HeroesList';

export default class OriginPage extends React.Component {
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
      content = data.some(origin => origin.get('slug') === this.props.origin) ?
        <HeroesList origin={this.props.origin} /> :
        <Redirect to="/" />;
    }

    return (
      <div>
        <main>{content}</main>
        <aside><HeroesList origin="newest" /></aside>
      </div>
    );
  }
}

OriginPage.defaultProps = {
  isFetching: true,
  data: null,
  fetchingError: null,
};

OriginPage.propTypes = {
  fetchHeroesOriginsIfNeeded: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  fetchingError: PropTypes.instanceOf(Error),
  data: PropTypes.instanceOf(List),
  origin: PropTypes.string.isRequired,
};

