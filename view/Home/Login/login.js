// Utility function for HTTP POST
function postRequest(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}

//------------------------------- User Registration --------------------------------//

function registerUser() {
    const userData = getUserFormData();

    if (validateUserForm(userData)) {
        postRequest('http://localhost/Master-pes/master-pesss/API/login/singup.php', userData)
            .then(data => {
                console.log('Success:', data);
                sessionStorage.setItem('UserID', data.UserID);
                window.location.href = 'login.html';
            })
            .catch(error => alert('Registration failed: ' + error));
    }
}

function getUserFormData() {
    return {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
}

function validateUserForm({ username, email, password }) {
    // Username validation
    if (username.trim() === '') {
        alert('Username is required');
        return false;
    }

    // Email validation
    if (email.trim() === '') {
        alert('Email is required');
        return false;
    }

    // Password validation
    if (password.length < 5) {
        alert('Password should be at least 5 characters');
        return false;
    } else if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
        alert('Password should have both letters and numbers');
        return false;
    }

    return true;
}

//------------------------------- User Login --------------------------------//

function loginUser() {
    const loginData = getLoginFormData();

    postRequest('http://localhost/Master-pes/master-pesss/API/login/login.php', loginData)
        .then(data => {
            if (data.success) {
                console.log('Login successful:', data);
                sessionStorage.setItem('UserID', data.UserID);
                redirectBasedOnRole(data.RoleID);
            } else {
                alert('Login failed: ' + data.message);
            }
        })
        .catch(error => alert('Login error: ' + error));
}

function getLoginFormData() {
    return {
        Username: document.getElementById('email_log').value,
        Password: document.getElementById('password_log').value
    };
}

function redirectBasedOnRole(roleId) {
    switch(roleId) {
        case 1:
            window.location.href = "../../admin2/admin/product/index.html";
            break;
        case 2:
            window.location.href = "../index.html";
            break;
        default:
            window.location.href = "../../admin2/admin/product/index.html";
    }
}

//------------------------------- Business Account Registration --------------------------------//

function registerBusinessAccount() {
    const businessData = getBusinessFormData();

    postRequest('http://localhost/Master-pes/master-pesss/API/login/singup_bus.php', businessData)
        .then(data => {
            console.log('Business Registration Success:', data);
            window.location.href = 'login.html';
        })
        .catch(error => alert('Business registration failed: ' + error));
}

function getBusinessFormData() {
    return {
        UserName: document.getElementById('business-username').value,
        Password: document.getElementById('business-password').value,
        Email: document.getElementById('business-email').value,
        StoreName: document.getElementById('business-store-name').value,
        Category: document.getElementById('business-category').value,
        StoreImage: document.getElementById('business-store-image').value
    };
}

// Add business form validation if needed
