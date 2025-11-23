export class UIController { 
    constructor(machine, moneyHandler) {
        this.machine = machine;
        this.moneyHandler = moneyHandler;

        this.grid = document.getElementById("product-grid");
        this.balanceDisplay = document.getElementById("balance");
        this.messageBox = document.getElementById("message");
    }

    renderItems() {
        this.grid.innerHTML = "";

        this.machine.items.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("product");
            div.dataset.id = item.id;
            
            div.innerHTML = ` 
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${(item.priceCents / 100).toFixed(2)}</p>
                <p>Qty: ${item.qty}</p>
            `;

            div.addEventListener("click", () => {
                this.machine.selectItem(item.id);

                // highlight selection
                document.querySelectorAll(".product").forEach(p => p.classList.remove("selected"));
                div.classList.add("selected");

                this.showMessage(`Selected: ${item.name}`);
            });

            this.grid.appendChild(div);
        });
    }

    updateBalance() {
        this.balanceDisplay.textContent = (this.moneyHandler.getBalance() / 100).toFixed(2);
    }

    showMessage(msg) {
        this.messageBox.textContent = msg;
    }

    showReturnedMoney(amount) {
        this.showMessage(`Returned: $${(amount / 100).toFixed(2)}`);
    }
}
