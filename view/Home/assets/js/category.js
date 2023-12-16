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
                    <button class="card-action-btn add-to-wish-list"  aria-label="add to wishlist" title="add to wishlist">
                        <ion-icon name="heart-outline" aria-hidden="true"></ion-icon>
                    </button>
                </li>
                <li>
                <a href="details.html"     <button class="card-action-btn show-more" aria-label="show more" title="show more">
                        <ion-icon name="ellipsis-horizontal" aria-hidden="true"></ion-icon>
                    </button> </a>
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























document.addEventListener('DOMContentLoaded', function () {
    // Retrieve user ID from session storage
    var userID = sessionStorage.getItem('UserID');

    // Check if the user ID is available
    if (userID) {
        // Construct the API request payload
        var apiPayload = {
            "Action": "getTotalInCart",
            "UserID": userID
        };

        // Log the payload for debugging
        console.log('API Payload:', apiPayload);

        // Make the API request when the page loads
        fetch('http://localhost/Master-pes/master-pesss/API/user_access/cart/total.php', {
            method: 'POST', // Use POST method since you are sending data
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(apiPayload)
        })
            .then(response => response.json())
            .then(data => {
                // Log the API response for debugging
                console.log('API Response:', data);

                // Check if the API request was successful
                if (data.success) {
                    // Update the cart count on the button
                    var cartCountElement = document.getElementById('cartCount');
                    cartCountElement.textContent = data.data.Total;
                } else {
                    // Handle the case when the API request is not successful
                    console.error('Error retrieving total from the cart:', data.message);
                }
            })
            .catch(error => {
                // Handle network errors or other exceptions
                console.error('Error making API request:', error);
            });
    } else {
        // Handle the case when the user ID is not available in session storage
        console.error('User ID not found in session storage.');
    }
});














