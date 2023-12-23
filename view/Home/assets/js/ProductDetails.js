/* *************************** details fetching *******************************************************/
document.addEventListener("DOMContentLoaded",  () => {

    // we catching the ID 
            const eventContainer = document.getElementById('box');
            const URLID = new URLSearchParams(window.location.search);//search on url about parameters
            const id = URLID.get('id');
            console.log(id);
         
        fetch(`http://localhost/Master-pes/master-pesss/API/proudcte/show_id.php?id=${id}`)
            .then(response => response.json())
            .then(data => {
          
             
                console.log(data);

                eventContainer.innerHTML = `

                <div class="images">
                <div class="img-holder active">
                    <img src="${data.Image}">
                </div>
            </div>
            
            <div class="product-details">
                <div class="basic-info">
                    <h1>${data.ProductName}</h1>
                    <span>$250</span>
            
                    <div class="description">
                        <p>${data.Description}</p>
                    </div>
                </div>
            
                <div class="store-info">
        <a href="store.html?storeID=${data.StoreID}" class="store-link">
            <div class="profile-image-img">
                <img src="${data.StoreImage}">
            </div>
            <div class="description">
                <p>${data.StoreName}</p>
            </div>
        </a>
    </div>
            
                <div class="options">
                    <button class="card-action-btn add-to-wish-list" aria-label="add to wishlist" title="add to wishlist" id="Login" data-product-id="${data.ProductID}">
                        Add to Wishlist
                    </button>
                    <button class="card-action-btn add-to-cart" aria-label="add to cart" title="add to cart" id="Login" data-product-id="${data.ProductID}">
                        Add to Cart
                    </button>
                </div>
            </div>
            
            `
    ;

 console.log(user.store_id );
    eventContainer.appendChild(productRow);
  
  })
  .catch(error => console.error('Error:', error));

 
});



/*************************************************************************************************** */
/*********************Add to cart function *********************/    
document.addEventListener('click', function (event) {
    const addToCartButton = event.target.closest('.add-to-cart');
    if (addToCartButton) {
        const productId = addToCartButton.dataset.productId;
        addToCart(productId);
    }
});



function addToCart(productId) {
    var userId = sessionStorage.getItem('UserID');
 console.log(userId);
    // Check if the user is logged in
    if (!userId) {
        console.error('User not logged in');
        return;
    }

    // Fetch API to add the product to the cart
    fetch(`http://localhost/Master-pes/master-pesss/API/user_access/cart/cart.php?UserID=${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         
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


// Add an event listener to the document to listen for click events on the ".add-to-wish-list" button
// 




document.addEventListener('click', function (event) {
    const addToWishlistButton = event.target.closest('.add-to-wish-list');
    if (addToWishlistButton) {
        const productId = addToWishlistButton.dataset.productId;
        addToWishlist(productId);  // Corrected function name
    }
});


function addToWishlist(productId) {
    var userId = sessionStorage.getItem('UserID');
    console.log(userId);

    // Check if the user is logged in
    if (!userId) {
        console.error('User not logged in');
        return;
    }

    // Fetch API to add the product to the wishlist
    fetch(`http://localhost/Master-pes/master-pesss/API/wishlist/wishlist-add.php?UserID=${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ProductID: productId,
        }),
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            console.log('Response:', data);

            if (data.success) {
                // Product added to wishlist successfully
                console.log('Product added to wishlist:', data.message);
            } else {
                // Product is already in the wishlist
                console.log('Product already in wishlist:', data.message);

                // Find the button with the matching data-product-id attribute
                const wishlistButton = document.querySelector(`.add-to-wish-list[data-product-id="${productId}"]`);

              // ...

            if (wishlistButton) {
    // Change the style of the heart button to indicate it's already in the wishlist
    wishlistButton.innerHTML = 'Product  in  wishlist';
           wishlistButton.classList.add('already-in-wishlist');
            }
            }
        })
        .catch(error => console.error('Error adding product to wishlist:', error));
}







//////////////////////////////////////////////total////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    // Get user ID from session storage
    const userID = sessionStorage.getItem('UserID');

    // Check if user ID exists
    if (userID) {
        // Construct the API endpoint URL
        const apiUrl = `http://localhost/Master-pes/master-pesss/API/wishlist/total.php?UserID=${userID}`;

        // Make a fetch request to the API endpoint
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Check if the API request was successful
                if (data.success) {
                    // Update the wishlist count in the HTML
                    const wishlistCountElement = document.querySelector('.header__user-actions .count');
                    wishlistCountElement.textContent = data.totalItems;
                } else {
                    console.error('Error fetching wishlist count:', data.error);
                }
            })
            .catch(error => {
                console.error('Error fetching wishlist count:', error);
            });
    }
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////rating /////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    // Get the ProductID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Make a request to the API
    fetch(`http://localhost/Master-pes/master-pesss/API/user_access/rating/show.php?ProductID=${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Directly use the data without parsing
            console.log(data);
            const commentContainer = document.getElementById('commentContainer');
            commentContainer.innerHTML = generateCommentHTML(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Function to generate HTML for comments with star rating
    function generateCommentHTML(data) {
        const comments = data.trim().split('\n').map(jsonString => JSON.parse(jsonString));
        
        // Shuffle the array of comments
        shuffleArray(comments);

        // Select the first three comments
        const selectedComments = comments.slice(0, 3);

        return selectedComments.map(comment => {
            const starRating = generateStarRating(comment.RatingValue);
            return `
                <div class="comment-box">
                    <div class="box-topTop">
                        <div class="ProfileProfile">
                            <div class="NameName">
                                <strong>${comment.UserName}</strong>
                                <span>${starRating}</span>
                            </div>
                        </div>
                    </div>
                    <div class="commentComm">
                        <p>${comment.Comment}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Function to generate star icons based on rating value
    function generateStarRating(ratingValue) {
        const roundedRating = Math.round(ratingValue);
        const stars = '★'.repeat(roundedRating);
        return stars;
    }

    // Function to shuffle an array in place (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});





document.getElementById('submitRating').addEventListener('click', function() {
    // Get form data
    var comment = document.getElementById('comment').value;
    var rating = document.getElementById('rating').value;
    
    // Get user ID from session (replace 'yourUserIdKey' with your actual session key)
    var userId = sessionStorage.getItem('UserID');
    
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    // Prepare data for the fetch request
    var formData = {
        RatingValue: rating,
        Comment: comment
    };
    
    // Make the fetch request
    fetch(`http://localhost/Master-pes/master-pesss/API/user_access/rating/creat.php?UserID=${userId}&ProductID=${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the API response
        console.log(data);
        if (data.status === 'success') {
            alert('Review successfully inserted');
            // Optionally, redirect or perform other actions after successful submission
        } else {
            alert('Failed to insert review');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the review');
    });
});