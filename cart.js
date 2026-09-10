document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('shop_cart')) || [];
    
    const cartBtn = document.getElementById('cart-toggle-btn');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const cartOverlay = document.getElementById('cart-modal-overlay');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    const globalCartCount = document.getElementById('global-cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');

    function updateCartCount() {
        if (globalCartCount) {
            const count = cart.reduce((sum, item) => sum + item.qty, 0);
            globalCartCount.textContent = count;
        }
        localStorage.setItem('shop_cart', JSON.stringify(cart));
    }

    function updateCartUI() {
        if (!cartItemsList || !cartTotalAmount) return;

        let total = 0;
        cartItemsList.innerHTML = cart.map(item => {
            total += item.price * item.qty;
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p class="cart-item-price">KES ${item.price.toLocaleString()}</p>
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        cartTotalAmount.textContent = `KES ${total.toLocaleString()}`;
    }

    function toggleCart(show) {
        if (cartOverlay) {
            cartOverlay.style.display = show ? 'flex' : 'none';
        }
    }

    if (cartBtn) {
        cartBtn.addEventListener('click', () => toggleCart(true));
    }
    if (cartCloseBtn) {
        cartCloseBtn.addEventListener('click', () => toggleCart(false));
    }
    if (cartOverlay) {
        cartOverlay.addEventListener('click', (e) => {
            if (e.target === cartOverlay) toggleCart(false);
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return alert('Cart is empty!');
            let msg = "Hello 3CS, I want to order:\n\n";
            let total = 0;
            cart.forEach(i => {
                msg += `- ${i.name} (x${i.qty}): KES ${(i.price * i.qty).toLocaleString()}\n`;
                total += i.price * i.qty;
            });
            msg += `\n*Total: KES ${total.toLocaleString()}*`;
            window.open(`https://wa.me/254701683322?text=${encodeURIComponent(msg)}`, '_blank');
        });
    }

    window.changeQty = (id, delta) => {
        const item = cart.find(i => i.id === id);
        if (item) {
            item.qty += delta;
            if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
        }
        updateCartCount();
        updateCartUI();
    };

    window.addToCart = (id) => {
        // We need the products array which is in products.js
        if (typeof products === 'undefined') {
            console.error('Products data not loaded. addToCart failed.');
            return;
        }
        const p = products.find(prod => prod.id === id);
        if (!p) return;

        const existing = cart.find(item => item.id === id);
        if (existing) existing.qty++;
        else cart.push({ ...p, qty: 1 });
        
        updateCartCount();
        updateCartUI();
        toggleCart(true);
    };

    updateCartCount();
    updateCartUI();
});
