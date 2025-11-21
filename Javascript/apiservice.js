export class APIService {
    
    // Searches OFF for a product by keyword and returns the first result with an image
    static async searchProduct(keyword) {
        const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(keyword)}&search_simple=1&action=process&json=1&fields=product_name,image_front_small_url,image_thumb_url`;

        const res = await fetch(url);
        const data = await res.json();

        if (!data.products || data.products.length === 0) return null;

        // Filter: must have an image
        const withImage = data.products.find(p =>
            p.image_front_small_url || p.image_thumb_url
        );

        return withImage || null;
    }

    // Converts search result → vending item format
    static convert(local, apiProduct) {
        return {
            id: local.id,
            name: local.name,
            priceCents: local.priceCents,
            category: local.category,
            qty: 5,
            image: apiProduct.image_front_small_url || apiProduct.image_thumb_url || ""
        };
    }
}


//  vending items with search keywords
const searchItems = [
    { id: "snickers", name: "Snickers", priceCents: 200, category: "candy", keyword: "Snickers bar" },
    { id: "kitkat", name: "Kit Kat", priceCents: 200, category: "candy", keyword: "Kit Kat chocolate bar" },
    { id: "twix", name: "Twix", priceCents: 200, category: "candy", keyword: "Twix chocolate bar" },
    { id: "skittles", name: "Skittles", priceCents: 200, category: "candy", keyword: "Skittles candy" },
    { id: "mms", name: "M&M Peanut", priceCents: 200, category: "candy", keyword: "M&M peanut yellow" },

    { id: "doritos", name: "Doritos Nacho Cheese", priceCents: 150, category: "chips", keyword: "Doritos nacho cheese chips" },
    { id: "cheetos", name: "Cheetos Crunchy", priceCents: 150, category: "chips", keyword: "Cheetos crunchy" },
    { id: "laysclassic", name: "Lay's Classic", priceCents: 150, category: "chips", keyword: "Lay's classic chips" },

    { id: "coke", name: "Coca-Cola", priceCents: 175, category: "drink", keyword: "Coca Cola can drink" },
    { id: "sprite", name: "Sprite", priceCents: 175, category: "drink", keyword: "Sprite soda can" },
    { id: "redbull", name: "Red Bull", priceCents: 250, category: "drink", keyword: "Red Bull energy drink" },
    { id: "monster", name: "Monster Energy", priceCents: 250, category: "drink", keyword: "Monster energy drink green can" }
];


// Main function used in main.js
export async function getVendingItems() {

    const results = [];

    for (const item of searchItems) {
        const apiProduct = await APIService.searchProduct(item.keyword);

        if (apiProduct) {
            results.push(APIService.convert(item, apiProduct));
        }
    }

    return results;
}
