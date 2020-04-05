import { cleanup, render, waitForElement } from '@testing-library/react'
import fetchMock from 'fetch-mock';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../../../pages/Home';

const movieResponse = [
  {
    'currentRank': 1,
    'previousRanks': [
      {
        'rank': 1,
        'until': '2019-12-30T00:00:00Z'
      }
    ],
    'id': 'tt2527338',
    'image': {
      'height': 2048,
      'id': '\/title\/tt2527338\/images\/rm1361479681',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMDljNTQ5ODItZmQwMy00M2ExLTljOTQtZTVjNGE2NTg0NGIxXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_.jpg',
      'width': 1383
    },
    'title': 'Star Wars: Episode IX - The Rise of Skywalker',
    'titleType': 'movie',
    'year': 2019
  },
  {
    'currentRank': 2,
    'previousRanks': [
      {
        'rank': 3,
        'until': '2019-12-30T00:00:00Z'
      }
    ],
    'id': 'tt5697572',
    'image': {
      'height': 3000,
      'id': '\/title\/tt5697572\/images\/rm4019887361',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BNjRlNTY3MTAtOTViMS00ZjE5LTkwZGItMGYwNGQwMjg2NTEwXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg',
      'width': 1895
    },
    'title': 'Cats',
    'titleType': 'movie',
    'year': 2019
  },
];

const tvResponse = [
  {
    'currentRank': 1,
    'previousRanks': [
      {
        'rank': 1,
        'until': '2019-12-30T00:00:00Z'
      }
    ],
    'id': 'tt5180504',
    'image': {
      'height': 4088,
      'id': '\/title\/tt5180504\/images\/rm880577537',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BOGE4MmVjMDgtMzIzYy00NjEwLWJlODMtMDI1MGY2ZDlhMzE2XkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_.jpg',
      'width': 2759
    },
    'title': 'The Witcher',
    'titleType': 'tvSeries',
    'year': 2019
  },
  {
    'currentRank': 2,
    'previousRanks': [
      {
        'rank': 2,
        'until': '2019-12-30T00:00:00Z'
      }
    ],
    'id': 'tt8111088',
    'image': {
      'height': 1500,
      'id': '\/title\/tt8111088\/images\/rm4266234113',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMWI0OTJlYTItNzMwZi00YzRiLWJhMjItMWRlMDNhZjNiMzJkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
      'width': 1013
    },
    'title': 'The Mandalorian',
    'titleType': 'tvSeries',
    'year': 2019
  },
  {
    'currentRank': 3,
    'previousRanks': [
      {
        'rank': 17,
        'until': '2019-12-30T00:00:00Z'
      }
    ],
    'id': 'tt7335184',
    'image': {
      'height': 1350,
      'id': '\/title\/tt7335184\/images\/rm1303088897',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMTU0MjQ2NDgtMDI5Mi00NGNjLTlmYTgtYmQ2YjAwOGU4MWE1XkEyXkFqcGdeQXVyNDg4MjkzNDk@._V1_.jpg',
      'width': 1080
    },
    'title': 'You',
    'titleType': 'tvSeries',
    'year': 2018
  }];

describe('Home page', () => {

  afterEach(cleanup);

  test('happy path render', async () => {
    fetchMock.get('end:movies/popular', movieResponse);
    fetchMock.get('end:tv/popular', tvResponse);
    const ui = render(
      <MemoryRouter initialEntries={['/']}><HomePage /></MemoryRouter>
    );

    await waitForElement(() => ui.container.querySelector('#result-list-feature'));
    const items = ui.container.querySelectorAll('ion-item');
    expect(ui.getByText(/Popular Movies & TV shows/)).not.toBe(null);
    expect(items.length).toBe(2);
    items.forEach((item, index) => {
      const response = movieResponse[index];
      const label = item.querySelector('ion-label');
      const img = item.querySelector('ion-img');

      expect(label.textContent).toBe(response.title);
      expect(img.getAttribute('alt')).toBe(`poster icon for ${response.title}`);
      expect(img.getAttribute('src').startsWith('https://m.media-amazon.com')).toBe(true);
    });
  });
});