//vendingmachine.js
export class VendingMachine {
    constructor() {
        this.items = [];
        this.selectedItem = null;
    }

    loadItems(items) {
        this.items = items;
    }

    selectItem(id) {
        this.selectedItem = this.items.find(i => i.id === id);
        return this.selectedItem;
    }

    canPurchase(balance) {
        if (!this.selectedItem) return false;
        return balance >= this.selectedItem.priceCents && this.selectedItem.qty > 0;
    }

    purchase() {
        this.selectedItem.qty -= 1;
        const purchasedItem = this.selectedItem;
        this.selectedItem = null;
        return purchasedItem;
    }
}
