import { VendingMachine } from "./vendingmachine.js";
import { MoneyHandler } from "./moneyhandler.js";
import { Item } from "./items.js";
import { APIService } from "./apiservice.js";
import { UIController } from "./UIcontroler.js";

// Create core objects
const machine = new VendingMachine();
const money = new MoneyHandler();
const ui = new UIController(machine, money);

// Load items from API at startup
APIService.getItems().then(items => {
    machine.loadItems(items);
    ui.renderItems();
});

// Handle money insertion buttons
document.querySelectorAll(".money-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const amount = parseInt(btn.dataset.amount);
        money.addMoney(amount);
        ui.updateBalance();
    });
});

// Handle the BUY button
document.getElementById("buy-btn").addEventListener("click", () => {
    const balance = money.getBalance();

    if (!machine.canPurchase(balance)) {
        ui.showMessage("You cannot purchase this item.");
        return;
    }

    // Purchase item locally
    const purchasedItem = machine.purchase(balance);

    // Deduct money
    money.deduct(purchasedItem.priceCents);

    // Save updated qty to API
    APIService.updateItemQuantity(purchasedItem.id, purchasedItem.qty);

    // Log the transaction
    APIService.logTransaction({
        id: purchasedItem.id,
        name: purchasedItem.name,
        priceCents: purchasedItem.priceCents,
        timestamp: Date.now()
    });

    // Update UI
    ui.updateBalance();
    ui.renderItems();
    ui.showMessage(`You bought: ${purchasedItem.name}`);
});
