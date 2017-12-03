import { connect } from 'react-redux';
import { fetchHeroesOriginsIfNeeded } from '../actions/heroesOrigins';
import OriginPage from '../components/OriginPage';

import getHeroesOrigins from '../selectors/getHeroesOrigins';

export default connect(
  state => getHeroesOrigins(state), // { isFetching, fetchingError, data }
  { fetchHeroesOriginsIfNeeded },
)(OriginPage);
