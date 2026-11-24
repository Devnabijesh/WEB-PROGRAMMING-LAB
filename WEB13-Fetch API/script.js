
let products = [];

async function loadProducts() {
    let results = document.getElementById("results");

    results.innerHTML = '<p class="message">Loading products...</p>';

    try {
        let response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
            throw new Error("Unable to load products");
        }

        let data = await response.json();
        products = data.products;

        displayProducts(products);

    } catch (error) {
        results.innerHTML =
            '<p class="message">Failed to load products. Try again!</p>';
    }
}

function searchProducts() {
    let keyword = document.getElementById("search")
        .value.toLowerCase().trim();

    let filtered = products.filter(product =>
        product.title.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword)
    );

    displayProducts(filtered);
}

function displayProducts(data) {
    let results = document.getElementById("results");
    let count = document.getElementById("count");

    results.innerHTML = "";
    count.innerHTML = data.length + " Products Found";

    if (data.length === 0) {
        results.innerHTML =
            '<p class="message">No products found!</p>';
        return;
    }

    data.forEach(product => {
        results.innerHTML += `
            <div class="card">
                <img src="${product.thumbnail}"
                     alt="${product.title}"
                     onerror="this.src='https://placehold.co/300x200?text=No+Image'">

                <div class="card-content">
                    <h3>${product.title}</h3>
                    <p>Category: ${product.category}</p>
                    <p class="price">$${product.price}</p>
                    <p>Rating: ⭐ ${product.rating}</p>
                </div>
            </div>
        `;
    });
}

loadProducts();
