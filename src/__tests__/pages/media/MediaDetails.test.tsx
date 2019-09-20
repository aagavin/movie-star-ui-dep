import { cleanup, render, waitForElement, fireEvent } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import UserContext, { init } from '../../../context';
import MediaDetailsPage from '../../../pages/media/MediaDetails';

const movieResponse = {
  'adult': false,
  'backdrop_path': '\/stemLQMLDrlpfIlZ5OjllOPT8QX.jpg',
  'belongs_to_collection': {
    'id': 404609,
    'name': 'John Wick Collection',
    'poster_path': '\/pZ4hR5IIoHHfNjot9rq4F96OGAi.jpg',
    'backdrop_path': '\/fSwYa5q2xRkBoOOjueLpkLf3N1m.jpg'
  },
  'budget': 55000000,
  'genres': [
    {
      'id': 28,
      'name': 'Action'
    },
    {
      'id': 53,
      'name': 'Thriller'
    },
    {
      'id': 80,
      'name': 'Crime'
    }
  ],
  'homepage': 'https:\/\/www.johnwick.movie',
  'id': 458156,
  'imdb_id': 'tt6146586',
  'original_language': 'en',
  'original_title': 'John Wick: Chapter 3 – Parabellum',
  'overview': 'Super-assassin John Wick returns with a $14 million price tag on his head and an army of bounty-hunting killers on his trail. After killing a member of the shadowy international assassin’s guild, the High Table, John Wick is excommunicado, but the world’s most ruthless hit men and women await his every turn.',
  'popularity': 173.345,
  'poster_path': '\/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg',
  'production_companies': [
    {
      'id': 491,
      'logo_path': '\/rUp0lLKa1pr4UsPm8fgzmnNGxtq.png',
      'name': 'Summit Entertainment',
      'origin_country': 'US'
    },
    {
      'id': 3528,
      'logo_path': '\/cCzCClIzIh81Fa79hpW5nXoUsHK.png',
      'name': 'Thunder Road Pictures',
      'origin_country': 'US'
    },
    {
      'id': 113619,
      'logo_path': null,
      'name': '87Eleven Productions',
      'origin_country': ''
    }
  ],
  'production_countries': [
    {
      'iso_3166_1': 'US',
      'name': 'United States of America'
    }
  ],
  'release_date': '2019-05-15',
  'revenue': 318642310,
  'runtime': 131,
  'spoken_languages': [
    {
      'iso_639_1': 'en',
      'name': 'English'
    },
    {
      'iso_639_1': 'ar',
      'name': 'العربية'
    },
    {
      'iso_639_1': 'zh',
      'name': '普通话'
    },
    {
      'iso_639_1': 'id',
      'name': 'Bahasa indonesia'
    },
    {
      'iso_639_1': 'it',
      'name': 'Italiano'
    },
    {
      'iso_639_1': 'ja',
      'name': '日本語'
    },
    {
      'iso_639_1': 'la',
      'name': 'Latin'
    },
    {
      'iso_639_1': 'ru',
      'name': 'Pусский'
    }
  ],
  'status': 'Released',
  'tagline': 'The Grace Period Is Over',
  'title': 'John Wick: Chapter 3 – Parabellum',
  'video': false,
  'vote_average': 7.1,
  'vote_count': 2456
};

const tvResponse = {
  'backdrop_path': '\/iWopHyAvuIDjGX10Yc3nn6UEebW.jpg',
  'created_by': [
    {
      'id': 12891,
      'credit_id': '5256cb4a19c2956ff605ea55',
      'name': 'Joss Whedon',
      'gender': 2,
      'profile_path': '\/dTiVsuaTVTeGmvkhcyJvKp2A5kr.jpg'
    },
    {
      'id': 76532,
      'credit_id': '5256cb4a19c2956ff605ea63',
      'name': 'Jed Whedon',
      'gender': 2,
      'profile_path': '\/bfAKVMn1sCTYXy97vr55Vyl2X8a.jpg'
    },
    {
      'id': 1223883,
      'credit_id': '5256cb4a19c2956ff605ea69',
      'name': 'Maurissa Tancharoen',
      'gender': 1,
      'profile_path': '\/1Lv38CXO2Q4d8Dq0HVmwBaCZhcJ.jpg'
    }
  ],
  'episode_run_time': [
    43
  ],
  'first_air_date': '2013-09-24',
  'genres': [
    {
      'id': 18,
      'name': 'Drama'
    },
    {
      'id': 10765,
      'name': 'Sci-Fi & Fantasy'
    },
    {
      'id': 10759,
      'name': 'Action & Adventure'
    }
  ],
  'homepage': 'http:\/\/www.agentsofshield.com\/',
  'id': 1403,
  'in_production': true,
  'languages': [
    'en'
  ],
  'last_air_date': '2019-08-02',
  'last_episode_to_air': {
    'air_date': '2019-08-02',
    'episode_number': 13,
    'id': 1861571,
    'name': 'New Life (Part II)',
    'overview': 'With time running short, the team will have to go TO HELL AND BACK to stop the end of everything. Who will survive?',
    'production_code': '',
    'season_number': 6,
    'show_id': 1403,
    'still_path': '\/jRrgeEvci7Bk54zyhNI4nfjqYP4.jpg',
    'vote_average': 0.0,
    'vote_count': 0
  },
  'name': 'Marvel\'s Agents of S.H.I.E.L.D.',
  'next_episode_to_air': null,
  'networks': [
    {
      'name': 'ABC',
      'id': 2,
      'logo_path': '\/ndAvF4JLsliGreX87jAc9GdjmJY.png',
      'origin_country': 'US'
    }
  ],
  'number_of_episodes': 123,
  'number_of_seasons': 6,
  'origin_country': [
    'US'
  ],
  'original_language': 'en',
  'original_name': 'Marvel\'s Agents of S.H.I.E.L.D.',
  'overview': 'Agent Phil Coulson of S.H.I.E.L.D. (Strategic Homeland Intervention, Enforcement and Logistics Division) puts together a team of agents to investigate the new, the strange and the unknown around the globe, protecting the ordinary from the extraordinary.',
  'popularity': 133.861,
  'poster_path': '\/cXiETfFK1BTLest5fhTLfDLRdL6.jpg',
  'production_companies': [
    {
      'id': 670,
      'logo_path': '\/rRGi5UkwvdOPSfr5Xf42RZUsYgd.png',
      'name': 'Walt Disney Television',
      'origin_country': 'US'
    },
    {
      'id': 19366,
      'logo_path': '\/vOH8dyQhLK01pg5fYkgiS31jlFm.png',
      'name': 'ABC Studios',
      'origin_country': 'US'
    },
    {
      'id': 420,
      'logo_path': '\/hUzeosd33nzE5MCNsZxCGEKTXaQ.png',
      'name': 'Marvel Studios',
      'origin_country': 'US'
    },
    {
      'id': 10567,
      'logo_path': '\/kbZu62C3ZwNfOtao1ECIFTzL40Q.png',
      'name': 'Mutant Enemy Productions',
      'origin_country': 'US'
    }
  ],
  'seasons': [
    {
      'air_date': '2013-08-25',
      'episode_count': 12,
      'id': 3649,
      'name': 'Specials',
      'overview': '',
      'poster_path': '\/3F0XJAWuQxnhgmb2uE1xtyszoj9.jpg',
      'season_number': 0
    },
    {
      'air_date': '2013-09-24',
      'episode_count': 22,
      'id': 3648,
      'name': 'Season 1',
      'overview': 'Season one begins where the “Marvel\'s The Avengers” left off. It\'s just after the battle of New York, and now that the existence of superheroes and aliens has become public knowledge, the world is trying to come to grips with this new reality. Agent Phil Coulson is back in action and now has his eye on a mysterious group called The Rising Tide. In order to track this unseen, unknown enemy, he has assembled a small, highly select group of Agents from the worldwide law-enforcement organization known as S.H.I.E.L.D.',
      'poster_path': '\/iVNu8dvnbbdIEgcZgOKqWMEC7NQ.jpg',
      'season_number': 1
    },
    {
      'air_date': '2014-09-23',
      'episode_count': 22,
      'id': 62022,
      'name': 'Season 2',
      'overview': 'In the second season, Coulson and his team look to restore trust from the government and public following S.H.I.E.L.D.\'s collapse. ',
      'poster_path': '\/y5i3wObP0DmJnOgjGSrZyJNT1bj.jpg',
      'season_number': 2
    },
    {
      'air_date': '2015-09-29',
      'episode_count': 22,
      'id': 68416,
      'name': 'Season 3',
      'overview': 'Many months after their war with a rogue group of Inhumans, the team is still reeling. Coulson is again trying to put the pieces of his once revered organization back together while also dealing with the loss of his hand. His confidante and second in command, Agent Melinda May, has yet to return from an impromptu vacation with ex-husband Andrew; deadly superspy Agent Bobbi Morse is recovering from her traumatic torture at the hands of Grant Ward; Fitz is obsessed with discovering the truth behind the mysterious disappearance of Simmons; and all are on high-alert for the next move from Ward and Hydra.',
      'poster_path': '\/y0cxxcvCk9lEG4DEorTz5GxC9sj.jpg',
      'season_number': 3
    },
    {
      'air_date': '2016-09-20',
      'episode_count': 22,
      'id': 78514,
      'name': 'Season 4',
      'overview': 'Vengeance runs rampant this season as Coulson is a mere agent again, and Daisy has gone rogue after being under Hive\'s control. How will S.H.I.E.L.D. deal with the arrival of The Ghost Rider?',
      'poster_path': '\/nWULHwAb7yjlrGpB5BTdnjZc980.jpg',
      'season_number': 4
    },
    {
      'air_date': '2017-12-01',
      'episode_count': 22,
      'id': 93742,
      'name': 'Season 5',
      'overview': 'Agent Coulson and the team escaped LMD Aida’s Framework and awakened in the real world. Little did they know that Aida was now fully human – and with multiple Inhuman abilities – with the dangerous notion that, with Fitz by her side, she could change the world. After defeating her with the aid of Ghost Rider, the team went out for a celebration but were interrupted by a mysterious man who rendered them frozen. The next thing we see is Coulson onboard a ship … in space. Coulson will discover that some, but not all, of his S.H.I.E.L.D. colleagues were taken with him and placed onboard the ship. As they come in contact with some of the vessel’s inhabitants, it becomes abundantly clear that something has gone terribly awry, and the team will need to figure out their role and delve deeper into this nightmarish mystery to try to right what has gone incredibly wrong.',
      'poster_path': '\/zndNDiqH0SvIlFHURYCWY060qE8.jpg',
      'season_number': 5
    },
    {
      'air_date': '2019-05-10',
      'episode_count': 13,
      'id': 103782,
      'name': 'Season 6',
      'overview': 'Last season, the team leaped forward in time to a dystopian future they soon realized must be prevented. While facing multiple timelines and new enemies from faraway planets, they found family, friends, teammates and the courage to pull off their biggest challenge yet. Their next challenge? Coming to grips with the knowledge that bending the laws of space and time may have saved the planet, but it couldn’t save Fitz or Coulson.',
      'poster_path': '\/5msClP3ba8iOHvpuZjU6NyzwEB7.jpg',
      'season_number': 6
    }
  ],
  'status': 'Returning Series',
  'type': 'Scripted',
  'vote_average': 6.8,
  'vote_count': 1356
}

describe('Favourite Page', () => {
  beforeEach(fetchMock.reset);
  afterEach(cleanup);

  const getUi = (url) => {
    return render(<MemoryRouter initialEntries={[url]}>
      <UserContext.Provider value={{ ...init, favourites: [], user: { id: 123 } }}>
        <Route path={'/home/media/:catogery/:mediaId'}>
          <MediaDetailsPage />
        </Route>
      </UserContext.Provider>
    </MemoryRouter>);
  };

  test('render loading state', async () => {
    const url = '/home/media/movie/458156';
    fetchMock.get('end:/movie/458156', movieResponse);
    const { container } = getUi(url);
    expect(container.querySelector('ion-progress-bar')).not.toBeNull();

  });

  test('happy path movie render', async () => {
    const url = '/home/media/movie/458156';
    fetchMock.get('end:/movie/458156', movieResponse);
    const { container, getByText } = getUi(url);
    await waitForElement(() => container.querySelector('#card-458156'));
    expect(container.querySelector('ion-card-title').textContent).toBe(movieResponse.title);
    expect(container.querySelector('ion-card-content').childNodes[0].textContent).toBe(movieResponse.overview);
    expect(container.querySelectorAll('ion-badge').length).not.toBe(0);
    expect(getByText(/Add to favourite/)).not.toBeNull();
  });

  test('happy path tv render', async () => {
    const url = '/home/media/tv/1403';
    fetchMock.get('end:tv/1403', tvResponse);
    const { container, getByText, queryAllByText } = getUi(url);
    await waitForElement(() => container.querySelector('#card-1403'));
    expect(container.querySelector('ion-card-title').textContent).toBe(tvResponse.name);
    expect(container.querySelector('ion-card-content').childNodes[0].textContent).toBe(tvResponse.overview);
    expect(container.querySelectorAll('ion-badge').length).not.toBe(0);
    expect(getByText(/Add to favourite/)).not.toBeNull();
    fireEvent.click(getByText(/Show Seasons/));
    const seasonsCards = container.querySelectorAll('[id^="card-season-"]');
    expect(seasonsCards).toHaveLength(tvResponse.seasons.length);
    fireEvent.click(queryAllByText(/View Episodes/)[0]);
  });
});
