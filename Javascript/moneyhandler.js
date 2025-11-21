export class MoneyHandler {
    constructor() {
        this.balance = 0; // stored in cents
    }

    addMoney(cents) { // add money in cents
        this.balance += cents;
    }

    getBalance() { // get current balance
        return this.balance;
    }

    deduct(cents) { // deduct money in cents
        this.balance -= cents;
        if (this.balance < 0) this.balance = 0;
    }

    //return all money
    returnAll() {
        const returned = this.balance;
        this.balance = 0;
        return returned;
    }

    // Converts cents → readable string
    static toDollar(amount) {
        return (amount / 100).toFixed(2);
    }
}
