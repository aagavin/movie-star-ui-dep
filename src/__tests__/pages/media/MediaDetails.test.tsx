import { cleanup, fireEvent, render, waitForElement, waitForElementToBeRemoved } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import UserContext, { init } from '../../../context';
import MediaDetailsPage from '../../../pages/media/MediaDetails';

const movieResponse = {
  'certificate': {
    'certificate': 'PG',
    'certificateNumber': 30598,
    'country': 'US'
  },
  'filmingLocations': [
    {
      'extras': [
        'McCallister home'
      ],
      'id': '\/title\/tt0099785\/filminglocations\/lc0144007',
      'interestingVotes': {
        'down': 1,
        'up': 39
      },
      'location': '671 Lincoln Avenue, Winnetka, Illinois, USA'
    },
    {
      'extras': [
        'Mitch Murphy\'s house'
      ],
      'id': '\/title\/tt0099785\/filminglocations\/lc0144006',
      'interestingVotes': {
        'up': 12
      },
      'location': '656 Lincoln Avenue, Winnetka, Illinois, USA'
    },
    {
      'extras': [
        'pharmacy scene'
      ],
      'id': '\/title\/tt0099785\/filminglocations\/lc0144016',
      'interestingVotes': {
        'up': 9
      },
      'location': 'Panera Bread Company--formerly Hubbard Woods Pharmacy - 940 Green Bay Rd., Winnetka, Illinois, USA'
    },
    {
      'id': '\/title\/tt0099785\/filminglocations\/lc0144018',
      'interestingVotes': {
        'up': 9
      },
      'location': 'Trinity Methodist Church - 1024 W. Lake Avenue, Wilmette, Illinois, USA'
    },
    {
      'id': '\/title\/tt0099785\/filminglocations\/lc0144015',
      'interestingVotes': {
        'up': 8
      },
      'location': 'O\'Hare International Airport, Chicago, Illinois, USA'
    },
    {
      'extras': [
        'railroad track bridge scene'
      ],
      'id': '\/title\/tt0099785\/filminglocations\/lc0144014',
      'interestingVotes': {
        'up': 7
      },
      'location': 'Hubbard Woods Metra Station - 1065 Gage Street, Winnetka, Illinois, USA'
    },
    {
      'extras': [
        'Christmas choir scene'
      ],
      'id': '\/title\/tt0099785\/filminglocations\/lc0144012',
      'interestingVotes': {
        'down': 1,
        'up': 10
      },
      'location': 'Haven Middle School - 2417 Prairie Avenue, Evanston, Illinois, USA'
    },
    {
      'id': '\/title\/tt0099785\/filminglocations\/lc0144008',
      'interestingVotes': {
        'up': 6
      },
      'location': 'Chicago, Illinois, USA'
    },
    {
      'id': '\/title\/tt0099785\/filminglocations\/lc0144011',
      'interestingVotes': {
        'up': 6
      },
      'location': 'Grand Food Center - 606 Green Bay Rd., Winnetka, Illinois, USA'
    },
    {
      'id': '\/title\/tt0099785\/filminglocations\/lc0144020',
      'interestingVotes': {
        'up': 6
      },
      'location': 'Winnetka, Illinois, USA'
    },
    {
      'id': '\/title\/tt0099785\/filminglocations\/lc0144009',
      'interestingVotes': {
        'up': 5
      },
      'location': 'Evanston, Illinois, USA'
    },
    {
      'id': '\/title\/tt0099785\/filminglocations\/lc0144010',
      'interestingVotes': {
        'up': 5
      },
      'location': 'Grace Episcopal Church - 924 Lake Street, Oak Park, Illinois, USA'
    },
    {
      'id': '\/title\/tt0099785\/filminglocations\/lc0144013',
      'interestingVotes': {
        'up': 5
      },
      'location': 'Highland Park, Illinois, USA'
    },
    {
      'id': '\/title\/tt0099785\/filminglocations\/lc0144019',
      'interestingVotes': {
        'up': 5
      },
      'location': 'Wilmette, Illinois, USA'
    },
    {
      'extras': [
        'archive footage'
      ],
      'id': '\/title\/tt0099785\/filminglocations\/lc1285416',
      'interestingVotes': {
        'down': 2,
        'up': 6
      },
      'location': 'Paris, France'
    },
    {
      'id': '\/title\/tt0099785\/filminglocations\/lc1749332',
      'interestingVotes': {
        'up': 2
      },
      'location': 'Illinois, USA'
    },
    {
      'id': '\/title\/tt0099785\/filminglocations\/lc1749333',
      'interestingVotes': {
        'up': 2
      },
      'location': 'USA'
    },
    {
      'extras': [
        'Interior Home Set & Flooded Basement Set'
      ],
      'id': '\/title\/tt0099785\/filminglocations\/lc1856654',
      'interestingVotes': {
        'up': 1
      },
      'location': 'New Trier West High School, Northfield, Illinois, USA'
    }
  ],
  'metacriticInfo': {
    '@type': 'imdb.api.title.metacritic.score',
    'metaScore': 63,
    'metacriticUrl': 'https:\/\/www.metacritic.com\/movie\/home-alone?ftag=MCD-06-10aaa1c',
    'reviewCount': 9,
    'userRatingCount': 452,
    'userScore': 8.7
  },
  'plot': {
    'outline': {
      'author': 'tanm_86',
      'id': '\/title\/tt0099785\/plot\/po2204508',
      'text': 'An eight-year-old troublemaker must protect his house from a pair of burglars when he is accidentally left home alone by his family during Christmas vacation.'
    },
    'totalSummaries': 5
  },
  'principals': [
    {
      'id': '\/name\/nm0000346\/',
      'legacyNameText': 'Culkin, Macaulay',
      'name': 'Macaulay Culkin',
      'billing': 1,
      'category': 'actor',
      'characters': [
        'Kevin'
      ],
      'roles': [
        {
          'character': 'Kevin',
          'characterId': '\/character\/ch0004114\/'
        }
      ],
      'image': {
        'height': 600,
        'id': '\/name\/nm0000346\/images\/rm2232127232',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMTM1NzUwMjY2M15BMl5BanBnXkFtZTcwOTI5MTMyMw@@._V1_.jpg',
        'width': 399
      }
    },
    {
      'id': '\/name\/nm0000582\/',
      'legacyNameText': 'Pesci, Joe',
      'name': 'Joe Pesci',
      'billing': 2,
      'category': 'actor',
      'characters': [
        'Harry'
      ],
      'roles': [
        {
          'character': 'Harry',
          'characterId': '\/character\/ch0004115\/'
        }
      ],
      'image': {
        'height': 2048,
        'id': '\/name\/nm0000582\/images\/rm3664216576',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMzc3MTcxNDYxNV5BMl5BanBnXkFtZTcwOTI3NjE1Mw@@._V1_.jpg',
        'width': 1360
      }
    },
    {
      'disambiguation': 'I',
      'id': '\/name\/nm0827663\/',
      'legacyNameText': 'Stern, Daniel (I)',
      'name': 'Daniel Stern',
      'billing': 3,
      'category': 'actor',
      'characters': [
        'Marv'
      ],
      'roles': [
        {
          'character': 'Marv',
          'characterId': '\/character\/ch0004118\/'
        }
      ],
      'image': {
        'height': 400,
        'id': '\/name\/nm0827663\/images\/rm3005974784',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMTI3NTcwNDcxMF5BMl5BanBnXkFtZTcwMTI3Mjc4Mg@@._V1_.jpg',
        'width': 297
      }
    },
    {
      'disambiguation': 'I',
      'id': '\/name\/nm0001334\/',
      'legacyNameText': 'Heard, John (I)',
      'name': 'John Heard',
      'billing': 4,
      'category': 'actor',
      'characters': [
        'Peter'
      ],
      'roles': [
        {
          'character': 'Peter'
        }
      ],
      'image': {
        'height': 543,
        'id': '\/name\/nm0001334\/images\/rm3218641408',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BNzczODkyNzY4OV5BMl5BanBnXkFtZTcwNTU0NjQzMQ@@._V1_.jpg',
        'width': 450
      }
    }
  ],
  'rating': 7.6,
  'numberOfVotes': 433754,
  'canRate': true,
  'topRank': {
    'rankType': 'topMovies',
    'rank': 915
  },
  'userRating': null,
  'alternateTitlesSample': [
    'Kevin sam w domu',
    'Homu aron',
    'Mi pobre angelito',
    'I Vetëm në Shtëpi',
    'Üksinda kodus',
    'Сам удома',
    'Один дома',
    'Tanha dar khaneh',
    'Sam u kuci',
    'Kevin - Allein zu Haus',
    'ホーム・アローン',
    'Sozinho em Casa',
    'Esqueceram de Mim',
    'Sám doma',
    'Maman, j\'ai raté l\'avion',
    'Maman, j\'ai raté l\'avion!',
    'Один удома',
    'Alene hjemme',
    'Sam u kući',
    'Ensam hemma',
    'Сам вкъщи',
    'Sam doma',
    'Vienas namuose',
    'Singur acasa',
    'Mi Pobre Angelito',
    'Yksin kotona',
    'Solo en casa',
    'Μόνος στο σπίτι',
    'Evde tek başına',
    'Reszkessetek, betörők!',
    'Monos sto spiti',
    'Sol a casa',
    'Mamma, ho perso l\'aereo'
  ],
  'alternateTitlesCount': 46,
  'hasAlternateVersions': true,
  'originalTitle': 'Home Alone',
  'runningTimes': [
    {
      'timeMinutes': 103
    }
  ],
  'spokenLanguages': [
    'en'
  ],
  'origins': [
    'US'
  ],
  'similaritiesCount': 15,
  'releaseDetails': {
    'date': '1990-11-16',
    'premiere': false,
    'region': 'US',
    'wide': true
  },
  'soundtracks': [
    {
      'comment': 'Music by John Williams\nLyrics by Leslie Bricusse',
      'id': '\/title\/tt0099785\/soundtracks\/sn0565545',
      'name': 'Somewhere in My Memory',
      'relatedNames': [
        {
          'akas': [
            'John T. Williams Jr.',
            'John Williams Jr.',
            'John T. Williams',
            'Johnny Williams'
          ],
          'disambiguation': 'I',
          'id': '\/name\/nm0002354\/',
          'image': {
            'height': 400,
            'id': '\/name\/nm0002354\/images\/rm2416613888',
            'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMjY5MTgzMTQ1NF5BMl5BanBnXkFtZTYwNDg3OTcz._V1_.jpg',
            'width': 280
          },
          'legacyNameText': 'Williams, John (I)',
          'name': 'John Williams'
        },
        {
          'id': '\/name\/nm0108634\/',
          'legacyNameText': 'Bricusse, Leslie',
          'name': 'Leslie Bricusse'
        }
      ]
    },
    {
      'comment': 'Music by John Williams\nLyrics by Leslie Bricusse',
      'id': '\/title\/tt0099785\/soundtracks\/sn0565546',
      'name': 'Star of Bethlehem',
      'relatedNames': [
        {
          'akas': [
            'John T. Williams Jr.',
            'John Williams Jr.',
            'John T. Williams',
            'Johnny Williams'
          ],
          'disambiguation': 'I',
          'id': '\/name\/nm0002354\/',
          'image': {
            'height': 400,
            'id': '\/name\/nm0002354\/images\/rm2416613888',
            'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMjY5MTgzMTQ1NF5BMl5BanBnXkFtZTYwNDg3OTcz._V1_.jpg',
            'width': 280
          },
          'legacyNameText': 'Williams, John (I)',
          'name': 'John Williams'
        },
        {
          'id': '\/name\/nm0108634\/',
          'legacyNameText': 'Bricusse, Leslie',
          'name': 'Leslie Bricusse'
        }
      ]
    },
    {
      'comment': 'Written by Hugh Martin and Ralph Blane\nProduced by John Williams\nPerformed by Mel Tormé (as Mel Torme)\nCourtesy of Concord Records',
      'id': '\/title\/tt0099785\/soundtracks\/sn0565547',
      'name': 'Have Yourself a Merry Little Christmas',
      'relatedNames': [
        {
          'akas': [
            'The Martins'
          ],
          'disambiguation': 'I',
          'id': '\/name\/nm0552399\/',
          'image': {
            'height': 561,
            'id': '\/name\/nm0552399\/images\/rm339706625',
            'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BN2UwNzRjMzItYzQwYi00NmMzLTgzMjktYzhiOTgxMTllMjUxXkEyXkFqcGdeQXVyMTcyODY2NDQ@._V1_.jpg',
            'width': 1000
          },
          'legacyNameText': 'Martin, Hugh (I)',
          'name': 'Hugh Martin'
        },
        {
          'akas': [
            'The Martins'
          ],
          'id': '\/name\/nm0087433\/',
          'image': {
            'height': 972,
            'id': '\/name\/nm0087433\/images\/rm121602817',
            'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BOTQzNGMwOWMtMWM0Mi00NmY2LWFmZDYtOTVmYTEwMjg4YTBiXkEyXkFqcGdeQXVyMTcyODY2NDQ@._V1_.jpg',
            'width': 653
          },
          'legacyNameText': 'Blane, Ralph',
          'name': 'Ralph Blane'
        },
        {
          'akas': [
            'John T. Williams Jr.',
            'John Williams Jr.',
            'John T. Williams',
            'Johnny Williams'
          ],
          'disambiguation': 'I',
          'id': '\/name\/nm0002354\/',
          'image': {
            'height': 400,
            'id': '\/name\/nm0002354\/images\/rm2416613888',
            'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMjY5MTgzMTQ1NF5BMl5BanBnXkFtZTYwNDg3OTcz._V1_.jpg',
            'width': 280
          },
          'legacyNameText': 'Williams, John (I)',
          'name': 'John Williams'
        },
        {
          'akas': [
            'Mel & Janette',
            'Mel Torme and the Meltones',
            'Mel Torme',
            'Mr. Mel Torme',
            'Mr. Mel Tormé',
            'Mel Torne'
          ],
          'id': '\/name\/nm0868123\/',
          'image': {
            'height': 450,
            'id': '\/name\/nm0868123\/images\/rm579966976',
            'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMjA5ODA2ODk3Nl5BMl5BanBnXkFtZTYwNTI4NjI2._V1_.jpg',
            'width': 346
          },
          'legacyNameText': 'Tormé, Mel',
          'name': 'Mel Tormé'
        }
      ]
    },
    {
      'comment': 'Written by Charles Brown and Gene Redd\nProduced and Performed by Southside Johnny Lyon\nCourtesy of Cypress Records',
      'id': '\/title\/tt0099785\/soundtracks\/sn0565548',
      'name': 'Please Come Home for Christmas',
      'relatedNames': [
        {
          'disambiguation': 'III',
          'id': '\/name\/nm0113226\/',
          'legacyNameText': 'Brown, Charles (III)',
          'name': 'Charles Brown'
        },
        {
          'akas': [
            'Eugene Redd',
            'Gene S. Redd'
          ],
          'id': '\/name\/nm0714657\/',
          'legacyNameText': 'Redd, Gene',
          'name': 'Gene Redd'
        },
        {
          'akas': [
            'Southside Johnny with La Bamba\'s Big Band',
            'Southside Johnny',
            'Southside Johnny & the Asbury Juikes',
            'Southside Johnny and the Ashbury Jukes',
            'John Lyon'
          ],
          'id': '\/name\/nm0528984\/',
          'image': {
            'height': 433,
            'id': '\/name\/nm0528984\/images\/rm3339138560',
            'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BYTMzZTFlZDYtYWY2NS00MTQwLTg0MGQtMzNkNWM2YTg5NGMwXkEyXkFqcGdeQXVyNTI5NjIyMw@@._V1_.jpg',
            'width': 655
          },
          'legacyNameText': 'Lyon, Southside Johnny',
          'name': 'Southside Johnny Lyon'
        }
      ]
    },
    {
      'comment': 'Written by Irving Berlin\nPerformed by The Drifters\nCourtesy of Atlantic Recording Corp.\nBy Arrangement with Warner Special Products',
      'id': '\/title\/tt0099785\/soundtracks\/sn0565549',
      'name': 'White Christmas',
      'relatedNames': [
        {
          'disambiguation': 'I',
          'id': '\/name\/nm0000927\/',
          'image': {
            'height': 450,
            'id': '\/name\/nm0000927\/images\/rm4070217728',
            'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMTgwNTU4Mjg2NV5BMl5BanBnXkFtZTYwMjk0MzI2._V1_.jpg',
            'width': 355
          },
          'legacyNameText': 'Berlin, Irving (I)',
          'name': 'Irving Berlin'
        },
        {
          'id': '\/name\/nm1148513\/',
          'legacyNameText': 'Drifters, The',
          'name': 'The Drifters'
        }
      ]
    },
    {
      'comment': 'Written by Johnny Marks\nPerformed by Brenda Lee\nCourtesy of MCA Records',
      'id': '\/title\/tt0099785\/soundtracks\/sn0565550',
      'name': 'Rockin\' Around the Christmas Tree',
      'products': [
        {
          'artist': 'Brenda Lee',
          'format': 'digital',
          'image': {
            'height': 496,
            'url': 'http:\/\/ecx.images-amazon.com\/images\/I\/516H%2Bpj5t1L.jpg',
            'width': 500
          },
          'productId': {
            'amazonMarketplaceId': 'ATVPDKIKX0DER',
            'key': 'B001NCHCOQ',
            'keyType': 'ASIN',
            'region': 'US'
          }
        }
      ],
      'relatedNames': [
        {
          'akas': [
            'John Marks'
          ],
          'disambiguation': 'II',
          'id': '\/name\/nm0548869\/',
          'legacyNameText': 'Marks, Johnny (II)',
          'name': 'Johnny Marks'
        },
        {
          'disambiguation': 'I',
          'id': '\/name\/nm0496909\/',
          'image': {
            'height': 480,
            'id': '\/name\/nm0496909\/images\/rm1447262208',
            'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BOTVjZDhlM2YtZmVlMy00YmIyLThjYzgtZDA0OTZhNmY0MWY0XkEyXkFqcGdeQXVyMTEwODg2MDY@._V1_.jpg',
            'width': 640
          },
          'legacyNameText': 'Lee, Brenda (I)',
          'name': 'Brenda Lee'
        }
      ]
    },
    {
      'comment': 'Written by Johnny Marks\nPerformed by Chuck Berry\nCourtesy of MCA Records',
      'id': '\/title\/tt0099785\/soundtracks\/sn0565551',
      'name': 'Run Rudolph Run',
      'relatedNames': [
        {
          'akas': [
            'John Marks'
          ],
          'disambiguation': 'II',
          'id': '\/name\/nm0548869\/',
          'legacyNameText': 'Marks, Johnny (II)',
          'name': 'Johnny Marks'
        },
        {
          'disambiguation': 'I',
          'id': '\/name\/nm0001946\/',
          'image': {
            'height': 2048,
            'id': '\/name\/nm0001946\/images\/rm1577428992',
            'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMTM4NzgyNzIwMV5BMl5BanBnXkFtZTcwMzgzMTUzOA@@._V1_.jpg',
            'width': 1521
          },
          'legacyNameText': 'Berry, Chuck (I)',
          'name': 'Chuck Berry'
        }
      ]
    },
    {
      'comment': 'Written by Dr. Seuss (as Theodore Giesl) and Albert Hague\nPerformed by Thurl Ravenscroft (uncredited)',
      'id': '\/title\/tt0099785\/soundtracks\/sn0565552',
      'name': 'You\'re a Mean One, Mr. Grinch',
      'relatedNames': [
        {
          'akas': [
            'Dr. Theodor S. Geisel',
            'Ted Geisel',
            'Theodor S. Geisel',
            'Theodor Seuss Geisel',
            'Theodor Geisel',
            'Theo LeSieg'
          ],
          'id': '\/name\/nm0317450\/',
          'image': {
            'height': 500,
            'id': '\/name\/nm0317450\/images\/rm1916450304',
            'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMTU5NTY0MDQyM15BMl5BanBnXkFtZTcwMzk3MzE1Nw@@._V1_.jpg',
            'width': 331
          },
          'legacyNameText': 'Seuss, Dr.',
          'name': 'Dr. Seuss'
        },
        {
          'id': '\/name\/nm0353831\/',
          'image': {
            'height': 1390,
            'id': '\/name\/nm0353831\/images\/rm3036326656',
            'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMTk2NzQ5MDEwNF5BMl5BanBnXkFtZTcwNDc3NTAxOA@@._V1_.jpg',
            'width': 988
          },
          'legacyNameText': 'Hague, Albert',
          'name': 'Albert Hague'
        },
        {
          'akas': [
            'The Mellomen',
            'Thurl Arthur Ravenscroft',
            'The Sportsman Quartette',
            'The Sportsmen'
          ],
          'id': '\/name\/nm0712391\/',
          'legacyNameText': 'Ravenscroft, Thurl',
          'name': 'Thurl Ravenscroft'
        }
      ]
    },
    {
      'comment': 'Written by Haven Gillespie and J. Fred Coots',
      'id': '\/title\/tt0099785\/soundtracks\/sn0565553',
      'name': 'Santa Claus Is Comin\' to Town',
      'products': [
        {
          'artist': 'Bing Crosby & The Andrews Sisters',
          'format': 'digital',
          'image': {
            'height': 497,
            'url': 'http:\/\/ecx.images-amazon.com\/images\/I\/61PPjY-EdrL.jpg',
            'width': 500
          },
          'productId': {
            'amazonMarketplaceId': 'ATVPDKIKX0DER',
            'key': 'B000W07HM2',
            'keyType': 'ASIN',
            'region': 'US'
          }
        }
      ],
      'relatedNames': [
        {
          'akas': [
            'HAven GiLLespie'
          ],
          'id': '\/name\/nm0318939\/',
          'legacyNameText': 'Gillespie, Haven',
          'name': 'Haven Gillespie'
        },
        {
          'akas': [
            'J. FRed CooTs'
          ],
          'id': '\/name\/nm0178512\/',
          'legacyNameText': 'Coots, J. Fred',
          'name': 'J. Fred Coots'
        }
      ]
    },
    {
      'comment': 'Music by Mykola Dmytrovych Leontovych and lyrics by Peter Wilhousky',
      'id': '\/title\/tt0099785\/soundtracks\/sn0565554',
      'name': 'Carol of the Bells',
      'relatedNames': [
        {
          'akas': [
            'Mykola Leontovych'
          ],
          'id': '\/name\/nm3466973\/',
          'legacyNameText': 'Leontovych, Mykola Dmytrovych',
          'name': 'Mykola Dmytrovych Leontovych'
        },
        {
          'id': '\/name\/nm0928998\/',
          'legacyNameText': 'Wilhousky, Peter',
          'name': 'Peter Wilhousky'
        }
      ]
    },
    {
      'comment': '("Cantique de Noël")\nMusic by Adolphe Adam\nLyrics by Placide Cappeau ; English words by John Sullivan Dwight',
      'id': '\/title\/tt0099785\/soundtracks\/sn0862680',
      'name': 'O Holy Night',
      'relatedNames': [
        {
          'akas': [
            'Adolphe-Charles Adam',
            'Adolph Adam'
          ],
          'id': '\/name\/nm0010512\/',
          'legacyNameText': 'Adam, Adolphe',
          'name': 'Adolphe Adam'
        },
        {
          'akas': [
            'Placide Cappeau de Roquemaure'
          ],
          'id': '\/name\/nm8668731\/',
          'legacyNameText': 'Cappeau, Placide',
          'name': 'Placide Cappeau'
        }
      ]
    }
  ],
  'genres': [
    'Comedy',
    'Family'
  ],
  'reviewsTeaser': {
    'author': {
      'displayName': 'Toronto85',
      'userId': '\/user\/ur13553385\/'
    },
    'authorRating': 8,
    'helpfulnessScore': 0.5291125506,
    'id': '\/title\/tt0099785\/userreviews\/rw2721290',
    'interestingVotes': {
      'down': 1,
      'up': 7
    },
    'languageCode': 'eng',
    'reviewText': 'An eight year old boy is left home alone at Christmas when his family leave for a France vacation, not realizing he isn\'t on the plane with them. Two crooks attempt to rob the family home, and it is up to Kevin to protect the place! Home Alone is one of my all time favourite Christmas movies, I couldn\'t get enough of it as a kid growing up. There was something powerful as a child seeing another child around the same age face the bad guys and be able to defeat them. \n\nHome Alone is basically about a family that leaves for vacation, but in the rush of getting out on time they forget that young Kevin McCallister was not with them on their way to the airport. So while they take off for Paris, Kevin wakes up to find that he is all alone in this gigantic house. It\'s all fun and games at first for Kevin, until he discovers that a pair of thieves plan on robbing his house thinking that the place is empty. Whiz kid Kevin sets up a number of booby traps and set ups that severely injure the bandits. Examples include one of the thieves named Harry getting his head set on fire, the other Marv gets hit in the head with an iron. These kind of stunts could kill a person in real life, but the magic of movies allows the bandits to shake it off and continue their mischief.\n\nThe acting in Home Alone is top notch! Macaulay Culkin is brilliant as Kevin McCallister, the scared yet empowered young boy who takes on the "Wet Bandits". Those bandits are played by Joe Pesci and Daniel Stern who add so much to the film with their performance. And you get some good screen time from stars such as Catherine O\'Hara, John Heard and even John Candy. The traps that Kevin sets are smart and witty, and the location shots are perfect for the tricks he has planned for Harry and Marv.\n\nAll in all Home Alone is a classic film not only for Christmastime, but all year round. This should be seen by everyone at least once.\n\n8\/10',
    'reviewTitle': 'Home Alone',
    'spoiler': false,
    'submissionDate': '2012-12-17',
    'titleId': '\/title\/tt0099785\/'
  },
  'reviewsCount': 405,
  'hasContentGuide': true,
  'hasSynopsis': true,
  'hasCriticsReviews': true,
  'criticsReviewers': [
    'Roger Ebert',
    'Hal Hinson',
    'Jeanne Cooper',
    'Kevin Carr',
    'Sonia Cerca'
  ],
  'crazyCreditsTeaser': null,
  'awards': {
    'awardsSummary': {
      'highlighted': {
        'awardName': 'Oscar',
        'count': 2,
        'eventId': '\/event\/ev0000003\/',
        'isWinner': false
      },
      'otherNominationsCount': 4,
      'otherWinsCount': 10
    },
    'highlightedCategory': null
  },
  'photos': {
    'images': [
      {
        'caption': 'Still of Joe Pesci and Daniel Stern (I) in Home Alone (1990)',
        'createdOn': '2019-11-29T09:28:27Z',
        'height': 1036,
        'id': '\/title\/tt0099785\/images\/rm3347549441',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMjc3YTlmNzEtN2Q0Yi00MmFjLWI1OWItNjRhOGZjY2RiZjk0XkEyXkFqcGdeQXVyMjMzMDI4MjQ@._V1_.jpg',
        'width': 1920,
        'relatedNamesIds': [
          '\/name\/nm0000582\/',
          '\/name\/nm0827663\/'
        ],
        'relatedTitlesIds': [
          '\/title\/tt0099785\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      },
      {
        'caption': 'Still of Joe Pesci and Daniel Stern (I) in Home Alone (1990)',
        'createdOn': '2019-11-29T09:28:10Z',
        'height': 1036,
        'id': '\/title\/tt0099785\/images\/rm4203187457',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BYTEzNzM5M2QtMmU3ZC00ODI0LTg1YWEtZTg2MmUyYjZjMDAwXkEyXkFqcGdeQXVyMjMzMDI4MjQ@._V1_.jpg',
        'width': 1920,
        'relatedNamesIds': [
          '\/name\/nm0000582\/',
          '\/name\/nm0827663\/'
        ],
        'relatedTitlesIds': [
          '\/title\/tt0099785\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      },
      {
        'caption': 'Still of Daniel Stern (I) in Home Alone (1990)',
        'createdOn': '2019-11-29T09:27:52Z',
        'height': 1036,
        'id': '\/title\/tt0099785\/images\/rm4253519105',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BNWJiNWY1NjctMTA1Mi00YWYzLTg2ZGQtNTZiMDgzMzBjYzlmXkEyXkFqcGdeQXVyMjMzMDI4MjQ@._V1_.jpg',
        'width': 1920,
        'relatedNamesIds': [
          '\/name\/nm0827663\/'
        ],
        'relatedTitlesIds': [
          '\/title\/tt0099785\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      },
      {
        'caption': 'Still of Macaulay Culkin and Ken Hudson Campbell in Home Alone (1990)',
        'createdOn': '2019-11-29T09:27:35Z',
        'height': 1036,
        'id': '\/title\/tt0099785\/images\/rm4052192513',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BOTU3ZWFiNzUtYzUxOC00ODI2LWJmM2EtYmJlMThiZmYxNzIzXkEyXkFqcGdeQXVyMjMzMDI4MjQ@._V1_.jpg',
        'width': 1920,
        'relatedNamesIds': [
          '\/name\/nm0000346\/',
          '\/name\/nm0132637\/'
        ],
        'relatedTitlesIds': [
          '\/title\/tt0099785\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      },
      {
        'caption': 'Still of John Candy and Catherine O\'Hara (I) in Home Alone (1990)',
        'createdOn': '2019-11-29T09:26:19Z',
        'height': 1036,
        'id': '\/title\/tt0099785\/images\/rm3901197569',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BNTE3YWY1NTktN2M3Ny00ZWY5LWE5ZGMtNGJmZWZiNjA4OWRmXkEyXkFqcGdeQXVyMjMzMDI4MjQ@._V1_.jpg',
        'width': 1920,
        'relatedNamesIds': [
          '\/name\/nm0001006\/',
          '\/name\/nm0001573\/'
        ],
        'relatedTitlesIds': [
          '\/title\/tt0099785\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      },
      {
        'caption': 'Still of Daniel Stern (I) in Home Alone (1990)',
        'createdOn': '2019-11-29T09:26:02Z',
        'height': 1036,
        'id': '\/title\/tt0099785\/images\/rm3951529217',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BY2EwNmJmYTAtMmM5Zi00MjI0LTk2NDYtZGNjYzlmNzEzZDAyXkEyXkFqcGdeQXVyMjMzMDI4MjQ@._V1_.jpg',
        'width': 1920,
        'relatedNamesIds': [
          '\/name\/nm0827663\/'
        ],
        'relatedTitlesIds': [
          '\/title\/tt0099785\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      },
      {
        'caption': 'Still of Macaulay Culkin in Home Alone (1990)',
        'createdOn': '2019-11-29T09:25:43Z',
        'height': 1036,
        'id': '\/title\/tt0099785\/images\/rm4018638081',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BOGM0NGM4MGItOTYzZS00OWFlLWIyZGUtMDE4NGJkMDE4YjZkXkEyXkFqcGdeQXVyMjMzMDI4MjQ@._V1_.jpg',
        'width': 1920,
        'relatedNamesIds': [
          '\/name\/nm0000346\/'
        ],
        'relatedTitlesIds': [
          '\/title\/tt0099785\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      },
      {
        'caption': 'Still of Devin Ratray in Home Alone (1990)',
        'createdOn': '2019-11-29T09:25:23Z',
        'height': 1036,
        'id': '\/title\/tt0099785\/images\/rm3783757057',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BZGJiZDk4ZmMtYjM3My00M2I0LTlkMDItYjA2ODEyM2ZhYjE1XkEyXkFqcGdeQXVyMjMzMDI4MjQ@._V1_.jpg',
        'width': 1920,
        'relatedNamesIds': [
          '\/name\/nm0711864\/'
        ],
        'relatedTitlesIds': [
          '\/title\/tt0099785\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      },
      {
        'caption': 'Still of Macaulay Culkin, Joe Pesci and Daniel Stern (I) in Home Alone (1990)',
        'createdOn': '2019-11-29T09:25:03Z',
        'height': 1036,
        'id': '\/title\/tt0099785\/images\/rm3834088705',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BNDFlNTQ3NTgtMGRmYi00NmU4LThjNjMtZGRkYjQxZGY5MmRiXkEyXkFqcGdeQXVyMjMzMDI4MjQ@._V1_.jpg',
        'width': 1920,
        'relatedNamesIds': [
          '\/name\/nm0000346\/',
          '\/name\/nm0000582\/',
          '\/name\/nm0827663\/'
        ],
        'relatedTitlesIds': [
          '\/title\/tt0099785\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      },
      {
        'caption': 'Still of Roberts Blossom in Home Alone (1990)',
        'createdOn': '2019-11-29T09:24:43Z',
        'height': 1036,
        'id': '\/title\/tt0099785\/images\/rm3867643137',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BYTMyMjU0NmItMTYzMS00MDk4LWE5OTktMTkwNWVjZjJlYWIzXkEyXkFqcGdeQXVyMjMzMDI4MjQ@._V1_.jpg',
        'width': 1920,
        'relatedNamesIds': [
          '\/name\/nm0089348\/'
        ],
        'relatedTitlesIds': [
          '\/title\/tt0099785\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      }
    ],
    'totalImageCount': 136
  },
  'heroImages': [
    {
      'caption': 'Still of Macaulay Culkin in Home Alone (1990)',
      'createdOn': '2019-09-17T19:48:26Z',
      'height': 576,
      'id': '\/title\/tt0099785\/images\/rm2319488001',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BYWQzMDE4ODEtMWM3Mi00N2QxLTg5OGYtOGM1YjgwMTQ2NTkzXkEyXkFqcGdeQXVyOTc5MDI5NjE@._V1_.jpg',
      'width': 1024,
      'source': 'userupload',
      'type': 'still_frame'
    },
    {
      'caption': 'Still of Joe Pesci and Senta Moses Mikan in Home Alone (1990)',
      'createdOn': '2018-08-18T03:00:40Z',
      'height': 688,
      'id': '\/title\/tt0099785\/images\/rm4881152',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BZGFjNzFkYzYtODZhMy00ZDVhLTliNDYtMjRjNzZkODk5MjUyXkEyXkFqcGdeQXVyOTk3MDYxNw@@._V1_.jpg',
      'width': 1280,
      'source': 'userupload',
      'type': 'still_frame'
    },
    {
      'caption': 'Still of Macaulay Culkin, Joe Pesci and Daniel Stern (I) in Home Alone (1990)',
      'createdOn': '2019-11-29T09:25:03Z',
      'height': 1036,
      'id': '\/title\/tt0099785\/images\/rm3834088705',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BNDFlNTQ3NTgtMGRmYi00NmU4LThjNjMtZGRkYjQxZGY5MmRiXkEyXkFqcGdeQXVyMjMzMDI4MjQ@._V1_.jpg',
      'width': 1920,
      'source': 'userupload',
      'type': 'still_frame'
    },
    {
      'caption': 'Still of Macaulay Culkin in Home Alone (1990)',
      'createdOn': '2019-05-27T09:22:32Z',
      'height': 1036,
      'id': '\/title\/tt0099785\/images\/rm2076220161',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BYWE3MTRkODktNjcyYy00MWY1LTgxMDctNDVhNzgzNDc0NjE2XkEyXkFqcGdeQXVyMjMzMDI4MjQ@._V1_.jpg',
      'width': 1920,
      'source': 'userupload',
      'type': 'still_frame'
    },
    {
      'caption': 'Still of Macaulay Culkin in Home Alone (1990)',
      'createdOn': '2019-11-29T09:25:43Z',
      'height': 1036,
      'id': '\/title\/tt0099785\/images\/rm4018638081',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BOGM0NGM4MGItOTYzZS00OWFlLWIyZGUtMDE4NGJkMDE4YjZkXkEyXkFqcGdeQXVyMjMzMDI4MjQ@._V1_.jpg',
      'width': 1920,
      'source': 'userupload',
      'type': 'still_frame'
    },
    {
      'caption': 'Still of Daniel Stern (I) in Home Alone (1990)',
      'createdOn': '2019-09-17T19:50:28Z',
      'height': 576,
      'id': '\/title\/tt0099785\/images\/rm3846214657',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMTAxMmRjNGMtZWUwNS00OWFhLWI2NTItZmRhMTdjMTYzZDhjXkEyXkFqcGdeQXVyOTc5MDI5NjE@._V1_.jpg',
      'width': 1024,
      'source': 'userupload',
      'type': 'still_frame'
    },
    {
      'caption': 'Still of Macaulay Culkin in Home Alone (1990)',
      'createdOn': '2018-11-15T11:33:04Z',
      'height': 1369,
      'id': '\/title\/tt0099785\/images\/rm756838400',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMzI3MDgzMTE3Nl5BMl5BanBnXkFtZTgwNjQxOTU3NjM@._V1_.jpg',
      'width': 2048,
      'relatedGroups': [
        '\/images\/group\/rg1840945920'
      ],
      'source': 'presskit',
      'type': 'still_frame'
    },
    {
      'caption': 'Home Alone (1990)',
      'createdOn': '2019-09-17T19:45:24Z',
      'height': 576,
      'id': '\/title\/tt0099785\/images\/rm3124794369',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BYjdhZDc3ZWItNmI0MS00MmVjLWI1ZTMtZDlmNjlhNjRlNmZkXkEyXkFqcGdeQXVyOTc5MDI5NjE@._V1_.jpg',
      'width': 1024,
      'source': 'userupload',
      'type': 'still_frame'
    },
    {
      'caption': 'Still of Joe Pesci and Daniel Stern (I) in Home Alone (1990)',
      'createdOn': '2018-11-15T11:33:05Z',
      'height': 1389,
      'id': '\/title\/tt0099785\/images\/rm857501696',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMjQ0MzQ4NTczN15BMl5BanBnXkFtZTgwNjUxOTU3NjM@._V1_.jpg',
      'width': 2048,
      'relatedGroups': [
        '\/images\/group\/rg1840945920'
      ],
      'source': 'presskit',
      'type': 'still_frame'
    },
    {
      'caption': 'Still of Joe Pesci and Daniel Stern (I) in Home Alone (1990)',
      'createdOn': '2019-11-29T09:28:10Z',
      'height': 1036,
      'id': '\/title\/tt0099785\/images\/rm4203187457',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BYTEzNzM5M2QtMmU3ZC00ODI0LTg1YWEtZTg2MmUyYjZjMDAwXkEyXkFqcGdeQXVyMjMzMDI4MjQ@._V1_.jpg',
      'width': 1920,
      'source': 'userupload',
      'type': 'still_frame'
    }
  ],
  'seasonsInfo': [],
  'productionStatus': {
    'comment': 'Derived from earliest release of 1990-11-10 (US)',
    'date': '1990-11-10',
    'status': 'released'
  },
  'directors': [
    {
      'disambiguation': 'I',
      'id': '\/name\/nm0001060\/',
      'image': {
        'height': 400,
        'id': '\/name\/nm0001060\/images\/rm2179439360',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMTY2MTYzNzUyNl5BMl5BanBnXkFtZTYwMDI0NzA0._V1_.jpg',
        'width': 276
      },
      'legacyNameText': 'Columbus, Chris (I)',
      'name': 'Chris Columbus',
      'category': 'director'
    }
  ],
  'writers': [
    {
      'akas': [
        'Edmond Dantes',
        'Edmond Dantès'
      ],
      'disambiguation': 'I',
      'id': '\/name\/nm0000455\/',
      'image': {
        'height': 400,
        'id': '\/name\/nm0000455\/images\/rm3200878848',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMTExMzMxNDE4MzdeQTJeQWpwZ15BbWU3MDI5NjI2NzI@._V1_.jpg',
        'width': 269
      },
      'legacyNameText': 'Hughes, John (I)',
      'name': 'John Hughes',
      'category': 'writer',
      'job': 'written by',
      'writerCategoryBilling': 1,
      'writerTeamBilling': 1
    }
  ],
  'videos': {
    'totalVideoCount': 8,
    'mainTrailer': {
      'contentType': 'Trailer',
      'description': 'Home Video Trailer from 20th Century Fox Home Entertainment',
      'durationSeconds': 132,
      'encodings': [
        {
          'definition': 'auto',
          'heightPixels': 396,
          'mimeType': 'application\/x-mpegURL',
          'play': 'https:\/\/imdb-video.media-imdb.com\/vi2477195545\/hls-1564115408814-master.m3u8?Expires=1577982756&Signature=do4LLYCxCOSz7sJQ4FA0-aE4JhedvjPm3aOXQFrH2VDEcngVlWimQBDYSjgesObjLNKjjECeF4Tv8b4rj3ntk5HnMfBWMxUJosS0JPBD1Ma9gieOlIuNz6By7-ZkZp22UadpRrDPD0HyKbLMGOeQl~BVYFJxLYYywAZdPcpda0ZVOTeeisIGYG4xXCFU7-ZbQAKM-W2hF29JyAgNGbQ9gidBjOKbTlzKm2Sq42QHnSguTTFWBtizENhKOw7PixS4vEK3qB1xfSV7qZOiRGLB0EE--D4tJfELdJv4vNMDqxkateQSxrttDxg7U1U9Nm2eJnIz7VPw1CC2ioru9Ysffg__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
          'videoCodec': 'avc-bp',
          'widthPixels': 528
        },
        {
          'definition': '480p',
          'heightPixels': 480,
          'mimeType': 'video\/mp4',
          'play': 'https:\/\/imdb-video.media-imdb.com\/vi2477195545\/1434659607842-pgv4ql-1564115408814.mp4?Expires=1577982756&Signature=YKUY4u~gMmxwEclojdY5E02BDBmMnLV8ZhH-8SI1Mf1sr5Km7ulFvvh~mWnxr5dvyoVtoDWqifLfcdM3SxYmiMTJXudsNd66rhiWUlsQbnHR4zyay7Td55snWHeeNDc5hWcuPXhbBWscft68C50-XTtiOiu9HZqS18vyRdcSKRzkwKL10nqixbrjhmP2lILeqSCY0t7aARK1yLtsYkx4WXKdvxc0OZm4e57SyYuvPzi2NYtMart~3idI~4IwHNoBnEeC7KlzpCvvdCp0HLMueb~pJNSTiX2AsMyE7ZpfvmX8GU~BuIqLdo9lWV48n73--IbKzdQtcC9ePrUJNkIY1Q__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
          'videoCodec': 'avc-cbp',
          'widthPixels': 640
        },
        {
          'definition': 'SD',
          'heightPixels': 320,
          'mimeType': 'video\/mp4',
          'play': 'https:\/\/imdb-video.media-imdb.com\/vi2477195545\/1434659454657-dx9ykf-1564115408814.mp4?Expires=1577982756&Signature=lbXo9-WqvqN2NDkfyPpAMREyGkDS2oSGjSwa4Fo8guD2-oatMD8fqqqogNPTYTOy8CU4MPikb718iwt6oljFpO9ZNPsZVQFzy9HbRdnhfULeeyB3gX0iOJQ6JC64uILtOSBl0n5w3935uQDyg6UcWuhbcsDhjLFG6eRrLspmcvYZgDVWqOgCZuKxKNc~jdsG46RMRDhlDp5wG49TxNmqiVbuoXE7V-Ux9m3CjcvPtrK8ldTuKeLWd4-uJxK~aegvYLvia~rKPUrfYKIKiY13njiKgtw4i0Q2LevzORDrBaffhs1p9ivzNEAS0SLe-Td-85wRrre3ll~nOKMmSLATGg__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
          'videoCodec': 'avc-cbp',
          'widthPixels': 426
        }
      ],
      'id': '\/video\/imdb\/vi2477195545',
      'image': {
        'height': 360,
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BNWJkMzllOWEtN2QwNS00MGY0LWI4ZDItYTRiYzE3ZmZiZGI1XkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_.jpg',
        'width': 480
      },
      'interestingVotes': {
        'up': 18
      },
      'primaryTitle': {
        'id': '\/title\/tt0099785\/',
        'image': {
          'height': 1985,
          'id': '\/title\/tt0099785\/images\/rm3804584704',
          'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMzFkM2YwOTQtYzk2Mi00N2VlLWE3NTItN2YwNDg1YmY0ZDNmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
          'width': 1335
        },
        'title': 'Home Alone',
        'titleType': 'movie',
        'year': 1990
      },
      'videoTitle': 'Home Alone'
    },
    'heroVideos': [
      {
        'contentType': 'Trailer',
        'description': 'Home Video Trailer from 20th Century Fox Home Entertainment',
        'durationSeconds': 132,
        'encodings': [
          {
            'definition': 'auto',
            'heightPixels': 396,
            'mimeType': 'application\/x-mpegURL',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi2477195545\/hls-1564115408814-master.m3u8?Expires=1577982757&Signature=SehTHUklC32dqfr5yhPfSsWCLH~W~dpCv06-Zpmlhtx1CZPMr6E6YIiXjaF6Ke4uvZ5m--00LkOd8c66Qe8Z7uMFksR0sKD-4FsD2frpNTpiC8sxTLiXYNnRSrdFMQx972mORSI6FUbRWoqgOcGiecMTxNbJUa8UxZnoXjO1~oP7TqlbhDbcbN3IOBeuIRK5rr-FwlvnYdCBlR-mLu8PnCIfz7GEK9oqJiG-rcoxa4wX8OK4ZB2J4ZqEky2wwEeZZfsBXFom5-zXlrDU~erxmJdDuNMvx5xFkdfmk301tEfXaD6lQZqPTD43BGg7KCt~qKxxSzA2HO5J1R-REu8OEw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 528
          },
          {
            'definition': '480p',
            'heightPixels': 480,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi2477195545\/1434659607842-pgv4ql-1564115408814.mp4?Expires=1577982757&Signature=KtAD1queMSsG1eRUmHuz7I3YlPqs8CC5JMOU8-YJrWY5Elecksseeti5FUoXdk2C4UO9H~4UA2qSX~XnnGD4YL3BT2ZGqXH-bNV1FEbRZgGV9M9ZD6FCkWPMkaAMzMDELz5L4I0REAcMncvMJzKSjar-PbbkQrtFdV8t-uAB00dPF1v1M4r0SSJ6qFN4zvGSOl0gFFrx5vTlPORxspcpaCxgf3q7nJKLQLlnZlb0~3oQlrIspjYxm5Svayucxm5ddOOpdTlwnupwAXJhOF1AMX1C-ztuezlTFTzXmvuqR5YSzKq5vFOFq5vCOlXIA8B9QsiItyu9yMJtpihtagIr-g__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-cbp',
            'widthPixels': 640
          },
          {
            'definition': 'SD',
            'heightPixels': 320,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi2477195545\/1434659454657-dx9ykf-1564115408814.mp4?Expires=1577982757&Signature=Rd9ikbFFZx46HYV1c91QZg9xCZXG06QNkC1mW3yVe4xax7z1kG8r1xCtt2VnZjkq1Ah5oPE9ZyR7v7vqi4J9Aink3Q9gFSkiIpKd4hNhCX1QhKveA3gXDV50aIEkZ6RCSrVr3pSLC2STGonTUifO8okvHu9Txqz48qgKCduueHGv~f4M38cbGQjQ2aKWzpCOWsdUsQpPevorFAu9okCLD3opmlTLLgJPNIn4-UBf7BIfWS9r08lUE9BVXT6iqYoiPYfrv59qIYBnapU33bpLTUz4t8r-1OnMiANohjMPRRBj3cmikfuJnYeUHrQEk5PrllYba5sfgVpF8st9TtIklA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-cbp',
            'widthPixels': 426
          }
        ],
        'id': '\/video\/imdb\/vi2477195545',
        'image': {
          'height': 360,
          'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BNWJkMzllOWEtN2QwNS00MGY0LWI4ZDItYTRiYzE3ZmZiZGI1XkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_.jpg',
          'width': 480
        },
        'interestingVotes': {
          'up': 18
        },
        'primaryTitle': {
          'id': '\/title\/tt0099785\/',
          'image': {
            'height': 1985,
            'id': '\/title\/tt0099785\/images\/rm3804584704',
            'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMzFkM2YwOTQtYzk2Mi00N2VlLWE3NTItN2YwNDg1YmY0ZDNmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
            'width': 1335
          },
          'title': 'Home Alone',
          'titleType': 'movie',
          'year': 1990
        },
        'videoTitle': 'Home Alone'
      },
      {
        'contentType': 'TV Program',
        'description': 'On this very merry watchlist episode, "The IMDb Show" asks stars like Jim Gaffigan, Linda Hamilton, and Madelaine Petsch what movies they are watching during the holidays.',
        'durationSeconds': 191,
        'encodings': [
          {
            'definition': 'auto',
            'heightPixels': 1080,
            'mimeType': 'application\/x-mpegURL',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi48742169\/hls-1572048128994-master.m3u8?Expires=1577982757&Signature=HqIg7teOkJgH1kB9ciB1Wd6pl9HOAT2b3d3M22QDiAbHrsbgVSr0gZjEM~-RRzCE6v~Wy8d3inwe0NRPBtZUKR1dAZcfA27dFGHuC0U-SFzhocVrKmuMMM4oD~XV8t30hnWs66PwmFU8SuwMgAm4SUEij4cbBpFj0JHnOhR-fsUY49GkicdDfmQT8dCa1W3EdhlYYcQFhXtUkKsJ7ztfTx52Ddym9PbS0dSni0OmUVVP-MUVKJnAFkx0Ce6LYlrEOZbtk5Fp0FEAhXLbIAmtmRfMr7oDJagqyL3X7Wj0XN0NAFgNGBmA3QledrtB4TKljE7kVzpf5CzqvA0AhdjI6w__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 1920
          },
          {
            'definition': '1080p',
            'heightPixels': 1080,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi48742169\/1434659529640-260ouz-1572048128994.mp4?Expires=1577982757&Signature=tENUsoK4AwX0pXqh5NToMB80V9ASRqBHgM2uWljJvA8dSwUvF6IM~U0gRlZD1UQd5yHXzKlB5X~~WLyuYTmHL9PM2fsrAi6-g~d~P5hrUFuMeRTh4HYVzPYNwuweBtVoZ54vQ94nO4LLsIA~ROBHuNlFBt-noeygNZyWaISCE1XqHlM-4Jl7E2bIIEabp-B5lx772Hzb67jq5YonhHpnqsCGJ-oxvtO-r8YgUZ5D0OX0kFAXGSmXcpWfP40i~K-Ya8XjO-NdlT8M~kGubrzsNDsTD4ABu0gtkQL7Jre7-UloWH7WIbyXHua3Io044vpLMNsRkJVzdXJc2YYlR5zvSA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 1920
          },
          {
            'definition': '720p',
            'heightPixels': 720,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi48742169\/1434659379400-8cjq25-1572048128994.mp4?Expires=1577982757&Signature=J2eKQr2Xon3sPnLnUrGt3rihzPjCu4gjOi5HNfP0D3qpgb3tJ1MOU4uES6lSBpvlxAuXTPK1rtnQNC7lhy8qnczwpoPMIuD1sTwFNIQwiYhvcDp4MA-hQidYFhkEowGgD8Psby67RT5jOK21b0OrSeLrPCYbJC8OvSQg92hTpkxRSWw8O5qgdVKUBrKPE8Kcy~MmZ2IYnxV3iX8SQk5Q7mt8KRU7Hy3vrd5r73HDW5zv-fVjMDqjv7VzZJCIi5Sy3UKpiHEDaAqNo0BTV3qH6NVplor4WJXT6Zpzpcz-5-o169qp9aWSzqvusDK-oGWrg~0lF4hhzCyNkkBTJv8lVA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 1280
          },
          {
            'definition': '480p',
            'heightPixels': 480,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi48742169\/1434659607842-pgv4ql-1572048128994.mp4?Expires=1577982757&Signature=i0LR0JbAjwmWgDAN4yHkp0kJ~-ygEYN~cDlbCyL5tQq-DTp0ExNCZhg38lWsv8rA6V76w98DC6l2PheJaRQpzHUMjZsalUKXZEjWosz3nM-1KlDkI1Mz08gNdbmjQczhf-BxKbT50Ej4~CSrZxHOMIzb8FiY2XVuchtH-1whsPCvNAMz9IAs01Am8~5pVBQsMDSN4jZOloJPf-lLZlJnS8PbuYuhyBeYuGNMGfx7X23rn0MmXQUOiIohp8Hm6GZLGlk764kk1aRu1KsEHTEQOGu-ejmCBoHsCDHb4HK4jyc1H9ApR9~c5kBJN6o8npECF6~i3F~hnflTN0BgmK-ugQ__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 854
          },
          {
            'definition': 'SD',
            'heightPixels': 270,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi48742169\/1434659454657-dx9ykf-1572048128994.mp4?Expires=1577982757&Signature=dKimQAvp0JE1vurrR7WXuMgUMiRIgLUx4cW11W9v4xiMIXCeQDMLdt8NTWsUkPfnpxT5ZyVF7VROmyBNOpRxHpLrnTOHlmHjO8LqVByXW3ZyEWieyPZZ7AGJMC561iX532ak-jpxbD8LwtCT5vzK8gwaYK5IO3q8CQUH7tCvcBsGPnAYzs2B-caQrm~T5sOjskLlXPRIxulSsuDV8tllEYFRkbQuRUosmPZKdflTnUa45eqx364mM766rZVBmTI8U3wR-z72unXUr8RWQLkaZW4cWrXZeuQtoqhjeKnOQj7ikyQVQD0nKZEvUSlOpkjB5rJkOFru1mQhk0nenkemMw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 480
          }
        ],
        'id': '\/video\/imdb\/vi48742169',
        'image': {
          'height': 1080,
          'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BNDIwNjlmMDAtNzcyOS00ODA1LTgyMTAtNWI2OGM5YTM4MGUwXkEyXkFqcGdeQXZ3ZXNsZXk@._V1_.jpg',
          'width': 1920
        },
        'monetization': '\/video\/imdb\/vi48742169\/ads\/context\/',
        'parentTitle': {
          'id': '\/title\/tt7549864\/',
          'image': {
            'height': 1611,
            'id': '\/title\/tt7549864\/images\/rm3268963840',
            'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMTkzNTYxNjUzNl5BMl5BanBnXkFtZTgwODI3NDYzNzM@._V1_.jpg',
            'width': 1039
          },
          'title': 'The IMDb Show',
          'titleType': 'tvSeries',
          'year': 2017
        },
        'primaryTitle': {
          'episode': 101,
          'id': '\/title\/tt11468776\/',
          'image': {
            'height': 596,
            'id': '\/title\/tt11468776\/images\/rm2819654401',
            'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BZWZkNzI4YTctYzk4Mi00NDA5LWE0MTQtMGRiNmQyYzkyMTQwXkEyXkFqcGdeQXVyODE2OTYwNTg@._V1_.jpg',
            'width': 402
          },
          'season': 3,
          'title': 'Holiday Watchlist',
          'titleType': 'tvEpisode',
          'year': 2019
        },
        'videoTitle': 'What Are These Stars Watching This Holiday Season?'
      }
    ],
    'otherVideos': [
      {
        'contentType': 'Clip',
        'description': 'On this IMDbrief we will help you sift through Walt\'s vault to find hidden gems to watch right now on Disney+.',
        'durationSeconds': 200,
        'encodings': [
          {
            'definition': '480p',
            'heightPixels': 480,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi3620126489\/1434659607842-pgv4ql-1574096855120.mp4?Expires=1577982756&Signature=PhQ0Za5~wvzG1fuag1JP5v~8LgY1uIQXt7nc6bjD3rK~usyT5G-FPCqlJWHqds5Gq2UI3VeCGxcNviw008VXI-7VrgE~ImB9bcMam32XLNLkTRkhBcON0I1CpPdJje9K4C2zo47oMwAwr9KKvN1PEkrpiWOpVH5o2o9-DlNONAnyeGUmnMJG2udGqwDu15S3bbhv4gHN2WhNon7tnAH3UNTAdEFoH0Ot73Cws0vYNBjaMs3tz75-is1Z9E0pUcB5ty5otgzHh~5NYO~Rf3EVjUSCtOIZBamcgKewY3Nz7dxpphSMI2JMbAD~uP28ob7fiqi1e92-1MefrUYy6REw5Q__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 854
          },
          {
            'definition': '720p',
            'heightPixels': 720,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi3620126489\/1434659379400-8cjq25-1574096855120.mp4?Expires=1577982756&Signature=lbtZTdRh3ahTp-cGbS9IsJkvh7tbPQJF3VObwnEyTdOsqG~0sXeN5MrqPQC4rFmkDg~otamF19~3RNFWE57rp1DhTD21G9t4RInXjNXOAyDlP9DvsANip4PiB~8YFEFT5AWD3XgNpLHJT1LpSHANWBlquM5flUPvaeULS8FzyGgTuBTsNu8cOGQ8LqBVO9OZsmkEl5BgSzvzkizRsTq0M81JEUMPNoj4BsDxF6VECnp~5Kn0GGHmJdNjgFNsluH1PwTk5hOt8Xwtk-nWbV5UdmjMlcK16EknWcX2aImo-pj1XJbsVcgXBhKegfMPu9FzzHreDxX0JhOQNx2nKfoVtg__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 1280
          },
          {
            'definition': 'SD',
            'heightPixels': 270,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi3620126489\/1434659454657-dx9ykf-1574096855120.mp4?Expires=1577982756&Signature=XpyqAut4Z~HzmK-3i4RLjkRXwKa1iMj2jfkmoMQaW55pFehYVUQ9kQXGfgIlvxVs0N7akGkMZb2cgYtZ6Jy4ZSRN8rg5ws~YM0f6W1~BvZxuuohgtkPZqGeHqNel1E1e8ukTVDdj4gKGH88B1D9mjCMPbdFCyrSsLjYHx6D-r4Fg64FlLvxmxGr7wRK6jHOybXUZ4iYlkhzS3EcqCMSjXhdiC5Sseteq49GtsEOvVKA5lRQBt-PWKrBUV41JWwJg-ZlY8rYg5bVxVRrbkCSQ3nHYzzCjokXzVzJrj-kCtRhz3RqvkucyVnGL~zxIEeX2xOQJk7AIGSMJD6ceQs443Q__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 480
          },
          {
            'definition': '1080p',
            'heightPixels': 1080,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi3620126489\/1434659529640-260ouz-1574096855120.mp4?Expires=1577982756&Signature=pIO6Z5q4Mf0ZBlX2eCrdjAEpyRL6pDZv-AqqX2bGAXSG1p9O1SJhIgqx1ljhFt4i9HIb3oXGRzsJIUyMdpRUSAaHqtpGtOMDkIazFYUqMYl9-UzbJVvjaLNAY0s4Z52oQFVjUl3P5v0hdhYpNtfj668I~n6lqTwutE90fG2seu9VCwW2VKLr-i469msoDE~S8YXJv1dmopLgQ2bv48p4d9gZb7feKXpYg1SUT8Gm1k7cBZo3goRJaD1imdeIa2r1-rBL8HLTd2bhKX-J123MCSWmjQE2oG20Kutbitk42w8E5jyD7V00VyXlQ5FVVfZZmeWULuIXsOFpaxfNHXUaDQ__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 1920
          },
          {
            'definition': 'auto',
            'heightPixels': 1080,
            'mimeType': 'application\/x-mpegURL',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi3620126489\/hls-1574096855120-master.m3u8?Expires=1577982756&Signature=L~K4cyiE0YAXJg4MfUPASKB4LwOamVU4b3zIB6yQSmuTY5eaSzm2vL~Rdb53-0T0lW9X7IRteo5~lb3MtZsoSND1Hw0OrwNDp5nGPgwUmCKwg-6HymYarFzb7qoAOzAPk7QzYRLhJVbwOC5MmnPRXjgW2vtGwBn-Rgxg~HOAUWLFoH9yRUrKuStxBk-6fIUwaM1-pShIodrN8h6eKo5yzWulEm89hmE34MbA5nSbQpShIiH-uEDd-moCvNLp0Dfc~lvxWX5mDdtrwcyL1ZtH5tJjfIgkn2G1kIPHaiFfycM207yZr1AhQmS0ARtAMQ8AP54nsY5imzTclKeUb1q02w__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 1920
          }
        ],
        'id': '\/video\/imdb\/vi3620126489',
        'image': {
          'height': 1080,
          'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BNWQ2MWYyMmItMTRjMS00YWQyLThiYjEtZTI0MTI1OGMzZjJmXkEyXkFqcGdeQW1yb2Njbw@@._V1_.jpg',
          'width': 1920
        },
        'monetization': '\/video\/imdb\/vi3620126489\/ads\/context\/',
        'parentTitle': {
          'id': '\/title\/tt9122526\/',
          'image': {
            'height': 1000,
            'id': '\/title\/tt9122526\/images\/rm713848320',
            'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMTU0ODAwOTMyMl5BMl5BanBnXkFtZTgwODUzMzU4NjM@._V1_.jpg',
            'width': 675
          },
          'title': 'IMDbrief',
          'titleType': 'tvSeries',
          'year': 2018
        },
        'primaryTitle': {
          'episode': 14,
          'id': '\/title\/tt11303884\/',
          'image': {
            'height': 1000,
            'id': '\/title\/tt11303884\/images\/rm1741458433',
            'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BZGYzMjA3MTEtYWEzMi00YjJmLWFmMTItZDFmYmY2ODJkOGU1XkEyXkFqcGdeQXVyODE2OTYwNTg@._V1_.jpg',
            'width': 675
          },
          'season': 2,
          'title': 'Hidden Gems to Watch on Disney+',
          'titleType': 'tvEpisode',
          'year': 2019
        },
        'videoTitle': 'Hidden Gems to Watch on Disney+'
      }
    ]
  },
  'adWidgets': null,
  'id': 'tt0099785',
  'image': {
    'height': 1985,
    'id': '\/title\/tt0099785\/images\/rm3804584704',
    'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMzFkM2YwOTQtYzk2Mi00N2VlLWE3NTItN2YwNDg1YmY0ZDNmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    'width': 1335
  },
  'runningTimeInMinutes': 103,
  'title': 'Home Alone',
  'titleType': 'movie',
  'year': 1990
}

const tvResponse = {
  'certificate': {
    'certificate': 'TV-PG',
    'country': 'US'
  },
  'filmingLocations': [
    {
      'extras': [
        'Dig site'
      ],
      'id': '\/title\/tt8111088\/filminglocations\/lc1845501',
      'interestingVotes': {
        'up': 6
      },
      'location': 'New York City, New York, USA'
    },
    {
      'attributes': [
        'studio'
      ],
      'id': '\/title\/tt8111088\/filminglocations\/lc1795058',
      'interestingVotes': {
        'up': 4
      },
      'location': 'MBS Media Campus - 1600 Rosecrans Avenue, Manhattan Beach, California, USA'
    },
    {
      'attributes': [
        'studio',
        'exterior'
      ],
      'extras': [
        'Exterior temporary ~100, 000 sq ft backlot built half a mile north of studios'
      ],
      'id': '\/title\/tt8111088\/filminglocations\/lc1843749',
      'interestingVotes': {
        'up': 4
      },
      'location': 'El Segundo, California, USA'
    },
    {
      'id': '\/title\/tt8111088\/filminglocations\/lc1651284',
      'interestingVotes': {
        'up': 3
      },
      'location': 'Los Angeles, California, USA'
    }
  ],
  'metacriticInfo': {
    '@type': 'imdb.api.title.metacritic.score',
    'reviewCount': 0,
    'userRatingCount': 0
  },
  'plot': {
    'outline': {
      'id': '\/title\/tt8111088\/plot\/po3777560',
      'text': 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.'
    },
    'totalSummaries': 1
  },
  'principals': [
    {
      'id': '\/name\/nm0050959\/',
      'legacyNameText': 'Pascal, Pedro',
      'name': 'Pedro Pascal',
      'category': 'actor',
      'characters': [
        'The Mandalorian'
      ],
      'endYear': 2019,
      'episodeCount': 8,
      'roles': [
        {
          'character': 'The Mandalorian'
        }
      ],
      'startYear': 2019,
      'image': {
        'height': 5514,
        'id': '\/name\/nm0050959\/images\/rm425488128',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMWNhMGM3ODMtOTMzNS00OTZjLWEyZWMtYmRkZDczZDg4N2QzXkEyXkFqcGdeQXVyMjI0OTExNzk@._V1_.jpg',
        'width': 4005
      }
    },
    {
      'disambiguation': 'I',
      'id': '\/name\/nm0001835\/',
      'legacyNameText': 'Weathers, Carl (I)',
      'name': 'Carl Weathers',
      'category': 'actor',
      'characters': [
        'Greef Karga'
      ],
      'endYear': 2019,
      'episodeCount': 6,
      'roles': [
        {
          'character': 'Greef Karga'
        }
      ],
      'startYear': 2019,
      'image': {
        'height': 1740,
        'id': '\/name\/nm0001835\/images\/rm2428069376',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMjIxMjcyMjc5Ml5BMl5BanBnXkFtZTgwMDI2Nzk4NzM@._V1_.jpg',
        'width': 1740
      }
    },
    {
      'id': '\/name\/nm0352513\/',
      'legacyNameText': 'Hackford, Rio',
      'name': 'Rio Hackford',
      'category': 'actor',
      'characters': [
        'IG-11 Performance Artist',
        'Riot Mar'
      ],
      'endYear': 2019,
      'episodeCount': 4,
      'roles': [
        {
          'character': 'IG-11 Performance Artist'
        },
        {
          'character': 'Riot Mar'
        }
      ],
      'startYear': 2019,
      'image': {
        'height': 4799,
        'id': '\/name\/nm0352513\/images\/rm1218048512',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMTg4MTEyMDkzNl5BMl5BanBnXkFtZTgwMDgyNDc0NDE@._V1_.jpg',
        'width': 3607
      }
    },
    {
      'id': '\/name\/nm2442289\/',
      'legacyNameText': 'Carano, Gina',
      'name': 'Gina Carano',
      'category': 'actress',
      'characters': [
        'Cara Dune'
      ],
      'endYear': 2019,
      'episodeCount': 3,
      'roles': [
        {
          'character': 'Cara Dune'
        }
      ],
      'startYear': 2019,
      'image': {
        'height': 1246,
        'id': '\/name\/nm2442289\/images\/rm1717603329',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BODBlMWE0NjctY2EwNC00ZTljLTk4NzQtODM4NDNkZjk2ZGRlXkEyXkFqcGdeQXVyMTk0NDU0OTc@._V1_.jpg',
        'width': 1114
      }
    }
  ],
  'rating': 8.9,
  'numberOfVotes': 94520,
  'canRate': true,
  'topRank': {
    'rankType': 'topTv',
    'rank': 40
  },
  'userRating': null,
  'alternateTitlesSample': [
    '曼达洛人',
    'Мандалорец',
    'Мандалорець',
    'Mandalorian',
    '星球大战：曼达洛人',
    'ザ・マンダロリアン'
  ],
  'alternateTitlesCount': 17,
  'hasAlternateVersions': false,
  'originalTitle': 'The Mandalorian',
  'runningTimes': [
    {
      'timeMinutes': 30
    }
  ],
  'spokenLanguages': [
    'en'
  ],
  'origins': [
    'US'
  ],
  'similaritiesCount': 15,
  'releaseDetails': {
    'attributes': [
      'internet'
    ],
    'date': '2019-11-12',
    'premiere': false,
    'region': 'US',
    'wide': true
  },
  'soundtracks': null,
  'genres': [
    'Action',
    'Adventure',
    'Sci-Fi'
  ],
  'reviewsTeaser': {
    'author': {
      'displayName': 'brentscott',
      'userId': '\/user\/ur61254985\/'
    },
    'authorRating': 10,
    'helpfulnessScore': 0.7113549853,
    'id': '\/title\/tt8111088\/userreviews\/rw5273815',
    'interestingVotes': {
      'down': 72,
      'up': 231
    },
    'languageCode': 'eng',
    'reviewText': 'This is Star Wars. It feels like Star Wars. It Looks Like Star Wars. Why is this such a tough concept for the geniuses associated with the films to get? No subversion\'s needed, no forced 8 yr old humor, no political agenda. Just make it look and feel like the original Star Wars trilogy and fans will be happy, its literally that simple.',
    'reviewTitle': 'Kathleen Kennedy,JJ Abrams and Rian Johnson take notice. This is how you do Star Wars',
    'spoiler': false,
    'submissionDate': '2019-11-22',
    'titleId': '\/title\/tt8111088\/'
  },
  'reviewsCount': 1334,
  'hasContentGuide': true,
  'hasSynopsis': false,
  'hasCriticsReviews': true,
  'criticsReviewers': [
    'Brian Tallerico',
    'Marc Eastman',
    'Cristóbal Sepúlveda-Plaza',
    'Sean Evans',
    'JPRoscoe'
  ],
  'crazyCreditsTeaser': null,
  'awards': {
    'awardsSummary': {
      'otherNominationsCount': 3,
      'otherWinsCount': 0
    },
    'highlightedCategory': null
  },
  'photos': {
    'images': [
      {
        'caption': 'The Mandalorian (2019)',
        'createdOn': '2019-12-29T16:00:35Z',
        'height': 342,
        'id': '\/title\/tt8111088\/images\/rm319062017',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BZmY4OGY3ZWMtMWMwOS00ZDU1LWIzZDgtM2E5MjlkOTc4Y2FhXkEyXkFqcGdeQXVyNjczOTE0MzM@._V1_.jpg',
        'width': 600,
        'relatedTitlesIds': [
          '\/title\/tt8111088\/',
          '\/title\/tt9121546\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      },
      {
        'caption': 'Still of Aidan Bertola in The Mandalorian (2019)',
        'createdOn': '2019-12-28T09:47:33Z',
        'height': 523,
        'id': '\/title\/tt8111088\/images\/rm3089596417',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BM2UxODg4OWUtYmUzZC00NWI5LTg1NTgtOWU5Nzc4ZmE1OTdlXkEyXkFqcGdeQXVyNDQxNjk1MjY@._V1_.jpg',
        'width': 1237,
        'relatedNamesIds': [
          '\/name\/nm8642045\/'
        ],
        'relatedTitlesIds': [
          '\/title\/tt8111088\/',
          '\/title\/tt9121546\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      },
      {
        'caption': 'The Mandalorian (2019)',
        'createdOn': '2019-12-28T09:47:23Z',
        'height': 524,
        'id': '\/title\/tt8111088\/images\/rm3106373633',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BNzBiNWIzYmMtOWUwOS00OGJjLThjZGItN2ZhYjM4OTE0MWMzXkEyXkFqcGdeQXVyNDQxNjk1MjY@._V1_.jpg',
        'width': 1259,
        'relatedTitlesIds': [
          '\/title\/tt8111088\/',
          '\/title\/tt9121546\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      },
      {
        'caption': 'Still of Jason Sudeikis and Adam Pally in The Mandalorian (2019)',
        'createdOn': '2019-12-28T09:47:10Z',
        'height': 523,
        'id': '\/title\/tt8111088\/images\/rm3139928065',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BN2U4Y2I4MDYtMGQ1Ny00NDAyLWFhZWQtN2RkYzA2OGM0YjJmXkEyXkFqcGdeQXVyNDQxNjk1MjY@._V1_.jpg',
        'width': 1253,
        'relatedNamesIds': [
          '\/name\/nm0837177\/',
          '\/name\/nm1269723\/'
        ],
        'relatedTitlesIds': [
          '\/title\/tt8111088\/',
          '\/title\/tt9121546\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      },
      {
        'caption': 'Still of Taika Waititi in The Mandalorian (2019)',
        'createdOn': '2019-12-28T09:46:58Z',
        'height': 528,
        'id': '\/title\/tt8111088\/images\/rm3156705281',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BNTUwZjExODgtYzM5OS00MGY4LWJlZjQtY2E2MGRiZjhhOTcwXkEyXkFqcGdeQXVyNDQxNjk1MjY@._V1_.jpg',
        'width': 1255,
        'relatedNamesIds': [
          '\/name\/nm0169806\/'
        ],
        'relatedTitlesIds': [
          '\/title\/tt8111088\/',
          '\/title\/tt9121546\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      },
      {
        'caption': 'The Mandalorian (2019)',
        'createdOn': '2019-12-28T09:46:48Z',
        'height': 524,
        'id': '\/title\/tt8111088\/images\/rm3173482497',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BZDZiZWFjYjgtMTNhZS00MTRlLTg3NGItZDc5N2IzYWNlY2ZhXkEyXkFqcGdeQXVyNDQxNjk1MjY@._V1_.jpg',
        'width': 1265,
        'relatedTitlesIds': [
          '\/title\/tt8111088\/',
          '\/title\/tt9121546\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      },
      {
        'caption': 'Still of Pedro Pascal in The Mandalorian (2019)',
        'createdOn': '2019-12-28T09:46:35Z',
        'height': 527,
        'id': '\/title\/tt8111088\/images\/rm3190259713',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BZTM1YjI4NGQtMDhhNi00MWFjLWI5NmEtZGJiYTNiM2Q1ODEwXkEyXkFqcGdeQXVyNDQxNjk1MjY@._V1_.jpg',
        'width': 1258,
        'relatedNamesIds': [
          '\/name\/nm0050959\/'
        ],
        'relatedTitlesIds': [
          '\/title\/tt8111088\/',
          '\/title\/tt9121546\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      },
      {
        'caption': 'Still of Gina Carano in The Mandalorian (2019)',
        'createdOn': '2019-12-28T09:46:20Z',
        'height': 548,
        'id': '\/title\/tt8111088\/images\/rm3207036929',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BODJkMmYxMjYtOGNlZi00YTE0LTgyZDktZDk2OTIxNTA4YmYzXkEyXkFqcGdeQXVyNDQxNjk1MjY@._V1_.jpg',
        'width': 1256,
        'relatedNamesIds': [
          '\/name\/nm2442289\/'
        ],
        'relatedTitlesIds': [
          '\/title\/tt8111088\/',
          '\/title\/tt9121546\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      },
      {
        'attribution': '© Lucasfilm',
        'caption': 'Still of Pedro Pascal in The Mandalorian (2019)',
        'copyright': 'Lucasfilm',
        'createdOn': '2019-12-28T08:21:03Z',
        'height': 261,
        'id': '\/title\/tt8111088\/images\/rm103186433',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMmU2OWFiZTMtMTYwZi00YzY3LWE1ZWEtMDdjNjM1ODQ2NGRjXkEyXkFqcGdeQXVyOTg3NjI1MTg@._V1_.jpg',
        'width': 618,
        'relatedNamesIds': [
          '\/name\/nm0050959\/'
        ],
        'relatedTitlesIds': [
          '\/title\/tt8111088\/',
          '\/title\/tt9121546\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      },
      {
        'attribution': '© Lucasfilm',
        'caption': 'Still of Carl Weathers (I), Pedro Pascal and Gina Carano in The Mandalorian (2019)',
        'copyright': 'Lucasfilm',
        'createdOn': '2019-12-28T08:20:46Z',
        'height': 730,
        'id': '\/title\/tt8111088\/images\/rm942047233',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMGQxYTM3MDUtZDJmOC00YjRlLTk1MmUtZTg2MzUyZDkyNDM4XkEyXkFqcGdeQXVyOTg3NjI1MTg@._V1_.jpg',
        'width': 1296,
        'relatedNamesIds': [
          '\/name\/nm0001835\/',
          '\/name\/nm0050959\/',
          '\/name\/nm2442289\/'
        ],
        'relatedTitlesIds': [
          '\/title\/tt8111088\/',
          '\/title\/tt9121546\/'
        ],
        'source': 'userupload',
        'type': 'still_frame'
      }
    ],
    'totalImageCount': 458
  },
  'heroImages': [
    {
      'caption': 'The Mandalorian (2019)',
      'createdOn': '2019-12-28T05:56:36Z',
      'height': 1080,
      'id': '\/title\/tt8111088\/images\/rm2133098497',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BNzRmOGQwMTItZjQ3YS00NjAwLWJmM2ItYjQ0YTliYjI5OGViXkEyXkFqcGdeQXVyMjA2NTc3NDU@._V1_.jpg',
      'width': 1920,
      'source': 'userupload',
      'type': 'still_frame'
    },
    {
      'caption': 'Still of Pedro Pascal and Mark Boone Junior in The Mandalorian (2019)',
      'createdOn': '2019-12-14T22:33:34Z',
      'height': 325,
      'id': '\/title\/tt8111088\/images\/rm2426438401',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BNDQ3MzFkNzAtY2FkNi00NTk1LTgwMjEtNjlhMGFhOWQ4ZTlhXkEyXkFqcGdeQXVyMjUxNzQ5OTM@._V1_.jpg',
      'width': 608,
      'source': 'userupload',
      'type': 'still_frame'
    },
    {
      'caption': 'The Mandalorian (2019)',
      'createdOn': '2019-11-16T20:24:56Z',
      'height': 804,
      'id': '\/title\/tt8111088\/images\/rm3389361921',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BYTQ1Y2ZjMzMtZDg1Yi00Y2JjLWI5NjQtNGNkNGMzNTM5NWY4XkEyXkFqcGdeQXVyNjgzNDU2ODI@._V1_.jpg',
      'width': 1920,
      'source': 'userupload',
      'type': 'still_frame'
    },
    {
      'caption': 'The Mandalorian (2019)',
      'createdOn': '2019-11-13T19:09:58Z',
      'height': 1093,
      'id': '\/title\/tt8111088\/images\/rm23432961',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BNjliYTZlNTAtMTU3NC00MDVkLWE0MGUtYTIzYzQ5OTZlYWU5XkEyXkFqcGdeQXVyMjA2NTc3NDU@._V1_.jpg',
      'width': 1439,
      'languages': [
        'en'
      ],
      'source': 'userupload',
      'type': 'still_frame'
    },
    {
      'caption': 'Still of Pedro Pascal in The Mandalorian (2019)',
      'createdOn': '2019-11-24T12:36:31Z',
      'height': 1080,
      'id': '\/title\/tt8111088\/images\/rm2050067457',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BNGUxN2E0OWEtYjFhNi00NjM5LWJmZGEtNTdkNzgxOWE1Mjc4XkEyXkFqcGdeQXVyMTAyNjg4NjE0._V1_.jpg',
      'width': 1920,
      'source': 'userupload',
      'type': 'still_frame'
    },
    {
      'caption': 'Still of Pedro Pascal in The Mandalorian (2019)',
      'createdOn': '2019-12-09T23:41:40Z',
      'height': 544,
      'id': '\/title\/tt8111088\/images\/rm2722923009',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BOWZkMGQwODAtN2IxMS00YjcxLTgzOTEtYTJjYTE2YTY4YjIyXkEyXkFqcGdeQXVyNjczOTE0MzM@._V1_.jpg',
      'width': 967,
      'source': 'userupload',
      'type': 'still_frame'
    },
    {
      'attribution': '© Lucasfilm',
      'caption': 'The Mandalorian (2019)',
      'copyright': 'Lucasfilm',
      'createdOn': '2019-12-21T09:06:18Z',
      'height': 804,
      'id': '\/title\/tt8111088\/images\/rm2848292865',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BYzY3NzQxOTQtZTAxMy00NDQwLWEzYTMtOWEwZDcyMGUyZjA4XkEyXkFqcGdeQXVyOTg3NjI1MTg@._V1_.jpg',
      'width': 1920,
      'source': 'userupload',
      'type': 'still_frame'
    },
    {
      'attribution': '© Lucasfilm',
      'caption': 'Still of Pedro Pascal in The Mandalorian (2019)',
      'copyright': 'Lucasfilm',
      'createdOn': '2019-11-27T06:38:53Z',
      'height': 804,
      'id': '\/title\/tt8111088\/images\/rm3235482881',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMGExMGYwOTEtNjdlZC00NTM1LThhMzMtNGQ3ZjdlM2JiZDI2XkEyXkFqcGdeQXVyOTg3NjI1MTg@._V1_.jpg',
      'width': 1920,
      'source': 'userupload',
      'type': 'still_frame'
    },
    {
      'caption': 'The Mandalorian (2019)',
      'createdOn': '2019-11-16T20:21:22Z',
      'height': 804,
      'id': '\/title\/tt8111088\/images\/rm3993341697',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BOGUwNzMyYjUtYmQ3Ni00Nzk3LWIyYmEtZjM1YTdjYjU5NzgzXkEyXkFqcGdeQXVyNjgzNDU2ODI@._V1_.jpg',
      'width': 1920,
      'source': 'userupload',
      'type': 'still_frame'
    },
    {
      'attribution': '© Disney \/ Lucasfilms',
      'caption': 'The Mandalorian (2019)',
      'copyright': 'Disney \/ Lucasfilms',
      'createdOn': '2019-11-30T06:25:33Z',
      'height': 1595,
      'id': '\/title\/tt8111088\/images\/rm3647704321',
      'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BOTFkOGNkYzMtZjAzYi00ZWFmLTg0MGUtYzM2NTJiMTQyYzA5XkEyXkFqcGdeQXVyMTMwOTg3Mjk@._V1_.jpg',
      'width': 2836,
      'source': 'userupload',
      'type': 'still_frame'
    }
  ],
  'seasonsInfo': [
    {
      'season': 1
    },
    {
      'season': 2
    }
  ],
  'productionStatus': {
    'comment': 'Derived from earliest release of 2019-11-12 (US)',
    'date': '2019-11-12',
    'status': 'released'
  },
  'directors': [
    {
      'id': '\/name\/nm1278887\/',
      'image': {
        'height': 855,
        'id': '\/name\/nm1278887\/images\/rm3515652609',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BYmIzMmUyZDUtMDVmNi00ZWJiLTllN2QtNjVmZGZhMjMxZTcyXkEyXkFqcGdeQXVyNTI2ODY4Nw@@._V1_.jpg',
        'width': 767
      },
      'legacyNameText': 'Chow, Deborah',
      'name': 'Deborah Chow',
      'category': 'director',
      'endYear': 2019,
      'episodeCount': 2,
      'startYear': 2019
    },
    {
      'id': '\/name\/nm0266622\/',
      'image': {
        'height': 1365,
        'id': '\/name\/nm0266622\/images\/rm4100886272',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMTYxMzAxMDQyMV5BMl5BanBnXkFtZTcwNzIyMzgxMw@@._V1_.jpg',
        'width': 2048
      },
      'legacyNameText': 'Famuyiwa, Rick',
      'name': 'Rick Famuyiwa',
      'category': 'director',
      'endYear': 2019,
      'episodeCount': 2,
      'startYear': 2019
    },
    {
      'akas': [
        'Chopper',
        'David Filoni'
      ],
      'id': '\/name\/nm1396048\/',
      'image': {
        'height': 400,
        'id': '\/name\/nm1396048\/images\/rm585208832',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMTQzMzAxMTg3NV5BMl5BanBnXkFtZTcwNzEyNTQ4MQ@@._V1_.jpg',
        'width': 267
      },
      'legacyNameText': 'Filoni, Dave',
      'name': 'Dave Filoni',
      'category': 'director',
      'endYear': 2019,
      'episodeCount': 2,
      'startYear': 2019
    },
    {
      'akas': [
        'Bryce Howard'
      ],
      'id': '\/name\/nm0397171\/',
      'image': {
        'height': 888,
        'id': '\/name\/nm0397171\/images\/rm495405568',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BODEzNzBhODYtOWEzNi00Y2I3LWFjMGEtNzAxNzU5ZjZiMDRiXkEyXkFqcGdeQXVyMjQ0MTg4Nw@@._V1_.jpg',
        'width': 684
      },
      'legacyNameText': 'Howard, Bryce Dallas',
      'name': 'Bryce Dallas Howard',
      'category': 'director',
      'endYear': 2019,
      'episodeCount': 1,
      'startYear': 2019
    },
    {
      'akas': [
        'T. Cohen',
        'Taika Cohen',
        'Count Viago'
      ],
      'id': '\/name\/nm0169806\/',
      'image': {
        'height': 2048,
        'id': '\/name\/nm0169806\/images\/rm382556160',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMzk4MDIzNjcwNV5BMl5BanBnXkFtZTgwMTIyMjgwNDI@._V1_.jpg',
        'width': 1638
      },
      'legacyNameText': 'Waititi, Taika',
      'name': 'Taika Waititi',
      'category': 'director',
      'endYear': 2019,
      'episodeCount': 1,
      'startYear': 2019
    }
  ],
  'writers': [
    {
      'akas': [
        'John Favreau'
      ],
      'disambiguation': 'I',
      'id': '\/name\/nm0269463\/',
      'image': {
        'height': 1333,
        'id': '\/name\/nm0269463\/images\/rm476980224',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BNjcwNzg4MjktNDNlMC00M2U1LWJmMjgtZTVkMmI4MDI2MTVmXkEyXkFqcGdeQXVyMjI4MDI0NTM@._V1_.jpg',
        'width': 1000
      },
      'legacyNameText': 'Favreau, Jon (I)',
      'name': 'Jon Favreau',
      'attr': [
        'creator'
      ],
      'category': 'writer',
      'endYear': 2019,
      'episodeCount': 8,
      'job': 'creator',
      'startYear': 2019
    },
    {
      'akas': [
        'Gentle George',
        'George',
        'George L.',
        'Lucas'
      ],
      'disambiguation': 'I',
      'id': '\/name\/nm0000184\/',
      'image': {
        'height': 400,
        'id': '\/name\/nm0000184\/images\/rm1722651904',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMTA0Mjc0NzExNzBeQTJeQWpwZ15BbWU3MDEzMzQ3MDI@._V1_.jpg',
        'width': 271
      },
      'legacyNameText': 'Lucas, George (I)',
      'name': 'George Lucas',
      'category': 'writer',
      'endYear': 2019,
      'episodeCount': 8,
      'startYear': 2019
    },
    {
      'id': '\/name\/nm0266622\/',
      'image': {
        'height': 1365,
        'id': '\/name\/nm0266622\/images\/rm4100886272',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMTYxMzAxMDQyMV5BMl5BanBnXkFtZTcwNzIyMzgxMw@@._V1_.jpg',
        'width': 2048
      },
      'legacyNameText': 'Famuyiwa, Rick',
      'name': 'Rick Famuyiwa',
      'category': 'writer',
      'endYear': 2019,
      'episodeCount': 1,
      'startYear': 2019
    },
    {
      'akas': [
        'Chopper',
        'David Filoni'
      ],
      'id': '\/name\/nm1396048\/',
      'image': {
        'height': 400,
        'id': '\/name\/nm1396048\/images\/rm585208832',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMTQzMzAxMTg3NV5BMl5BanBnXkFtZTcwNzEyNTQ4MQ@@._V1_.jpg',
        'width': 267
      },
      'legacyNameText': 'Filoni, Dave',
      'name': 'Dave Filoni',
      'category': 'writer',
      'endYear': 2019,
      'episodeCount': 1,
      'startYear': 2019
    },
    {
      'akas': [
        'Christoper Yost',
        'Christopher Yost',
        'Chris Yost'
      ],
      'id': '\/name\/nm1236653\/',
      'image': {
        'height': 2048,
        'id': '\/name\/nm1236653\/images\/rm1511204096',
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMjQ5OTU4Nzc4M15BMl5BanBnXkFtZTgwMTY3Nzc4MzI@._V1_.jpg',
        'width': 1385
      },
      'legacyNameText': 'Yost, Christopher L.',
      'name': 'Christopher L. Yost',
      'category': 'writer',
      'endYear': 2019,
      'episodeCount': 1,
      'startYear': 2019
    }
  ],
  'videos': {
    'totalVideoCount': 30,
    'mainTrailer': {
      'contentType': 'Trailer',
      'durationSeconds': 31,
      'encodings': [
        {
          'definition': '720p',
          'heightPixels': 534,
          'mimeType': 'video\/mp4',
          'play': 'https:\/\/imdb-video.media-imdb.com\/vi2033827609\/1434659379400-8cjq25-1575317837454.mp4?Expires=1577982899&Signature=WuYtlUvrIGwkVehcy5mYgYO3rmo9CtmNMEhb~lnrHCWiXt7FdH-15nwA9HcE7FWpJ2TLJ3MLf4~rUg3Dk8e3YUYryhv4ZJRCs2BE23EZdrX~im7~JvqUHIz~cJK0K88kkKfkAY5AWF2V~r8trVKZkaFbGhjRxuUGVoXcPGfI3mxY0qM3fleFUuQJbbqfi6md-RHZ4jwsp5H30USol0a41p-OuNJtFNHjW7zSP4eY9BOgl20A8OsCyI2zQEESBeNi8H1RPJJeXowOu4Tkmxgn49Rvm7T7v~b~z5mPwo2Wl0VPLZYxuQJQe91jxYuvL63GnKcJQG9otY9g3Kp7xtk-Lw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
          'videoCodec': 'avc-bp',
          'widthPixels': 1280
        },
        {
          'definition': 'SD',
          'heightPixels': 200,
          'mimeType': 'video\/mp4',
          'play': 'https:\/\/imdb-video.media-imdb.com\/vi2033827609\/1434659454657-dx9ykf-1575317837454.mp4?Expires=1577982899&Signature=GY0udWRMlbsMtF2TZoD3DVokgIvtnwRnBFbKH~9xxiFTUTbj~aX66XkQhg3vkcCa972g4CrURwQ6fH9YydifeIIhqvTNNKmjQYQBHsPzJEixV4ebWwOFQDySzIxE0mhzaCoud1VpIMzGYFhWCMy7BjJw86fqc03G4a8a55CA2saWItvD9VcdXA2ZNiv2UnCX6JzZidst2h2TO0L8Tw7aOOgMfLbXhibAtdWWGrK3Qjs3lyt6ZCoWA8WNayAiXoD6N07-mqYvuEr7EnKmGySzMCw83K~z1TpypXZ~GLYdKyY3IxJCSqlNfifF-cBxgTb0JGdO6ZvjO8MJS4e4WUY5JQ__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
          'videoCodec': 'avc-bp',
          'widthPixels': 480
        },
        {
          'definition': '480p',
          'heightPixels': 356,
          'mimeType': 'video\/mp4',
          'play': 'https:\/\/imdb-video.media-imdb.com\/vi2033827609\/1434659607842-pgv4ql-1575317837454.mp4?Expires=1577982899&Signature=nXG3wao0k~Sgao8-wvaRz4QByV~kv7sGY7nFNqBNRg~GzRycinTZz1sjn1EPkFMd8Qv7Dqb3rGlLL6MFip-o3KdGZ39pbgRSaluvVu5fMsBAgWqtsusb71byqDnquZJhZIByjvbZwcY9xd5onuUn9-C8iJPNslCH7wDsb7oyq4C0b12SZwlGGU7pNEBDurbyPBXeprvwTq3DbETIxKD5AZ6YbUOJoi5E7nYv9TLwXGVGgTq3NXhj8jbNQ-fzgh9qQOv7CBmIKLKmQnMOYKKXFW8I19qk4uiSjJYdceukiY6MckyrfnQoQ-hWKvXrgZUG-GSO47LmKrQO7yp-wmKLOg__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
          'videoCodec': 'avc-bp',
          'widthPixels': 854
        },
        {
          'definition': 'auto',
          'heightPixels': 534,
          'mimeType': 'application\/x-mpegURL',
          'play': 'https:\/\/imdb-video.media-imdb.com\/vi2033827609\/hls-1575317837454-master.m3u8?Expires=1577982899&Signature=PUsUXZ3VCd7UsxOlW7QdyEG32AGWEhp-3ZSphJnNm7dGleR1k~DpUnOG9BthXt~LLT3pUnZChjSW9vfTgNlXe1dk~bKR02upq8nxpRNz3YIEDCKeTPulK8QT0Wzj1cszjuSHf85hgQItK2B-gBBpiMzzHOxat0eAaj8UnKWtmOdOiVg6f-dQYi~bTNs-1ln5YS98tlXIx6~mqDD2CPtwd9Q6c3U9yoMTEJKc5Rh9Iz~AR0gNsFEaHm-i0kuw9hhws4Sa3zKwM0xI6hElnyYn~AEl6dfjyD1wIgB~702vfrQ3tTrvpyEEb2SFWD2acXY1~uLBDKipm9djkTZyg8Rhcw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
          'videoCodec': 'avc-bp',
          'widthPixels': 1280
        }
      ],
      'id': '\/video\/imdb\/vi2033827609',
      'image': {
        'height': 702,
        'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BYmYyMTFiODEtMDg2OS00Y2M5LWFkNzUtNjVmMjVlNDI5Yzg0XkEyXkFqcGdeQW1hcmNtYW5u._V1_.jpg',
        'width': 1250
      },
      'monetization': '\/video\/imdb\/vi2033827609\/ads\/context\/',
      'primaryTitle': {
        'id': '\/title\/tt8111088\/',
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
      'videoTitle': '\'Streaming Now\' Teaser'
    },
    'heroVideos': [
      {
        'contentType': 'Trailer',
        'durationSeconds': 31,
        'encodings': [
          {
            'definition': '720p',
            'heightPixels': 534,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi2033827609\/1434659379400-8cjq25-1575317837454.mp4?Expires=1577982899&Signature=WuYtlUvrIGwkVehcy5mYgYO3rmo9CtmNMEhb~lnrHCWiXt7FdH-15nwA9HcE7FWpJ2TLJ3MLf4~rUg3Dk8e3YUYryhv4ZJRCs2BE23EZdrX~im7~JvqUHIz~cJK0K88kkKfkAY5AWF2V~r8trVKZkaFbGhjRxuUGVoXcPGfI3mxY0qM3fleFUuQJbbqfi6md-RHZ4jwsp5H30USol0a41p-OuNJtFNHjW7zSP4eY9BOgl20A8OsCyI2zQEESBeNi8H1RPJJeXowOu4Tkmxgn49Rvm7T7v~b~z5mPwo2Wl0VPLZYxuQJQe91jxYuvL63GnKcJQG9otY9g3Kp7xtk-Lw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 1280
          },
          {
            'definition': 'SD',
            'heightPixels': 200,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi2033827609\/1434659454657-dx9ykf-1575317837454.mp4?Expires=1577982899&Signature=GY0udWRMlbsMtF2TZoD3DVokgIvtnwRnBFbKH~9xxiFTUTbj~aX66XkQhg3vkcCa972g4CrURwQ6fH9YydifeIIhqvTNNKmjQYQBHsPzJEixV4ebWwOFQDySzIxE0mhzaCoud1VpIMzGYFhWCMy7BjJw86fqc03G4a8a55CA2saWItvD9VcdXA2ZNiv2UnCX6JzZidst2h2TO0L8Tw7aOOgMfLbXhibAtdWWGrK3Qjs3lyt6ZCoWA8WNayAiXoD6N07-mqYvuEr7EnKmGySzMCw83K~z1TpypXZ~GLYdKyY3IxJCSqlNfifF-cBxgTb0JGdO6ZvjO8MJS4e4WUY5JQ__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 480
          },
          {
            'definition': '480p',
            'heightPixels': 356,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi2033827609\/1434659607842-pgv4ql-1575317837454.mp4?Expires=1577982899&Signature=nXG3wao0k~Sgao8-wvaRz4QByV~kv7sGY7nFNqBNRg~GzRycinTZz1sjn1EPkFMd8Qv7Dqb3rGlLL6MFip-o3KdGZ39pbgRSaluvVu5fMsBAgWqtsusb71byqDnquZJhZIByjvbZwcY9xd5onuUn9-C8iJPNslCH7wDsb7oyq4C0b12SZwlGGU7pNEBDurbyPBXeprvwTq3DbETIxKD5AZ6YbUOJoi5E7nYv9TLwXGVGgTq3NXhj8jbNQ-fzgh9qQOv7CBmIKLKmQnMOYKKXFW8I19qk4uiSjJYdceukiY6MckyrfnQoQ-hWKvXrgZUG-GSO47LmKrQO7yp-wmKLOg__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 854
          },
          {
            'definition': 'auto',
            'heightPixels': 534,
            'mimeType': 'application\/x-mpegURL',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi2033827609\/hls-1575317837454-master.m3u8?Expires=1577982899&Signature=PUsUXZ3VCd7UsxOlW7QdyEG32AGWEhp-3ZSphJnNm7dGleR1k~DpUnOG9BthXt~LLT3pUnZChjSW9vfTgNlXe1dk~bKR02upq8nxpRNz3YIEDCKeTPulK8QT0Wzj1cszjuSHf85hgQItK2B-gBBpiMzzHOxat0eAaj8UnKWtmOdOiVg6f-dQYi~bTNs-1ln5YS98tlXIx6~mqDD2CPtwd9Q6c3U9yoMTEJKc5Rh9Iz~AR0gNsFEaHm-i0kuw9hhws4Sa3zKwM0xI6hElnyYn~AEl6dfjyD1wIgB~702vfrQ3tTrvpyEEb2SFWD2acXY1~uLBDKipm9djkTZyg8Rhcw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 1280
          }
        ],
        'id': '\/video\/imdb\/vi2033827609',
        'image': {
          'height': 702,
          'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BYmYyMTFiODEtMDg2OS00Y2M5LWFkNzUtNjVmMjVlNDI5Yzg0XkEyXkFqcGdeQW1hcmNtYW5u._V1_.jpg',
          'width': 1250
        },
        'monetization': '\/video\/imdb\/vi2033827609\/ads\/context\/',
        'primaryTitle': {
          'id': '\/title\/tt8111088\/',
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
        'videoTitle': '\'Streaming Now\' Teaser'
      },
      {
        'contentType': 'Trailer',
        'description': 'Get a special look at "The Mandalorian," streaming Nov. 12 on Disney+!',
        'durationSeconds': 114,
        'encodings': [
          {
            'definition': '720p',
            'heightPixels': 532,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi1809694489\/1434659379400-8cjq25-1573527341893.mp4?Expires=1577982899&Signature=RSDKtGD8oOIqJD9Ji~xDO8WDDWsRoyySGky6Yl6UVCDpouXjkM141P89Fv32fA0Vh4umUvlBHIAIGNYaYwngFA28NCDAHwWdmM-DTNwDeHM4sV1g4tXmd3hm3B3-7GVYwmlIZaI4yCyUPHz82Gi7ZqjF7B0-suuZk7KLijbQJkg7RZMyS59OdSrVOnZ9OWyNCpyelnjJfYp8zHnc88hXWkab6lpBLaMWmD590QnxtErsEsSQ~Yic~VEc~6avmDMsdUSt6peKx1YlEl6PvSYLpQrzQnKQBV~DlX661loMWajT1ouxv7hSfiG4vTXfWT0iEFYxkGgH~35MNNyAX3F26w__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 1280
          },
          {
            'definition': 'SD',
            'heightPixels': 200,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi1809694489\/1434659454657-dx9ykf-1573527341893.mp4?Expires=1577982899&Signature=oUeKXuZk6oai3plJqC3gRng2vtl9SB3Pu54ZfY8CYnXqphVCXFXc0oSd3wjewg0Uf9ppVj65x1i15GaneCngqVwpp3ZQeQYdivewcuYMUNrzWVndRxqvzRvo8NPlbI0N-Mof7msumeeDUMVDVLrPWCVz7pH2buNUrPL4elItSW~iflFGceqUTYP64~f2S1f0aPWeazRuTNQvx-Kpvv3nURcIci-wZNJh5pBl3jHR8VVFBzbRYGqar5dhN-rbGVDhC33Xso9OJRaUPeMdIARm3bqNSqKlwbvIOD-PAwXIr4WAqnG~iEsgO9kvsKFb41MlcZEY69AOGN54IhQWjPpvTQ__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 480
          },
          {
            'definition': 'auto',
            'heightPixels': 798,
            'mimeType': 'application\/x-mpegURL',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi1809694489\/hls-1573527341893-master.m3u8?Expires=1577982899&Signature=doDh6RgyhKycriPjGeow8nhZRPhcNpVADx8hvGpDAVT8ky2BNp56WtZWe~ioupLHFgWvzy9ecqrigEkS-6U15oHIl7zBvnhQ3SdH9z~g2L21NNcAVf0HD1ght04a4ta~bw5Rk8-eD3PUYFUGnlOsJ6yrEwO26-EQLjM0JoT3NyJ1OQDwbdxKAhrdBHVueAYM0nMBxBF7spBlDo3EZwQbVjx~ncKIj3HyY2PugV6JD44KUYcKrOmASFUDsAKBQna4swKsgEjGO4yQhCOxETgePN9Jm7d9zDL-E8aTgJ~yf31zsccvnbg~d4H3pz1ugxDOEanwP75Sl-4FkgDFX2RsDw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 1920
          },
          {
            'definition': '480p',
            'heightPixels': 354,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi1809694489\/1434659607842-pgv4ql-1573527341893.mp4?Expires=1577982899&Signature=dtz9a-yWjUR1X9SJAHuMUgIjRp4R8y3TH7lusUVaeterb7IwZJ9sMjJup5IvJwj3wm0YKcpv1KdgqyumU7m~sxePo0XzBkkb5eGCTU8euqREkU9JzKd56fgSeFqUp5uKTdhQgsq3z-B5i99lmi-Lm295AyS~Pbw3STv7v5IxappFXcn5BbqQXWyog1fFPxSH5bwsKbIkoUz8MvyiRwU0jNQL5CuDr6UC3Pb-qmU9Bf9l1kvYjnyK0v4JAhcyZ079jsT~fa5NNG848i~TEdXeuBUD-H4RkJ3UP5wbm288JaEGnB2lYgS2rBhhPSv57CG1I3gnJG9mVDjXaQcenXnBag__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 854
          },
          {
            'definition': '1080p',
            'heightPixels': 798,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi1809694489\/1434659529640-260ouz-1573527341893.mp4?Expires=1577982899&Signature=dsTgVLJFq12cOiNBO~3mextzO8~SGeZkBLUz-eKTwjueh2~AFQlh7Nu9I~WtnvRxxdHg1KZKyMT897trVMdraPVKO2Tf2RB0k~G244LIuY7dvTF6a0hIcfkDJ96lxLpxpUNT5~xGY1ILshbaXUBCKZ7XzoJB-wHfmyJB-OiZTJbbEBExmURSg-Y7GpTL3cBM8SB6GhIF1HttyE-3ZM7nqldNRLuCT8YoUqm778s7J8vbwJoggv9gdX88el2H6-0H5yOpl9xvypSPR4YPZ1w2IUNV8hARuA8wiJcMTb-cmDqFbv9dFyyreG1p3bg9p0g6wJG7rqzLmwsNBj5fDnVT8Q__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 1920
          }
        ],
        'id': '\/video\/imdb\/vi1809694489',
        'image': {
          'height': 702,
          'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BNTg3ZjllMGYtZDQ2OC00YjY5LWEzM2QtZDg4MThlYzE0YWU5XkEyXkFqcGdeQW1hcmNtYW5u._V1_.jpg',
          'width': 1248
        },
        'monetization': '\/video\/imdb\/vi1809694489\/ads\/context\/',
        'primaryTitle': {
          'id': '\/title\/tt8111088\/',
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
        'videoTitle': 'Special Look Trailer'
      }
    ],
    'otherVideos': [
      {
        'contentType': 'Trailer',
        'description': '"The Mandalorian," the first live-action \'Star Wars\' show, is streaming on Disney+ Nov. 12.',
        'durationSeconds': 105,
        'encodings': [
          {
            'definition': '1080p',
            'heightPixels': 798,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi3857301273\/1434659529640-260ouz-1572311676968.mp4?Expires=1577982899&Signature=TOwdtHUMiBhnae1sXxdfl-plXwDfVJyQXjCCkBYW0p-VHdGpMpv99p7EXfJnTWFTHsqFebLJ80DxSj6K8myvbnCfCwYOiTCD2hZPK6IJ16LPPkOvC-jPqDi7I9uJanFx~PNHudZlabLSjFAdQw47tgpQ1uKSrT8alP0u5gedLvDF28BTackHVR2Hb6oe0qogqBniWAGPEQI2AtisW3jF34E5rApKy2UxwokS5YCaZXC6gtGOO-Y-9XPWATAYNSbpqrjhd18C7DVWfujdZxLbelJNGbXBI2k5sJ79w8mbrO5BMVzgl37VdeZFiZb~76c2lVw2QyI57ep5seM2JmgWDQ__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 1920
          },
          {
            'definition': 'SD',
            'heightPixels': 200,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi3857301273\/1434659454657-dx9ykf-1572311676968.mp4?Expires=1577982899&Signature=sF0rfMEkLKDeXaVAC166qgjSyOxjw4B5NTnBhh-F8UVwQg8EDF5glw5NyiIHxXUu2TA64KMTHGO99cPNm-xYeWleBjpD6snmW0YmIcD6vntG48zS9M7-nXCxW~8slLqfEPqIsI6vpbriOjFbnccleogPOE5capwP-JrzvWSJcpneoQH1Z8az2bD2IKQCwhqhIq7MIh4P0Nx6KyMb7sCidje9-wyt-3IUXrqsV-4S20nA2d0Rp5HmhCBeCZNMHVifkLBDNpGdkWPfr7ebj71ogWZJkr7MG35QVcg0f7bxsx11BU-vCXV1ai~W64CFfd3Sozf4~GDejvUbcK3Tx-aHsQ__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 480
          },
          {
            'definition': '480p',
            'heightPixels': 354,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi3857301273\/1434659607842-pgv4ql-1572311676968.mp4?Expires=1577982899&Signature=MiKUqLWpmQ61M0nE1Oo-wVtkfbg~58rD7ohFz2vY-M7KLfGEfE6MoUFBcJP6wDxi0zS-dQruX6erelEsn1We-lpn8H3rNIJh9G4s2i1yyL2~ZZwu5xqAo3DsVhAsqVgmyOkOEPoaTX1RyS6POpA8ii-HqLa9PE3~cg2t6TYRDMTfPHDC5okeManHJkoIiA~9ptzasmZltaEkOucA~RbilZAhjO0Cn47sKIAU5z09AgD~3QDJl3rQLmTlu5FSh4UXWo4olCKS~kFcDn-BZs4-bk-YHgpjobSV-PxUEVWqD-zuG5cQmjI1Yj-VSd85ZO3d3qttryvcZcEd1LGMH3al0g__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 854
          },
          {
            'definition': '720p',
            'heightPixels': 532,
            'mimeType': 'video\/mp4',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi3857301273\/1434659379400-8cjq25-1572311676968.mp4?Expires=1577982899&Signature=ITbP40iiomZstBJQ2bHIueC5gbtMHoieIZeQCFmBQFY33E695reEcuUStvD0JcKhdl8oJzISbLKAOeSxoozfwTwz7XhYC4aXiWPZ8HB7d1phRWeHsQkSD-yAypVVTtN~Xz9y6qDQo1k7QNkkw85z5b7ZYEjYwBpg287CcN9iPYE~vo90NaWVQJf6Mod5j4HsZLE3j0RX8220rj8spLCFDwahHVkjpWo2ExkqAjFq5W2y84FLb~ZfOtrlWMDfj8pRW-AZmR0AUmcnbV3Ka~v9xJNmGGW3cQ1JJJykG1yxmqy5rvAFzLgUPfBetsG6Hbrh23uQscDE10WPHslYysT0hA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 1280
          },
          {
            'definition': 'auto',
            'heightPixels': 798,
            'mimeType': 'application\/x-mpegURL',
            'play': 'https:\/\/imdb-video.media-imdb.com\/vi3857301273\/hls-1572311676968-master.m3u8?Expires=1577982899&Signature=lidjTd5adS2bVDdvwAEbqI-2DZPxbj4G-bF-I-c7gC9JNLJjFp5lQdrvFBkpX2arRmMP-APAQBknxPgX2T2WslWlTA1V~tnK2q4fNNa5-ff~8jMclQEeB-x5z08Tnh6MriBU87rloqXx5dMHX5WbzLWFca-2fy3xfFG8E-wOGNLdJjjakFILXS2lkno0QmAHNx5~kY5uDiRt7EueaPI9lOO0AoxwFhvWtMRPrMxXKd3CKBoKEO2b2wDeHWLdv5uqZhRfLcwqTAyOgRtlawn2a3zJJBArgkCHQ3k~3W8Sl2HHNW1Q2EAkSbnLTkn6x-uC289vleFr3iaplmE7NFK6kw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
            'videoCodec': 'avc-bp',
            'widthPixels': 1920
          }
        ],
        'id': '\/video\/imdb\/vi3857301273',
        'image': {
          'height': 789,
          'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BODNkNDNlZmYtYjBkYS00YjAxLThlNGMtYzcyZjg5NjFkNzg4XkEyXkFqcGdeQW1hcmNtYW5u._V1_.jpg',
          'width': 1403
        },
        'monetization': '\/video\/imdb\/vi3857301273\/ads\/context\/',
        'primaryTitle': {
          'id': '\/title\/tt8111088\/',
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
        'videoTitle': 'Official Trailer 2'
      }
    ]
  },
  'adWidgets': null,
  'id': 'tt8111088',
  'image': {
    'height': 1500,
    'id': '\/title\/tt8111088\/images\/rm4266234113',
    'url': 'https:\/\/m.media-amazon.com\/images\/M\/MV5BMWI0OTJlYTItNzMwZi00YzRiLWJhMjItMWRlMDNhZjNiMzJkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    'width': 1013
  },
  'runningTimeInMinutes': 30,
  'nextEpisode': '\/title\/tt9095424\/',
  'numberOfEpisodes': 9,
  'seriesStartYear': 2019,
  'title': 'The Mandalorian',
  'titleType': 'tvSeries',
  'year': 2019
}

describe('Media Details Page', () => {
  beforeEach(fetchMock.reset);
  afterEach(cleanup);

  const getUi = (url, restContext = {}) => {
    return render(<MemoryRouter initialEntries={[url]}>
      <UserContext.Provider value={{ ...init, favourites: [], user: { id: 123 }, ...restContext }}>
        <Route path={'/home/media/:catogery/:mediaId'}>
          <MediaDetailsPage />
        </Route>
      </UserContext.Provider>
    </MemoryRouter>);
  };

  test('render loading state', async () => {
    const url = `/home/media/movie/${movieResponse.id}`;
    fetchMock.get(`end:/movie/${movieResponse.id}`, movieResponse);
    const { container } = getUi(url);
    expect(container.querySelector('ion-progress-bar')).not.toBeNull();

  });

  test('happy path movie render', async () => {
    const url = `/home/media/movie/${movieResponse.id}`;
    fetchMock.get(`end:/movie/${movieResponse.id}`, movieResponse);
    const { container, getByText } = getUi(url);
    await waitForElement(() => container.querySelector(`#card-${movieResponse.id}`));
    expect(container.querySelector('ion-card-title').textContent).toBe(movieResponse.title);
    expect(container.querySelector('ion-card-content').childNodes[0].textContent).toBe(movieResponse.plot.outline.text);
    expect(container.querySelectorAll('ion-badge').length).not.toBe(0);
    expect(getByText(/Add to favourite/)).not.toBeNull();
  });

  test('happy path tv render', async () => {
    const url = '/home/media/tv/1403';
    fetchMock.get('end:tv/1403', tvResponse);
    fetchMock.get('end:tv/tt9095424', tvResponse);
    const { container } = getUi(url);
    await waitForElement(() => container.querySelector(`#card-${tvResponse.id}`));
    expect(container.querySelector('ion-card-title').textContent).toBe(tvResponse.title);
    expect(container.querySelector('ion-card-content').childNodes[0].textContent).toBe(tvResponse.plot.outline.text);
    expect(container.querySelectorAll('ion-badge').length).not.toBe(0);
  });


  // skipped because of custom elements
  test.skip('test remove item from favourite', async () => {
    const url = '/home/media/movie/458156';
    const favourites = [
      {
        'id': 458156,
        'media_type': 'movie',
        'name': null,
        'poster_path': '/8j58iEBw9pOXFD2L0nt0ZXeHviB.jpg',
        'title': 'John Wick: Chapter 3 – Parabellum'
      }
    ];
    const removeFavourite = jest.fn((id, fav) => ({}));
    fetchMock.get('end:/movie/458156', movieResponse);
    const { debug, getByText } = getUi(url, { favourites, removeFavourite });
    await waitForElement(() => getByText(/Remove as favourite/));
    const removeFavBtn = getByText(/Remove as favourite/);
    fireEvent.click(removeFavBtn);
    expect(removeFavourite).toBeCalledTimes(1);
  });
});
