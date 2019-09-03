import User from "./User"
import Item from "./Item"

export default class Order {
    constructor(user, items) {
        this.owner = user.name;
        this.items = [];

        items.foreach(item => {
            this.items.push(item);
        });

    }


}