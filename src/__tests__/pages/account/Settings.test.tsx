import { cleanup, fireEvent, render } from '@testing-library/react';
import * as firebase from 'firebase/app';
import { createMemoryHistory } from 'history';
import React from 'react';
import { MemoryRouter, Router } from 'react-router';
import UserContext, { init } from '../../../context';
import Settings from '../../../pages/account/Settings';

describe('Settings Page', () => {
  afterEach(cleanup);

  const getUi = (rest = {}, history = createMemoryHistory()) => {
    const url = '/settings';
    return render(
      <MemoryRouter initialEntries={[url]}>
        <UserContext.Provider value={{ ...init, favourites: [], user: null, ...rest }}>
          <Router history={history}>
            <Settings />
          </Router>
        </UserContext.Provider>
      </MemoryRouter>
    );
  }

  test('render page', async () => {
    const { container } = getUi();
    expect(container.querySelector('ion-title').textContent).toBe('Settings');
  });

  test('toggle public favourite ', async () => {

    jest.mock('firebase/app', () => ({
      initializeApp: jest.fn(config => ({})),
      firestore: jest.fn(() => ({
        collection: jest.fn(collectionName => ({
          doc: jest.fn(userID => ({
            get: jest.fn(()=> Promise.resolve(() => ({
              publicFav: true
            })))
          }))
        }))
      }))
    }));

    firebase.initializeApp({projectId: 'sdf'});

    const { container } = getUi({user: {uid: '123456'}});
    const firstToggle = container.querySelectorAll('ion-toggle')[0];
    fireEvent.click(firstToggle);
  });
});