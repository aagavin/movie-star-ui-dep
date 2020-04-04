import { cleanup } from '@testing-library/react';
import * as firebase from 'firebase/app';
import { init } from '../../context';

describe('Context', () => {
  afterEach(cleanup);

  beforeAll(() => {
    jest.mock('firebase/app', () => ({
      initializeApp: jest.fn(config => ({})),
      firestore: jest.fn(() => ({
        collection: jest.fn(collectionName => ({
          doc: jest.fn(userID => ({
            get: jest.fn(() => Promise.resolve(() => ({
              publicFav: true
            }))),
            set: jest.fn((fav, obj) => Promise.resolve({}))
          })),
        }))
      }))
    }));

    firebase.initializeApp({projectId: 'sdf'});
  });

  test('init basic state', async () => {
    expect(init.user).toEqual({});
    expect(init.signInWithEmailAndPassword).toBeNull();
    expect(init.createUserWithEmailAndPassword).toBeNull();
  });


  test('addFavourite', async () => {
    expect(typeof init.addFavourite).toBe('function');
    init.addFavourite('abcde', {'asdf': {name: 'name'}}).then().catch();
  });

  test('removeFavourite', async () => {

    expect(typeof init.removeFavourite).toBe('function');
    init.removeFavourite('abcde', 234).then().catch();
  });

  test('removeFavourite', async () => {
    expect(typeof init.getFavourites).toBe('function');
    init.getFavourites('abcde').then().catch();
  })
});
