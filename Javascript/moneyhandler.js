export class MoneyHandler {
    constructor() {
        this.balance = 0;
    }

    addMoney(amount) {
        this.balance += amount;
    }

    getBalance() {
        return this.balance;
    }

    deduct(amount) {
        this.balance -= amount;
    }

    reset() {
        this.balance = 0;
    }
}