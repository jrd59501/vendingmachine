export class Item {
    constructor(id, name, priceCents, qty, image = "", category = "") {
        this.id = id;
        this.name = name;
        this.priceCents = priceCents;
        this.qty = qty;
        this.image = image;
        this.category = category;
    }
}
