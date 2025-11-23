//main.js
import { VendingMachine } from "./vendingmachine.js";
import { MoneyHandler } from "./moneyhandler.js";
import { UIController } from "./uiController.js";
import { getVendingItems } from "./apiservice.js";

// Core objects
const machine = new VendingMachine();
const money = new MoneyHandler();
const ui = new UIController(machine, money);

// Load items from the real API
getVendingItems().then(items => {
    console.log("Loaded API items:", items);
    machine.loadItems(items);
    ui.renderItems();
}).catch(err => {
    console.error("API Error:", err);
    ui.showMessage("Failed to load products.");
});

// MONEY BUTTONS
document.querySelectorAll(".money-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const amount = Number(btn.dataset.amount);
        money.addMoney(amount);
        ui.updateBalance();
    });
});
// RETURN CHANGE BUTTON
document.getElementById("return-btn").addEventListener("click", () => {
    const returned = money.returnAll();  // give all money back
    ui.updateBalance();
    ui.showMessage(`Returned: $${(returned / 100).toFixed(2)}`);
});

// PURCHASE BUTTON
document.getElementById("buy-btn").addEventListener("click", () => {
    const balance = money.getBalance();

    if (!machine.canPurchase(balance)) {
        ui.showMessage("Not enough money or no item selected.");
        return;
    }

    const purchasedItem = machine.purchase(balance);
    money.deduct(purchasedItem.priceCents);

    ui.updateBalance();
    ui.renderItems();
    ui.showMessage(`You bought: ${purchasedItem.name}`);
});
