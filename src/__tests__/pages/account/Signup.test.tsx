import { cleanup, fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { MemoryRouter, Router } from 'react-router';
import UserContext, { init } from '../../../context';
import Signup from '../../../pages/account/Signup';


describe('Signup Page', () => {
  afterEach(cleanup);

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
    const { container, debug } = getUi();
    expect(container.querySelectorAll('ion-item').length).toBe(5);
  });

  test('click create account page', async ()=>{
    const { getByText, debug } = getUi();
    const createActBtn = getByText(/Create Account/);
    fireEvent.click(createActBtn);
    debug();
  });

});