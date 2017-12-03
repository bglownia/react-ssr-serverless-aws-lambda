import { connect } from 'react-redux';
import { fetchHeroesIfNeeded, stateKey } from '../actions/heroes';
import makeGetFetchedData from '../selectors/getFetchedData';
import HeroesList from '../components/HeroesList';


const mapStateToProps = () => {
  const getHeroes = makeGetFetchedData(stateKey);
  return (state, { origin }) => getHeroes(state, origin);
};

export default connect(
  mapStateToProps,
  { fetchHeroesIfNeeded },
)(HeroesList);
