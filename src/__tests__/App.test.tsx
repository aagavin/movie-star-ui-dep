import { cleanup, render, waitForElement } from '@testing-library/react'
import React from 'react';
import App from '../App';

describe('Main App', () => {
  afterEach(cleanup);

  test('renders without crashing', async () => {
    const ui = render(<App />);
    await waitForElement(() => ui.container.querySelector('ion-menu-toggle'));
  });
});
