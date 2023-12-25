/************************************Product Display Fetch  *****************************************************/

document.addEventListener("DOMContentLoaded", function () {
  // Fetch all products (without specifying a category)
  fetch("http://localhost/Master-pes/master-pesss/API/proudcte/show.php")
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data and generate product cards
      displayProducts(data);
    })
    .catch((error) => console.error("Error fetching products:", error));
});

function displayProducts(products) {
  const productList = document.querySelector(".product-list");

  // Generate HTML for each product
  const productsHTML = products
    .map((product) => createProductHTML(product))
    .join("");

  // Add the generated HTML to the product list
  productList.innerHTML = productsHTML;
}
let Dec;
function createProductHTML(product) {
  // if(product.Description==NUll){
  //     Dec = " ";
  // } else{
  //     Dec=product.Description;
  // }
  return `
    <li class="decoration">
        <div class="product-card">
            <div class="card-banner img-holder has-before" style="--width:300; --height:200;">
                <img src="../../assets/images/${product.Image}" width="100" height="200" loading="lazy" alt="${product.ProductName}" class="img-cover" >
                <ul class="card-action-list">
                <li>
                <button type="button" class="card-action-btn add-to-cart" aria-label="add to cart" title="add to cart" data-product-id="${product.ProductID}">
                    <ion-icon name="add-outline" aria-hidden="true"></ion-icon>
                </button>
            </li>
            <li>
                <button class="card-action-btn add-to-wish-list"  aria-label="add to wishlist" title="add to wishlist" data-product-id="${product.ProductID}">
                    <ion-icon name="heart-outline" aria-hidden="true"></ion-icon>
                </button>
            </li>
                    <li>
                        <a href="../details.html?id=${product.ProductID}">
                            <button class="card-action-btn show-more" aria-label="show more" title="show more">
                                <ion-icon name="ellipsis-horizontal" aria-hidden="true"></ion-icon>
                            </button>
                        </a>
                    </li>
                </ul>
            </div>
            <a href="" style="--width:300; --height:200;">
                <span class="visually-hidden">${product.ProductName}</span>
            </a>
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




/***********************************For the Cart label number in the home page ***************************************/

//Waiting to loaded all content in the page 
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve user ID from session storage
  var userID = sessionStorage.getItem("UserID");

  // Check if the user ID is available
  if (userID) {

    // Construct the API request payload
    var apiPayload = {
      Action: "getTotalInCart",
      UserID: userID,
    };

    // Log the payload for debugging
    console.log("API Payload:", apiPayload);

    // Make the API request when the page loads
    fetch(
      "http://localhost/Master-pes/master-pesss/API/user_access/cart/total.php",
      {
        method: "POST", // Use POST method since you are sending data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiPayload),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Log the API response for debugging
        console.log("API Response:", data);

        // Check if the API request was successful
        if (data.success) {
          // Update the cart count on the button
          var cartCountElement = document.getElementById("cartCount");
          cartCountElement.textContent = data.data.Total;
        } else {
          // Handle the case when the API request is not successful
          console.error("Error retrieving total from the cart:", data.message);
        }
      })
      .catch((error) => {
        // Handle network errors or other exceptions
        console.error("Error making API request:", error);
      });
  } else {
    // Handle the case when the user ID is not available in session storage
    console.error("User ID not found in session storage.");
  }
});



/**********************************************************Add to Cart Fetch ***********************************/
document.addEventListener("click", function (event) {
  const addToCartButton = event.target.closest(".add-to-cart");
  if (addToCartButton) {
    const productId = addToCartButton.dataset.productId;
    addToCart(productId);
  }
});

function addToCart(productId) {
  var userId = sessionStorage.getItem("UserID");
  console.log(userId);
  // Check if the user is logged in
  if (!userId) {
    console.error("User not logged in");
    return;
  }

  // Fetch API to add the product to the cart
  fetch(
    `http://localhost/Master-pes/master-pesss/API/user_access/cart/cart.php?UserID=${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ProductID: productId,
        SubOrSum: 1,
        Quantity: 1,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data if needed
      console.log("Product added to cart:", data.message);
      console.log("Product added to cart:", data);
    })
    .catch((error) => console.error("Error adding product to cart:", error));
}




/*************************************** Add To Wish list Fetch **************************************************/
document.addEventListener("click", function (event) {
  const addToWishlistButton = event.target.closest(".add-to-wish-list");
  if (addToWishlistButton) {
    const productId = addToWishlistButton.dataset.productId;
    addToWishlist(productId); // Corrected function name
  }
});

function addToWishlist(productId) {
  var userId = sessionStorage.getItem("UserID");

  // Check if the user is logged in
  if (!userId) {
    console.error("User not logged in");
    return;
  }

  // Fetch API to add the product to the wishlist
  fetch(
    `http://localhost/Master-pes/master-pesss/API/wishlist/wishlist-add.php?UserID=${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ProductID: productId,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data
      console.log("Response:", data);

      if (data.success) {
        // Product added to wishlist successfully
        console.log("Product added to wishlist:", data.message);
      } else {
        // Product is already in the wishlist
        console.log("Product already in wishlist:", data.message);

        // Find the button with the matching data-product-id attribute
        const wishlistButton = document.querySelector(
          `.add-to-wish-list[data-product-id="${productId}"]`
        );

        // ...

        if (wishlistButton) {
          // Change the style of the heart button to indicate it's already in the wishlist
          wishlistButton.innerHTML = '<ion-icon name="heart"></ion-icon>';
          wishlistButton.classList.add("already-in-wishlist");
        }
      }
    })
    .catch((error) =>
      console.error("Error adding product to wishlist:", error)
    );
}

document.addEventListener("DOMContentLoaded", function () {
  // Get user ID from session storage
  const userID = sessionStorage.getItem("UserID");

  // Check if user ID exists
  if (userID) {
    // Construct the API endpoint URL
    const apiUrl = `http://localhost/Master-pes/master-pesss/API/wishlist/total.php?UserID=${userID}`;

    // Make a fetch request to the API endpoint
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Check if the API request was successful
        if (data.success) {
          // Update the wishlist count in the HTML
          const wishlistCountElement = document.querySelector(
            ".header__user-actions .count"
          );
          wishlistCountElement.textContent = data.totalItems;
        } else {
          console.error("Error fetching wishlist count:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching wishlist count:", error);
      });
  }
});
