
export default function checkLoggedIn(){
    if(localStorage.getItem('admin_key') && localStorage.getItem('admin_key')){
        return true
    }
    return false
}

export function getCartItems(){
    if(!localStorage.getItem('cart-items')) localStorage.setItem('cart-items', JSON.stringify([]));
    const cartItems = JSON.parse(localStorage.getItem('cart-items'));
    return cartItems 
}

export function getTotal(){
    const cartItems = getCartItems();
    let total = 0.00;
    for(let item of cartItems){
        total += item.item_price
    }
    return total.toFixed(2)
}

export function addToCart(item){
    const cartItems = getCartItems();
    item.key = Math.random() * 1000;
    cartItems.push(item);
    localStorage.setItem('cart-items', JSON.stringify(cartItems));
    return getCartItems()    
}

export function removeCartItem(item){
    let cartItems = getCartItems();
    cartItems = cartItems.filter(product => product.key != item.key); 
    localStorage.setItem('cart-items', JSON.stringify(cartItems));
    return getCartItems()    
}