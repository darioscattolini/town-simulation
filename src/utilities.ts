class ArrayExtended<T> extends Array<T> {
  constructor() {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public removeItem(item: T) {
    if (!this.includes(item)) throw new Error('Item not included in array.');
    const index = this.indexOf(item);
    this.splice(index, 1);
  }
}

class BidimensionalArray<T> extends ArrayExtended<[T, T]> {
  constructor() {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public deepIncludes(item: T) {
    return this.some(array => array.includes(item));
  }

  public pushCouple(item1: T, item2: T) {
    this.push([item1, item2]);
  }
}
