// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


function message() {

    var Name = document.getElementById('name');
    var email = document.getElementById('email');
    var msg = document.getElementById('message');
    const success = document.getElementById('success');
    

    if (
        setTimeout(() => {

            Name.value = '';
            email.value = '';
            msg.value = '';

        }, 2000)) {


        success.style.display = 'block';

    } 

    setTimeout(() => {

        success.style.display = 'none';
       
    }, 2000);

 }

const toast = document.getElementById('toast');
const showToastButton = document.getElementById('show-toast');

showToastButton.addEventListener('click', () => {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000); // hide the toast after 5 seconds
});



function addToCart(element) {
    var productParent = $(element).closest('div.product-item');

    var price = parseFloat($(productParent).find('.price span').text().replace('R', ''));
    var productName = $(productParent).find('.productname').text();
    var quantity = parseInt($(productParent).find('.product-quantity').val());

    var cartItem = {
        productName: productName,
        price: price,
        quantity: quantity
    };
    var cartItemJSON = JSON.stringify(cartItem);

    var cartArray = new Array();
    // If javascript shopping cart session is not empty
    if (sessionStorage.getItem('shopping-cart')) {
        cartArray = JSON.parse(sessionStorage.getItem('shopping-cart'));
    }
    cartArray.push(cartItemJSON);

    var cartJSON = JSON.stringify(cartArray);
    sessionStorage.setItem('shopping-cart', cartJSON);
    showCartTable();
}

// Show cart table function
function showCartTable() {
    var cartRowHTML = "";
    var itemCount = 0;
    var grandTotal = 0;

    if (sessionStorage.getItem('shopping-cart')) {
        var cartArray = JSON.parse(sessionStorage.getItem('shopping-cart'));
        $.each(cartArray, function(index, value) {
            var cartItem = JSON.parse(value);
            var price = parseFloat(cartItem.price);
            var quantity = parseInt(cartItem.quantity);
            var subTotal = price * quantity;
            itemCount += quantity;
            grandTotal += subTotal;

            cartRowHTML += "<tr>";
            cartRowHTML += "<td>" + cartItem.productName + "</td>";
            cartRowHTML += "<td>" + "$" + cartItem.price + "</td>";
            cartRowHTML += "<td>" + cartItem.quantity + "</td>";
            cartRowHTML += "<td>" + "$" + subTotal.toFixed(2) + "</td>";
            cartRowHTML += "</tr>";
        });

        $('#cart-table').html(cartRowHTML);
        $('#item-count').text(itemCount);
        $('#grand-total').text("$" + grandTotal.toFixed(2));
    }
}

// Empty cart function
function emptyCart() {
    if (sessionStorage.getItem('shopping-cart')) {
        // Clear JavaScript sessionStorage by index
        sessionStorage.removeItem('shopping-cart');
        showCartTable();
    }
}

// Add event listeners to plus and minus buttons
document.querySelectorAll('.plus-btn,.minus-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Update quantity and price here
    });
});

// Add event listener to checkout button
document.querySelector('.checkout-section button').addEventListener('click', () => {
    // Handle checkout logic here
});