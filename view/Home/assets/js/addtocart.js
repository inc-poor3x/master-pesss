let signupButtonNav = document.getElementById('sigupp');
let loginButtonNav = document.getElementById('register');
const isloggedin = sessionStorage.getItem("isLoggedIn");
if (isloggedin == 'true') {
  signupButtonNav.textContent = 'profile';
  signupButtonNav.addEventListener('click', (e) => {
    window.location.href = 'assets/userprofile/profile.html';
  });
  loginButtonNav.textContent = 'LOG OUT';
  loginButtonNav.addEventListener('click', (e) => {
    window.location.href = 'index.html';
    sessionStorage.clear();
  });
};

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve user ID from sessionStorage
    const userId = sessionStorage.getItem("id");

    // Fetch data from server
    fetch('http://localhost/api/view_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // Include user ID in the request body
        body: JSON.stringify({ id: userId }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);

            // Handle the data and populate the table
            const tableBody = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
            const totalPriceCell = document.getElementById('totalPrice');

            // Clear existing rows
            tableBody.innerHTML = '';

            // Initialize total price after discount
            let totalDiscountedPrice = 0;

            // Check if data is an array or object
            if (Array.isArray(data)) {
                // Data is an array, proceed with array processing
                data.forEach(item => {
                    const newRow = tableBody.insertRow(tableBody.rows.length);
                    newRow.innerHTML = `
                            <td><img src="${item.image}" alt=""></td>
                            <td>${item.name}</td>
                            <td>${item.product_id}</td>
                            <td>${item.price}</td>
                            <td>${item.price_after_discount}</td>
                            <td>${item.quantity}</td>
                            <td><button onclick="removeItem(${item.product_id},${sessionStorage.getItem("id")})"><i class="fa-solid fa-trash"></i></button></td>
                        `;

                    // Accumulate the price after discount for each row
                    totalDiscountedPrice += parseFloat(item.price_after_discount);
                });

                // Update total price after discount
                totalPriceCell.textContent = `${totalDiscountedPrice} JD`;
            } else if (typeof data === 'object') {
                // Data is an object, handle it accordingly
                // For example, you can create a single row for this object
                const newRow = tableBody.insertRow(tableBody.rows.length);
                newRow.innerHTML = `
                        <td><img src="${data.image}" alt=""></td>
                        <td>${data.name}</td>
                        <td>${data.product_id}</td>
                        <td>${data.price}</td>
                        <td>${data.price_after_discount}</td>
                        <td>${data.quantity}</td>
                        <td><button onclick="removeItem(${data.product_id},${sessionStorage.getItem("id")})"><i class="fa-solid fa-trash"></i></button></td>
                    `;

                // Accumulate the price after discount for the single row
                totalDiscountedPrice += parseFloat(data.price_after_discount);

                // Update total price after discount
                totalPriceCell.textContent = `${totalDiscountedPrice} JD`;
            } else {
                console.error('Data has an unexpected format:', data);
            }
        })
        .catch(error => console.error('Error:', error));

    // Checkout button click event
    document.getElementById("check").onclick = () => {
        window.location.href = 'checkout.html';
    };


});
//for checkout page
// document.getElementById("check").onclick = () => {
//     window.location.href = 'checkout.html';
// };


let carts = document.querySelectorAll('.add-to-cart');


let products =[
    {
        name:'jursalm sticker',
        tag:'sticker',
        price:1,
        inCart:0
    },
    {
        name:'color sticker',
        tag:'sticker',
        price:1.5,
        inCart:0
    },
    {
        name:'Thob sticker',
        tag:'sticker',
        price:1.5,
        inCart:0
    },
    {
        name:'Awda sticker',
        tag:'sticker',
        price:2,
        inCart:0
    },
    {
        name:'Nabulsi soap',
        tag:'olive',
        price:7,
        inCart:0
    },
    {
        name:'A bowl for olive oil',
        tag:'olive',
        price:6,
        inCart:0
    },
    {
        name:'Dishes for oil and thyme',
        tag:'olive',
        price:10,
        inCart:0
    },
    {
        name:'Nabulsi soap',
        tag:'olive',
        price:8,
        inCart:0
    },
]

//itrations according the number of times 
for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click', () =>{
         cartnumbers(products[i]);
         totalcost(products[i]);
    }) 
}

//loading the page function without strat count from 0 again//
function onLoadCartNumber (){ //when loading the page !
    let productNumbers = localStorage.getItem('cartnumbers');
    if(productNumbers){
        document.querySelector('.add-to-cart-btn span').textContent = productNumbers;
    }

}

//cart numbers function //
function cartnumbers(product ){
    let productNumbers = localStorage.getItem('cartnumbers');
    productNumbers = parseInt(productNumbers);//parseInt to convert from string to number 
   
    if(productNumbers){
        localStorage.setItem('cartnumbers', productNumbers +1);
        document.querySelector('.add-to-cart-btn span').textContent= productNumbers+ 1;
    } else {
        localStorage.setItem('cartnumbers', 1);
        document.querySelector('.add-to-cart-btn span').textContent=1;//at the first time 
        
    }

    // this is the key for localstorage 
    setItem(product);

}
function setItem(){
let cartitems= localStorage.getItem('products in cart');
    cartitems = JSON.parse(cartitems);//to convert from json file 

    if(cartitems != null){
        if(cartitems[product.tag] == undefined){
            cartitems ={
                ...cartitems,
                [product.tag]:product
            }
        }
        cartitems[product.tag].incart +=1;
    } else{
        product.inCart =1;
        cartitems = {
            [product.tag]:product
        } 
    }

   
    
    localStorage.setItem("products in card",JSON.stringify(cartitems));
}
// total cost function //
function totalcost(product){
    let cartcost = localStorage.getItem('totalcost')
    

    if(cartcost != null){
        cartcost = parseInt(cartcost);
        localStorage.setItem('totalcost', cartcost + product.price)
    } else{
        localStorage.setItem("totalcost",product.price)
    }
        
}

function displaycard(){
    let cartitems =localStorage.getItem("productIncarts");
    cartitems =JSON.parse(cartitems);

    let productcontainer =document.querySelector('.product-container-card');
    let cartcost= localStorage.getItem('totalcost')
    if(cartitems && productcontainer ){
        productcontainer.innerHTML =`
        `;
        Object.values(cartitems).map(item =>{
            productcontainer.innerHTML +=`
            <div class="products-card">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src="../images/${item.tag}.jpg">
            <span>${item.name}</span>
            </div>
            <div class="price-card"> $${item.price},00    </div>
            <div class="quantity">
            <ion-icon class="decrease" name="chevron-back-circle-outline"></ion-icon>
            <span>${item.incart}</span>
            <ion-icon class="increase" name="chevron-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">
                    $${item.incart * item.price },00

            </div>
            `

        });

        productcontainer.innerHTML += `
            <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
            Basket Total
            </h4>
            <h4 class="basketTotal">
                $${cartcost},00
                </h4>
        `
        
    } 
}

onLoadCartNumber (); // to keep the number of the cart same 
displaycard();
