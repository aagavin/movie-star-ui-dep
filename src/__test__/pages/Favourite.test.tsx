import { cleanup, render, waitForElement } from '@testing-library/react'
import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';
import FavouritePage from '../../pages/Favourite';
import UserContext, { init } from "../../context";

const favs = [
  {
    id: "123",
    title: "movie title",
    poster_path: "/poster",
    media_type: "movie"
  },
  {
    id: "456",
    name: "tv title",
    poster_path: "/poster",
    media_type: "movie"
  }
]

describe('Favourite Page', () => {
  afterEach(cleanup);

  test('happy path render', async () => {
    const ui = render(
      <MemoryRouter>
        <Suspense fallback="...">
        <UserContext.Provider value={{ ...init, favourites: favs }}>
          <FavouritePage />
        </UserContext.Provider>
        </Suspense>
      </MemoryRouter>
    );
    await waitForElement(() => ui.container.querySelector('#result-list-undefined'));
    const items = ui.container.querySelectorAll('ion-item');
    items.forEach((item, index) => {
      const label = item.querySelector('ion-label');
      expect(label.textContent).toBe(favs[index].title ? favs[index].title : favs[index].name);
    });
  });
});
