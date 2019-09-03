import Name from "../valueobjects/Name"

export default class Item {
    constructor(name, id, qty) {
    this.itemName = name;
    this.Id = id;
    this.qty = qty;
    }
}