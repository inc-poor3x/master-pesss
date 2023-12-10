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
        <div class="card-banner img-holder has-before" style="--width:300; --height:200;">
            <img src="${product.Image}" width="100" height="200" loading="lazy" alt="${product.ProductName}" class="img-cover" >
            <ul class="card-action-list">
                <li>
                    <button type="button" class="card-action-btn add-to-cart" aria-label="add to cart" title="add to cart" data-product-id="${product.ProductID}">
                        <ion-icon name="add-outline" aria-hidden="true"></ion-icon>
                    </button>
                </li>
                <li>
                    <button class="card-action-btn add-to-wish-list" aria-label="add to wishlist" title="add to wishlist">
                        <ion-icon name="heart-outline" aria-hidden="true"></ion-icon>
                    </button>
                </li>
                <li>
                    <button class="card-action-btn show-more" aria-label="show more" title="show more">
                        <ion-icon name="ellipsis-horizontal" aria-hidden="true"></ion-icon>
                    </button>
                </li>
            </ul>
            </div>
            <a href="details.html" style="--width:300; --height:200;">
            <span class="visually-hidden">${product.ProductName}</span>
        </a>            <p class="card-description">${product.Description}</p>
            <div class="card-price">
                <del class="del">$2.00</del>
                <data class="price" value="${product.Price}">$${product.Price}.00</data>
            </div>
            <div class="more-details" style="display: none;">
                <p>Additional details go here...</p>
            </div>
        </div>
    </div>
 
    </div>
</li>



`;
}
document.addEventListener('click', function (event) {
    const addToCartButton = event.target.closest('.add-to-cart');
    if (addToCartButton) {
        const productId = addToCartButton.dataset.productId;
        addToCart(productId);
    }
});

function addToCart(productId) {
    const userId = sessionStorage.getItem('UserID');

    // Check if the user is logged in
    if (!userId) {
        console.error('User not logged in');
        return;
    }

    // Fetch API to add the product to the cart
    fetch('http://localhost/Master-pes/master-pesss/API/user_access/cart/cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            UserID: userId,
            ProductID: productId,
            SubOrSum: 1,
            Quantity: 1,
        }),
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response data if needed
            console.log('Product added to cart:',data.message);
            console.log('Product added to cart:', data);
        })
        .catch(error => console.error('Error adding product to cart:', error));
}