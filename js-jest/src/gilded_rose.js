class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items.map(item => this.keepWithinBounds(item));
  }

  updateAgedBrieQuality(item) {
    item.quality++;
    return item;
  }

  updateBackstagePassQuality(item) {
    item.quality++;
    if (item.sellIn <= 10) { item.quality++; }
    if (item.sellIn <= 5) { item.quality++; }

    if (item.sellIn < 0) { item.quality = 0; }
    return item;
  }

  updateGeneralItemQuality(item) {
    let decrement = 1;
    if (item.name.startsWith("Conjured")) { decrement *= 2 };

    if (item.sellIn < 0) { item.quality -= 2 * decrement; }
    else { item.quality -= decrement; }
    
    return item;
  }

  keepWithinBounds(item) {
    if (item.name.startsWith("Sulfuras")) { return item; }
    item.quality = Math.min(50, Math.max(item.quality, 0));
    return item;
  }

  updateQuality() {
    this.items = this.items.map(item => {
      item.sellIn--;
      if (item.name === "Aged Brie") { return this.updateAgedBrieQuality(item); }

      if (item.name.startsWith("Sulfuras")) { return item; }
      
      if (item.name.startsWith("Backstage pass")) { return this.updateBackstagePassQuality(item); }

      return this.updateGeneralItemQuality(item);
    })

    this.items = this.items.map(item => this.keepWithinBounds(item));
  }
}

module.exports = {
  Item,
  Shop
}
