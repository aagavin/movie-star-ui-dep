import { cleanup, fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { MemoryRouter, Router } from 'react-router';
import UserContext, { init } from '../../../../context';
import LoginPage from '../../../../pages/account/Login';

describe.skip('Login Page', () => {
  afterEach(cleanup);

  const getUi = (rest = {}, history = createMemoryHistory()) => {
    const url = '/account/login';
    return render(
      <MemoryRouter initialEntries={[url]}>
        <UserContext.Provider value={{ ...init, favourites: [], user: null, ...rest }}>
          <Router history={history}>
            <LoginPage />
          </Router>
        </UserContext.Provider>
      </MemoryRouter>
    );
  }

  test('render page', async () => {
    const { container } = getUi();
    expect(container.querySelectorAll('ion-item[id^="imput-"]').length).toBe(2);
  });

  test('click signin button', async () => {
    const mockSignInFn = jest.fn((user, pass) => null);
    const { container } = getUi({ signInWithEmailAndPassword: mockSignInFn });
    const button = container.querySelector('ion-button');
    fireEvent.click(button);
    expect(mockSignInFn).toBeCalledTimes(1);
  });

  test('click create account button', async () => {
    const history = createMemoryHistory();
    const { getByText } = getUi({}, history);
    const signInButton = getByText(/Create one/);
    fireEvent.click(signInButton);
    expect(history.location.pathname).toBe('/account/signup');
  });

});