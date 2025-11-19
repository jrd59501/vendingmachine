APIService.getItems().then(data => {
    const itemObjects = data.map(item => new Item(
        item.id,
        item.name,
        item.priceCents,
        item.qty,
        item.image,
        item.category
    ));
    machine.loadItems(itemObjects);
});
