/* app.js */

//Selecting my elements from HTML
const productEl = document.querySelector(".products");
const cartItemEl=document.querySelector(".cart-items");
const subtotalEl=document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");
//render my elements

function RenderProducts() {
  products.forEach((product) => {
    productEl.innerHTML += `
             <div class="item">
                    <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>$</small>${product.price}</h2>
                        <p>
                        ${product.description}
                        </p>
                    </div>
                    <div class="add-to-wishlist">
                        <img src="./icons/heart.png" alt="add to wish list">
                    </div>
                    <div class="add-to-cart" onclick="addtoCart(${product.id})">
                        <img src="./icons/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>
                    
  
        `;
  });
}
RenderProducts();

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

//add to cart

function buscar (){
    return 
}
function addtoCart(id){
    //i gotta check if the product already exists in cart 
    if(cart.some((item)=> item.id===id))
    {
        changeNumberOfUnits("plus",id)
    }
    else{
        const item= products.find((product)=>product.id===id);
   
        cart.push(
            {...item,numberOfUnit:1
            });
       
       updateCart();
    }

  

}

function updateCart(){
    renderCartItems();
    renderSubtotal();

    // i am saving the data local storage
    localStorage.setItem("CART", JSON.stringify(cart));

}
//calculating  and render my subtotal
function renderSubtotal(){

let totalPrice=0, totalItems =0;

cart.forEach((item) =>{
    totalPrice +=item.price * item.numberOfUnit;
    totalItems +=item.numberOfUnit;
})
subtotalEl.innerHTML=` Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`; //i just want to see 2 decimals :3
totalItemsInCartEl.innerHTML = totalItems;


}

function renderCartItems(){

    cartItemEl.innerHTML="";
    cart.forEach((prod)=>
    {
      cartItemEl.innerHTML +=`
      <div class="cart-item">
      <div class="item-info" onclick="removeItemFromCart(${prod.id})">
          <img src="${prod.imgSrc}" alt="${prod.name}">
          <h4>${prod.name}</h4>
      </div>
      <div class="unit-price">
          <small>$</small>${prod.price}
      </div>
      <div class="units">
          <div class="btn minus" onclick="changeNumberOfUnits('minus',${prod.id})">-</div>
          <div class="number">${prod.numberOfUnit}</div>
          <div class="btn plus"onclick="changeNumberOfUnits('plus',${prod.id})">+</div>           
      </div>
  </div>
       
      
      `
    });

}

// remove item from cart
function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
  
    updateCart();
  }

//change Number of units for an item 

function changeNumberOfUnits(action,id)
{
   //i want to run this function in everyelement in my car so that is the reason i decided to use map 
   cart=cart.map((element)=>
   {
    let oldNumberOfUnit=element.numberOfUnit;
    if(element.id===id)
    {
         if(action==="minus" && oldNumberOfUnit > 1){
            oldNumberOfUnit--;

            

         }
         else if(action==="plus" && oldNumberOfUnit<element.instock){
            oldNumberOfUnit++;

         }

    }
      return {...element,numberOfUnit:oldNumberOfUnit}   

   })

   updateCart()
}
