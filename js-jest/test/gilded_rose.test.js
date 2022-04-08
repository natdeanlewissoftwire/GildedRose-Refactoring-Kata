const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("naming should be consistent", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    expect(gildedRose.items[0].name).toBe("foo");
  });

  it("should degrade twice as fast after sell by date", () => {
    const gildedRose = new Shop([new Item("bread", 0, 30)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(28);
  });

  it("item quality can't be set to negative", () => {
    const gildedRose = new Shop([new Item("bread", 0, -10)])
    expect(gildedRose.items[0].quality).toBeGreaterThanOrEqual(0);
  });

  it("item quality should never be negative after an update", () => {
    const gildedRose = new Shop([new Item("bread", 0, 0)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBeGreaterThanOrEqual(0);
  });

  it("Aged Brie increases in quality over time", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBeGreaterThan(10);
  });

  it("item quality should never be more than 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBeLessThanOrEqual(50);
  });
  
  it("Sulfuras quality is constant", () => {
    const gildedRose = new Shop([new Item("Sulfuras", 0, 80)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(80);
  });
  
  describe("Backstage pass", () => {
    it("quality increases by 1 when there are more than 10 days left", () => {
      const gildedRose = new Shop([new Item("Backstage pass", 12, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(11);
    });


    it("quality increases by 2 when there are 10 days or less", () => {
      const gildedRose = new Shop([new Item("Backstage pass", 10, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(12);
    });

    it("quality increases by 3 when there are 5 days or less", () => {
      const gildedRose = new Shop([new Item("Backstage pass", 5, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(13);
    });

    it("Backstage pass quality is 0 after sell by date", () => {
      const gildedRose = new Shop([new Item("Backstage pass", 0, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
    });
  });
  
  describe("Conjured items", () => {
    it("Should decrease in quality twice as fast before sell by date", () => {
      const gildedRose = new Shop([new Item("Conjured bread", 1, 30)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(28);
    })

    it("Should decrease in quality twice as fast after sell by date", () => {
      const gildedRose = new Shop([new Item("Conjured bread", 0, 30)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(26);
    })
  });
});