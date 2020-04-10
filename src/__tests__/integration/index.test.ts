
describe('App hello world test', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8100/', {waitUntil: 'networkidle0'});
  });

  test('Should go to home page', async () => {
    await expect(page.title()).resolves.toMatch('Movie Star');
  });

});