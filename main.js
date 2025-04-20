document.addEventListener("DOMContentLoaded", () => {
  fetch("Data/products.json")
    .then((res) => res.json())
    .then((products) => {
      renderProducts(products);
      updateCartCount(); // ADD THIS
    })
    .catch((err) => console.error("Failed to load products:", err));
});


function renderProducts(products) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <strong>$${product.price.toFixed(2)}</strong>
      <br>
      <a href="product.html?id=${product.id}">View Product</a>
    `;
    container.appendChild(card);
  });
  card.innerHTML = `
  <img src="${product.image}" alt="${product.name}" />
  <h2>${product.name}</h2>
  <p>${product.description}</p>
  <strong>$${product.price.toFixed(2)}</strong>
  <br>
  <a href="product.html?id=${product.id}">View Product</a>
  <button onclick="addToCart(${product.id})">Add to Cart</button>
`;

}

// js/main.js

// Load products from JSON
async function loadProducts() {
  try {
    const res = await fetch('Data/products.json');
    const products = await res.json();
    return products;
  } catch (err) {
    console.error('Failed to load products:', err);
    return [];
  }
}

// Render products into #product-list (used on index.html)
async function renderProducts() {
  const productList = document.getElementById('product-list');
  if (!productList) return;

  const products = await loadProducts();

  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <a href="product.html?id=${product.id}">View Product</a>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

// Cart system using localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === productId);

  if (itemIndex > -1) {
    cart[itemIndex].quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart(cart);
  alert('Added to cart!');
}

// Optional: display cart count in navbar
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
  }
}


