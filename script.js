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
    setupWelcomeModal();

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

// Welcome modal (first thing user sees on entry) - Branch Selection
function setupWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    if (!modal) return;

    const closeBtn = document.getElementById('welcomeModalClose');
    const continueBtn = document.getElementById('welcomeModalContinue');
    const dontShowAgain = document.getElementById('welcomeModalDontShowAgain');
    const branchButtons = document.querySelectorAll('.branch-option-btn');

    const STORAGE_KEY = 'zoroWelcomeModalDismissed_v1';
    let selectedBranch = null;
    let selectedBranchName = null;

    const open = () => {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const close = (persistDismissal) => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        if (persistDismissal) {
            try {
                localStorage.setItem(STORAGE_KEY, '1');
            } catch (_) {}
        }
    };

    // Handle branch selection
    branchButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove selected class from all buttons
            branchButtons.forEach(b => b.classList.remove('selected'));
            // Add selected class to clicked button
            btn.classList.add('selected');
            // Get branch values
            selectedBranch = btn.dataset.branch;
            selectedBranchName = btn.dataset.branchName;
            // Enable continue button
            if (continueBtn) {
                continueBtn.disabled = false;
            }
        });
    });

    const shouldPersist = () => !!(dontShowAgain && dontShowAgain.checked);

    // Handle continue button
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            if (!selectedBranch) {
                alert('Please select a branch first');
                return;
            }
            
            // Save selected branch to localStorage (matching menu-script.js format)
            try {
                localStorage.setItem('selectedBranch', selectedBranch);
                // Also save the full branch name for checkout/order processing
                localStorage.setItem('selectedBranchName', selectedBranchName);
            } catch (_) {}

            if (typeof initializeCategorySlider === 'function') {
                initializeCategorySlider();
            }
            
            // Close modal
            close(shouldPersist());
        });
    }

    // Show immediately unless previously dismissed OR branch already selected
    let dismissed = false;
    let hasBranch = false;
    try {
        dismissed = localStorage.getItem(STORAGE_KEY) === '1';
        hasBranch = !!localStorage.getItem('selectedBranch');
    } catch (_) {
        dismissed = false;
        hasBranch = false;
    }
    
    // Only show if not dismissed AND no branch selected yet
    if (!dismissed && !hasBranch) {
        open();
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            // If branch was selected before closing, save it
            if (selectedBranch) {
                try {
                    localStorage.setItem('selectedBranch', selectedBranch);
                    localStorage.setItem('selectedBranchName', selectedBranchName);
                } catch (_) {}
                if (typeof initializeCategorySlider === 'function') {
                    initializeCategorySlider();
                }
            }
            close(shouldPersist());
        });
    }

    // Click outside content closes (but don't save branch if none selected)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            if (selectedBranch) {
                try {
                    localStorage.setItem('selectedBranch', selectedBranch);
                    localStorage.setItem('selectedBranchName', selectedBranchName);
                } catch (_) {}
                if (typeof initializeCategorySlider === 'function') {
                    initializeCategorySlider();
                }
            }
            close(shouldPersist());
        }
    });

    // ESC closes
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            if (selectedBranch) {
                try {
                    localStorage.setItem('selectedBranch', selectedBranch);
                    localStorage.setItem('selectedBranchName', selectedBranchName);
                } catch (_) {}
                if (typeof initializeCategorySlider === 'function') {
                    initializeCategorySlider();
                }
            }
            close(shouldPersist());
        }
    });
}


// Setup Event Listeners
function setupEventListeners() {
    // Get DOM elements (they may be declared in menu-script.js, but we'll get them here too for safety)
    const cartBtn = document.getElementById('cartBtn');
    const closeCart = document.getElementById('closeCart');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeModal = document.getElementById('closeModal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    
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
    
    // Cart event listeners
    console.log('Setting up cart listeners (script.js):', { cartBtn: !!cartBtn, closeCart: !!closeCart, cartOverlay: !!cartOverlay });
    if (cartBtn) {
        cartBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Cart button clicked (script.js)!');
            toggleCart();
        };
    }
    if (closeCart) {
        closeCart.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleCart();
        };
    }
    if (cartOverlay) {
        cartOverlay.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleCart();
        };
    }
    if (closeModal) {
        closeModal.addEventListener('click', () => closeProductModal());
    }
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => handleCheckout());
    }
    
    // Order Now buttons - links now work directly to menu.html
    // Location selection will be handled on menu.html if needed
    // No event listener needed - let the links work normally
    
    // Only enable category filtering if not on home page
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
    const categoryTabs = document.querySelectorAll('.category-tab');
    const menuContainer = document.getElementById('menuContainer');
    const productsGridEl = document.getElementById('productsGrid');

    if (!isHomePage && categoryTabs.length) {
        // Menu page (menu.html): filter via displayMenu and #menuContainer
        if (menuContainer && typeof displayMenu === 'function') {
            categoryTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    categoryTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    displayMenu(tab.dataset.category);
                });
            });
        } else if (productsGridEl) {
            // Other page with category tabs and products grid
            categoryTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    categoryTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    filterProducts(tab.dataset.category);
                });
            });
        }
    } else if (isHomePage) {
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
    const branchCode = localStorage.getItem('selectedBranch');
    const isOutOfStockHere = typeof ZoroBranchRestrictions !== 'undefined'
        && ZoroBranchRestrictions.isIsbOrKarachiLocalBranchCode(branchCode)
        && ZoroBranchRestrictions.isProductUnavailableAtIsbKarachi(product);
    
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
        const discountRate = product.id === 11 ? 0 : 0.20; // Classic Chicken has no discount
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
                <button
                    class="add-to-cart-btn"
                    data-product-id="${product.id}"
                    ${isOutOfStockHere ? 'disabled aria-disabled="true" title="Not available at this branch"' : ''}
                >
                    ${isOutOfStockHere ? 'NOT AVAILABLE' : 'ADD TO CART'}
                </button>
            </div>
        </div>
    `;
    
    // Add click event to the button
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    if (isOutOfStockHere) {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        return card;
    }
    
    const openProductFromCard = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const productId = parseInt(addToCartBtn.dataset.productId);
        const allProducts = typeof products !== 'undefined' ? products : (typeof window.products !== 'undefined' ? window.products : []);
        const productToAdd = allProducts.find(p => p.id === productId);
        if (productToAdd) {
            // Zoro For Four (id 101): open drink selection modal
            if (productToAdd.id === 101) {
                showProductModal(productToAdd);
                return;
            }
            // Wing Frenzy (id 102): open flavour selection modal
            if (productToAdd.id === 102) {
                showProductModal(productToAdd);
                return;
            }
            // Zoro For Two (id 103): open burger + 2 drinks selection modal
            if (productToAdd.id === 103) {
                showProductModal(productToAdd);
                return;
            }
            const isCustomMealCombo = !!productToAdd.isCombo && ![101, 102, 103].includes(productToAdd.id);
            // Other combos: add directly to cart without showing modal
            if (productToAdd.isCombo && !isCustomMealCombo && typeof addComboToCart === 'function') {
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
    
    // Handle both click and touch events for mobile compatibility
    const handleButtonClick = (e) => openProductFromCard(e);
    
    addToCartBtn.addEventListener('click', handleButtonClick);

    // Tap vs scroll: only fire add-to-cart on touch if user didn't scroll (avoids accidental taps on Android)
    const TAP_MOVE_THRESHOLD_PX = 10;
    let touchStartY = 0;
    let touchStartX = 0;
    let didMove = false;
    addToCartBtn.addEventListener('touchstart', (e) => {
        didMove = false;
        if (e.changedTouches && e.changedTouches[0]) {
            touchStartX = e.changedTouches[0].clientX;
            touchStartY = e.changedTouches[0].clientY;
        }
    }, { passive: true });
    addToCartBtn.addEventListener('touchmove', (e) => {
        if (!e.touches || !e.touches[0]) return;
        const dx = Math.abs(e.touches[0].clientX - touchStartX);
        const dy = Math.abs(e.touches[0].clientY - touchStartY);
        if (dx > TAP_MOVE_THRESHOLD_PX || dy > TAP_MOVE_THRESHOLD_PX) didMove = true;
    }, { passive: true });
    addToCartBtn.addEventListener('touchend', (e) => {
        if (didMove) return;
        e.preventDefault();
        openProductFromCard(e);
    }, { passive: false });
    
    // On homepage cards, open product popup when clicking card content too.
    card.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart-btn')) return;
        openProductFromCard(e);
    });
    
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
        const discountRate = product.id === 11 ? 0 : 0.20; // Classic Chicken has no discount
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
            const hasSelectedDrink = item.selectedDrink && item.selectedDrink.name;
            const hasWingFrenzyFlavors = item.wing1Flavor && item.wing2Flavor;
            const hasLoadedFries = item.loadedFries;
            const hasZoroForTwoSelections = (item.burger1 && item.burger2) || (item.selectedBurger && (item.drink1 || item.drink2));
            const hasZoroForFourSelections = item.id === 101 && (
                item.beefBurger1 || item.beefBurger2 ||
                item.chickenBurger1 || item.chickenBurger2 ||
                item.drink1 || item.drink2 || item.drink3 || item.drink4 ||
                item.loadedFries
            );
            const hasDetails = hasSize || hasWingType || hasAddons || hasSelectedDrink || hasWingFrenzyFlavors || hasLoadedFries || hasZoroForTwoSelections || hasZoroForFourSelections;
            
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
            
            // Drink selection (e.g. Zoro For Four)
            const drinkDetail = hasSelectedDrink ? `
                <div class="cart-detail-label">Drink:</div>
                <div class="cart-detail-value">${item.selectedDrink.name}</div>
            ` : '';
            
            // Wing Frenzy flavours + loaded fries
            const wingFrenzyDetail = (hasWingFrenzyFlavors || hasLoadedFries) ? `
                ${hasWingFrenzyFlavors ? `
                <div class="cart-detail-label">Wing 1:</div>
                <div class="cart-detail-value">${item.wing1Flavor}</div>
                <div class="cart-detail-label">Wing 2:</div>
                <div class="cart-detail-value">${item.wing2Flavor}</div>
                ` : ''}
                ${hasLoadedFries ? `
                <div class="cart-detail-label">Loaded Fries:</div>
                <div class="cart-detail-value">${item.loadedFries}</div>
                ` : ''}
            ` : '';
            
            // Zoro For Two: 2 burgers + 2 drinks
            const zoroForTwoDetail = hasZoroForTwoSelections ? `
                ${item.burger1 ? `<div class="cart-detail-label">Burger 1:</div><div class="cart-detail-value">${item.burger1.name}</div>` : ''}
                ${item.burger2 ? `<div class="cart-detail-label">Burger 2:</div><div class="cart-detail-value">${item.burger2.name}</div>` : ''}
                ${item.selectedBurger && !item.burger1 ? `<div class="cart-detail-label">Burger:</div><div class="cart-detail-value">${item.selectedBurger.name}</div>` : ''}
                ${item.drink1 ? `<div class="cart-detail-label">Drink 1:</div><div class="cart-detail-value">${item.drink1.name}</div>` : ''}
                ${item.drink2 ? `<div class="cart-detail-label">Drink 2:</div><div class="cart-detail-value">${item.drink2.name}</div>` : ''}
            ` : '';
            
            // Zoro For Four: 2 beef burgers, 2 chicken burgers, loaded fries, 4 drinks
            const zoroForFourDetail = hasZoroForFourSelections ? `
                ${item.beefBurger1 ? `<div class="cart-detail-label">Beef Burger 1:</div><div class="cart-detail-value">${item.beefBurger1.name}</div>` : ''}
                ${item.beefBurger2 ? `<div class="cart-detail-label">Beef Burger 2:</div><div class="cart-detail-value">${item.beefBurger2.name}</div>` : ''}
                ${item.chickenBurger1 ? `<div class="cart-detail-label">Chicken Burger 1:</div><div class="cart-detail-value">${item.chickenBurger1.name}</div>` : ''}
                ${item.chickenBurger2 ? `<div class="cart-detail-label">Chicken Burger 2:</div><div class="cart-detail-value">${item.chickenBurger2.name}</div>` : ''}
                ${item.loadedFries ? `<div class="cart-detail-label">Loaded Fries:</div><div class="cart-detail-value">${item.loadedFries}</div>` : ''}
                ${item.drink1 ? `<div class="cart-detail-label">Drink 1:</div><div class="cart-detail-value">${item.drink1.name}</div>` : ''}
                ${item.drink2 ? `<div class="cart-detail-label">Drink 2:</div><div class="cart-detail-value">${item.drink2.name}</div>` : ''}
                ${item.drink3 ? `<div class="cart-detail-label">Drink 3:</div><div class="cart-detail-value">${item.drink3.name}</div>` : ''}
                ${item.drink4 ? `<div class="cart-detail-label">Drink 4:</div><div class="cart-detail-value">${item.drink4.name}</div>` : ''}
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
                        ${drinkDetail}
                        ${wingFrenzyDetail}
                        ${zoroForTwoDetail}
                        ${zoroForFourDetail}
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
    console.log('toggleCart called');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    console.log('Cart elements:', { cartSidebar: !!cartSidebar, cartOverlay: !!cartOverlay });
    if (cartSidebar) {
        cartSidebar.classList.toggle('active');
        console.log('Cart sidebar active:', cartSidebar.classList.contains('active'));
    }
    if (cartOverlay) {
        cartOverlay.classList.toggle('active');
        console.log('Cart overlay active:', cartOverlay.classList.contains('active'));
    }
}

// Make toggleCart globally accessible
window.toggleCart = toggleCart;

// Show Product Modal
function showProductModal(product) {
    if (typeof ZoroBranchRestrictions !== 'undefined') {
        const code = localStorage.getItem('selectedBranch');
        if (ZoroBranchRestrictions.isIsbOrKarachiLocalBranchCode(code) && ZoroBranchRestrictions.isProductUnavailableAtIsbKarachi(product)) {
            alert('Truffle Royal, Loaded Fries, Premium Shakes, and desserts are not available at Islamabad and Karachi branches. Please choose another branch from the home page, or select a Lahore branch at checkout.');
            return;
        }
    }
    // Zoro For Four: show drink selection modal instead of adding directly
    if (product.id === 101) {
        showSoloIftaarDrinkModal(product);
        return;
    }
    // Wing Frenzy: show flavor selection modal for 2 wings
    if (product.id === 102) {
        showWingFrenzyModal(product);
        return;
    }
    // Zoro For Two: select 1 burger + 2 drinks
    if (product.id === 103) {
        showZoroForTwoModal(product);
        return;
    }
    const isCustomMealCombo = !!product.isCombo && ![101, 102, 103].includes(product.id);
    const isBeefMealCombo = product.category === 'beef-smasher-meals';

    // Other combos: add directly to cart
    if (product.isCombo && !isCustomMealCombo && typeof addComboToCart === 'function') {
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
        const discountRate = product.id === 11 ? 0 : 0.20; // Classic Chicken has no discount
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
    const isBurger = !isWings && !isChickenCrunchers && !isShakes && !isCustomMealCombo && product.category && (product.category.includes('beef') || product.category.includes('chicken'));
    let sizes;
    
    if (isCustomMealCombo) {
        sizes = isBeefMealCombo ? [
            { name: 'Single Patty', originalPrice: 1585, price: 1195 },
            { name: 'Double Patty', originalPrice: 1985, price: 1595 },
            { name: 'Triple Patty', originalPrice: 2385, price: 1995 }
        ] : [
            { name: 'Single Patty', originalPrice: 1585, price: 1195 },
            { name: 'Double Patty', originalPrice: 1985, price: 1595 }
        ];
    } else if (isShakes) {
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
        // Roost (id 14): Single 895, Double 1295, No Triple
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
                // Roost: Single 895, Double 1295
                singleOriginal = 895;
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
    const baseAddons = isCustomMealCombo ? [
        { name: 'Plain Fries', price: 0 },
        { name: 'Spicy Fries', price: 4 }
    ] : (isBeef || isChicken) && !isWings ? [
        { name: 'Pickles', price: 195 },
        { name: 'Onions', price: 195 },
        { name: 'Pickled Red Onions', price: 195 },
        { name: 'Tomatoes', price: 195 },
        { name: 'Crispy Onions', price: 195 },
        { name: 'Cheese Slice', price: 195 },
        { name: 'Bacon', price: 195 },
        { name: 'Lettuce', price: 195 },
        { name: 'Grilled Onions', price: 195 },
        { name: 'Nachos', price: 195 },
        { name: 'Jalapenos', price: 195 }
    ] : [];

    const addonDiscountRate = APPLY_DISCOUNTS ? (basePricing.discountRate || 0.20) : 0;
    const addons = baseAddons.map((addon) => {
        const discountedPrice = APPLY_DISCOUNTS
            ? Math.round(addon.price * (1 - addonDiscountRate))
            : addon.price;
        return {
            ...addon,
            originalPrice: addon.price,
            price: discountedPrice
        };
    });
    
    // Build add-ons HTML
    const drinks = isCustomMealCombo ? [
        { name: 'Coke' },
        { name: 'Sprite' },
        { name: 'Fanta' },
        { name: 'Coke Zero' },
        { name: 'Sprite Zero' }
    ] : [];

    const addonsHTML = addons.map(addon => {
        const showAddonDiscount = APPLY_DISCOUNTS && addon.originalPrice > addon.price;
        return `
        <div class="addon-option ${isCustomMealCombo && addon.name === 'Plain Fries' ? 'selected' : ''}" data-addon="${addon.name}" data-price="${addon.price}" data-original-price="${addon.originalPrice}">
            <div class="addon-name">${addon.name}</div>
            <div class="addon-price">
                ${Number(addon.price) > 0 ? (showAddonDiscount
                    ? `<span style="text-decoration: line-through; color: #999; margin-right: 0.35rem;">Rs ${addon.originalPrice}</span><span style="color: var(--primary-color); font-weight: 700;">Rs ${addon.price}</span>`
                    : `Rs ${addon.price}`
                ) : ''}
            </div>
        </div>
    `;
    }).join('');

    const drinksHTML = drinks.map((drink, index) => `
        <div class="size-option drink-option ${index === 0 ? 'selected' : ''}" data-drink="${drink.name}">
            <span class="size-option-name">${drink.name}</span>
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
                    <div class="modal-section-title">${isCustomMealCombo ? 'Pick Patty Option' : 'Pick Size'}</div>
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
                    <div class="modal-section-title">${isCustomMealCombo ? 'Fries Option' : 'Add Ons'}</div>
                    <div class="modal-section-required">${isCustomMealCombo ? 'Required' : 'Optional'}</div>
                </div>
                <div class="addons-grid">
                    ${addonsHTML}
                </div>
            </div>
            ` : ''}

            ${isCustomMealCombo && drinks.length > 0 ? `
            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Choose Drink</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="size-options">
                    ${drinksHTML}
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
            const selectedSize = document.querySelector('.size-option:not(.wing-type-option):not(.drink-option).selected');
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
    document.querySelectorAll('.size-option:not(.wing-type-option):not(.drink-option)').forEach(option => {
        option.addEventListener('click', function() {
            // Only deselect other size options (not wing type options)
            document.querySelectorAll('.size-option:not(.wing-type-option):not(.drink-option)').forEach(opt => opt.classList.remove('selected'));
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
                const selectedSize = document.querySelector('.size-option:not(.wing-type-option):not(.drink-option).selected');
                if (selectedSize && window.updateWingPrice) {
                    window.updateWingPrice();
                }
            });
        });
    }
    
    // Add event listeners for add-ons
    document.querySelectorAll('.addon-option').forEach(option => {
        option.addEventListener('click', function() {
            if (isCustomMealCombo) {
                document.querySelectorAll('.addon-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                return;
            }
            this.classList.toggle('selected');
        });
    });

    document.querySelectorAll('.drink-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.drink-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
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

// Zoro For Four: modal to select 2 beef burgers, 2 chicken burgers, loaded fries and 4 drinks
function showSoloIftaarDrinkModal(product) {
    console.log('showSoloIftaarDrinkModal (Zoro For Four) called for:', product);
    const allProducts = typeof products !== 'undefined' ? products : (window.products || []);

    // Burger name lists for this deal
    const CHICKEN_BURGERS = ['Pepper Chicken', 'Roost', 'Tangy Crunch'];
    const BEEF_BURGERS = ['Classic American', 'Big Ben', 'Onion Melt', 'Frankie'];

    const chickenBurgers = allProducts.filter(p => CHICKEN_BURGERS.includes(p.name));
    const beefBurgers = allProducts.filter(p => BEEF_BURGERS.includes(p.name));
    const drinks = allProducts.filter(p => p.category === 'soft-drinks' && p.name !== 'Dasani Water');

    const LOADED_FRIES = ['French Truffle', 'Chicken Parma', 'Funky Cheese', 'Philly Cheese'];

    const pricing = typeof getDiscountedPrice === 'function'
        ? getDiscountedPrice(product)
        : { discounted: product.discountedPrice != null ? product.discountedPrice : product.price };
    const discountedPrice = pricing.discounted;

    const burgerOption = (b, groupId) => `
        <div class="zoro-burger-option" data-burger-id="${b.id}" data-burger-name="${b.name.replace(/"/g, '&quot;')}" data-group="${groupId}">
            <div class="wing-flavor-name">${b.name}</div>
        </div>
    `;
    const drinkOption = (d, groupId) => `
        <div class="zoro-drink-option" data-drink-id="${d.id}" data-drink-name="${d.name.replace(/"/g, '&quot;')}" data-group="${groupId}">
            <div class="wing-flavor-name">${d.name}</div>
        </div>
    `;
    const loadedFriesOption = (name) => `
        <div class="zoro-loaded-option" data-loaded-name="${name.replace(/"/g, '&quot;')}">
            <div class="wing-flavor-name">${name}</div>
        </div>
    `;

    const beef1Options = beefBurgers.map(b => burgerOption(b, 'beef1')).join('');
    const beef2Options = beefBurgers.map(b => burgerOption(b, 'beef2')).join('');
    const chicken1Options = chickenBurgers.map(b => burgerOption(b, 'chicken1')).join('');
    const chicken2Options = chickenBurgers.map(b => burgerOption(b, 'chicken2')).join('');

    const loadedFriesOptions = LOADED_FRIES.map(name => loadedFriesOption(name)).join('');

    const drink1Options = drinks.map(d => drinkOption(d, 'drink1')).join('');
    const drink2Options = drinks.map(d => drinkOption(d, 'drink2')).join('');
    const drink3Options = drinks.map(d => drinkOption(d, 'drink3')).join('');
    const drink4Options = drinks.map(d => drinkOption(d, 'drink4')).join('');

    const modalBody = document.getElementById('modalBody');
    if (!modalBody) {
        console.error('modalBody not found!');
        return;
    }

    modalBody.innerHTML = `
        <div class="modal-image-container">
            <img src="${product.image}" alt="${product.name}" class="modal-image" onerror="this.src='https://via.placeholder.com/600x300?text=Zoro+For+Four'">
        </div>
        <div class="modal-options">
            <div class="modal-options-header">
                <div class="modal-category">Ramadan Deals</div>
                <h2 class="modal-product-name">${product.name}</h2>
                <p class="modal-product-description">${product.description}</p>
                <p class="modal-price">Rs ${discountedPrice.toLocaleString()}</p>
            </div>

            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Beef Burger 1 – Choose your single patty burger</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="wing-flavor-options-grid zoro-burger-grid">
                    ${beef1Options}
                </div>
            </div>

            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Beef Burger 2 – Choose your single patty burger</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="wing-flavor-options-grid zoro-burger-grid">
                    ${beef2Options}
                </div>
            </div>

            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Chicken Burger 1 – Choose your single patty burger</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="wing-flavor-options-grid zoro-burger-grid">
                    ${chicken1Options}
                </div>
            </div>

            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Chicken Burger 2 – Choose your single patty burger</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="wing-flavor-options-grid zoro-burger-grid">
                    ${chicken2Options}
                </div>
            </div>

            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Loaded Fries – Choose your flavour</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="wing-flavor-options-grid">
                    ${loadedFriesOptions}
                </div>
            </div>

            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Drink 1</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="wing-flavor-options-grid">
                    ${drink1Options}
                </div>
            </div>

            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Drink 2</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="wing-flavor-options-grid">
                    ${drink2Options}
                </div>
            </div>

            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Drink 3</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="wing-flavor-options-grid">
                    ${drink3Options}
                </div>
            </div>

            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Drink 4</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="wing-flavor-options-grid">
                    ${drink4Options}
                </div>
            </div>

            <div class="quantity-controls">
                <div class="quantity-selector">
                    <button class="quantity-btn" id="zoro4DecreaseQty" type="button">−</button>
                    <span class="quantity-value" id="zoro4QuantityValue">1</span>
                    <button class="quantity-btn" id="zoro4IncreaseQty" type="button">+</button>
                </div>
                <button class="add-to-cart-modal-btn" id="addZoroForFourToCartBtn" type="button" disabled>
                    Add to Cart
                </button>
            </div>
        </div>
    `;

    let beefBurger1 = null;
    let beefBurger2 = null;
    let chickenBurger1 = null;
    let chickenBurger2 = null;
    let loadedFries = null;
    let drink1 = null;
    let drink2 = null;
    let drink3 = null;
    let drink4 = null;
    let quantity = 1;

    const updateAddButton = () => {
        const btn = modalBody.querySelector('#addZoroForFourToCartBtn');
        if (!btn) return;
        const allSelected = beefBurger1 && beefBurger2 && chickenBurger1 && chickenBurger2 &&
            loadedFries && drink1 && drink2 && drink3 && drink4;
        btn.disabled = !allSelected;
    };

    modalBody.querySelectorAll('.zoro-burger-option').forEach(el => {
        el.addEventListener('click', function() {
            const group = this.dataset.group;
            const burgerId = parseInt(this.dataset.burgerId);
            const burgerName = this.dataset.burgerName;

            modalBody.querySelectorAll(`.zoro-burger-option[data-group="${group}"]`).forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');

            const value = { id: burgerId, name: burgerName };
            if (group === 'beef1') beefBurger1 = value;
            else if (group === 'beef2') beefBurger2 = value;
            else if (group === 'chicken1') chickenBurger1 = value;
            else if (group === 'chicken2') chickenBurger2 = value;

            updateAddButton();
        });
    });

    modalBody.querySelectorAll('.zoro-loaded-option').forEach(el => {
        el.addEventListener('click', function() {
            modalBody.querySelectorAll('.zoro-loaded-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            loadedFries = { name: this.dataset.loadedName || '' };
            updateAddButton();
        });
    });

    modalBody.querySelectorAll('.zoro-drink-option').forEach(el => {
        el.addEventListener('click', function() {
            const group = this.dataset.group;
            const drinkId = parseInt(this.dataset.drinkId);
            const drinkName = this.dataset.drinkName;

            modalBody.querySelectorAll(`.zoro-drink-option[data-group="${group}"]`).forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');

            const value = { id: drinkId, name: drinkName };
            if (group === 'drink1') drink1 = value;
            else if (group === 'drink2') drink2 = value;
            else if (group === 'drink3') drink3 = value;
            else if (group === 'drink4') drink4 = value;

            updateAddButton();
        });
    });

    modalBody.querySelector('#zoro4DecreaseQty').addEventListener('click', () => {
        quantity = Math.max(1, quantity - 1);
        modalBody.querySelector('#zoro4QuantityValue').textContent = quantity;
    });
    modalBody.querySelector('#zoro4IncreaseQty').addEventListener('click', () => {
        quantity += 1;
        modalBody.querySelector('#zoro4QuantityValue').textContent = quantity;
    });

    modalBody.querySelector('#addZoroForFourToCartBtn').addEventListener('click', () => {
        if (!(beefBurger1 && beefBurger2 && chickenBurger1 && chickenBurger2 &&
            loadedFries && drink1 && drink2 && drink3 && drink4)) {
            return;
        }
        addZoroForFourToCartWithSelections(
            product,
            { beefBurger1, beefBurger2, chickenBurger1, chickenBurger2, loadedFries, drink1, drink2, drink3, drink4 },
            quantity
        );
        closeProductModal();
    });

    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
        closeModal.onclick = () => closeProductModal();
    }

    const productModal = document.getElementById('productModal');
    if (productModal) {
        productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        console.error('Product modal not found!');
    }
}

function addZoroForFourToCartWithSelections(product, selections, quantity) {
    const pricing = typeof getDiscountedPrice === 'function'
        ? getDiscountedPrice(product)
        : { discounted: product.discountedPrice != null ? product.discountedPrice : product.price };

    const {
        beefBurger1, beefBurger2,
        chickenBurger1, chickenBurger2,
        loadedFries,
        drink1, drink2, drink3, drink4
    } = selections;

    const itemKey = `101-combo-${beefBurger1.id}-${beefBurger2.id}-${chickenBurger1.id}-${chickenBurger2.id}-${loadedFries.name}-${drink1.id}-${drink2.id}-${drink3.id}-${drink4.id}`;

    const existingIndex = cart.findIndex(item =>
        item.key === itemKey ||
        (item.id === 101 &&
            item.beefBurger1 && item.beefBurger1.id === beefBurger1.id &&
            item.beefBurger2 && item.beefBurger2.id === beefBurger2.id &&
            item.chickenBurger1 && item.chickenBurger1.id === chickenBurger1.id &&
            item.chickenBurger2 && item.chickenBurger2.id === chickenBurger2.id &&
            item.loadedFries && item.loadedFries === loadedFries.name &&
            item.drink1 && item.drink1.id === drink1.id &&
            item.drink2 && item.drink2.id === drink2.id &&
            item.drink3 && item.drink3.id === drink3.id &&
            item.drink4 && item.drink4.id === drink4.id)
    );

    if (existingIndex >= 0) {
        cart[existingIndex].quantity += quantity;
        cart[existingIndex].total = pricing.discounted * cart[existingIndex].quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            image: product.image,
            category: product.category,
            price: pricing.discounted,
            originalPrice: pricing.original != null ? pricing.original : product.price,
            quantity: quantity,
            key: itemKey,
            total: pricing.discounted * quantity,
            isCombo: true,
            beefBurger1: { id: beefBurger1.id, name: beefBurger1.name },
            beefBurger2: { id: beefBurger2.id, name: beefBurger2.name },
            chickenBurger1: { id: chickenBurger1.id, name: chickenBurger1.name },
            chickenBurger2: { id: chickenBurger2.id, name: chickenBurger2.name },
            loadedFries: loadedFries.name,
            drink1: { id: drink1.id, name: drink1.name },
            drink2: { id: drink2.id, name: drink2.name },
            drink3: { id: drink3.id, name: drink3.name },
            drink4: { id: drink4.id, name: drink4.name }
        });
    }
    if (typeof saveCart === 'function') saveCart();
    if (typeof updateCartUI === 'function') updateCartUI();
    if (typeof showCartNotification === 'function') showCartNotification('Zoro For Four added to cart!');
}

// Wing Frenzy flavor options
const WING_FRENZY_FLAVORS = ['Carolina Reaper', 'Korean BBQ', 'Buffalo', 'Thai'];
const WING_FRENZY_LOADED_FRIES = ['French Truffle', 'Chicken Parma', 'Funky Cheese', 'Philly Cheese'];

// Wing Frenzy: modal to select flavor for each of 2 wings + loaded fries
function showWingFrenzyModal(product) {
    const pricing = typeof getDiscountedPrice === 'function' ? getDiscountedPrice(product) : { discounted: product.discountedPrice != null ? product.discountedPrice : product.price };
    const discountedPrice = pricing.discounted;

    const flavorOption = (name, groupId) => `
        <div class="wing-flavor-option" data-flavor="${name.replace(/"/g, '&quot;')}" data-group="${groupId}">
            <div class="wing-flavor-name">${name}</div>
        </div>
    `;
    const wing1Options = WING_FRENZY_FLAVORS.map(f => flavorOption(f, 'wing1')).join('');
    const wing2Options = WING_FRENZY_FLAVORS.map(f => flavorOption(f, 'wing2')).join('');
    const loadedFriesOptions = WING_FRENZY_LOADED_FRIES.map(f => flavorOption(f, 'loadedFries')).join('');

    const modalBody = document.getElementById('modalBody');
    if (!modalBody) return;
    modalBody.innerHTML = `
        <div class="modal-image-container">
            <img src="${product.image}" alt="${product.name}" class="modal-image" onerror="this.src='https://via.placeholder.com/600x300?text=Wing+Frenzy'">
        </div>
        <div class="modal-options">
            <div class="modal-options-header">
                <div class="modal-category">Ramadan Deals</div>
                <h2 class="modal-product-name">${product.name}</h2>
                <p class="modal-product-description">${product.description}</p>
                <p class="modal-price">Rs ${discountedPrice.toLocaleString()}</p>
            </div>
            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Wing 1 – Choose flavour</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="wing-flavor-options-grid">
                    ${wing1Options}
                </div>
            </div>
            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Wing 2 – Choose flavour</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="wing-flavor-options-grid">
                    ${wing2Options}
                </div>
            </div>
            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Choose your loaded fries</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="wing-flavor-options-grid">
                    ${loadedFriesOptions}
                </div>
            </div>
            <div class="quantity-controls">
                <div class="quantity-selector">
                    <button class="quantity-btn" id="wingFrenzyDecreaseQty" type="button">−</button>
                    <span class="quantity-value" id="wingFrenzyQuantityValue">1</span>
                    <button class="quantity-btn" id="wingFrenzyIncreaseQty" type="button">+</button>
                </div>
                <button class="add-to-cart-modal-btn" id="addWingFrenzyToCartBtn" type="button" disabled>
                    Add to Cart
                </button>
            </div>
        </div>
    `;

    let wing1Flavor = null;
    let wing2Flavor = null;
    let loadedFries = null;
    let quantity = 1;

    const updateAddButton = () => {
        const btn = modalBody.querySelector('#addWingFrenzyToCartBtn');
        if (btn) btn.disabled = !(wing1Flavor && wing2Flavor && loadedFries);
    };

    modalBody.querySelectorAll('.wing-flavor-option').forEach(el => {
        el.addEventListener('click', function() {
            const group = this.dataset.group;
            const flavor = this.dataset.flavor;
            modalBody.querySelectorAll(`.wing-flavor-option[data-group="${group}"]`).forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            if (group === 'wing1') wing1Flavor = flavor;
            else if (group === 'wing2') wing2Flavor = flavor;
            else if (group === 'loadedFries') loadedFries = flavor;
            updateAddButton();
        });
    });

    modalBody.querySelector('#wingFrenzyDecreaseQty').addEventListener('click', () => {
        quantity = Math.max(1, quantity - 1);
        modalBody.querySelector('#wingFrenzyQuantityValue').textContent = quantity;
    });
    modalBody.querySelector('#wingFrenzyIncreaseQty').addEventListener('click', () => {
        quantity += 1;
        modalBody.querySelector('#wingFrenzyQuantityValue').textContent = quantity;
    });

    modalBody.querySelector('#addWingFrenzyToCartBtn').addEventListener('click', () => {
        if (!wing1Flavor || !wing2Flavor || !loadedFries) return;
        addWingFrenzyToCartWithFlavors(product, wing1Flavor, wing2Flavor, loadedFries, quantity);
        closeProductModal();
    });

    const closeModal = document.getElementById('closeModal');
    if (closeModal) closeModal.onclick = () => closeProductModal();

    const productModal = document.getElementById('productModal');
    if (productModal) {
        productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function addWingFrenzyToCartWithFlavors(product, wing1Flavor, wing2Flavor, loadedFries, quantity) {
    const pricing = typeof getDiscountedPrice === 'function' ? getDiscountedPrice(product) : { discounted: product.discountedPrice != null ? product.discountedPrice : product.price };
    const itemKey = `102-combo-${wing1Flavor}-${wing2Flavor}-${loadedFries}`.replace(/\s+/g, '-');
    const existingIndex = cart.findIndex(item => item.key === itemKey || (item.id === 102 && item.wing1Flavor === wing1Flavor && item.wing2Flavor === wing2Flavor && item.loadedFries === loadedFries));
    if (existingIndex >= 0) {
        cart[existingIndex].quantity += quantity;
        cart[existingIndex].total = pricing.discounted * cart[existingIndex].quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            image: product.image,
            category: product.category,
            price: pricing.discounted,
            originalPrice: pricing.original != null ? pricing.original : product.price,
            quantity: quantity,
            key: itemKey,
            total: pricing.discounted * quantity,
            isCombo: true,
            wing1Flavor: wing1Flavor,
            wing2Flavor: wing2Flavor,
            loadedFries: loadedFries
        });
    }
    if (typeof saveCart === 'function') saveCart();
    if (typeof updateCartUI === 'function') updateCartUI();
    if (typeof showCartNotification === 'function') showCartNotification('Wing Frenzy added to cart!');
}

// Zoro For Two: allowed single patty burgers (by name)
const ZORO_FOR_TWO_BURGER_NAMES = [
    'Classic American',
'Big Ben',
'Onion Melt', 
'Frankie',
'Pepper Chicken',
'Roost',
'Tangy Crunch'
];

// Zoro For Two: modal to select 1 burger + 2 drinks
function showZoroForTwoModal(product) {
    const allProducts = typeof products !== 'undefined' ? products : (window.products || []);
    const burgers = allProducts.filter(p => ZORO_FOR_TWO_BURGER_NAMES.includes(p.name));
    const drinks = allProducts.filter(p => p.category === 'soft-drinks' && p.name !== 'Dasani Water');

    const pricing = typeof getDiscountedPrice === 'function' ? getDiscountedPrice(product) : { discounted: product.discountedPrice != null ? product.discountedPrice : product.price };
    const discountedPrice = pricing.discounted;

    const burgerOption = (b, groupId) => `
        <div class="zoro-burger-option" data-burger-id="${b.id}" data-burger-name="${b.name.replace(/"/g, '&quot;')}" data-group="${groupId}">
            <div class="wing-flavor-name">${b.name}</div>
        </div>
    `;
    const burger1Options = burgers.map(b => burgerOption(b, 'burger1')).join('');
    const burger2Options = burgers.map(b => burgerOption(b, 'burger2')).join('');

    const drinkOption = (d, groupId) => `
        <div class="zoro-drink-option" data-drink-id="${d.id}" data-drink-name="${d.name.replace(/"/g, '&quot;')}" data-group="${groupId}">
            <div class="wing-flavor-name">${d.name}</div>
        </div>
    `;
    const drink1Options = drinks.map(d => drinkOption(d, 'drink1')).join('');
    const drink2Options = drinks.map(d => drinkOption(d, 'drink2')).join('');

    const modalBody = document.getElementById('modalBody');
    if (!modalBody) return;
    modalBody.innerHTML = `
        <div class="modal-image-container">
            <img src="${product.image}" alt="${product.name}" class="modal-image" onerror="this.src='https://via.placeholder.com/600x300?text=Zoro+For+Two'">
        </div>
        <div class="modal-options">
            <div class="modal-options-header">
                <div class="modal-category">Ramadan Deals</div>
                <h2 class="modal-product-name">${product.name}</h2>
                <p class="modal-product-description">${product.description}</p>
                <p class="modal-price">Rs ${discountedPrice.toLocaleString()}</p>
            </div>
            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Burger 1 – Choose your single patty burger</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="wing-flavor-options-grid zoro-burger-grid">
                    ${burger1Options}
                </div>
            </div>
            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Burger 2 – Choose your single patty burger</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="wing-flavor-options-grid zoro-burger-grid">
                    ${burger2Options}
                </div>
            </div>
            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Drink 1</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="wing-flavor-options-grid">
                    ${drink1Options}
                </div>
            </div>
            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Drink 2</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="wing-flavor-options-grid">
                    ${drink2Options}
                </div>
            </div>
            <div class="quantity-controls">
                <div class="quantity-selector">
                    <button class="quantity-btn" id="zoroDecreaseQty" type="button">−</button>
                    <span class="quantity-value" id="zoroQuantityValue">1</span>
                    <button class="quantity-btn" id="zoroIncreaseQty" type="button">+</button>
                </div>
                <button class="add-to-cart-modal-btn" id="addZoroForTwoToCartBtn" type="button" disabled>
                    Add to Cart
                </button>
            </div>
        </div>
    `;

    let burger1 = null;
    let burger2 = null;
    let drink1 = null;
    let drink2 = null;
    let quantity = 1;

    const updateAddButton = () => {
        const btn = modalBody.querySelector('#addZoroForTwoToCartBtn');
        if (btn) btn.disabled = !(burger1 && burger2 && drink1 && drink2);
    };

    modalBody.querySelectorAll('.zoro-burger-option').forEach(el => {
        el.addEventListener('click', function() {
            const group = this.dataset.group;
            const burgerId = parseInt(this.dataset.burgerId);
            const burgerName = this.dataset.burgerName;
            modalBody.querySelectorAll(`.zoro-burger-option[data-group="${group}"]`).forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            if (group === 'burger1') burger1 = { id: burgerId, name: burgerName };
            else burger2 = { id: burgerId, name: burgerName };
            updateAddButton();
        });
    });

    modalBody.querySelectorAll('.zoro-drink-option').forEach(el => {
        el.addEventListener('click', function() {
            const group = this.dataset.group;
            const drinkId = parseInt(this.dataset.drinkId);
            const drinkName = this.dataset.drinkName;
            modalBody.querySelectorAll(`.zoro-drink-option[data-group="${group}"]`).forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            if (group === 'drink1') drink1 = { id: drinkId, name: drinkName };
            else drink2 = { id: drinkId, name: drinkName };
            updateAddButton();
        });
    });

    modalBody.querySelector('#zoroDecreaseQty').addEventListener('click', () => {
        quantity = Math.max(1, quantity - 1);
        modalBody.querySelector('#zoroQuantityValue').textContent = quantity;
    });
    modalBody.querySelector('#zoroIncreaseQty').addEventListener('click', () => {
        quantity += 1;
        modalBody.querySelector('#zoroQuantityValue').textContent = quantity;
    });

    modalBody.querySelector('#addZoroForTwoToCartBtn').addEventListener('click', () => {
        if (!burger1 || !burger2 || !drink1 || !drink2) return;
        addZoroForTwoToCartWithSelections(product, burger1, burger2, drink1, drink2, quantity);
        closeProductModal();
    });

    const closeModal = document.getElementById('closeModal');
    if (closeModal) closeModal.onclick = () => closeProductModal();

    const productModal = document.getElementById('productModal');
    if (productModal) {
        productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function addZoroForTwoToCartWithSelections(product, burger1, burger2, drink1, drink2, quantity) {
    const pricing = typeof getDiscountedPrice === 'function' ? getDiscountedPrice(product) : { discounted: product.discountedPrice != null ? product.discountedPrice : product.price };
    const itemKey = `103-combo-${burger1.id}-${burger2.id}-${drink1.id}-${drink2.id}`;
    const existingIndex = cart.findIndex(item => item.key === itemKey || (item.id === 103 && item.burger1 && item.burger1.id === burger1.id && item.burger2 && item.burger2.id === burger2.id && item.drink1 && item.drink1.id === drink1.id && item.drink2 && item.drink2.id === drink2.id));
    if (existingIndex >= 0) {
        cart[existingIndex].quantity += quantity;
        cart[existingIndex].total = pricing.discounted * cart[existingIndex].quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            image: product.image,
            category: product.category,
            price: pricing.discounted,
            originalPrice: pricing.original != null ? pricing.original : product.price,
            quantity: quantity,
            key: itemKey,
            total: pricing.discounted * quantity,
            isCombo: true,
            burger1: { id: burger1.id, name: burger1.name },
            burger2: { id: burger2.id, name: burger2.name },
            drink1: { id: drink1.id, name: drink1.name },
            drink2: { id: drink2.id, name: drink2.name }
        });
    }
    if (typeof saveCart === 'function') saveCart();
    if (typeof updateCartUI === 'function') updateCartUI();
    if (typeof showCartNotification === 'function') showCartNotification('Zoro For Two added to cart!');
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
    const isCustomMealCombo = !!product.isCombo && ![101, 102, 103].includes(product.id);
    
    // Get selected size (for wings, this is the piece count)
    const selectedSize = document.querySelector('.size-option:not(.wing-type-option):not(.drink-option).selected');
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

    let selectedDrink = null;
    if (isCustomMealCombo) {
        if (selectedAddons.length === 0) {
            alert('Please select fries');
            return;
        }
        const selectedDrinkOption = document.querySelector('.drink-option.selected');
        if (!selectedDrinkOption) {
            alert('Please select a drink');
            return;
        }
        selectedDrink = selectedDrinkOption.dataset.drink;
    }
    
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
    if (isCustomMealCombo && selectedDrink) {
        cartItem.drink = selectedDrink;
        cartItem.selectedDrink = { name: selectedDrink };
        cartItem.isCombo = true;
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
    const hasCustomMealDrink = !!(item.drink || (item.selectedDrink && item.selectedDrink.name));
    const mealDrinkName = item.drink || (item.selectedDrink && item.selectedDrink.name) || '';
    const itemKey = isWings 
        ? `${item.id}-${item.size}-${item.wingType}`
        : hasCustomMealDrink
            ? `${item.id}-${item.size}-${mealDrinkName}-${(item.addons || []).map(a => a.name).join(',')}`
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
