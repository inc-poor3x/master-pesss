//----------------------------------------signup fetch----------------------------------------------------//
function registerUser() {
    if (validateForm()) {
        // If form is valid, proceed with registration
      
        // Add further registration logic here
    


    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(email);
    const userData = {
        username: username,
        email: email,
        password: password
    };

    

    fetch('http://localhost/Master-pes/master-pesss/API/login/singup.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        sessionStorage.setItem('UserID', data.UserID);
        // Handle success, e.g., show a success message or redirect to login page
        window.location.href = 'login.html';
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle error, e.g., show an error message to the user
 
   });
      
   alert('Registration successful!');
    window.location.href = 'login.html' ;
}
}
 

//----------------------------------------login fetch----------------------------------------------------------------//

function loginUser() {




    const usernameOrEmail = document.getElementById('email_log').value;
    const password = document.getElementById('password_log').value;

    const loginData = {
        Username: usernameOrEmail,
        Password: password
    };

    fetch('http://localhost/Master-pes/master-pesss/API/login/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Login successful:', data);
            window.location.href = '../index.html';
            // Save user ID in session (you may want to use a more secure method)
            sessionStorage.setItem('UserID', data.UserID);
            if(data.RoleID==2){
                window.location.href="../index.html";
            }
            else if(data.RoleID==1){
                window.location.href="../../admin2/admin/product/index.html"
            } else{
                window.location.href="../../admin2/admin/product/index.html"
            }

            // Redirect or perform other actions on successful login
        } else {
            console.error('Login failed:', data.message);
            // Handle unsuccessful login, show error message, etc.
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle other errors, e.g., network issues
    });


}



/*********************************Sign Up validation *******************************/

function validateForm() {
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
}

/* if(password !== confirmpass){
    document.getElementById('error_pass').innerText = 'password is not match'
    return false;
    else {
        documet.getElementById('error_pass').innerText = '' 

    }
    return true 
} */

function registerUser1() {
    // Add any specific registration logic here
   
}



























//----------------BussinessAccountForm-----------------------------------------------------------------//
function registerBusinessAccount() {
    const username = document.getElementById('business-username').value;
    const email = document.getElementById('business-email').value;
    const password = document.getElementById('business-password').value;
    const storeName = document.getElementById('business-store-name').value;
    const category = document.getElementById('business-category').value;
    const storeImage = document.getElementById('business-store-image').value;

    const businessData = {
        UserName: username,
        Password: password,
        Email: email,
        StoreName: storeName,
        Category: category,
        StoreImage: storeImage
    };

    fetch('http://localhost/Master-pes/master-pesss/API/login/singup_bus.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(businessData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Business Registration Success:', data);
        // Handle success, e.g., show a success message or redirect to login page
        window.location.href = 'login.html';
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle error, e.g., show an error message to the user
    });

}
