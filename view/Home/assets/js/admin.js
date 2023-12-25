document.addEventListener("DOMContentLoaded", () => {
    const eventContainer = document.getElementById('tablee');
    let x = 0; // Declare the variable

    fetch('http://localhost/Master-pes/master-pesss/API/admin/user_crud/show.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                const productRow = document.createElement('tr');
                productRow.className = 'products-row';

                productRow.innerHTML = `
                    <td>${++x}</td>
                    <td>${user.UserName}</td>
                    <td>${user.Email}</td>
                    <td class="delete" onclick="DeleteUser(${user.UserID})"><i class="fa fa-trash"></i></td>
                `;

                eventContainer.appendChild(productRow);
            });
        })
        .catch(error => console.error('Error:', error));
});

function DeleteUser(userId) {
    fetch("http://localhost/master-pesss-main/API/admin/user_crud/delet.php", {
        method: 'DELETE',
        body: JSON.stringify({ UserID: userId }),
    })
        .then(response => {
            if (response.ok) {
                console.log(`User with ID ${userId} deleted successfully`);
                location.reload();
                // Fetch and populate the table again after deletion
            } else {
                console.error(`Error deleting user with ID ${userId}:`, response.statusText);
            }
        })
        .catch(error => console.error(`Error deleting user with ID ${userId}:`, error));
}

///////////////////////////////////////////////////////////////////////////////////////////////////










 



