
describe('Home page loads', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:8000/home', { waitUntil: 'networkidle0' });
  });

  test('should be titled "Movie Star"', async () => {
    await expect(page.title()).resolves.toMatch('Movie Star');
  });

  test('should show Move/TV tabs', async () => {
    const tabs = await page.$$('ion-segment-button');
    expect(tabs.length).toBe(2);
    // expect(tabs[0])
  });
});
