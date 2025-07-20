// Global variables
let currentUser = null;
let cart = [];
let products = [];

// DOM elements
const sections = {
    home: document.getElementById('homeSection'),
    products: document.getElementById('productsSection'),
    productDetails: document.getElementById('productDetailsSection'),
    login: document.getElementById('loginSection'),
    register: document.getElementById('registerSection'),
    orders: document.getElementById('ordersSection')
};

const navAuth = document.getElementById('navAuth');
const navUser = document.getElementById('navUser');
const userName = document.getElementById('userName');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const loading = document.getElementById('loading');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadCart();
    checkAuthStatus();
    
    // Form event listeners
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);

    // Nav Products link scroll and show
    const navProductsLink = document.getElementById('navProductsLink');
    if (navProductsLink) {
        navProductsLink.addEventListener('click', function(e) {
            e.preventDefault();
            showProducts();
            setTimeout(() => {
                const section = document.getElementById('productsSection');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        });
    }
});

// Navigation functions
function showHome() {
    hideAllSections();
    sections.home.style.display = 'block';
    // Show About and Contact sections
    document.getElementById('aboutSection').style.display = 'block';
    document.getElementById('contactInfoSection').style.display = 'block';
    document.getElementById('contactSection').style.display = 'block';
}

function showProducts() {
    hideAllSections();
    sections.products.style.display = 'block';
    // Hide About and Contact sections
    document.getElementById('aboutSection').style.display = 'none';
    document.getElementById('contactInfoSection').style.display = 'none';
    document.getElementById('contactSection').style.display = 'none';
    loadProducts();
}

function showProductDetails(productId) {
    hideAllSections();
    sections.productDetails.style.display = 'block';
    loadProductDetails(productId);
}

function showLogin() {
    hideAllSections();
    sections.login.style.display = 'block';
}

function showRegister() {
    hideAllSections();
    sections.register.style.display = 'block';
}

function showOrders() {
    hideAllSections();
    sections.orders.style.display = 'block';
    loadOrders();
}

function hideAllSections() {
    Object.values(sections).forEach(section => {
        section.style.display = 'none';
    });
}

// Product functions
async function loadProducts() {
    showLoading();
    try {
        const response = await fetch('/api/products');
        products = await response.json();
        displayProducts();
    } catch (error) {
        console.error('Error loading products:', error);
        showError('Failed to load products');
    } finally {
        hideLoading();
    }
}

function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.onclick = () => showProductDetails(product.id);
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image_url}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <p class="product-description">${product.description}</p>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${product.id})">
                        Add to Cart
                    </button>
                    <button class="btn btn-outline" onclick="event.stopPropagation(); showProductDetails(${product.id})">
                        View Details
                    </button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

async function loadProductDetails(productId) {
    showLoading();
    try {
        const response = await fetch(`/api/products/${productId}`);
        const product = await response.json();
        displayProductDetails(product);
    } catch (error) {
        console.error('Error loading product details:', error);
        showError('Failed to load product details');
    } finally {
        hideLoading();
    }
}

function displayProductDetails(product) {
    const productDetails = document.getElementById('productDetails');
    
    productDetails.innerHTML = `
        <div class="product-details-image">
            <img src="${product.image_url}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;">
        </div>
        <div class="product-details-info">
            <h2>${product.name}</h2>
            <div class="product-details-price">$${product.price.toFixed(2)}</div>
            <p class="product-details-description">${product.description}</p>
            <div class="quantity-selector">
                <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
                <input type="number" class="quantity-input" id="quantityInput" value="1" min="1" max="${product.stock}">
                <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
            </div>
            <div class="product-actions">
                <button class="btn btn-primary btn-large" onclick="addToCartFromDetails(${product.id})">
                    Add to Cart
                </button>
            </div>
            <p><strong>Stock:</strong> ${product.stock} available</p>
            <p><strong>Category:</strong> ${product.category}</p>
        </div>
    `;
}

function changeQuantity(delta) {
    const input = document.getElementById('quantityInput');
    const newValue = Math.max(1, Math.min(parseInt(input.value) + delta, parseInt(input.max)));
    input.value = newValue;
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    saveCart();
    updateCartDisplay();
    showSuccess('Product added to cart!');
}

function addToCartFromDetails(productId) {
    const quantity = parseInt(document.getElementById('quantityInput').value);
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity
        });
    }

    saveCart();
    updateCartDisplay();
    showSuccess(`${quantity} item(s) added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    saveCart();
    updateCartDisplay();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.productId === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart();
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    checkoutBtn.disabled = totalItems === 0;

    // Update cart items display
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <i class="fas fa-box"></i>
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.productId}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.productId}, ${item.quantity + 1})">+</button>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.productId})">Remove</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
}

function toggleCart() {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('open');
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Authentication functions
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    showLoading();
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            currentUser = data.user;
            updateAuthDisplay();
            showSuccess('Login successful!');
            showHome();
        } else {
            showError(data.error);
        }
    } catch (error) {
        console.error('Login error:', error);
        showError('Login failed. Please try again.');
    } finally {
        hideLoading();
    }
}

async function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    showLoading();
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            currentUser = data.user;
            updateAuthDisplay();
            showSuccess('Registration successful!');
            showHome();
        } else {
            showError(data.error);
        }
    } catch (error) {
        console.error('Registration error:', error);
        showError('Registration failed. Please try again.');
    } finally {
        hideLoading();
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    currentUser = null;
    updateAuthDisplay();
    showSuccess('Logged out successfully!');
    showHome();
}

function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        currentUser = JSON.parse(user);
        updateAuthDisplay();
    }
}

function updateAuthDisplay() {
    if (currentUser) {
        navAuth.style.display = 'none';
        navUser.style.display = 'flex';
        userName.textContent = `Welcome, ${currentUser.username}!`;
    } else {
        navAuth.style.display = 'flex';
        navUser.style.display = 'none';
        userName.textContent = '';
    }
}

// Order functions
async function checkout() {
    if (!currentUser) {
        showError('Please login to checkout');
        showLogin();
        return;
    }

    if (cart.length === 0) {
        showError('Your cart is empty');
        return;
    }

    showLoading();
    try {
        const items = cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }));

        const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ items, totalAmount })
        });

        const data = await response.json();
        
        if (response.ok) {
            cart = [];
            saveCart();
            updateCartDisplay();
            showSuccess(`Order placed successfully! Order ID: ${data.orderId}`);
            toggleCart();
            showOrders();
        } else {
            showError(data.error);
        }
    } catch (error) {
        console.error('Checkout error:', error);
        showError('Checkout failed. Please try again.');
    } finally {
        hideLoading();
    }
}

async function loadOrders() {
    if (!currentUser) {
        showError('Please login to view orders');
        return;
    }

    showLoading();
    try {
        const response = await fetch('/api/orders', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const orders = await response.json();
        displayOrders(orders);
    } catch (error) {
        console.error('Error loading orders:', error);
        showError('Failed to load orders');
    } finally {
        hideLoading();
    }
}

function displayOrders(orders) {
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = '';

    if (orders.length === 0) {
        ordersList.innerHTML = '<p>No orders found.</p>';
        return;
    }

    // Group orders by order ID
    const orderGroups = {};
    orders.forEach(order => {
        if (!orderGroups[order.id]) {
            orderGroups[order.id] = {
                id: order.id,
                total_amount: order.total_amount,
                status: order.status,
                created_at: order.created_at,
                items: []
            };
        }
        orderGroups[order.id].items.push({
            product_name: order.product_name,
            quantity: order.quantity,
            price: order.price
        });
    });

    Object.values(orderGroups).forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        
        const orderDate = new Date(order.created_at).toLocaleDateString();
        
        orderItem.innerHTML = `
            <div class="order-header">
                <div>
                    <div class="order-id">Order #${order.id}</div>
                    <div class="order-date">${orderDate}</div>
                </div>
                <span class="order-status ${order.status}">${order.status}</span>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>${item.product_name} x${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">
                Total: $${order.total_amount.toFixed(2)}
            </div>
        `;
        
        ordersList.appendChild(orderItem);
    });
}

// Utility functions
function showLoading() {
    loading.style.display = 'flex';
}

function hideLoading() {
    loading.style.display = 'none';
}

function showSuccess(message) {
    // Simple success notification
    alert(message);
}

function showError(message) {
    // Simple error notification
    alert('Error: ' + message);
} 