import React from 'react';
import HeroesList from '../containers/HeroesList';

export default () => (
  <div>
    <main>
      <p>This is website about super heroes</p>
    </main>
    <aside>
      <HeroesList origin="popular" />
    </aside>
  </div>
);
