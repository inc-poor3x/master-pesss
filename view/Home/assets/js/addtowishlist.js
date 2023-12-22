let wish =document.querySelectorAll('.add-to-wish-list');

for(let i=0;i<wish.length;i++){
    wish[i].addEventListener('click',() =>{
        console.log("added to wishlist");
    })
}



document.addEventListener('DOMContentLoaded', function () {
    const productListContainer = document.querySelector('.product-list');

    function createListItem(item) {
        const listItem = document.createElement('li');
        
        const imageElement = document.createElement('img');
        imageElement.src = item.Image;
        imageElement.alt = item.ProductName;

        const productNameElement = document.createElement('p');
        productNameElement.textContent = item.ProductName;

        const priceElement = document.createElement('p');
        priceElement.textContent = `$${item.Price}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove from Wishlist';
        removeButton.addEventListener('click', function () {
            removeFromWishlist(item.ProductID);
            listItem.remove();
        });

        listItem.appendChild(imageElement);
        listItem.appendChild(productNameElement);
        listItem.appendChild(priceElement);
        listItem.appendChild(removeButton);

        return listItem;
    }

    function fetchWishlistData() {
        const userID = sessionStorage.getItem('UserID');

        fetch(`http://localhost/Master-pes/master-pesss/API/wishlist/wishlist-get.php?UserID=${userID}`)
            .then(response => response.json())
            .then(data => {
                data.wishlist.forEach(item => {
                    const listItem = createListItem(item);
                    productListContainer.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error fetching wishlist data:', error));
    }

    function removeFromWishlist(productID) {
        const userID = sessionStorage.getItem('UserID');

        fetch(`http://localhost/Master-pes/master-pesss/API/wishlist/wishlist-remove.php?UserID=${userID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ProductID: productID,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log(data.message);
                } else {
                    console.error('Error removing product from wishlist:', data.message);
                }
            })
            .catch(error => console.error('Error removing product from wishlist:', error));
    }

    fetchWishlistData();
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
