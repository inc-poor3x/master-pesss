// const apiUrl = 'http://localhost/master-pesss/API/product/show.php';


  // Function to fetch API data and update the products div
  async function fetchProducts() {
    try {
      const response = await fetch('http://localhost/Master-pes/master-pesss/API/proudcte/show.php'); // Replace 'url/to/your/api' with your actual API endpoint
      const data = await response.json();

      // Reference to the products div
      const productsDiv = document.getElementById('products');

      // Clear existing content in the products div
      productsDiv.innerHTML = '';

      // Loop through the data and create HTML for each product
      data.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card'; // Add your custom product card class

        // Set inner HTML based on your existing card structure
        productCard.innerHTML = ` <a href="#" class="card-banner img-holder has-before" style="--width:300 ; --height: 300;">
        <img src="${product.Image}" width="300" height="300" loading="lazy" alt="${product.ProductName}" class="img-cover">

        <ul class="card-action-list">
            <li>
                <button class="card-action-btn" aria-label="add to cart" title="add to cart">
                    <ion-icon name="add-outline" aria-hidden="true"></ion-icon>
                </button>
            </li>
            <li>
                <button class="card-action-btn" aria-label="add to cart" title="add to cart">
                    <ion-icon name="bag-handle-outline" aria-hidden="true"></ion-icon>
                </button>
            </li>
            <li>
                <button class="card-action-btn" aria-label="add to wishlist" title="add to wishlist">
                    <ion-icon name="heart-outline" aria-hidden="true"></ion-icon>
                </button>
            </li>
        </ul>

       
    </a>

    <div class="card-content">
        <h3 class="h3">
            <a href="" class="card-title">${product.ProductName}</a>
        </h3>
        <div class="card-price">
            ${product.Discount ? `<del class="del">$${product.Price}</del>` : ''}
            <data class="price" value="${product.Price}">$${product.Price}</data>
        </div>
    </div>
        `;

        // Append the product card to the products div
        productsDiv.appendChild(productCard);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Call the fetchProducts function when the page loads
  document.addEventListener('DOMContentLoaded', fetchProducts);


//   card.innerHTML = `
    // <a href="#" class="card-banner img-holder has-before" style="--width:300 ; --height: 300;">
    //     <img src="${product.Image}" width="300" height="300" loading="lazy" alt="${product.ProductName}" class="img-cover">

    //     <ul class="card-action-list">
    //         <li>
    //             <button class="card-action-btn" aria-label="add to cart" title="add to cart">
    //                 <ion-icon name="add-outline" aria-hidden="true"></ion-icon>
    //             </button>
    //         </li>
    //         <li>
    //             <button class="card-action-btn" aria-label="add to cart" title="add to cart">
    //                 <ion-icon name="bag-handle-outline" aria-hidden="true"></ion-icon>
    //             </button>
    //         </li>
    //         <li>
    //             <button class="card-action-btn" aria-label="add to wishlist" title="add to wishlist">
    //                 <ion-icon name="heart-outline" aria-hidden="true"></ion-icon>
    //             </button>
    //         </li>
    //     </ul>

    //     <ul class="badge-list">
    //         <li>
    //             <div class="badge orange">${product.Sale ? 'Sale' : ''}</div>
    //         </li>
    //         <li>
    //             <div class="badge cyan">${product.Discount ? `-${product.Discount}%` : ''}</div>
    //         </li>
    //     </ul>
    // </a>

    // <div class="card-content">
    //     <h3 class="h3">
    //         <a href="" class="card-title">${product.ProductName}</a>
    //     </h3>
    //     <div class="card-price">
    //         ${product.Discount ? `<del class="del">$${product.Price}</del>` : ''}
    //         <data class="price" value="${product.Price}">$${product.Price}</data>
    //     </div>
    // </div>
//   `;

//   return card;
// }

// // Fetch products and render the product cards
// fetchProducts().then(products => renderProductCards(products));
