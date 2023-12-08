let wish =document.querySelectorAll('.add-to-wish-list');

for(let i=0;i<wish.length;i++){
    wish[i].addEventListener('click',() =>{
        console.log("added to wishlist");
    })
}