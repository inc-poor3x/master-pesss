document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost/Master-pes/master-pesss/API/admin/category/show.php')
        .then(response => response.json())
        .then(data => {
            // Update category names and link IDs in the HTML
            data.forEach(category => {
                const categoryElement = document.querySelector(`[href="${category.Category_name.toLowerCase()}.html"]`);
                const cardElement = categoryElement?.closest('.hero-card');
                
                if (categoryElement && cardElement) {
                    categoryElement.textContent = category.Category_name;

                    // Add category ID to the data attribute of the card
                    cardElement.dataset.categoryId = category.Category_id;

                    // Update the link href with the category ID
                    categoryElement.href = `anotherPage.html?category=${category.Category_id}`;
                    console.log(`Updated category: ${category.Category_name}`);
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
