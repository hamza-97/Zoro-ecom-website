// Products data is loaded from menu-script.js
// The products array is available via window.products (set by menu-script.js)
// No need to declare products here - it's already declared in menu-script.js

// Cart management
// Cart is already declared in menu-script.js as: let cart = JSON.parse(localStorage.getItem('zoroCart')) || [];
// Since menu-script.js loads before script.js, we can use that cart variable directly
// No need to redeclare it here - it's already in the global scope from menu-script.js

// DOM Elements
// All DOM elements are already declared in menu-script.js
// We only need productsGrid which is specific to index.html
const productsGrid = document.getElementById('productsGrid');

// Note: All other DOM elements (cartSidebar, cartBtn, etc.) and variables (cart, selectedBranch, orderType)
// are already declared in menu-script.js and available in the global scope

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the home page (index.html)
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
    
    // Use products from menu-script.js if available, otherwise use local products
    const allProducts = typeof products !== 'undefined' ? products : (typeof window.products !== 'undefined' ? window.products : []);
    
    if (isHomePage) {
        // Initialize category slider and display products
        // Wait a bit for menu-script.js to load if needed
        if (allProducts.length === 0) {
            // If products not loaded yet, wait and try again
            setTimeout(() => {
                initializeCategorySlider();
            }, 200);
        } else {
            initializeCategorySlider();
        }
    } else {
        // Show all burgers by default on other pages
        const burgerProducts = allProducts.filter(p => p.category === 'beef-smashers' || p.category === 'beef-speciality' || p.category === 'chicken-burgers');
        if (typeof displayProducts === 'function') {
            displayProducts(burgerProducts);
        }
    }
    
    updateCartUI();
    setupEventListeners();
    setupLocationModal();
    initializeBranchSelection();
});


// Setup Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    cartBtn.addEventListener('click', () => toggleCart());
    closeCart.addEventListener('click', () => toggleCart());
    cartOverlay.addEventListener('click', () => toggleCart());
    closeModal.addEventListener('click', () => closeProductModal());
    checkoutBtn.addEventListener('click', () => handleCheckout());
    
    // Order Now buttons - links now work directly to menu.html
    // Location selection will be handled on menu.html if needed
    // No event listener needed - let the links work normally
    
    // Only enable category filtering if not on home page
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
    
    if (!isHomePage) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                categoryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                filterProducts(tab.dataset.category);
            });
        });
    } else {
        // On home page, use category slider
        initializeCategorySlider();
    }
}

// Initialize category slider for index.html
function initializeCategorySlider() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const productsGrid = document.getElementById('productsGrid');
    
    if (!categoryTabs.length) {
        console.warn('Category tabs not found');
        return;
    }
    
    if (!productsGrid) {
        console.warn('Products grid not found');
        return;
    }
    
    // Get products from menu-script.js (now available on window object)
    let allProducts = [];
    
    // Try to access products from window object (set by menu-script.js)
    if (typeof window.products !== 'undefined' && Array.isArray(window.products) && window.products.length > 0) {
        allProducts = window.products;
        console.log('✅ Products loaded from menu-script.js:', allProducts.length);
    } else if (typeof window.menuProducts !== 'undefined' && Array.isArray(window.menuProducts) && window.menuProducts.length > 0) {
        allProducts = window.menuProducts;
        console.log('✅ Products loaded from menu-script.js (alternative):', allProducts.length);
    } else if (typeof products !== 'undefined' && Array.isArray(products) && products.length > 0) {
        allProducts = products;
        console.log('✅ Products loaded from global scope:', allProducts.length);
    } else {
        // Products not loaded yet, wait and retry
        console.log('⏳ Products not loaded yet, waiting for menu-script.js...');
        setTimeout(() => {
            if (typeof window.products !== 'undefined' && Array.isArray(window.products) && window.products.length > 0) {
                console.log('✅ Products loaded after delay, retrying initialization');
                initializeCategorySlider();
            } else {
                console.error('❌ No products found. Make sure menu-script.js is loaded before script.js');
            }
        }, 500);
        return;
    }
    
    if (allProducts.length === 0) {
        console.warn('⚠️ Products array is empty');
        return;
    }
    
    // Function to display products based on category
    function displayCategoryProducts(category) {
        console.log('Displaying category:', category);
        let categoryProducts;
        
        if (category === 'all') {
            // Show all products, but limit shakes and soft drinks to 4
            const shakes = allProducts.filter(p => p.category === 'premium-shakes').slice(0, 4);
            const softDrinks = allProducts.filter(p => p.category === 'soft-drinks').slice(0, 4);
            const otherProducts = allProducts.filter(p => p.category !== 'premium-shakes' && p.category !== 'soft-drinks');
            categoryProducts = [...otherProducts, ...shakes, ...softDrinks];
        } else {
            categoryProducts = allProducts.filter(p => p.category === category);
            // Limit to 4 items for premium-shakes and soft-drinks
            if (category === 'premium-shakes' || category === 'soft-drinks') {
                categoryProducts = categoryProducts.slice(0, 4);
            }
        }
        
        console.log('Category products:', categoryProducts.length);
        
        if (typeof displayProducts === 'function') {
            displayProducts(categoryProducts);
        } else {
            console.error('displayProducts function not found');
            // Fallback: directly update the grid
            if (productsGrid) {
                productsGrid.innerHTML = '';
                if (categoryProducts.length === 0) {
                    productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 2rem;">No products found in this category.</p>';
                    return;
                }
                categoryProducts.forEach(product => {
                    const productCard = createProductCard(product);
                    productsGrid.appendChild(productCard);
                });
            }
        }
    }
    
    // Set up event listeners for category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const category = tab.dataset.category;
            displayCategoryProducts(category);
        });
    });
    
    // Display initial category (ALL by default, or first active tab)
    const activeTab = document.querySelector('.category-tab.active');
    const initialCategory = activeTab ? activeTab.dataset.category : 'all';
    displayCategoryProducts(initialCategory);
}

// Display Products
function displayProducts(productsToShow) {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 2rem;">No products found in this category.</p>';
        return;
    }
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Calculate discounted price (use function from menu-script.js if available)
    let pricing;
    let showDiscount = true;
    if (typeof getDiscountedPrice === 'function') {
        pricing = getDiscountedPrice(product);
        // Check if discounts are enabled (APPLY_DISCOUNTS should be available from menu-script.js)
        const applyDiscounts = true
        showDiscount = applyDiscounts && pricing.original !== pricing.discounted;
    } else {
        // Fallback if function not available yet
        const discountRate = 0.20; // Default 20% off
        pricing = {
            original: product.price,
            discounted: Math.round(product.price * (1 - discountRate)),
            discountRate: discountRate
        };
        showDiscount = true;
    }
    
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300x250?text=${encodeURIComponent(product.name)}'">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <div class="product-price-container">
                    ${showDiscount ? `<span class="product-price-original">Rs ${pricing.original.toLocaleString()}</span>` : ''}
                    <span class="product-price-discounted">Rs ${pricing.discounted.toLocaleString()}</span>
                </div>
                <button class="add-to-cart-btn" data-product-id="${product.id}">
                    ADD TO CART
                </button>
            </div>
        </div>
    `;
    
    // Add click event to the button
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    
    // Handle both click and touch events for mobile compatibility
    const handleButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const productId = parseInt(addToCartBtn.dataset.productId);
        const productToAdd = products.find(p => p.id === productId);
        if (productToAdd) {
            // If it's a combo, add directly to cart without showing modal
            if (productToAdd.isCombo && typeof addComboToCart === 'function') {
                addComboToCart(productToAdd);
            } 
            // If it's a dessert, add directly to cart without showing modal (no size/addon options)
            else if (productToAdd.category === 'desserts') {
                addDessertToCart(productToAdd);
            } 
            else {
                showProductModal(productToAdd);
            }
        }
    };
    
    addToCartBtn.addEventListener('click', handleButtonClick);
    addToCartBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        handleButtonClick(e);
    });
    
    // Removed card click handlers - only button is clickable now
    
    return card;
}

// Filter Products by Category
function filterProducts(category) {
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered);
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showCartNotification('Item added to cart!');
}

// Add Dessert to Cart (directly adds without modal or options)
function addDessertToCart(product) {
    if (!product || product.category !== 'desserts') return;
    
    // Calculate discounted price (use function from menu-script.js if available)
    let pricing;
    if (typeof getDiscountedPrice === 'function') {
        pricing = getDiscountedPrice(product);
    } else {
        // Fallback if function not available yet
        const discountRate = 0.20; // Default 20% off
        pricing = {
            original: product.price,
            discounted: Math.round(product.price * (1 - discountRate)),
            discountRate: discountRate
        };
    }
    
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('zoroCart')) || [];
    
    // Create a simple key for desserts
    const itemKey = `${product.id}-dessert`;
    const existingItemIndex = cart.findIndex(item => item.key === itemKey || (item.id === product.id && item.category === 'desserts' && !item.size && !item.addons));
    
    if (existingItemIndex !== -1) {
        const existingItem = cart[existingItemIndex];
        existingItem.quantity += 1;
        existingItem.total = pricing.discounted * existingItem.quantity;
    } else {
        cart.push({
            ...product,
            price: pricing.discounted, // Use discounted price for cart
            originalPrice: pricing.original, // Store original price
            quantity: 1,
            key: itemKey,
            total: pricing.discounted
        });
    }
    
    localStorage.setItem('zoroCart', JSON.stringify(cart));
    updateCartUI();
    showCartNotification('Item added to cart!');
}

// Remove from Cart (by item index)
function removeFromCart(itemIndex) {
    // Get cart from localStorage to ensure we have the latest data
    const savedCart = JSON.parse(localStorage.getItem('zoroCart')) || [];
    cart = savedCart;
    
    // If itemIndex is a number, treat it as index
    if (typeof itemIndex === 'number') {
        cart = cart.filter((item, index) => index !== itemIndex);
    } else {
        cart = cart.filter(item => item.key !== itemIndex);
    }
    saveCart();
    updateCartUI();
}

// Update Quantity (by item index)
function updateQuantity(itemIndex, change) {
    // Get cart from localStorage to ensure we have the latest data
    const savedCart = JSON.parse(localStorage.getItem('zoroCart')) || [];
    cart = savedCart;
    
    if (itemIndex < 0 || itemIndex >= cart.length) return;
    
    const item = cart[itemIndex];
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(itemIndex);
    } else {
        // Recalculate total for this item
        const addonsTotal = (item.addons || []).reduce((sum, addon) => sum + addon.price, 0);
        item.total = (item.price + addonsTotal) * item.quantity;
        saveCart();
        updateCartUI();
    }
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('zoroCart', JSON.stringify(cart));
}

// Update Cart UI
function updateCartUI() {
    // Get cart from localStorage to ensure we have the latest data
    const savedCart = JSON.parse(localStorage.getItem('zoroCart')) || [];
    cart = savedCart;
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    if (cartCount) cartCount.textContent = totalItems;
    
    // Update cart items
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map((item, index) => {
            // Calculate item total (price + addons) * quantity
            const addonsTotal = (item.addons || []).reduce((sum, addon) => sum + addon.price, 0);
            const itemTotal = item.total || ((item.price + addonsTotal) * (item.quantity || 1));
            
            // Build details content
            const hasSize = item.size && item.size !== 'default';
            const hasWingType = item.wingType;
            const hasAddons = item.addons && item.addons.length > 0;
            const hasDetails = hasSize || hasWingType || hasAddons;
            
            // Size detail - show per item (always 1x since each item has one size)
            const sizeDetail = hasSize ? `
                <div class="cart-detail-label">Size:</div>
                <div class="cart-detail-value">${item.size}</div>
            ` : '';
            
            // Wing type detail
            const wingTypeDetail = hasWingType ? `
                <div class="cart-detail-label">Type:</div>
                <div class="cart-detail-value">${item.wingType === 'bone-in' ? 'Bone-in' : 'Boneless'}</div>
            ` : '';
            
            // Addons detail - show per item (always 1x for each addon per item)
            const addonsDetail = hasAddons ? `
                <div class="cart-detail-label">Add Ons:</div>
                <div class="cart-detail-value">${item.addons.map(a => `1x ${a.name}`).join(', ')}</div>
            ` : '';
            
            return `
                <div class="cart-item" data-item-index="${index}">
                    <div class="cart-item-name-row">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-right">
                            <button class="cart-remove-btn" onclick="removeFromCart(${index})" title="Remove item">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                </svg>
                            </button>
                            <div class="cart-item-price">Rs ${itemTotal.toLocaleString()}</div>
                        </div>
                    </div>
                    <div class="cart-item-controls">
                        <div class="cart-item-quantity">
                            <button class="cart-quantity-btn" onclick="updateQuantity(${index}, -1)">−</button>
                            <span class="cart-quantity-value">${item.quantity || 1}</span>
                            <button class="cart-quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                        ${hasDetails ? `
                        <button class="cart-view-details" onclick="toggleCartItemDetails(${index})" data-expanded="false" id="cart-toggle-${index}">
                            <span class="details-text">View details</span>
                            <svg class="details-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 4.5L6 7.5L9 4.5"/>
                            </svg>
                        </button>
                        ` : ''}
                    </div>
                    ${hasDetails ? `
                    <div class="cart-item-details-content hidden" id="cart-details-${index}">
                        ${sizeDetail}
                        ${wingTypeDetail}
                        ${addonsDetail}
                    </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    }
    
    // Update total (use item.total if available, otherwise calculate)
    const total = cart.reduce((sum, item) => {
        if (item.total) return sum + item.total;
        const addonsTotal = (item.addons || []).reduce((aSum, addon) => aSum + addon.price, 0);
        return sum + ((item.price + addonsTotal) * (item.quantity || 1));
    }, 0);
    
    const cartTotalEl = document.getElementById('cartTotal');
    if (cartTotalEl) {
        cartTotalEl.textContent = total.toLocaleString();
    }
}

// Toggle Cart Item Details - make it globally accessible
window.toggleCartItemDetails = function(itemIndex) {
    const detailsContent = document.getElementById(`cart-details-${itemIndex}`);
    const toggleBtn = document.getElementById(`cart-toggle-${itemIndex}`);
    
    if (!detailsContent || !toggleBtn) {
        console.log('Elements not found:', itemIndex);
        return;
    }
    
    const isExpanded = toggleBtn.getAttribute('data-expanded') === 'true';
    const detailsText = toggleBtn.querySelector('.details-text');
    const detailsArrowPath = toggleBtn.querySelector('.details-arrow path');
    
    if (isExpanded) {
        // Collapse
        detailsContent.classList.add('hidden');
        if (detailsText) detailsText.textContent = 'View details';
        if (detailsArrowPath) detailsArrowPath.setAttribute('d', 'M3 4.5L6 7.5L9 4.5');
        toggleBtn.setAttribute('data-expanded', 'false');
    } else {
        // Expand
        detailsContent.classList.remove('hidden');
        if (detailsText) detailsText.textContent = 'Hide details';
        if (detailsArrowPath) detailsArrowPath.setAttribute('d', 'M3 7.5L6 4.5L9 7.5');
        toggleBtn.setAttribute('data-expanded', 'true');
    }
};


// Toggle Cart
function toggleCart() {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Show Product Modal
function showProductModal(product) {
    // If it's a combo, check if addComboToCart exists (from menu-script.js)
    if (product.isCombo && typeof addComboToCart === 'function') {
        addComboToCart(product);
        return;
    }
    
    // Determine category name
    const categoryMap = {
        'beef-smashers': 'Beef Smashers',
        'beef-speciality': 'Beef Speciality',
        'chicken-burgers': 'Chicken Burgers',
        'wings': 'Wings',
        'loaded-fries': 'Loaded Fries',
        'appetizers': 'Appetizers',
        'desserts': 'Desserts',
        'premium-shakes': 'Premium Shakes',
        'soft-drinks': 'Soft Drinks'
    };
    const categoryName = categoryMap[product.category] || product.category || '';
    
    // Calculate discounted price for base product
    let basePricing;
    if (typeof getDiscountedPrice === 'function') {
        basePricing = getDiscountedPrice(product);
    } else {
        // Fallback if function not available
        const discountRate = 0.20; // Default 20% off
        basePricing = {
            original: product.price,
            discounted: Math.round(product.price * (1 - discountRate)),
            discountRate: discountRate
        };
    }
    const APPLY_DISCOUNTS = typeof window !== 'undefined' && window.APPLY_DISCOUNTS !== undefined ? window.APPLY_DISCOUNTS : true;
    
    // Calculate size options - for burgers use Single/Double/Triple pricing, for wings use 6/12 pieces, for chicken crunchers use 6/12/18 pieces, for shakes use Regular/Large
    const isWings = product.category === 'wings';
    const isChickenCrunchers = product.id === 26; // Chicken Crunchers has id 26
    const isShakes = product.category === 'premium-shakes';
    const isBurger = !isWings && !isChickenCrunchers && !isShakes && product.category && (product.category.includes('beef') || product.category.includes('chicken'));
    let sizes;
    
    if (isShakes) {
        // Premium Shakes: Regular and Large sizes
        // Pricing rules:
        // - If regular is 695, large is 995
        // - If regular is 795, large is 1095
        // - If regular is 895, large is 1195
        // - If regular is 1095, large is 1395
        const regularPrice = product.price;
        let largePrice;
        
        if (regularPrice === 695) {
            largePrice = 995;
        } else if (regularPrice === 795) {
            largePrice = 1095;
        } else if (regularPrice === 895) {
            largePrice = 1195;
        } else if (regularPrice === 1095) {
            largePrice = 1395;
        } else {
            // Fallback calculation if price doesn't match
            largePrice = regularPrice + 300;
        }
        
        const discountRate = APPLY_DISCOUNTS ? basePricing.discountRate : 0;
        sizes = [
            { name: 'Regular', originalPrice: regularPrice, price: APPLY_DISCOUNTS ? Math.round(regularPrice * (1 - discountRate)) : regularPrice },
            { name: 'Large', originalPrice: largePrice, price: APPLY_DISCOUNTS ? Math.round(largePrice * (1 - discountRate)) : largePrice }
        ];
    } else if (isWings) {
        // Wings: 6 pieces or 12 pieces (price will be calculated dynamically based on bone-in/boneless selection)
        // Apply discount to base wing prices
        const discountRate = APPLY_DISCOUNTS ? basePricing.discountRate : 0;
        sizes = [
            { name: '6 Pieces', originalPrice: 895, price: APPLY_DISCOUNTS ? Math.round(895 * (1 - discountRate)) : 895 },
            { name: '12 Pieces', originalPrice: 1495, price: APPLY_DISCOUNTS ? Math.round(1495 * (1 - discountRate)) : 1495 }
        ];
    } else if (isChickenCrunchers) {
        // Chicken Crunchers: 6, 12, or 18 pieces - apply discount
        const discountRate = APPLY_DISCOUNTS ? basePricing.discountRate : 0;
        sizes = [
            { name: '6 Pieces', originalPrice: 595, price: APPLY_DISCOUNTS ? Math.round(595 * (1 - discountRate)) : 595 },
            { name: '12 Pieces', originalPrice: 1195, price: APPLY_DISCOUNTS ? Math.round(1195 * (1 - discountRate)) : 1195 },
            { name: '18 Pieces', originalPrice: 1795, price: APPLY_DISCOUNTS ? Math.round(1795 * (1 - discountRate)) : 1795 }
        ];
    } else if (isBurger) {
        // Use exact prices based on category
        // Beef Smashers: Single 895, Double 1295, Triple 1695
        // Beef Speciality: Single 995, Double 1395, Triple 1795
        // Swiss Mushroom (id 10): Single 1295, Double 1695, Triple 2095
        // Classic Chicken (id 11): Single 695, Double 1195, No Triple
        // Pepper Chicken (id 12): Single 895, Double 1295, No Triple
        // Tangy Crunch (id 13): Single 895, Double 1295, No Triple
        // Roost (id 14): Single 995, Double 1295, No Triple
        // Other Chicken Burgers: Single 995, Double 1395, No Triple
        const isBeefSmashers = product.category === 'beef-smashers';
        const isBeefSpeciality = product.category === 'beef-speciality';
        const isChickenBurgers = product.category === 'chicken-burgers';
        const isSwissMushroom = product.id === 10; // Swiss Mushroom has id 10
        const isClassicChicken = product.id === 11; // Classic Chicken has id 11
        const isPepperChicken = product.id === 12; // Pepper Chicken has id 12
        const isTangyCrunch = product.id === 13; // Tangy Crunch has id 13
        const isRoost = product.id === 14; // Roost has id 14
        
        let singleOriginal, doubleOriginal, tripleOriginal;
        let hasTriple = true;
        
        if (isBeefSmashers) {
            singleOriginal = 895;
            doubleOriginal = 1295;
            tripleOriginal = 1695;
        } else if (isBeefSpeciality) {
            if (isSwissMushroom) {
                // Swiss Mushroom has different pricing (original prices before discount)
                singleOriginal = 1295;  // Original price, discount will be applied on top
                doubleOriginal = 1695;  // Original price, discount will be applied on top
                tripleOriginal = 2095;  // Original price, discount will be applied on top
            } else {
                // Other Beef Speciality burgers
                singleOriginal = 995;
                doubleOriginal = 1395;
                tripleOriginal = 1795;
            }
        } else if (isChickenBurgers) {
            if (isClassicChicken) {
                singleOriginal = 695;
                doubleOriginal = 1195;
                hasTriple = false;
            } else if (isPepperChicken) {
                // Pepper Chicken: Single 895, Double 1295
                singleOriginal = 895;
                doubleOriginal = 1295;
                hasTriple = false;
            } else if (isTangyCrunch) {
                // Tangy Crunch: Single 895, Double 1295
                singleOriginal = 895;
                doubleOriginal = 1295;
                hasTriple = false;
            } else if (isRoost) {
                // Roost: Single 995, Double 1295
                singleOriginal = 995;
                doubleOriginal = 1295;
                hasTriple = false;
            } else {
                // Other Chicken Burgers
                singleOriginal = 995;
                doubleOriginal = 1395;
                hasTriple = false;
            }
        } else {
            // Fallback (shouldn't happen)
            singleOriginal = product.price;
            doubleOriginal = Math.round(product.price * 1.447);
            tripleOriginal = Math.round(product.price * 1.894);
        }
        
        // Apply discount rate to each size if discounts are enabled
        const discountRate = APPLY_DISCOUNTS ? basePricing.discountRate : 0;
        sizes = [
            { name: 'Single', originalPrice: singleOriginal, price: APPLY_DISCOUNTS ? Math.round(singleOriginal * (1 - discountRate)) : singleOriginal },
            { name: 'Double', originalPrice: doubleOriginal, price: APPLY_DISCOUNTS ? Math.round(doubleOriginal * (1 - discountRate)) : doubleOriginal }
        ];
        
        // Add Triple option only if it exists
        if (hasTriple) {
            sizes.push({
                name: 'Triple',
                originalPrice: tripleOriginal,
                price: APPLY_DISCOUNTS ? Math.round(tripleOriginal * (1 - discountRate)) : tripleOriginal
            });
        }
    } else {
        sizes = [
            { name: 'Regular', originalPrice: product.price, price: basePricing.discounted }
        ];
    }
    
    // Build size options HTML with original and discounted prices
    const sizesHTML = sizes.map((size, index) => {
        const showDiscount = APPLY_DISCOUNTS && size.originalPrice !== size.price && !isWings;
        return `
            <div class="size-option ${index === 0 ? 'selected' : ''}" data-size="${size.name}" data-price="${size.price}" data-original-price="${size.originalPrice}">
                <span class="size-option-name">${size.name}</span>
                ${!isWings ? `
                <span class="size-option-price">
                    ${showDiscount ? `<span class="size-price-original">Rs ${size.originalPrice.toLocaleString()}</span>` : ''}
                    <span class="size-price-discounted">Rs ${size.price.toLocaleString()}</span>
                </span>
                ` : ''}
            </div>
        `;
    }).join('');
    
    // Wing type options (Bone-in or Boneless) - only for wings
    let wingTypes = [];
    if (isWings) {
        wingTypes = [
            { name: 'Bone-in', value: 'bone-in' },
            { name: 'Boneless', value: 'boneless' }
        ];
    }
    
    // Build wing types HTML with prices (prices will update dynamically based on size selection)
    const wingTypesHTML = wingTypes.map((type, index) => {
        // Default price for 6 pieces bone-in (will update when size changes)
        const discountRate = APPLY_DISCOUNTS ? basePricing.discountRate : 0;
        const defaultOriginalPrice = type.value === 'bone-in' ? 895 : 1095;
        const defaultPrice = APPLY_DISCOUNTS ? Math.round(defaultOriginalPrice * (1 - discountRate)) : defaultOriginalPrice;
        return `
            <div class="size-option wing-type-option ${index === 0 ? 'selected' : ''}" data-type="${type.value}" data-original-price="${defaultOriginalPrice}" data-price="${defaultPrice}">
                <span class="size-option-name">${type.name}</span>
                <span class="size-option-price wing-type-price" id="wing-price-${type.value}">Rs ${defaultPrice.toLocaleString()}</span>
            </div>
        `;
    }).join('');
    
    // Add-ons for beef and chicken items (not for wings)
    const isBeef = product.category && (product.category === 'beef-smashers' || product.category === 'beef-speciality');
    const isChicken = product.category && product.category === 'chicken-burgers';
    const addons = (isBeef || isChicken) && !isWings ? [
        { name: 'Pickles', price: 80 },
        { name: 'Onions', price: 80 },
        { name: 'Pickled Red Onions', price: 80 },
        { name: 'Tomatoes', price: 80 },
        { name: 'Crispy Onions', price: 100 },
        { name: 'Cheese Slice', price: 100 },
        { name: 'Bacon', price: 250 },
        { name: 'Double Cheese Slice', price: 200 },
        { name: 'Lettuce', price: 80 },
        { name: 'Grilled Onions', price: 100 },
        { name: 'Nachos', price: 80 },
        { name: 'Jalapenos', price: 80 }
    ] : [];
    
    // Build add-ons HTML
    const addonsHTML = addons.map(addon => `
        <div class="addon-option" data-addon="${addon.name}" data-price="${addon.price}">
            <div class="addon-name">${addon.name}</div>
            <div class="addon-price">Rs ${addon.price}</div>
        </div>
    `).join('');
    
    modalBody.innerHTML = `
        <div class="modal-image-container">
            <img src="${product.image}" alt="${product.name}" class="modal-image" onerror="this.src='https://via.placeholder.com/600x300?text=${encodeURIComponent(product.name)}'">
        </div>
        <div class="modal-options">
            <div class="modal-options-header">
                ${categoryName ? `<div class="modal-category">${categoryName}</div>` : ''}
                <h2 class="modal-product-name">
                    ${product.name}
                    ${product.isSpicy ? '<span class="spicy-indicator" title="Very Spicy" style="margin-left: 0.5rem;">🌶️🌶️🌶️</span>' : ''}
                </h2>
                <p class="modal-product-description">${product.description}</p>
            </div>
            
            ${sizes.length > 0 ? `
            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Pick Size</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="size-options">
                    ${sizesHTML}
                </div>
            </div>
            ` : ''}
            
            ${isWings && wingTypes.length > 0 ? `
            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Choose Type</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="size-options">
                    ${wingTypesHTML}
                </div>
            </div>
            ` : ''}
            
            ${!isWings && addons && addons.length > 0 ? `
            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Add Ons</div>
                    <div class="modal-section-required">Optional</div>
                </div>
                <div class="addons-grid">
                    ${addonsHTML}
                </div>
            </div>
            ` : ''}
            
            <div class="quantity-controls">
                <div class="quantity-selector">
                    <button class="quantity-btn" id="decreaseQty" onclick="changeQuantity(-1)">−</button>
                    <span class="quantity-value" id="quantityValue">1</span>
                    <button class="quantity-btn" id="increaseQty" onclick="changeQuantity(1)">+</button>
                </div>
                <button class="add-to-cart-modal-btn" onclick="addToCartFromModal(${product.id})">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 2L7 6m0 0L5 10M7 6h10M7 6l-2 8h12l-2-8M5 10h14M9 20a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    
    // Update wing price function - define it before event listeners if it's a wing product
    if (isWings) {
        window.updateWingPrice = function() {
            const selectedSize = document.querySelector('.size-option:not(.wing-type-option).selected');
            const wingTypeOptions = document.querySelectorAll('.wing-type-option');
            
            if (selectedSize && wingTypeOptions.length > 0) {
                const sizeName = selectedSize.dataset.size;
                const discountRate = APPLY_DISCOUNTS ? basePricing.discountRate : 0;
                
                // Update prices for each wing type option based on selected size
                wingTypeOptions.forEach(option => {
                    const typeValue = option.dataset.type;
                    let originalPrice = 0;
                    
                    // Pricing structure (original prices):
                    // 6 pieces: bone-in = 895, boneless = 1095
                    // 12 pieces: bone-in = 1495, boneless = 1995
                    if (sizeName === '6 Pieces') {
                        originalPrice = typeValue === 'bone-in' ? 895 : 1095;
                    } else if (sizeName === '12 Pieces') {
                        originalPrice = typeValue === 'bone-in' ? 1495 : 1995;
                    }
                    
                    // Apply discount
                    const discountedPrice = APPLY_DISCOUNTS ? Math.round(originalPrice * (1 - discountRate)) : originalPrice;
                    
                    // Update the price display for this type option
                    const priceElement = option.querySelector('.wing-type-price');
                    if (priceElement) {
                        priceElement.textContent = `Rs ${discountedPrice.toLocaleString()}`;
                    }
                    
                    // Update data attributes for cart processing when this type is selected
                    if (option.classList.contains('selected')) {
                        if (selectedSize) {
                            selectedSize.dataset.price = discountedPrice;
                            selectedSize.dataset.originalPrice = originalPrice;
                        }
                    }
                    
                    // Store original and discounted prices in the option element for later use
                    option.dataset.originalPrice = originalPrice;
                    option.dataset.price = discountedPrice;
                });
            }
        };
    }
    
    // Add event listeners for size selection
    document.querySelectorAll('.size-option:not(.wing-type-option)').forEach(option => {
        option.addEventListener('click', function() {
            // Only deselect other size options (not wing type options)
            document.querySelectorAll('.size-option:not(.wing-type-option)').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            // Update wing price if this is a wing product
            if (isWings && window.updateWingPrice) {
                window.updateWingPrice();
            }
        });
    });
    
    // Add event listeners for wing type selection
    if (isWings) {
        document.querySelectorAll('.wing-type-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.wing-type-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                
                // Update the selected size's price data attributes based on selected type
                const selectedSize = document.querySelector('.size-option:not(.wing-type-option).selected');
                if (selectedSize && window.updateWingPrice) {
                    window.updateWingPrice();
                }
            });
        });
    }
    
    // Add event listeners for add-ons
    document.querySelectorAll('.addon-option').forEach(option => {
        option.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
    
    // Set initial price for wings
    if (isWings) {
        setTimeout(() => {
            if (window.updateWingPrice) {
                window.updateWingPrice();
            }
        }, 100);
    }
    
    // Reset quantity
    window.currentQuantity = 1;
    
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Change quantity
function changeQuantity(delta) {
    if (!window.currentQuantity) window.currentQuantity = 1;
    const newQuantity = Math.max(1, window.currentQuantity + delta);
    window.currentQuantity = newQuantity;
    const quantityValue = document.getElementById('quantityValue');
    if (quantityValue) {
        quantityValue.textContent = newQuantity;
    }
}

// Add to cart from modal
function addToCartFromModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const isWings = product.category === 'wings';
    
    // Get selected size (for wings, this is the piece count)
    const selectedSize = document.querySelector('.size-option:not(.wing-type-option).selected');
    if (!selectedSize) {
        alert('Please select a size');
        return;
    }
    
    let sizeName = selectedSize.dataset.size;
    let sizePrice = parseInt(selectedSize.dataset.price);
    let originalPrice = parseInt(selectedSize.dataset.originalPrice) || sizePrice;
    let wingType = null;
    let displayName = product.name;
    
    // For wings, get the selected type (bone-in or boneless) and get discounted price
    if (isWings) {
        const selectedType = document.querySelector('.wing-type-option.selected');
        if (!selectedType) {
            alert('Please select bone-in or boneless');
            return;
        }
        
        wingType = selectedType.dataset.type;
        // Get prices from the selected type option (discounts already applied in updateWingPrice)
        originalPrice = parseInt(selectedType.dataset.originalPrice) || parseInt(selectedSize.dataset.originalPrice);
        sizePrice = parseInt(selectedType.dataset.price) || parseInt(selectedSize.dataset.price);
        
        // Update display name to include type
        displayName = `${product.name} (${sizeName}, ${wingType === 'bone-in' ? 'Bone-in' : 'Boneless'})`;
    } else {
        // For non-wings (burgers, chicken crunchers, etc.), prices are already discounted in size options
        // Price is already calculated and stored in the size option's data attributes
        sizePrice = parseInt(selectedSize.dataset.price);
        originalPrice = parseInt(selectedSize.dataset.originalPrice) || sizePrice;
    }
    
    // Get selected add-ons (not applicable for wings)
    const selectedAddons = Array.from(document.querySelectorAll('.addon-option.selected')).map(addon => ({
        name: addon.dataset.addon,
        price: parseInt(addon.dataset.price)
    }));
    
    // Calculate total price
    const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    const quantity = window.currentQuantity || 1;
    const itemTotal = (sizePrice + addonsTotal) * quantity;
    
    // Create cart item
    const cartItem = {
        id: product.id,
        name: displayName,
        image: product.image,
        price: sizePrice, // Already discounted
        originalPrice: originalPrice, // Store original price
        quantity: quantity,
        size: sizeName,
        addons: selectedAddons,
        total: itemTotal
    };
    
    // Add wing type if applicable
    if (isWings && wingType) {
        cartItem.wingType = wingType;
    }
    
    // Add to cart
    addToCartWithItem(cartItem);
    closeProductModal();
}

// Add to cart with full item details
function addToCartWithItem(item) {
    let cart = JSON.parse(localStorage.getItem('zoroCart')) || [];
    
    // Create a unique key for this item configuration
    // For wings, include wingType in the key
    const isWings = item.wingType !== undefined;
    const itemKey = isWings 
        ? `${item.id}-${item.size}-${item.wingType}`
        : `${item.id}-${item.size}-${(item.addons || []).map(a => a.name).join(',')}`;
    item.key = itemKey;
    
    // Check if this exact configuration already exists
    const existingIndex = cart.findIndex(cartItem => {
        if (isWings) {
            return cartItem.key === itemKey || (
                cartItem.id === item.id && 
                cartItem.size === item.size && 
                cartItem.wingType === item.wingType
            );
        } else {
            return cartItem.key === itemKey;
        }
    });
    
    if (existingIndex >= 0) {
        // Update quantity
        cart[existingIndex].quantity += item.quantity;
        const addonsTotal = (cart[existingIndex].addons || []).reduce((sum, a) => sum + a.price, 0);
        cart[existingIndex].total = (cart[existingIndex].price + addonsTotal) * cart[existingIndex].quantity;
    } else {
        cart.push(item);
    }
    
    localStorage.setItem('zoroCart', JSON.stringify(cart));
    updateCartUI();
    
    // Show notification
    const notification = document.createElement('div');
    notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: var(--primary-color); color: white; padding: 1rem 2rem; border-radius: 8px; z-index: 5000; animation: slideIn 0.3s ease;';
    notification.textContent = '✓ Added to cart!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Close Product Modal
function closeProductModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Handle Checkout
function handleCheckout() {
    // Get cart from localStorage to ensure we have the latest data
    const savedCart = JSON.parse(localStorage.getItem('zoroCart')) || [];
    cart = savedCart;
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Show Notification
function showCartNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 2500;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Close modal on outside click
productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
        closeProductModal();
    }
});

// Smooth scrolling for anchor links (only for same-page anchors)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only handle same-page anchors (not cross-page links like "index.html#locations")
        // Check if href is just a hash (same page) vs a full URL with hash (cross-page)
        if (href.startsWith('#') && href.length > 1 && !href.includes('.')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        // If it's a cross-page link (like "index.html#locations"), let it navigate normally
    });
});

// Handle hash navigation when page loads (for cross-page links like "index.html#locations")
window.addEventListener('load', () => {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
});

// Location Modal Functions
function setupLocationModal() {
    // Check if location modal elements exist (they might not be on all pages)
    if (!locationModal || !deliveryBtn || !findBranchBtn || !startOrderBtn) {
        console.log('Location modal elements not found on this page, skipping setup');
        return;
    }
    
    // Delivery button
    deliveryBtn.addEventListener('click', () => {
        orderType = 'delivery';
        localStorage.setItem('orderType', orderType);
        hideLocationModal();
    });
    
    // Find branch button - show branch selector
    findBranchBtn.addEventListener('click', () => {
        orderType = 'pickup';
        localStorage.setItem('orderType', orderType);
        // Branch selector is already visible
    });
    
    // Branch selection
    branchOptions.forEach(option => {
        option.addEventListener('click', () => {
            selectedBranch = option.dataset.branch;
            localStorage.setItem('selectedBranch', selectedBranch);
            updateBranchSelection();
        });
    });
    
    // Start order button
    startOrderBtn.addEventListener('click', () => {
        if (!orderType) {
            alert('Please select delivery or find your branch first.');
            return;
        }
        if (orderType === 'pickup' && !selectedBranch) {
            alert('Please select a branch.');
            return;
        }
        hideLocationModal();
        // Redirect to menu if not already there
        if (!window.location.pathname.includes('menu.html')) {
            window.location.href = 'menu.html';
        }
    });
    
    // Close modal on outside click
    locationModal.addEventListener('click', (e) => {
        if (e.target === locationModal) {
            hideLocationModal();
        }
    });
}

function showLocationModal() {
    if (!locationModal) {
        console.warn('Location modal not found on this page');
        return;
    }
    locationModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (typeof updateBranchSelection === 'function') {
        updateBranchSelection();
    }
}

function hideLocationModal() {
    if (!locationModal) {
        console.warn('Location modal not found on this page');
        return;
    }
    locationModal.classList.remove('active');
    document.body.style.overflow = '';
}

function initializeBranchSelection() {
    updateBranchSelection();
}

function updateBranchSelection() {
    branchOptions.forEach(option => {
        if (option.dataset.branch === selectedBranch) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
    
    // Enable/disable start order button
    if (orderType && (orderType === 'delivery' || (orderType === 'pickup' && selectedBranch))) {
        startOrderBtn.disabled = false;
    } else {
        startOrderBtn.disabled = true;
    }
}

// Add slide animations
// Style element and animations are already created in menu-script.js
// No need to duplicate them here
