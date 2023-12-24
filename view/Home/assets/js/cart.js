const userID = sessionStorage.getItem('UserID');
const productsCards = document.getElementById('products-cards');

function fetchCartData(userID) {
    // Clear existing content in the products-cards element
    productsCards.innerHTML = '';

    return fetch(`http://localhost/Master-pes/master-pesss/API/user_access/cart/cart.php?UserID=${userID}&&Action=getProductsInCart`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!data.success || !data.data || !Array.isArray(data.data)) {
            throw new Error('Invalid data format received from the server');
        }

        console.log('Cart data:', data);

        data.data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
        
        <td> <img src="../../assets/images/${item.Image}" alt="${item.ProductName}"> </td>
        <td> ${item.ProductName} </td>
        <td> ${item.Price} JD </td>
        <td>
        <button class="decrease-button" data-product-id="${item.ProductID}">-</button>
        <span class="quantity">${item.Quantity}</span>
        <button class="increase-button" data-product-id="${item.ProductID}">+</button>
    </td>
        <td> 
            <button class="remove-button"   onclick="deleteCartItem(${item.ProductID})">Remove</button>
        </td>
            `;
            productsCards.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching cart data:', error.message);
    });
}

document.getElementById('products-cards').addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('increase-button') || target.classList.contains('decrease-button')) {
        const change = target.classList.contains('increase-button') ? 1 : -1;
        handleQuantityChange(target, change);
    }
});

function handleQuantityChange(button, change) {
    const productId = button.getAttribute('data-product-id');
 

    const newQuantity = change === 1 ? 1 : -1;
    updateCartQuantity(productId, newQuantity, () => {
        // Additional logic after updating the cart data
    });
}

function updateCartQuantity(productId, newQuantity, callback) {
    const updateData = {
        ProductID: productId,
        Quantity: newQuantity,
        SubOrSum: newQuantity > 0 ? 1 : 0 // 1 for increase, 0 for decrease or remove
    };

    fetch(`http://localhost/Master-pes/master-pesss/API/user_access/cart/cart.php?UserID=${userID}&&Action=updateProductInCart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!data.success) {
            throw new Error(data.message);
        }

        // Fetch cart data again to refresh the view without clearing existing content
        return fetchCartData(userID);
    })
    .then(() => {
        // Execute the callback function after updating the cart data
        if (typeof callback === 'function') {
            callback();
        }
    })
    .catch(error => {
        console.error('Error updating cart quantity:', error.message);
    });
}









function deleteCartItem(productId) {
    const userId = sessionStorage.getItem('UserID');

    fetch('http://localhost/Master-pes/master-pesss/API/user_access/cart/cart.php?UserID=' + userId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ProductID: productId,
                action: 'delete'
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Item deleted successfully');
              
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            console.error('Error deleting cart item:', error);
        });
}















function updateCartDetails() {
    const userID = sessionStorage.getItem('UserID');
    fetchCartData(userID);

    fetchTotalCartPrice(userID)
        .then(totalCartPrice => {
            if (totalCartPrice !== null) {
                const cartDetailsDiv = document.getElementById('subtotal');
            
                cartDetailsDiv.innerHTML = `
                    <table>
                        <tr>
                            <td>Cart Subtotal</td>
                            <td>${totalCartPrice} JD</td>
                        </tr>
                        <tr>
                            <td>Shipping</td>
                            <td>Free</td>
                        </tr>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td><strong>${totalCartPrice} JD</strong></td>
                        </tr>
                    </table>
                    <a href="checkOut.html"><button id="check">Proceed to checkout</button></a>
                `;
            } else {
                const cartDetailsDiv = document.getElementById('subtotal');
                cartDetailsDiv.innerHTML = 'Your cart is empty';
            }
        })
        .catch(error => {
            console.error('Error updating cart details:', error.message);
        });
}

// Call the function to update cart details
updateCartDetails();










function fetchTotalCartPrice(userID) {
    return fetch(`http://localhost/Master-pes/master-pesss/API/user_access/cart/price.php?UserID=${userID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Total Cart data:', data);
        return data.data; // Assuming the total price is in the "data" field
    })
    .catch(error => {
        console.error('Error fetching total cart data:', error.message);
        return null;
    });
}




































