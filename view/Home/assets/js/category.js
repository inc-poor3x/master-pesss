document.addEventListener('DOMContentLoaded', function () {
    // Extract categoryID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryID = urlParams.get('categoryID') || 2; // Default to 2 if not present in the URL

    // Fetch products based on category
    fetch(`http://localhost/Master-pes/master-pesss/API/filters/product_category.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            categoryID: categoryID,
        }),
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response data and generate product cards
            displayProducts(data);
        })
        .catch(error => console.error('Error fetching products:', error));
});

function displayProducts(products) {
    const productList = document.querySelector('.product-list');

    // Generate HTML for each product
    const productsHTML = products.map(product => createProductHTML(product)).join('');

    // Add the generated HTML to the product list
    productList.innerHTML = productsHTML;
}

function createProductHTML(product) {
    return `
    <li class="decoration">
    <div class="product-card">
        <a href="../../details.html" class="card-banner img-holder has-before" style="--width:300; --height:200;"> <!-- Adjusted height to 200px -->
            <img src="${product.Image}" width="100" height="10" loading="lazy" alt="${product.ProductName}" class="img-cover">
            <ul class="card-action-list">

            <li>
                <button class="card-action-btn add-to-cart" arial-label="add to card" title="add to card">
                    <ion-icon name="add-outline" aria-hidden="true"></ion-icon>
                </button>
            </li>

            <li>
                <button class="card-action-btn add-to-cart" arial-label="add to card" title="add to card">
                <ion-icon name="bag-outline"></ion-icon>
                                </button>
            </li>

            <li>
                <button class="card-action-btn add-to-wish-list" arial-label="add to wishlist" title="add to wishlist">
                    <ion-icon name="heart-outline" aria-hidden="true"></ion-icon>
                </button>
            </li>
        </ul>
                    <a href="#" class="card-title">${product.ProductName}</a>

                <p class="card-description">${product.Description}</p> <!-- Added product description -->

                <div class="card-price">
                    <del class="del">$2.00</del>
                    <data class="price" value="${product.Price}">$${product.Price}.00</data>

            </div>
        </a>
    </div>
</li>
`;
}
