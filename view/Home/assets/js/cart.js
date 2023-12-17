const userID = sessionStorage.getItem('UserID');

function fetchCartData(userID) {
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

        const productsCards = document.getElementById('products-cards');

        data.data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
               
                <td> <img src="${item.Image}" alt="${item.ProductName}"> </td>
                <td> ${item.ProductName} </td>
                <td> ${item.Price} JD </td>
                <td> ${item.Quantity} </td>
                <td> 
                <button class="remove-button" data-product-id="${item.ProductID}">Remove</button>
            </td>
            `;
            productsCards.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching cart data:', error.message);
    });
}


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
                    <a href="checkOut.html"><button id="check">Proceed to checkout </button> </a>
                `;
            }
        })
        .catch(error => {
            console.error('Error updating cart details:', error.message);
        });
}

// Call the function to update cart details
updateCartDetails();
