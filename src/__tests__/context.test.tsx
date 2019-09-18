import { cleanup } from '@testing-library/react'
import { init } from '../context';

describe('Context', () => {
  afterEach(cleanup);

  test('init basic state', async () => {
    expect(init.user).toEqual({});
    expect(init.signInWithEmailAndPassword).toBeNull();
    expect(init.createUserWithEmailAndPassword).toBeNull();
  });

  // TODO: FIX propper mock
  test.skip('addFavourite', async () => {

    expect(typeof init.addFavourite).toBe('function');
    await init.addFavourite('abcde', {});
  });

  test.skip('removeFavourite', async () => {

    expect(typeof init.removeFavourite).toBe('function');
    await init.removeFavourite('abcde', 234);
  });

  test.skip('removeFavourite', async () => {
    expect(typeof init.getFavourites).toBe('function');
    await init.getFavourites('abcde');
  })
});
