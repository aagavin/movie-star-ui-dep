import { cleanup, render, waitForElement } from '@testing-library/react'
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import FavouritePage from '../../pages/Favourite';
import UserContext, { init } from "../../context";

const favs = [
  {
    id: "123",
    name: "name",
    title: "title",
    poster_path: "poster",
    media_type: "movie"
  }
]

describe('Favourite Page', () => {
  afterEach(cleanup);

  test('sdf', async () => {
    console.log('-->');
    // const ui = render(
    //   <UserContext.Provider value={{ ...init, favourites: favs }}>
    //     <FavouritePage />
    //   </UserContext.Provider>
    // );
    // ui.debug()
  });
});
