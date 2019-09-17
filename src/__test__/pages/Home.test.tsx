import { cleanup, render, waitForElement } from '@testing-library/react'
import fetchMock from 'fetch-mock';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../../pages/Home';

const movieResponse = [
  {
    'popularity': 507.672,
    'vote_count': 224,
    'video': false,
    'poster_path': '\/zfE0R94v1E8cuKAerbskfD3VfUt.jpg',
    'id': 474350,
    'adult': false,
    'backdrop_path': '\/4W0FnjSGn4x0mKZlBRx8OjFxQUM.jpg',
    'original_language': 'en',
    'original_title': 'It Chapter Two',
    'genre_ids': [
      35,
      27
    ],
    'title': 'It Chapter Two',
    'vote_average': 7.2,
    'overview': '27 years after overcoming the malevolent supernatural entity Pennywise, the former members of the Losers\' Club, who have grown up and moved away from Derry, are brought back together by a devastating phone call.',
    'release_date': '2019-09-06'
  },
  {
    'popularity': 136.709,
    'vote_count': 258,
    'video': false,
    'poster_path': '\/fapXd3v9qTcNBTm39ZC4KUVQDNf.jpg',
    'id': 423204,
    'adult': false,
    'backdrop_path': '\/k2WyDw2NTUIWnuEs5gT7wgrCQg6.jpg',
    'original_language': 'en',
    'original_title': 'Angel Has Fallen',
    'genre_ids': [
      28
    ],
    'title': 'Angel Has Fallen',
    'vote_average': 5.7,
    'overview': 'Secret Service Agent Mike Banning is framed for the attempted assassination of the President and must evade his own agency and the FBI as he tries to uncover the real threat.',
    'release_date': '2019-08-23'
  },
  {
    'popularity': 87.02,
    'vote_count': 181,
    'video': false,
    'poster_path': '\/jIthqo2tQmW8TFN1fYpF8FmVL0o.jpg',
    'id': 521777,
    'adult': false,
    'backdrop_path': '\/6Xsz9KHQmCcIcj3CoWQq5eLtVoT.jpg',
    'original_language': 'en',
    'original_title': 'Good Boys',
    'genre_ids': [
      35
    ],
    'title': 'Good Boys',
    'vote_average': 6.6,
    'overview': 'A group of young boys on the cusp of becoming teenagers embark on an epic quest to fix their broken drone before their parents get home.',
    'release_date': '2019-08-16'
  }
];

const tvResponse = [
  { 'original_name': 'Desmontando la Historia', 'genre_ids': [], 'name': 'Desmontando la Historia', 'popularity': 366.08, 'origin_country': [], 'vote_count': 1, 'first_air_date': '2017-01-22', 'backdrop_path': '\/is7DUNsw59EcTwCO1FgECbNIfu0.jpg', 'original_language': 'es', 'id': 77753, 'vote_average': 1, 'overview': '', 'poster_path': '\/q5RgwditroSCTVcpYn09MkK3KV8.jpg' },
  { 'original_name': 'The Flash', 'genre_ids': [18, 10765], 'name': 'The Flash', 'popularity': 206.084, 'origin_country': ['US'], 'vote_count': 2832, 'first_air_date': '2014-10-07', 'backdrop_path': '\/jC1KqsFx8ZyqJyQa2Ohi7xgL7XC.jpg', 'original_language': 'en', 'id': 60735, 'vote_average': 6.7, 'overview': 'After a particle accelerator causes a freak storm, CSI Investigator Barry Allen is struck by lightning and falls into a coma. Months later he awakens with the power of super speed, granting him the ability to move through Central City like an unseen guardian angel. Though initially excited by his newfound powers, Barry is shocked to discover he is not the only "meta-human" who was created in the wake of the accelerator explosion -- and not everyone is using their new powers for good. Barry partners with S.T.A.R. Labs and dedicates his life to protect the innocent. For now, only a few close friends and associates know that Barry is literally the fastest man alive, but it won\'t be long before the world learns what Barry Allen has become...The Flash.', 'poster_path': '\/fki3kBlwJzFp8QohL43g9ReV455.jpg' },
  { 'original_name': 'Fear the Walking Dead', 'genre_ids': [18, 27], 'name': 'Fear the Walking Dead', 'popularity': 245.087, 'origin_country': ['US'], 'vote_count': 1017, 'first_air_date': '2015-08-23', 'backdrop_path': '\/nUXzdD2Jo3wV9Q7mIZjK46Yyty4.jpg', 'original_language': 'en', 'id': 62286, 'vote_average': 6.3, 'overview': 'What did the world look like as it was transforming into the horrifying apocalypse depicted in "The Walking Dead"? This spin-off set in Los Angeles, following new characters as they face the beginning of the end of the world, will answer that question.', 'poster_path': '\/lZMb3R3e5vqukPbeDMeyYGf2ZNG.jpg' }
];

describe('Home page', () => {

  afterEach(cleanup);

  test('happy path render', async () => {
    fetchMock.get('end:/movie/upcoming', movieResponse);
    fetchMock.get('end:/tv/popular', tvResponse);
    const ui = render(
      <MemoryRouter initialEntries={['/']}><HomePage /></MemoryRouter>
    );

    await waitForElement(() => ui.container.querySelector('#result-list-movie'));
    const items = ui.container.querySelectorAll('ion-item');
    expect(ui.getByText(/Popular Movies & TV shows/)).not.toBe(null);
    expect(items.length).toBe(3);
    items.forEach((item, index) => {
      const response = movieResponse[index];
      const label = item.querySelector('ion-label');
      const img = item.querySelector('ion-img');

      expect(label.textContent).toBe(response.original_title);
      expect(img.getAttribute('alt')).toBe(`poster icon for ${response.original_title}`);
      expect(img.getAttribute('src')).toBe(`https://image.tmdb.org/t/p/w92${response.poster_path}`);
    });
  });
});