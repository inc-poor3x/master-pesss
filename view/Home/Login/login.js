//----------------------------------------signup fetch----------------------------------------------------//
function registerUser() {
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
        // Handle success, e.g., show a success message or redirect to login page
        window.location.href = 'login.html';
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle error, e.g., show an error message to the user
    });
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
