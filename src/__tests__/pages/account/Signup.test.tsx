import { cleanup, fireEvent, render, wait } from '@testing-library/react';
import * as firebase from 'firebase/app';
import { createMemoryHistory } from 'history';
import React from 'react';
import { MemoryRouter, Router } from 'react-router';
import UserContext, { init } from '../../../context';
import Signup from '../../../pages/account/Signup';



describe.skip('Signup Page', () => {
  afterEach(cleanup);

  beforeAll(() => {

    jest.spyOn(firebase, 'auth').mockImplementation((): any => ({
      currentUser: {
        displayName: 'testDisplayName',
        email: 'test@test.com',
        emailVerified: true,
        sendEmailVerification: jest.fn(() => {
          return Promise.resolve('result of sendEmailVerification')
        })
      }
    }))

    jest.mock('firebase/app', () => ({
      initializeApp: jest.fn(config => ({
        auth: jest.fn(() => {
          return {
            createUserWithEmailAndPassword: jest.fn(() => {
              return Promise.resolve('result of createUserWithEmailAndPassword')
            }),
            signInWithEmailAndPassword: jest.fn(() => {
              return Promise.resolve('result of signInWithEmailAndPassword')
            }),
            currentUser: {
              sendEmailVerification: jest.fn(() => {
                return Promise.resolve('result of sendEmailVerification')
              })
            },
          }
        })
      })),
      firestore: jest.fn(() => ({
        collection: jest.fn(collectionName => ({
          doc: jest.fn(userID => ({
            get: jest.fn(() => Promise.resolve(() => ({
              publicFav: true
            })))
          }))
        }))
      })),
      auth: jest.fn(() => ({
        currentUser: jest.fn(() => ({ sendEmailVerification: jest.fn(() => ({})) }))
      }))
    }));

    firebase.initializeApp({ apiKey: 'sdf' });
  });

  const getUi = (rest = {}, history = createMemoryHistory()) => {
    const url = '/account/signup';
    return render(
      <MemoryRouter initialEntries={[url]}>
        <UserContext.Provider value={{ ...init, favourites: [], user: null, ...rest }}>
          <Router history={history}>
            <Signup />
          </Router>
        </UserContext.Provider>
      </MemoryRouter>
    );
  }

  test('render page', async () => {
    const { container } = getUi();
    expect(container.querySelectorAll('ion-item').length).toBe(5);
  });

  test('click create account page', async () => {
    const createUserWithEmailAndPassword = jest.fn(() => {
      Promise.resolve({});
    });
    const history = createMemoryHistory();
    history.push('/account/signup');
    const { getByText } = getUi({ createUserWithEmailAndPassword });
    const createActBtn = getByText(/Create Account/);
    fireEvent.click(createActBtn);
    expect(createUserWithEmailAndPassword).toBeCalledTimes(1);
  });

  test('error case when account creation fail', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => ({}));
    const { getByText } = getUi();
    fireEvent.click(getByText(/Create Account/));
  });

});