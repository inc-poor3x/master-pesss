function checkout(){

   
        var username = document.getElementById('username').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
    
        // let confirmpass = document.getElementById('confirm').value;
    
    
        // Validate username
        if (username.trim() === '') {
            document.getElementById('User_error').innerText = 'Username is required';
            return false;
        } else {
            document.getElementById('User_error').innerText = '';
        }
    
        // Validate email
        if (email.trim() === '') {
            document.getElementById('email_error').innerText = 'Email is required';
            return false;
        } else {
            document.getElementById('email_error').innerText = '';
        }
    
        // Validate password
        if (password.length < 5) {
            document.getElementById('error_pass').innerText = 'Password should be at least 5 characters';
            return false;
        } else if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
            document.getElementById('error_pass').innerText = 'Password should have both letters and numbers';
            return false;
        } else {
            document.getElementById('error_pass').innerText = '';
        }
    
        // If all validations pass, you can submit the form
        return true;
   

  
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
