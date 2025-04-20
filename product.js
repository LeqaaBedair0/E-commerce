document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));

  if (!productId) {
    document.getElementById("product-detail").innerText = "Product not found.";
    return;
  }

  fetch("Data/products.json")
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.id === productId);
      if (!product) {
        document.getElementById("product-detail").innerText = "Product not found.";
        return;
      }

      renderProductDetail(product);
    })
    .catch(err => {
      console.error("Error loading product:", err);
    });
});

function renderProductDetail(product) {
  const container = document.getElementById("product-detail");
  container.innerHTML = `
    <div class="product-detail-wrapper">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="product-info">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <strong>$${product.price.toFixed(2)}</strong>
        <br><br>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    </div>
  `;
}

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}
