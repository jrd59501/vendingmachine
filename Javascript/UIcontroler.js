export class UIController {
    constructor(machine, moneyHandler) {
        this.machine = machine;
        this.moneyHandler = moneyHandler;

        this.productGrid = document.getElementById("product-grid");
        this.balanceDisplay = document.getElementById("balance");
        this.messageBox = document.getElementById("message");
    }

    renderItems() {
        this.productGrid.innerHTML = "";

        this.machine.items.forEach(item => {
            const div = document.createElement("div");
            div.className = "product";
            div.dataset.id = item.id;
            div.textContent = `${item.name} - ${item.priceCents}¢ (qty: ${item.qty})`;

            div.addEventListener("click", () => {
                this.machine.selectItem(item.id);
                this.showMessage(`Selected: ${item.name}`);
            });

            this.productGrid.appendChild(div);
        });
    }

    updateBalance() {
        this.balanceDisplay.textContent = this.moneyHandler.getBalance();
    }

    showMessage(text) {
        this.messageBox.textContent = text;
    }
}
