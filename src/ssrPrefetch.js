import { fetchHeroesIfNeeded } from './actions/heroes';
import { fetchHeroesOriginsIfNeeded } from './actions/heroesOrigins';

export default [
  {
    path: '/',
    loadData: store => store.dispatch(fetchHeroesOriginsIfNeeded()),
  },
  {
    path: '/:slug',
    loadData: (store, match) => store.dispatch(
      fetchHeroesIfNeeded({ origin: match.params.slug }),
    ),
  },
];
