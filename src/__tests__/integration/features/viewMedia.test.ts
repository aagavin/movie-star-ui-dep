describe("View Media", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8100/", { waitUntil: "networkidle0" });
  });

  test("Should show media segments", async () => {
    const segmentButtons = await page.$$("ion-segment-button");
    expect(segmentButtons.length).toBe(2);

    expect(
      await (await segmentButtons[0].getProperty("innerText")).jsonValue()
    ).toBe("MOVIE");
    expect(
      await (await segmentButtons[1].getProperty("innerText")).jsonValue()
    ).toBe("TV");
  });

  test("Should show move/feature and TV result lits", async () => {
    const segmentButtons = await page.$$("ion-segment-button");
    const movieResultList = await page.$("#result-list-feature");

    //
    expect(segmentButtons.length).toBe(2);
    expect(movieResultList).not.toBeNull();

    await segmentButtons[1].click();
    await page.waitForSelector("#result-list-tvSeries");

    //
    await page.waitFor("#result-list-tvSeries", { visible: true });
    const tvResultList = await page.$("#result-list-tvSeries");
    expect(tvResultList).not.toBeNull();

    (await tvResultList.$("ion-item")).click();

    await page.waitForSelector("ion-card");
    await page.waitForSelector(
      'ion-img[src^="https://m.media-amazon.com/images"]'
    );
    await page.waitForSelector("ion-card-title");
    await page.waitForSelector("ion-card-content");
    
    // 
    expect(
      await (await (await page.$('ion-card ion-card-content')).getProperty("innerText")).jsonValue()
    ).not.toBeNull();
  });
});

export {};
