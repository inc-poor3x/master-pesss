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
