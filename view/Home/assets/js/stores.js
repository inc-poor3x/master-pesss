document.addEventListener('DOMContentLoaded', function () {
    const postsContainer = document.getElementById('posts-container');
    console.log("hiiiiiiiiiiiiii");

    fetch('http://localhost/Master-pes/master-pesss/API/store/show.php') // Replace with your actual API endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(postData => {
                const postBox = document.createElement('div');
                postBox.className = 'post-box';

                const img = document.createElement('img');
                img.src = postData.StoreImage;
                img.alt = '';

                const title = document.createElement('a');
                title.href = '#';
                title.className = 'post-title';
                title.textContent = postData.StoreName;

                const date = document.createElement('span');
                date.className = 'post-date';
                date.textContent = '12 Feb 2022'; // You can replace this with the actual date

                const description = document.createElement('p');
                description.className = 'post-description';
                description.textContent = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, similique, rerum excepturi harum, vitae facilis corrupti vel modi debitis est perferendis aut quasi ea unde repudiandae iste architecto. Corporis, voluptates.';

                // Append elements to postBox
                postBox.appendChild(img);
                postBox.appendChild(document.createElement('br'));
                postBox.appendChild(title);
                postBox.appendChild(date);
                postBox.appendChild(description);

                // Append postBox to postsContainer
                postsContainer.appendChild(postBox);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
