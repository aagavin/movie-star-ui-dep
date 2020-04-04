import { ionFireEvent as fireEvent } from '@ionic/react-test-utils';
import { cleanup, render } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Search from '../../../../pages/media/Search';


const response = [
  {
    'vote_count': 9411,
    'popularity': 69.468,
    'id': 299534,
    'video': false,
    'media_type': 'movie',
    'vote_average': 8.3,
    'title': 'Avengers: Endgame',
    'release_date': '2019-04-26',
    'original_language': 'en',
    'original_title': 'Avengers: Endgame',
    'genre_ids': [
      12,
      878,
      28
    ],
    'backdrop_path': '\/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    'adult': false,
    'overview': 'After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos\' actions and restore order to the universe once and for all, no matter what consequences may be in store.',
    'poster_path': '\/or06FN3Dka5tukK1e9sl16pB3iy.jpg'
  },
  {
    'poster_path': '\/cezWGskPY5x7GaglTTRN4Fugfb8.jpg',
    'popularity': 44.013,
    'vote_count': 20525,
    'video': false,
    'media_type': 'movie',
    'id': 24428,
    'adult': false,
    'backdrop_path': '\/hbn46fQaRmlpBuUrEiFqv0GDL6Y.jpg',
    'original_language': 'en',
    'original_title': 'The Avengers',
    'genre_ids': [
      28,
      12,
      878
    ],
    'title': 'The Avengers',
    'vote_average': 7.6,
    'overview': 'When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!',
    'release_date': '2012-05-04'
  },
  {
    'poster_path': '\/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
    'popularity': 57.867,
    'vote_count': 15218,
    'video': false,
    'media_type': 'movie',
    'id': 299536,
    'adult': false,
    'backdrop_path': '\/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg',
    'original_language': 'en',
    'original_title': 'Avengers: Infinity War',
    'genre_ids': [
      28,
      12,
      878
    ],
    'title': 'Avengers: Infinity War',
    'vote_average': 8.3,
    'overview': 'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.',
    'release_date': '2018-04-27'
  },
  {
    'poster_path': '\/t90Y3G8UGQp0f0DrP60wRu9gfrH.jpg',
    'popularity': 32.846,
    'vote_count': 14208,
    'video': false,
    'media_type': 'movie',
    'id': 99861,
    'adult': false,
    'backdrop_path': '\/rFtsE7Lhlc2jRWF7SRAU0fvrveQ.jpg',
    'original_language': 'en',
    'original_title': 'Avengers: Age of Ultron',
    'genre_ids': [
      28,
      12,
      878
    ],
    'title': 'Avengers: Age of Ultron',
    'vote_average': 7.3,
    'overview': 'When Tony Stark tries to jumpstart a dormant peacekeeping program, things go awry and Earth’s Mightiest Heroes are put to the ultimate test as the fate of the planet hangs in the balance. As the villainous Ultron emerges, it is up to The Avengers to stop him from enacting his terrible plans, and soon uneasy alliances and unexpected action pave the way for an epic and unique global adventure.',
    'release_date': '2015-05-01'
  },
  {
    'original_name': 'Marvel\'s Avengers Assemble',
    'genre_ids': [
      16,
      10759
    ],
    'media_type': 'tv',
    'name': 'Marvel\'s Avengers Assemble',
    'popularity': 24.35,
    'origin_country': [
      'US'
    ],
    'vote_count': 0,
    'first_air_date': '2013-11-09',
    'backdrop_path': '\/jh12MzXiUTaC6AE3DXqjvDOFK46.jpg',
    'original_language': 'en',
    'id': 59427,
    'vote_average': 0,
    'overview': 'The further adventures of the Marvel Universe\'s mightiest general membership superhero team. With an all-star roster consisting of Iron Man, Captain America, Thor, Hulk, Hawkeye, Falcon and, occasionally--when she feels like it and only when she feels like it--Black Widow, the Avengers are a team in the truest sense. The Avengers save the world from the biggest threats imaginable--threats no single super hero could withstand.',
    'poster_path': '\/gW2wTB5yBDEy2wKWy0hkkZP0nXf.jpg'
  },
  {
    'poster_path': '\/zxjJ2IxhilZLzl8eXjj7S0apZ7k.jpg',
    'popularity': 9.826,
    'vote_count': 362,
    'video': false,
    'media_type': 'movie',
    'id': 9320,
    'adult': false,
    'backdrop_path': '\/8YW4rwWQgC2JRlBcpStMNUko13k.jpg',
    'original_language': 'en',
    'original_title': 'The Avengers',
    'genre_ids': [
      878,
      53
    ],
    'title': 'The Avengers',
    'vote_average': 4.3,
    'overview': 'British Ministry agent John Steed, under direction from "Mother", investigates a diabolical plot by arch-villain Sir August de Wynter to rule the world with his weather control machine. Steed investigates the beautiful Doctor Mrs. Emma Peel, the only suspect, but simultaneously falls for her and joins forces with her to combat Sir August.',
    'release_date': '1998-08-14'
  },
  {
    'poster_path': '\/rXPxSAYf3FdQktnOtQnvhUPMhFp.jpg',
    'popularity': 12.265,
    'vote_count': 51,
    'video': false,
    'media_type': 'movie',
    'id': 534490,
    'adult': false,
    'backdrop_path': '\/pMREHTtqq5LZ797q127A9NZEfsN.jpg',
    'original_language': 'en',
    'original_title': 'Avengement',
    'genre_ids': [
      28,
      80
    ],
    'title': 'Avengement',
    'vote_average': 6.2,
    'overview': 'While on a prison furlough, a lowly criminal evades his guards and returns to his old stomping ground to take revenge on the people who turned him into a cold blooded killer.',
    'release_date': '2019-05-24'
  },
  {
    'poster_path': '\/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg',
    'popularity': 20.347,
    'vote_count': 13445,
    'video': false,
    'media_type': 'movie',
    'id': 1771,
    'adult': false,
    'backdrop_path': '\/pmZtj1FKvQqISS6iQbkiLg5TAsr.jpg',
    'original_language': 'en',
    'original_title': 'Captain America: The First Avenger',
    'genre_ids': [
      28,
      12,
      878
    ],
    'title': 'Captain America: The First Avenger',
    'vote_average': 6.9,
    'overview': 'During World War II, Steve Rogers is a sickly man from Brooklyn who\'s transformed into super-soldier Captain America to aid in the war effort. Rogers must stop the Red Skull – Adolf Hitler\'s ruthless head of weaponry, and the leader of an organization that intends to use a mysterious device of untold powers for world domination.',
    'release_date': '2011-07-22'
  },
  {
    'original_name': 'The Avengers: Earth\'s Mightiest Heroes',
    'genre_ids': [
      16,
      10751,
      10759,
      10765
    ],
    'media_type': 'tv',
    'name': 'The Avengers: Earth\'s Mightiest Heroes',
    'popularity': 11.829,
    'origin_country': [
      'US'
    ],
    'vote_count': 71,
    'first_air_date': '2010-10-20',
    'backdrop_path': '\/fgT2f31gPKMiache79Bnb6kbJCZ.jpg',
    'original_language': 'en',
    'id': 33623,
    'vote_average': 7.9,
    'overview': 'When the powers of a single hero are not enough to save the world, the world’s greatest heroes—Iron Man, Thor, Captain America, The Hulk, Ant-Man\/Giant Man and Wasp—assemble to form the Avengers.',
    'poster_path': '\/eLqsNPqt2Hd3wLmorBjK5gPV9Ks.jpg'
  },
  {
    'vote_count': 146,
    'popularity': 8.876,
    'id': 14609,
    'video': false,
    'media_type': 'movie',
    'vote_average': 6.5,
    'title': 'Ultimate Avengers',
    'release_date': '2006-02-21',
    'original_language': 'en',
    'original_title': 'Ultimate Avengers',
    'genre_ids': [
      28,
      16,
      12,
      878
    ],
    'backdrop_path': '\/mZO4V0ALx15QTgWr4SaXYGT7i60.jpg',
    'adult': false,
    'overview': 'When a nuclear missile was fired at Washington in 1945, Captain America managed to detonate it in the upper atmosphere. But then he fell miles into the icy depths of the North Atlantic, where he remained lost for over sixty years. But now, with the world facing the very same evil, Captain America must rise again as our last hope for survival.',
    'poster_path': '\/pmNYggLktcWHzQeCru5ywL4OiRH.jpg'
  },
  {
    'original_name': 'The Avengers',
    'id': 2473,
    'media_type': 'tv',
    'name': 'The Avengers',
    'popularity': 14.625,
    'vote_count': 52,
    'vote_average': 8,
    'first_air_date': '1961-01-07',
    'poster_path': '\/gVB7JDVkBXXJwoM1Sn9Zrqi20Sr.jpg',
    'genre_ids': [
      10759,
      80,
      10765
    ],
    'original_language': 'en',
    'backdrop_path': '\/zfjYRMricfBcRJXofrB5C9KNdP9.jpg',
    'overview': 'The Avengers is a British television series created in the 1960s. The Avengers initially focused on Dr. David Keel and his assistant John Steed. Hendry left after the first series and Steed became the main character, partnered with a succession of assistants. Steed\'s most famous assistants were intelligent, stylish and assertive women: Cathy Gale, Emma Peel, and later Tara King. Later episodes increasingly incorporated elements of science fiction and fantasy, parody and British eccentricity.',
    'origin_country': [
      'GB'
    ]
  },
  {
    'vote_count': 99,
    'popularity': 8.481,
    'id': 13437,
    'video': false,
    'media_type': 'movie',
    'vote_average': 5.2,
    'title': 'Avenging Angelo',
    'release_date': '2002-08-30',
    'original_language': 'en',
    'original_title': 'Avenging Angelo',
    'genre_ids': [
      28,
      35,
      80
    ],
    'backdrop_path': '\/yZV67sswwP9d5XnHgzlbr986QiK.jpg',
    'adult': false,
    'overview': 'A woman who has recently discovered that she is the daughter of Angelo, a major mafia boss, decides to wreak vengeance when he is killed by a hitman. She\'s aided by his faithful bodyguard, with whom she soon falls in love.',
    'poster_path': '\/hl4mI28D4NhE6ePNgPojQuyEYw7.jpg'
  },
  {
    'vote_count': 215,
    'popularity': 7.019,
    'id': 15239,
    'video': false,
    'media_type': 'movie',
    'vote_average': 6.5,
    'title': 'The Toxic Avenger',
    'release_date': '1984-05-01',
    'original_language': 'en',
    'original_title': 'The Toxic Avenger',
    'genre_ids': [
      878,
      28,
      35,
      27
    ],
    'backdrop_path': '\/7qAk9JKiAfFKVVvHdEzBSICKxFD.jpg',
    'adult': false,
    'overview': 'Tromaville has a monstrous new hero. The Toxic Avenger is born when mop boy Melvin Junko falls into a vat of toxic waste. Now evildoers will have a lot to lose.',
    'poster_path': '\/z9RHyAvshVHgJE5Qe7Iu3EmxFgU.jpg'
  },
  {
    'vote_count': 128,
    'popularity': 8.099,
    'id': 14611,
    'video': false,
    'media_type': 'movie',
    'vote_average': 6.4,
    'title': 'Ultimate Avengers 2',
    'release_date': '2006-08-08',
    'original_language': 'en',
    'original_title': 'Ultimate Avengers 2',
    'genre_ids': [
      12,
      16,
      28,
      878
    ],
    'backdrop_path': '\/85NqI4WuCim6dZexmTPUAi13Af0.jpg',
    'adult': false,
    'overview': 'Mysterious Wakanda lies in the darkest heart of Africa, unknown to most of the world. An isolated land hidden behind closed borders, fiercely protected by its young king - the Black Panther. But when brutal alien invaders attack, the threat leaves the Black Panther with no option but to go against the sacred decrees of his people and ask for help from outsiders.',
    'poster_path': '\/u7vvexSU81Qk20yU7Vog23Ogob.jpg'
  },
  {
    'poster_path': '\/nbwvR5cfvxMtvWowIiwazVaaTVz.jpg',
    'popularity': 7.872,
    'vote_count': 82,
    'video': false,
    'media_type': 'movie',
    'id': 14613,
    'adult': false,
    'backdrop_path': '\/8N91uYwrr1uepEKbmym1tgfXlzS.jpg',
    'original_language': 'en',
    'original_title': 'Next Avengers: Heroes of Tomorrow',
    'genre_ids': [
      16,
      10751
    ],
    'title': 'Next Avengers: Heroes of Tomorrow',
    'vote_average': 6.2,
    'overview': 'The children of the Avengers hone their powers and go head to head with the very enemy responsible for their parents\' demise.',
    'release_date': '2008-09-02'
  },
  {
    'vote_count': 55,
    'popularity': 4.685,
    'id': 27601,
    'video': false,
    'media_type': 'movie',
    'vote_average': 6.5,
    'title': 'Citizen Toxie: The Toxic Avenger IV',
    'release_date': '2001-11-01',
    'original_language': 'en',
    'original_title': 'Citizen Toxie: The Toxic Avenger IV',
    'genre_ids': [
      35,
      27
    ],
    'backdrop_path': '\/r6cwSfNPL8Q8bBY5PNNDbVmDzU7.jpg',
    'adult': false,
    'overview': 'When the notorious Diaper Mafia take hostage the Tromaville School for the Very Special, only the Toxic Avenger and his morbidly obese sidekick Lardass can save Tromaville.',
    'poster_path': '\/evB9pQHF1qR2UQtuApbaigcZwG5.jpg'
  },
  {
    'poster_path': '\/6zBkbmqB857edSNt08fJpv1Tqqt.jpg',
    'popularity': 6.641,
    'vote_count': 104,
    'video': false,
    'media_type': 'movie',
    'id': 257346,
    'adult': false,
    'backdrop_path': '\/kI1AdjSl2o038FQRZTuOqOlZ9VN.jpg',
    'original_language': 'ja',
    'original_title': 'アベンジャーズ コンフィデンシャル：ブラック・ウィドウ ＆ パニッシャー',
    'genre_ids': [
      28,
      16,
      878
    ],
    'title': 'Avengers Confidential: Black Widow & Punisher',
    'vote_average': 5.8,
    'overview': 'When the Punisher takes out a black-market weapons dealer, he stumbles upon a far-reaching terrorist plot devised by a group known as Leviathan.',
    'release_date': '2014-03-25'
  },
  {
    'original_name': 'Avenger',
    'id': 21277,
    'media_type': 'tv',
    'name': 'Avenger',
    'popularity': 3.504,
    'vote_count': 0,
    'vote_average': 0,
    'first_air_date': '2003-10-02',
    'poster_path': '\/hO21A0vjPq7mrIV26EXBbi6wYYz.jpg',
    'genre_ids': [
      10765,
      16
    ],
    'original_language': 'en',
    'backdrop_path': '\/gUTNnvwN3hXtraVy60ue3xTVu91.jpg',
    'overview': 'Avenger is an anime series, produced by Bandai Visual, Bee Train and Xebec, and directed by Koichi Mashimo. It is set on post-apocalyptic colonized Mars. The series premiered across Japan between 1 October 2003 and 24 December 2003 on the TV Tokyo network. It was later licensed for North American distribution by Bandai\'s distributive unit across the region, Bandai Entertainment.',
    'origin_country': [
      'JP'
    ]
  },
  {
    'vote_count': 7,
    'popularity': 2.65,
    'id': 47369,
    'video': false,
    'media_type': 'movie',
    'vote_average': 6.6,
    'title': 'Avenger',
    'release_date': '2006-04-09',
    'original_language': 'en',
    'original_title': 'Avenger',
    'genre_ids': [
      10770,
      28,
      53
    ],
    'backdrop_path': '\/d3qo3GJxvhZPRR8N22wDPKPxTGF.jpg',
    'adult': false,
    'overview': 'After his own daughter was killed in Panama in 1994, former CIA agent Calvin Dexter became a private \'specialist\' in cases which wouldn\'t reach justice trough the regular legal channels. Two years later he accepts to find Richard \'Ricky\' Edmunds for his pa, influential rich businessman Stephen Edmonds. Ricky for a private Canadian war victims charity in Bosnia and went missing. Dexter discovers Ricky was beaten to pulp and drowned for no other crime then helping street boys from the other side by Zoran Zilic and his Serbian paramilitary \'order\'. He offers Steven to \'finish the job\' as such war criminals don\'t go to trial. But deputy CIA director Paul Devereaux cares only for a nuclear arms project he wants to use Zilic for. So CIA troubleshooter Frank McBride is ordered to protect him and handle Dexter.',
    'poster_path': '\/gub3U5fxRDFyiw8mxpErfcq03li.jpg'
  },
  {
    'vote_count': 22,
    'popularity': 5.487,
    'id': 521720,
    'video': false,
    'media_type': 'movie',
    'vote_average': 4,
    'title': 'Avengers Grimm: Time Wars',
    'release_date': '2018-05-01',
    'original_language': 'en',
    'original_title': 'Avengers Grimm: Time Wars',
    'genre_ids': [
      28,
      12,
      14
    ],
    'backdrop_path': '\/mdSrxMg4l6a76AFoBWmu7Q1X4Rt.jpg',
    'adult': false,
    'overview': 'When Rumpelstiltskin tries to take over Earth once and for all, The Avengers Grimm must track him down through time in order to defeat him.',
    'poster_path': '\/xfAcu74DRQXeM9XqFcE5MrSRzYP.jpg'
  }
]

describe('Search Page', () => {
  afterEach(() => { cleanup(); fetchMock.reset(); });

  const renderUi = () => 
      render(<MemoryRouter initialEntries={['/']}><Search /></MemoryRouter>, {baseElement: document.createElement('div')});

  test('happy path render', async () => {
    fetchMock.get('end:/search/?q=aveng', response);
    const { container, debug } = renderUi();
    const searchBar = container.querySelector('ion-searchbar');
    // fireEvent.ionChange(searchBar, 'aveng');
    debug();
    expect(container.querySelector('#result-list-undefined')).not.toBeNull();
  });
});