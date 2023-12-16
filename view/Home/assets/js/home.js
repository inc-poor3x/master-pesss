
document.addEventListener('DOMContentLoaded', function () {
    // Fetch the data from the API
    fetch('http://localhost/Master-pes/master-pesss/API/admin/category/show.php')
        .then(response => response.json())
        .then(data => {
            // Loop through each list item and update the href attribute
            const listItems = document.querySelectorAll('.hero-list li');
            listItems.forEach((item, index) => {
                const categoryID = data[index].categoryID;
                const categoryLink = item.querySelector('.card-title');
                categoryLink.href = `accessories.html?categoryID=${categoryID}`;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});








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






document.addEventListener('DOMContentLoaded', function () {
    // Fetch the API endpoint
    fetch('http://localhost/Master-pes/master-pesss/API/store/show.php')
        .then(response => response.json())
        .then(data => {
            // Shuffle the array to get random stores
            const shuffledData = shuffleArray(data);

            // Select unique stores
            const selectedStores = [];
            let currentIndex = 0;

            while (selectedStores.length < 3 && currentIndex < shuffledData.length) {
                const currentStore = shuffledData[currentIndex++];
                if (!selectedStores.some(store => store.StoreID === currentStore.StoreID)) {
                    selectedStores.push(currentStore);
                }
            }

            // Get the ul element to append the store items
            const storeList = document.getElementById('storeList');

            // Iterate over selected stores and create HTML elements
            selectedStores.forEach(store => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="blog-card">
                        <div class="card-banner img-holder" style="--width:374; --height:243;">
                            <img src="${store.StoreImage}" width="374" height="243" loading="lazy" alt="${store.StoreName}" class="img-cover">
                            <a href="blog.html" class="card-btn">
                                <span class="span">Show more</span>
                                <ion-icon name="add-outline" aria-hidden="true"></ion-icon>
                            </a>
                        </div>
                        <div class="card-content">
                            <h3 class="h3">
                                <a href="#" class="card-title">${store.StoreName}</a>
                            </h3>
                            <ul class="card-meta-list">
                                <li class="card-meta-item">
                                    <time class="card-meta-text" datetime="2023-11-27">November 27, 2023</time>
                                </li>
                                <li class="card-meta-item">
                                    <a href="#" class="card-meta-text">${store.Category}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                `;
                storeList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to shuffle array elements
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
window.addEventListener('load', function () {
    // Get the video frame by ID
    var videoFrame = document.getElementById('videoFrame');
    
    // Post a message to start playing the video
    videoFrame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
});















document.addEventListener('DOMContentLoaded', function () {
    // Fetch all products (without specifying a category)
    fetch('http://localhost/Master-pes/master-pesss/API/proudcte/show.php')
        .then(response => response.json())
        .then(data => {
            // Shuffle the array to randomize product order
            const shuffledProducts = shuffleArray(data);

            // Take the first 6 products
            const selectedProducts = shuffledProducts.slice(0, 8);

            // Handle the response data and generate product cards
            displayProducts(selectedProducts);
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
                        <a href="details.html?id=${product.ProductID}">
                            <button class="card-action-btn show-more" aria-label="show more" title="show more">
                                <ion-icon name="ellipsis-horizontal" aria-hidden="true"></ion-icon>
                            </button>
                        </a>
                    </li>
                </ul>
            </div>
            <a href="details.html?id=${product.ProductID}" style="--width:300; --height:200;">
                <span class="visually-hidden">${product.ProductName}</span>
            </a>
            <p class="card-description">${product.Description}</p>
            <div class="card-price">
                <data class="price" value="${product.Price}">$${product.Price}.00</data>
            </div>
            <div class="more-details" style="display: none;">
                <p>Additional details go here...</p>
            </div>
        </div>
    </li>
    `;
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
