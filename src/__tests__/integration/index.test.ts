
describe('App hello world test', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8100/', {waitUntil: 'networkidle0'});
  });

  test('Should go to home page', async () => {
    await expect(page.title()).resolves.toMatch('Movie Star');
  });

  test('should open side menu', async () =>{
    await page.click('ion-menu-button.button');
    await page.waitForSelector('ion-router-outlet#main.menu-content-open');
    const sideMenuItems = await page.$$('ion-menu ion-list ion-item');
    expect(sideMenuItems.length).toBe(3)
  });

});

export {};