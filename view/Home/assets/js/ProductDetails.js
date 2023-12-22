/* *************************** details fetching *******************************************************/
document.addEventListener("DOMContentLoaded",  () => {

    // we catching the ID 
            const eventContainer = document.getElementById('box');
            const URLID = new URLSearchParams(window.location.search);//search on url about parameters
            const id = URLID.get('id');
            console.log(id);
         
        fetch(`http://localhost/Master-pes/master-pesss/API/proudcte/showcopy.php?id=${id}`)
            .then(response => response.json())
            .then(data => {
          
             
                console.log(data);

                eventContainer.innerHTML = `

                    <div class="images">
                    <div class="img-holder active">
                        <img src="${data[0].Image}">
                    </div>
                    </div>

                    

                    <div class="basic-info">
                        <h1>${data[0].ProductName}</h1>
                        <span>$250</span>

                        <div class="description">
                            <p>${data[0].Description}</p>
                            
                        </div>

                        
                        <div class="description">
                            <p>${data[0].Description}</p>
                            
                        </div>
        

        
        <div class="options">
            <a class="card-action-btn add-to-wish-list"  aria-label="add to wishlist" title="add to wishlist" id="Login" data-product-id="${data[0].ProductID}">
                      Add to Wishlist  
                    </a>
            <a  class="card-action-btn add-to-cart" aria-label="add to cart" title="add to cart" id="Login" data-product-id="${data[0].ProductID}">
                       Add to Cart 
                    </a>
          
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


const userID = sessionStorage.getItem('UserID');
console.log(userID);

function addToCart(productId) {

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
    wishlistButton.innerHTML = '<ion-icon name="heart"></ion-icon>';
           wishlistButton.classList.add('already-in-wishlist');
            }
            }
        })
        .catch(error => console.error('Error adding product to wishlist:', error));
}







