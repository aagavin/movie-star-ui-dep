import { cleanup, render, waitForElement } from '@testing-library/react'
import fetchMock from 'fetch-mock';
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import EpisodesPage from '../../../pages/media/Episodes';

const response = {
  'air_date': '2013-10-15',
  'crew': [
    {
      'id': 34396,
      'credit_id': '532044089251411f8c001166',
      'name': 'Roxann Dawson',
      'department': 'Directing',
      'job': 'Director',
      'gender': 1,
      'profile_path': '\/n4YNcGj3wCg9bKbDj1U3BRYoUXL.jpg'
    },
    {
      'id': 1236075,
      'credit_id': '531749d99251415896001c1f',
      'name': 'Jeffrey Bell',
      'department': 'Writing',
      'job': 'Writer',
      'gender': 2,
      'profile_path': '\/nZV8oaC1p3gWPsYTC8Dzk9Ss3eU.jpg'
    }
  ],
  'episode_number': 4,
  'guest_stars': [
    {
      'id': 163888,
      'name': 'Pascale Armand',
      'credit_id': '532044c29251411f7e001233',
      'character': 'Akela Amador',
      'order': 13,
      'gender': 0,
      'profile_path': '\/sfsYBAWvlexxPgffo5GOswZMnQG.jpg'
    },
    {
      'id': 188857,
      'name': 'Michael Klesic',
      'credit_id': '55b53547925141788b00720c',
      'character': 'Kropsky',
      'order': 187,
      'gender': 0,
      'profile_path': '\/3dmD5B0DNYOCXMrFwcpr3hieoFp.jpg'
    }
  ],
  'name': 'Eye Spy',
  'overview': 'Agent Coulson and the S.H.I.E.L.D. team try to track down a mysterious woman who has single-handedly committed numerous high-stakes heists. But when the woman’s identity is revealed, a troubling secret stands to ruin Coulson.',
  'id': 0,
  'production_code': '4',
  'season_number': 1,
  'still_path': '\/kktpW8PXp1IDGqhegN6VjeBjzWR.jpg',
  'vote_average': 7.5,
  'vote_count': 26
}

describe('Favourite Page', () => {
  afterEach(() => { cleanup(); fetchMock.reset(); });

  test('happy path render', async () => {
    let id = 0;
    const url = '/home/media/tv/1403/season/2/episodes/2';
    [1,2].forEach(index => {
      id = Math.floor((Math.random() * 9999) + 1000);
      const r = {...response, id }
      fetchMock.get(`express:/media/tv/:mediaId/season/:seasonNumber/episode/${index}`, r);
    });

    const ui = render(
      <MemoryRouter initialEntries={[url]}>
        <Route path={'/home/media/:catogery/:mediaId/season/:seasonNumber/episodes/:numOfEpisodes'} >
          <EpisodesPage />
        </Route>
      </MemoryRouter>
    );
    await waitForElement(() => ui.container.querySelector('[id^=\'card\']'));
    expect(ui.container.querySelectorAll('ion-card').length).toBe(2);
    const epCard = ui.container.querySelector(`#card-${id}`);
    expect(epCard.querySelector('ion-card-title').textContent).toBe(response.name);
    expect(epCard.querySelector('ion-card-title').textContent).toBe(response.name);
  });
});
