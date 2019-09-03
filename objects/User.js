import Name from "../valueobjects/Name"
import Address from "../valueobjects/Address"

export default class User {
    
    constructor(first, last, addr, uuid, orders = []) {
    this.firstName = new Name(first).getName;
    this.lastName = new Name(last).getName;
    this.name = this.firstName + ' ' +this.lastName;
    this.address = new Address(addr);
    this.id = uuid;
    this.orders = orders;
    }


}