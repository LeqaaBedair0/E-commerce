document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    document.getElementById("cart-container").innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  fetch("Data/products.json")
    .then(res => res.json())
    .then(products => {
      renderCart(products, cart);
    });
});

function renderCart(products, cart) {
  const cartContainer = document.getElementById("cart-container");

  let total = 0;
  let html = "<ul>";

  cart.forEach(item => {
    const product = products.find(p => p.id == item.id);
    const subtotal = product.price * item.quantity;
    total += subtotal;

    html += `
      <li>
        <strong>${product.name}</strong> × ${item.quantity} - $${subtotal.toFixed(2)}
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </li>
    `;
  });

  html += "</ul>";
  html += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
  html += `<a href="checkout.html"><button>Checkout</button></a>`;

  cartContainer.innerHTML = html;
}


function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id != productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function clearCart() {
  localStorage.removeItem("cart");
  location.reload();
}

