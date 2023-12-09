// document.addEventListener('DOMContentLoaded', function() {
//     fetch('http://localhost/Master-pes/master-pesss/API/admin/category/show.php')
//         .then(response => response.json())
//         .then(data => {
//             // Update category names and link IDs in the HTML
//             data.forEach(category => {
//                 const categoryElement = document.querySelector(`[href="${category.Category_name.toLowerCase()}.html"]`);
//                 const cardElement = categoryElement?.closest('.hero-card');
                
//                 if (categoryElement && cardElement) {
//                     categoryElement.textContent = category.Category_name;

//                     // Add category ID to the data attribute of the card
//                     cardElement.dataset.categoryId = category.categoryID;

//                     // Update the link href with the category ID
//                     categoryElement.href = `accessories.html?category=${category.categoryID}`;
//                     console.log(`Updated category: ${category.Category_name}`);
//                 }
//             });
//         })
//         .catch(error => console.error('Error fetching data:', error));
// });
document.addEventListener('DOMContentLoaded', function () {
    // Fetch the data from the API
    fetch('http://localhost/Master-pes/master-pesss/API/admin/category/show.php')
        .then(response => response.json())
        .then(data => {
            // Loop through each list item and update the href attribute
            const listItems = document.querySelectorAll('.hero-list li');
            listItems.forEach((item, index) => {
                const categoryID = data[index].categoryID;
                const categoryLink = item.querySelector('.card-title');
                categoryLink.href = `accessories.html?categoryID=${categoryID}`;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
// document.addEventListener('DOMContentLoaded', function() {
//     // Add click event listener to the cart button
//     document.getElementById('cartButton').addEventListener('click', function(event) {
//         event.preventDefault();

//         // Retrieve user ID from session storage
//         var userID = sessionStorage.getItem('UserID');
//         console.log('UserID');
//         // Check if the user ID is available
//         if (userID) {
//             // Construct the API request payload
//             var apiPayload = {
//                 "Action": "getTotalInCart",
//                 "UserID": userID
//             };

//             // Make the API request
//             fetch('http://localhost/Master-pes/master-pesss/API/user_access/cart/cart.php', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(apiPayload)
//             })
//             .then(response => response.json())
//             .then(data => {
//                 // Check if the API request was successful
//                 if (data.success) {
//                     // Update the cart count on the button
//                     var cartCountElement = document.querySelector('.count');
//                     cartCountElement.textContent = data.data.Total;
//                 } else {
//                     // Handle the case when the API request is not successful
//                     console.error('Error retrieving total from the cart:', data.message);
//                 }
//             })
//             .catch(error => {
//                 console.error('Error making API request:', error);
//             });
//         } else {
//             // Handle the case when the user ID is not available in session storage
//             console.error('User ID not found in session storage.');
//         }
//     });
// });
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve user ID from session storage
    var userID = sessionStorage.getItem('UserID');

    // Check if the user ID is available
    if (userID) {
        // Construct the API request payload
        var apiPayload = {
            "Action": "getTotalInCart",
            "UserID": userID
        };

        // Log the payload for debugging
        console.log('API Payload:', apiPayload);

        // Make the API request when the page loads
        fetch('http://localhost/Master-pes/master-pesss/API/user_access/cart/total.php', {
            method: 'POST', // Use POST method since you are sending data
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(apiPayload)
        })
            .then(response => response.json())
            .then(data => {
                // Log the API response for debugging
                console.log('API Response:', data);

                // Check if the API request was successful
                if (data.success) {
                    // Update the cart count on the button
                    var cartCountElement = document.getElementById('cartCount');
                    cartCountElement.textContent = data.data.Total;
                } else {
                    // Handle the case when the API request is not successful
                    console.error('Error retrieving total from the cart:', data.message);
                }
            })
            .catch(error => {
                // Handle network errors or other exceptions
                console.error('Error making API request:', error);
            });
    } else {
        // Handle the case when the user ID is not available in session storage
        console.error('User ID not found in session storage.');
    }
});
