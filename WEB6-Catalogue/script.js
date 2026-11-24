
const products = [
    { name: "Ruby Essence", price: 1200, category: "Floral" },
    { name: "Midnight Shadow", price: 1500, category: "Woody" },
    { name: "Ocean Mist", price: 1000, category: "Fresh" },
    { name: "Velvet Rose", price: 1300, category: "Floral" },
    { name: "Golden Aura", price: 1800, category: "Woody" },
    { name: "Cool Breeze", price: 900, category: "Fresh" }
];

const productContainer = document.getElementById("products");
const search = document.getElementById("search");
const category = document.getElementById("category");

function displayProducts() {
    let searchValue = search.value.toLowerCase();
    let categoryValue = category.value;

    let filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchValue) &&
        (categoryValue === "All" || product.category === categoryValue)
    );

    productContainer.innerHTML = "";

    if (filteredProducts.length === 0) {
        productContainer.innerHTML = "<p>No products found!</p>";
        return;
    }

    filteredProducts.forEach(product => {
        productContainer.innerHTML += `
            <div class="card">
                <h3>${product.name}</h3>
                <p>Price: ₹${product.price}</p>
                <p>Category: ${product.category}</p>
            </div>
        `;
    });
}

search.addEventListener("input", displayProducts);
category.addEventListener("change", displayProducts);

displayProducts();

