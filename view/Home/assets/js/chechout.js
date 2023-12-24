function checkout(){
    const userID = sessionStorage.getItem('UserID');
fetch(`http://localhost/Master-pes/master-pesss/API/admin/order_item/checkout.php?UserID=${userID}`)
        .then(response => response.json())
        .then(data => {
            if (data.message === "Order created successfully.") {
                alert("Checkout successful!");
                // Redirect to a confirmation page or update the UI accordingly
                window.location.href = '../../ShopPages/shop.html';
            } else {
                alert(data.error);
            }
        })
        .catch(error => {
            console.error('Error during checkout:', error);
        });
    }