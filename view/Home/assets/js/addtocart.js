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
for(let i=0;i<carts.length;i++){
    // console.log("my loop");//24 times 
    carts[i].addEventListener('click', () =>{
        // console.log("added to cart");
        cartnumbers(products[i]);
    })
}

function onLoadCartNumber (){ //when loading the page !
    let productNumbers = localStorage.getItem('cartnumbers');
    if(productNumbers){
        document.querySelector('.add-to-cart-btn span').textContent = productNumbers;
    }

}
function cartnumbers(product ){
    // console.log("The product clicked is " , product );
    let productNumbers = localStorage.getItem('cartnumbers');
    // console.log(productNumbers);
    // console.log(typeof(productNumbers)); //string 

    productNumbers = parseInt(productNumbers);//parseInt to convert from string to number 
    // console.log(typeof(productNumbers));
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
    console.log("inside of setItems function");
    console.log("my product is",product );
    let cartitems = {
   
    } 
    product.inCart =1;
    localStorage.setItem("products in card",)
}
onLoadCartNumber (); // to keep the number of the cart same 