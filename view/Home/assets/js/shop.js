 


document.addEventListener('DOMContentLoaded', function () {
    // Fetch all products (without specifying a category)
    fetch('http://localhost/Master-pes/master-pesss/API/proudcte/show.php')
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
let Dec ;
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
            <a href="details.html" style="--width:300; --height:200;">
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
