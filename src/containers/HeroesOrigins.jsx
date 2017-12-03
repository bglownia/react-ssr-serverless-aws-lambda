import { connect } from 'react-redux';
import { fetchHeroesOriginsIfNeeded } from '../actions/heroesOrigins';
import HeroesOrigins from '../components/HeroesOrigins';

import getHeroesOrigins from '../selectors/getHeroesOrigins';

export default connect(
  state => getHeroesOrigins(state), // { isFetching, fetchingError, data }
  { fetchHeroesOriginsIfNeeded },
)(HeroesOrigins);
