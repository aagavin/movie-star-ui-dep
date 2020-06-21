import { cleanup, render, waitForElement } from '@testing-library/react'
import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';
import UserContext, { init } from '../../context';
import FavouritePage from '../../pages/Favourite';

const favs = [
  {
    id: '123',
    title: 'movie title',
    poster_path: '/poster',
    media_type: 'movie'
  },
  {
    id: '456',
    name: 'tv title',
    poster_path: '/poster',
    media_type: 'movie'
  }
];

const initTests = async (props = {}) => {
  const ui = render(
    <MemoryRouter>
      <Suspense fallback="...">
      <UserContext.Provider value={{ ...init, favourites: favs, ...props }}>
        <FavouritePage />
      </UserContext.Provider>
      </Suspense>
    </MemoryRouter>
  );
  if(props === {}){
    await waitForElement(() => ui.container.querySelector('#result-list-undefined'));
  }
  return ui;
}

describe('Favourite Page', () => {
  afterEach(cleanup);

  test('happy path render', async () => {
    const { container } = await initTests();
    const items = container.querySelectorAll('ion-item');
    items.forEach((item, index) => {
      const label = item.querySelector('ion-label');
      expect(label.textContent).toBe(favs[index].title ? favs[index].title : favs[index].name);
    });
  });

  test('user not logged in', async () => {
    const { container } = await initTests({user: null});
    expect(container.querySelector('ion-content').textContent).toBe('Login to view favourites');
  });

  test('user has no favourites', async () => {
    const { container } = await initTests({favourites: []});
    expect(container.querySelector('ion-content').textContent).toBe('No favourites :( Add some');
  });
});
