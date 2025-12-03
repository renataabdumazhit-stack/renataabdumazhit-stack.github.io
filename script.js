// Простая корзина на localStorage для меню → order.php
const CART_KEY = "hofmann_cart_items";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function addItem(name, price) {
  const items = getCart();
  const existing = items.find(i => i.name === name);
  if (existing) existing.qty += 1;
  else items.push({ name, price: Number(price || 0), qty: 1 });
  saveCart(items);
  alert("Added: " + name);
}

function wireMenuButtons() {
  const buttons = document.querySelectorAll(".add-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".menu-item");
      if (!card) return;
      const name = card.dataset.dish;
      const price = card.dataset.price;
      addItem(name, price);
    });
  });
}

function wireOrderFormHelpers() {
  const loadBtn = document.getElementById("loadFromCartBtn");
  const dishInput = document.getElementById("dishInput");
  if (!loadBtn || !dishInput) return;

  loadBtn.addEventListener("click", () => {
    const items = getCart();
    if (!items.length) { alert("No saved items. Add items on Menu page."); return; }
    // Берём первый товар из корзины (просто демо)
    const first = items[0];
    dishInput.value = `${first.name} x${first.qty}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  wireMenuButtons();
  wireOrderFormHelpers();
});
