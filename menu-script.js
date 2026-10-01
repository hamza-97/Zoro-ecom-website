// Products Data organized according to the current in-store menu (JT panels)
// Make products globally accessible
const products = [
    // SMASH BEEF BURGERS
    {
        id: 63,
        name: 'No Brainer',
        category: 'beef-smashers',
        price: 795,
        image: 'ZoroImages/NoBrainer.png',
        description: 'Beef Patty, Onions, Pickles, Ketchup, Mustard'
    },
    {
        id: 8,
        name: 'Bangkok',
        category: 'beef-smashers',
        price: 995,
        image: 'ZoroImages/Bangkok.png',
        description: 'Beef Patty, Lettuce, Jalapenos, Cheese, Onions, Chilli Mayo'
    },
    {
        id: 1,
        name: 'Classic American',
        category: 'beef-smashers',
        price: 995,
        image: 'ZoroImages/ClassicAmerican.png',
        description: 'Beef Patty, Pickles, Onions, Cheese, Ketchup, Mayo'
    },
    {
        id: 2,
        name: 'Onion Melt',
        category: 'beef-smashers',
        price: 995,
        image: 'ZoroImages/OnionMelt.png',
        description: 'Beef Patty, Grilled Onions, Cheese, Lettuce, Crispy Onions, Garlic Aioli'
    },
    {
        id: 4,
        name: 'Big Ben',
        category: 'beef-smashers',
        price: 995,
        image: 'ZoroImages/BigBen.png',
        description: 'Beef Patty, Grilled Onions, Cheese, Onions, Crispy Onions, Jalapeno Mayo'
    },
    {
        id: 9,
        name: 'Bacon n Cheese',
        category: 'beef-smashers',
        price: 1095,
        image: 'ZoroImages/BltClassic.png',
        description: 'Beef Patty, Bacon, Lettuce, Tomatoes, Cheese, Ketchup, Mustard, Mayo'
    },
    {
        id: 10,
        name: 'Cheesy Mushroom',
        category: 'beef-smashers',
        price: 1095,
        image: 'ZoroImages/SwissMushroom.png',
        description: 'Beef Patty, Cheesy Mushroom Sauce, Mayo, Cheese'
    },

    // CHICKEN BURGERS
    {
        id: 11,
        name: 'Classic Chicken',
        category: 'chicken-burgers',
        price: 695,
        image: 'ZoroImages/ClassicChicken.png',
        description: 'Chicken Patty, Cheese, Mayo, Lettuce'
    },
    {
        id: 14,
        name: 'Roost',
        category: 'chicken-burgers',
        price: 995,
        image: 'ZoroImages/Roost.png',
        description: 'Chicken Breast Fillet, Cheese, Lettuce, Mayo, Tomatoes'
    },
    {
        id: 17,
        name: 'Hellfire',
        category: 'chicken-burgers',
        price: 995,
        image: 'ZoroImages/Hellfire.png',
        description: 'Chicken Breast Fillet, Fiery Buffalo Sauce, Cheese, Lettuce, Chilli Mayo, Jalapenos'
    },
    {
        id: 16,
        name: 'Mexicana',
        category: 'chicken-burgers',
        price: 1095,
        image: 'ZoroImages/Mexicana.png',
        description: 'Chicken Breast Fillet, Nacho Chips, Lettuce, Jalapenos, Onions, Salsa Mayo, Cheese'
    },
    {
        id: 13,
        name: 'Tangy Crunch',
        category: 'chicken-burgers',
        price: 1095,
        image: 'ZoroImages/TangyCrunch.png',
        description: 'Chicken Breast Fillet, Coleslaw, Mayo, Honey Mustard'
    },

    // WINGS
    {
        id: 19,
        name: 'Korean BBQ Wings',
        category: 'wings',
        price: 695,
        image: 'ZoroImages/KoreanBbqWings.png',
        description: 'Crispy Chicken Wings glazed in Korean BBQ Sauce'
    },
    {
        id: 20,
        name: 'Spicy Buffalo Wings',
        category: 'wings',
        price: 695,
        image: 'ZoroImages/BuffaloWings.png',
        description: 'Crispy Chicken Wings tossed in Spicy Buffalo Sauce'
    },
    {
        id: 21,
        name: 'Thai Wings',
        category: 'wings',
        price: 695,
        image: 'ZoroImages/ThaiWings.png',
        description: 'Crispy Chicken Wings coated in Thai Sweet and Spicy Sauce'
    },

    // LOADED FRIES
    {
        id: 24,
        name: 'Funky Cheese',
        category: 'loaded-fries',
        price: 995,
        image: 'ZoroImages/FunkyCheeseLoadedFries.png',
        description: 'Chicken Cubes, Spicy Fries, Chilli Mayo, Cheese, Jalapenos'
    },
    {
        id: 25,
        name: 'Philly Cheese',
        category: 'loaded-fries',
        price: 995,
        image: 'ZoroImages/PhillyCheeseLoadedFries.png',
        description: 'Australian Beef Patty, Grilled Onions, Garlic Aioli, Cheese'
    },

    // TENDERS (3pc)
    {
        id: 64,
        name: 'Hot Take Tenders',
        category: 'tenders',
        hidden: true, // Launching next month - set to false (or remove) to go live
        price: 895,
        image: 'ZoroImages/ChickenCrunchers.png',
        description: '3 Crispy Chicken Tenders, Hot Take style'
    },
    {
        id: 65,
        name: 'Thai Tenders',
        category: 'tenders',
        hidden: true, // Launching next month - set to false (or remove) to go live
        price: 895,
        image: 'ZoroImages/ChickenCrunchers.png',
        description: '3 Crispy Chicken Tenders tossed in Thai Sweet and Spicy Sauce'
    },
    {
        id: 66,
        name: 'Korean BBQ Tenders',
        category: 'tenders',
        hidden: true, // Launching next month - set to false (or remove) to go live
        price: 895,
        image: 'ZoroImages/ChickenCrunchers.png',
        description: '3 Crispy Chicken Tenders glazed in Korean BBQ Sauce'
    },

    // SIDES
    {
        id: 27,
        name: 'Plain Fries',
        category: 'appetizers',
        price: 495,
        image: 'ZoroImages/PlainFries.png',
        description: 'Classic crispy golden fries'
    },
    {
        id: 28,
        name: 'Spicy Fries',
        category: 'appetizers',
        price: 545,
        image: 'ZoroImages/SpicyFries.png',
        description: 'Fries with a spicy kick'
    },
    {
        id: 26,
        name: 'Crunchers',
        category: 'appetizers',
        price: 595,
        image: 'ZoroImages/ChickenCrunchers.png',
        description: 'Crispy chicken bites perfect for sharing'
    },

    // MILK SHAKES (price = Regular, largePrice = Large)
    {
        id: 33,
        name: 'Oreo Crush',
        category: 'premium-shakes',
        price: 695,
        largePrice: 995,
        image: 'ZoroImages/OreoCrushShake.png',
        description: 'Creamy milkshake with crushed Oreo cookies'
    },
    {
        id: 34,
        name: 'Strawberry Oreo',
        category: 'premium-shakes',
        price: 795,
        largePrice: 1095,
        image: 'ZoroImages/StrawberryOreoShake.png',
        description: 'Strawberry shake with Oreo crumbles'
    },
    {
        id: 35,
        name: 'Caramel Walnut',
        category: 'premium-shakes',
        price: 795,
        largePrice: 1095,
        image: 'ZoroImages/CaramelWalnutShake.png',
        description: 'Rich caramel shake topped with crunchy walnuts'
    },
    {
        id: 36,
        name: 'Strawberry Pavlova',
        category: 'premium-shakes',
        price: 895,
        largePrice: 1195,
        image: 'ZoroImages/StrawberryPalovaShake.png',
        description: 'Delicious strawberry shake with pavlova crumbles'
    },
    {
        id: 39,
        name: 'Lotus Swirl',
        category: 'premium-shakes',
        price: 895,
        largePrice: 1195,
        image: 'ZoroImages/LotusSwirlShake.png',
        description: 'Biscoff lotus cookies blended into creamy perfection'
    },
    {
        id: 38,
        name: 'Hazel Dream',
        category: 'premium-shakes',
        price: 995,
        largePrice: 1295,
        image: 'ZoroImages/HazelDreamShake.png',
        description: 'Dreamy hazelnut shake that melts in your mouth'
    },

    // FUNNEL CAKES
    {
        id: 29,
        name: 'Plain Funnel Cake',
        category: 'desserts',
        price: 395,
        image: 'ZoroImages/PlainFunnelCake.png',
        description: 'Crispy Golden Canadian Funnel Cake topped with Vanilla Ice Cream'
    },
    {
        id: 30,
        name: 'Chocolate Funnel Cake',
        category: 'desserts',
        price: 495,
        image: 'ZoroImages/ChocolateFunnelCake.png',
        description: 'Crispy Golden Canadian Funnel Cake topped with Vanilla Ice Cream and Chocolate Sauce'
    },
    {
        id: 31,
        name: 'Strawberry Funnel Cake',
        category: 'desserts',
        price: 595,
        image: 'ZoroImages/StrawberryFunnelCake.png',
        description: 'Crispy Golden Canadian Funnel Cake topped with Vanilla Ice Cream and housemade Strawberry Sauce'
    },

    // DRINKS
    {
        id: 46,
        name: 'Water',
        category: 'soft-drinks',
        price: 125,
        image: 'ZoroImages/DasaniWater.png',
        description: 'Bottled water'
    },
    {
        id: 41,
        name: 'Coke',
        category: 'soft-drinks',
        price: 195,
        image: 'ZoroImages/Coke.png',
        description: 'Refreshing Coca-Cola'
    },
    {
        id: 42,
        name: 'Sprite',
        category: 'soft-drinks',
        price: 195,
        image: 'ZoroImages/Sprite.png',
        description: 'Crisp and refreshing Sprite'
    },
    {
        id: 43,
        name: 'Fanta',
        category: 'soft-drinks',
        price: 195,
        image: 'ZoroImages/Fanta.png',
        description: 'Fruity Fanta'
    }
];

// Hidden products (e.g. not launched yet) stay in the list above but are not shown or orderable
for (let i = products.length - 1; i >= 0; i--) {
    if (products[i].hidden) products.splice(i, 1);
}

// Make products globally accessible for other scripts
if (typeof window !== 'undefined') {
    window.products = products;
    window.menuProducts = products; // Alternative name
}

// Category display names
const categoryNames = {
    'beef-smashers': 'Smash Beef Burgers',
    'chicken-burgers': 'Chicken Burgers',
    'wings': 'Wings',
    'loaded-fries': 'Loaded Fries',
    'tenders': 'Tenders',
    'appetizers': 'Sides',
    'premium-shakes': 'Milk Shakes',
    'desserts': 'Funnel Cakes',
    'soft-drinks': 'Drinks'
};
if (typeof window !== 'undefined') {
    window.categoryNames = categoryNames;
}

// Category images mapping
const categoryImages = {
    'beef-smashers': 'Images/BeefSmashers.png',
    'chicken-burgers': 'Images/ChickenBurgers.png',
    'wings': 'Images/wings.png',
    'loaded-fries': 'Images/loadedFries.png',
    'appetizers': 'Images/appetizers.png',
    'desserts': 'Images/desserts.png',
    'premium-shakes': 'Images/premiumShakes.png'
};

// Category order (menu board order)
const categoryOrder = [
    'beef-smashers',
    'chicken-burgers',
    'wings',
    'loaded-fries',
    'tenders',
    'appetizers',
    'premium-shakes',
    'desserts',
    'soft-drinks'
];

// ==================== PRODUCT OPTIONS (shared by menu + home page) ====================
// "Serious hunger?" upgrades and "Make it a meal" from the menu board
// Each extra patty is DOUBLE_PATTY_PRICE (beef burgers go up to triple)
const DOUBLE_PATTY_PRICE = 395;
const DOUBLE_CHEESE_PRICE = 95;
const MEAL_OPTIONS = [
    { name: 'Plain Fries & Drink', price: 595 },
    { name: 'Spicy Fries & Drink', price: 645 }
];
const MEAL_DRINKS = ['Coke', 'Sprite', 'Fanta'];

function isBurgerProduct(product) {
    return !!product && (product.category === 'beef-smashers' || product.category === 'chicken-burgers');
}

// Returns the size choices for a product: [{ name, price }]
function getProductSizes(product) {
    if (isBurgerProduct(product)) {
        if (product.category === 'beef-smashers') {
            return [
                { name: 'Single', price: product.price },
                { name: 'Double the Beef', price: product.price + DOUBLE_PATTY_PRICE },
                { name: 'Triple the Beef', price: product.price + DOUBLE_PATTY_PRICE * 2 }
            ];
        }
        return [
            { name: 'Single', price: product.price },
            { name: 'Double the Chicken', price: product.price + DOUBLE_PATTY_PRICE }
        ];
    }
    if (product.category === 'premium-shakes') {
        return [
            { name: 'Regular', price: product.price },
            { name: 'Large', price: product.largePrice || product.price + 300 }
        ];
    }
    if (product.id === 26) {
        return [
            { name: '6 Pieces', price: 595 },
            { name: '12 Pieces', price: 1195 }
        ];
    }
    if (product.category === 'tenders') {
        return [{ name: '3 Pieces', price: product.price }];
    }
    return [{ name: 'Regular', price: product.price }];
}

// Renders the product options into #modalBody and wires up selection handlers.
// The Add to Cart button calls the page's addToCartFromModal(productId).
function renderProductModalBody(product) {
    const body = document.getElementById('modalBody');
    if (!body) return;
    const isBurger = isBurgerProduct(product);
    const sizes = getProductSizes(product);
    const categoryName = categoryNames[product.category] || '';

    const sizesHTML = sizes.map((size, index) => `
        <div class="size-option ${index === 0 ? 'selected' : ''}" data-size="${size.name}" data-price="${size.price}">
            <span class="size-option-name">${size.name}</span>
            <span class="size-option-price">
                <span class="size-price-discounted">Rs ${size.price.toLocaleString()}</span>
            </span>
        </div>
    `).join('');

    const mealsHTML = [{ name: 'No Meal', price: 0 }].concat(MEAL_OPTIONS).map((meal, index) => `
        <div class="size-option meal-option ${index === 0 ? 'selected' : ''}" data-meal="${index === 0 ? '' : meal.name}" data-price="${meal.price}">
            <span class="size-option-name">${meal.name}</span>
            ${meal.price > 0 ? `<span class="size-option-price"><span class="size-price-discounted">+ Rs ${meal.price.toLocaleString()}</span></span>` : ''}
        </div>
    `).join('');

    const drinksHTML = MEAL_DRINKS.map((drink, index) => `
        <div class="size-option drink-option ${index === 0 ? 'selected' : ''}" data-drink="${drink}">
            <span class="size-option-name">${drink}</span>
        </div>
    `).join('');

    body.innerHTML = `
        <div class="modal-image-container">
            <img src="${product.image}" alt="${product.name}" class="modal-image" onerror="this.src='https://via.placeholder.com/600x300?text=${encodeURIComponent(product.name)}'">
        </div>
        <div class="modal-options">
            <div class="modal-options-header">
                ${categoryName ? `<div class="modal-category">${categoryName}</div>` : ''}
                <h2 class="modal-product-name">${product.name}</h2>
                <p class="modal-product-description">${product.description}</p>
            </div>

            ${sizes.length > 1 || isBurger ? `
            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">${isBurger ? 'Serious Hunger?' : 'Pick Size'}</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="size-options">${sizesHTML}</div>
            </div>
            ` : `<div class="size-options" style="display:none">${sizesHTML}</div>`}

            ${isBurger ? `
            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Add Ons</div>
                    <div class="modal-section-required">Optional</div>
                </div>
                <div class="addons-grid">
                    <div class="addon-option" data-addon="Double the Cheese" data-price="${DOUBLE_CHEESE_PRICE}">
                        <div class="addon-name">Double the Cheese</div>
                        <div class="addon-price">Rs ${DOUBLE_CHEESE_PRICE}</div>
                    </div>
                </div>
            </div>

            <div class="modal-section">
                <div class="modal-section-header">
                    <div class="modal-section-title">Make it a Meal</div>
                    <div class="modal-section-required">Optional</div>
                </div>
                <div class="size-options">${mealsHTML}</div>
            </div>

            <div class="modal-section" id="mealDrinkSection" style="display:none">
                <div class="modal-section-header">
                    <div class="modal-section-title">Choose Drink</div>
                    <div class="modal-section-required">Required</div>
                </div>
                <div class="size-options">${drinksHTML}</div>
            </div>
            ` : ''}

            <div class="quantity-controls">
                <div class="quantity-selector">
                    <button class="quantity-btn" id="decreaseQty" onclick="changeQuantityInModal(-1)">−</button>
                    <span class="quantity-value" id="quantityValue">1</span>
                    <button class="quantity-btn" id="increaseQty" onclick="changeQuantityInModal(1)">+</button>
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

    // Single-select groups: sizes, meals, drinks
    ['.size-option:not(.meal-option):not(.drink-option)', '.meal-option', '.drink-option'].forEach(selector => {
        body.querySelectorAll(selector).forEach(option => {
            option.addEventListener('click', function () {
                body.querySelectorAll(selector).forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                if (selector === '.meal-option') {
                    const drinkSection = document.getElementById('mealDrinkSection');
                    if (drinkSection) drinkSection.style.display = this.dataset.meal ? '' : 'none';
                }
            });
        });
    });
    body.querySelectorAll('.addon-option').forEach(option => {
        option.addEventListener('click', function () {
            this.classList.toggle('selected');
        });
    });

    window.currentModalQuantity = 1;
}

// Reads the current modal selections into a cart item (without key)
function buildCartItemFromModal(product) {
    const selectedSize = document.querySelector('#modalBody .size-option:not(.meal-option):not(.drink-option).selected');
    if (!selectedSize) {
        alert('Please select a size');
        return null;
    }
    const sizeName = selectedSize.dataset.size;
    const sizePrice = parseInt(selectedSize.dataset.price, 10);

    const addons = Array.from(document.querySelectorAll('#modalBody .addon-option.selected')).map(addon => ({
        name: addon.dataset.addon,
        price: parseInt(addon.dataset.price, 10)
    }));

    // Meal is stored as an add-on so it shows up everywhere add-ons are listed
    const selectedMeal = document.querySelector('#modalBody .meal-option.selected');
    let drink = null;
    if (selectedMeal && selectedMeal.dataset.meal) {
        const selectedDrink = document.querySelector('#modalBody .drink-option.selected');
        drink = selectedDrink ? selectedDrink.dataset.drink : MEAL_DRINKS[0];
        addons.push({
            name: `Meal: ${selectedMeal.dataset.meal.replace('Drink', drink)}`,
            price: parseInt(selectedMeal.dataset.price, 10)
        });
    }

    const quantity = window.currentModalQuantity || 1;
    const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);
    const item = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: sizePrice,
        originalPrice: sizePrice,
        quantity: quantity,
        size: sizeName,
        addons: addons,
        total: (sizePrice + addonsTotal) * quantity
    };
    if (drink) item.drink = drink;
    return item;
}

// Toggle to enable/disable discounts globally
// Set to true to apply discounts, false to show original prices only
const APPLY_DISCOUNTS = false;
window.APPLY_DISCOUNTS = APPLY_DISCOUNTS;

// Discount rates by category
// Only combo meals have custom discount rates
// All other items (beef-smashers, beef-speciality, chicken-burgers, wings, loaded-fries, appetizers, desserts, premium-shakes, soft-drinks) get 20% off (default)
const discountRates = {
    'beef-smasher-meals': 0.1980,    // 19.8% off (1490 → 1195)
    'signature-chicken-meals': 0.1980, // 19.8% off (1490 → 1195)
    // All other categories: 20% off (default)
};

// Calculate discounted price for a product
function getDiscountedPrice(product) {
    const originalPrice = product.price;
    const isClassicChicken = product.id === 11;

    // Classic Chicken is always sold at full price (no discount).
    if (isClassicChicken) {
        return {
            original: originalPrice,
            discounted: originalPrice,
            discountRate: 0
        };
    }
    
    // If product has explicit discounted price (e.g. Ramadan deals), use it
    if (product.discountedPrice != null) {
        const discounted = APPLY_DISCOUNTS ? product.discountedPrice : originalPrice;
        const rate = originalPrice > 0 ? 1 - (discounted / originalPrice) : 0;
        return {
            original: originalPrice,
            discounted: discounted,
            discountRate: rate
        };
    }
    
    // If discounts are disabled, return original price for both
    if (!APPLY_DISCOUNTS) {
        return {
            original: originalPrice,
            discounted: originalPrice,
            discountRate: 0
        };
    }
    
    // Apply discount if enabled
    const discountRate = discountRates[product.category] || 0.20; // Default 20% off
    const discountedPrice = Math.round(originalPrice * (1 - discountRate));
    return {
        original: originalPrice,
        discounted: discountedPrice,
        discountRate: discountRate
    };
}

// Cart management
let cart = JSON.parse(localStorage.getItem('zoroCart')) || [];
const DISCONTINUED_PRODUCT_IDS = [101, 102, 103];

// Clear carts built against an older menu (prices/items changed)
const MENU_VERSION = '2026-10-01-menu-fixes';
if (localStorage.getItem('zoroMenuVersion') !== MENU_VERSION) {
    cart = [];
    localStorage.setItem('zoroMenuVersion', MENU_VERSION);
}

// Ensure discontinued products can never remain in cart.
const ACTIVE_PRODUCT_IDS = products.map(p => p.id);
cart = cart.filter(item => !DISCONTINUED_PRODUCT_IDS.includes(item.id) && ACTIVE_PRODUCT_IDS.includes(item.id));
localStorage.setItem('zoroCart', JSON.stringify(cart));

// DOM Elements
const menuContainer = document.getElementById('menuContainer');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const categoryTabs = document.querySelectorAll('.category-tab');
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');
const locationModal = document.getElementById('locationModal');
const deliveryBtn = document.getElementById('deliveryBtn');
const findBranchBtn = document.getElementById('findBranchBtn');
const branchSelector = document.getElementById('branchSelector');
const startOrderBtn = document.getElementById('startOrderBtn');
const branchOptions = document.querySelectorAll('.branch-option');

// Clear temporarily disabled branches so users don't stay on inactive locations
try {
    const savedBranch = localStorage.getItem('selectedBranch');
    if (savedBranch === 'islamabad' || savedBranch === 'karachi' || savedBranch === 'karachi_badar') {
        localStorage.removeItem('selectedBranch');
        localStorage.removeItem('selectedBranchName');
    }
} catch (_) {}

// Location state
let selectedBranch = localStorage.getItem('selectedBranch') || 'gulberg';
let orderType = localStorage.getItem('orderType') || null; // 'delivery' or 'pickup'

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    if (typeof ZoroBranchRestrictions !== 'undefined') {
        await ZoroBranchRestrictions.fetchBranchProductAvailability();
    }
    // Only initialize if we're on the menu page (check for menuContainer)
    if (menuContainer) {
        displayMenu('all');
        updateCartUI();
        setupEventListeners();
        setupLocationModal();
        initializeBranchSelection();
    }
});

// Setup Event Listeners
function setupEventListeners() {
    if (!cartBtn || !closeCart || !cartOverlay || !closeModal || !checkoutBtn) return; // Skip if elements don't exist
    
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
    console.log('Setting up cart listeners (menu-script.js):', { cartBtn: !!cartBtn, closeCart: !!closeCart, cartOverlay: !!cartOverlay });
    if (cartBtn) {
        cartBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Cart button clicked (menu-script.js)!');
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
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            displayMenu(tab.dataset.category);
        });
    });
}

// Display Menu with Categories
function displayMenu(filterCategory) {
    if (!menuContainer) return; // Skip if element doesn't exist (e.g., in order-detail.html)
    menuContainer.innerHTML = '';
    
    if (filterCategory === 'all') {
        // Display all categories in order
        categoryOrder.forEach(category => {
            const categoryProducts = products.filter(p => p.category === category);
            if (categoryProducts.length > 0) {
                const categorySection = createCategorySection(category, categoryProducts);
                menuContainer.appendChild(categorySection);
            }
        });
    } else {
        // Display single category
        const categoryProducts = products.filter(p => p.category === filterCategory);
        if (categoryProducts.length > 0) {
            const categorySection = createCategorySection(filterCategory, categoryProducts);
            menuContainer.appendChild(categorySection);
        } else {
            menuContainer.innerHTML = '<p style="text-align: center; padding: 3rem; font-size: 1.2rem; color: #666;">No products found in this category.</p>';
        }
    }
}

// Create Category Section
function createCategorySection(category, categoryProducts) {
    const section = document.createElement('div');
    section.className = 'menu-category-section';
    
    // Add category image if available
    const categoryImagePath = categoryImages[category];
    if (categoryImagePath) {
        const categoryImageContainer = document.createElement('div');
        categoryImageContainer.className = 'category-image-container';
        const categoryImage = document.createElement('img');
        categoryImage.src = categoryImagePath;
        categoryImage.alt = categoryNames[category] || category;
        categoryImage.className = 'category-image';
        categoryImageContainer.appendChild(categoryImage);
        section.appendChild(categoryImageContainer);
    }
    
    const categoryTitle = document.createElement('h2');
    categoryTitle.className = 'category-title';
    categoryTitle.textContent = categoryNames[category] || category;
    
    const productsGrid = document.createElement('div');
    productsGrid.className = 'products-grid';
    
    categoryProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    section.appendChild(categoryTitle);
    section.appendChild(productsGrid);
    
    return section;
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    const branchCode = typeof selectedBranch !== 'undefined' ? selectedBranch : localStorage.getItem('selectedBranch');
    const isOutOfStockHere = typeof ZoroBranchRestrictions !== 'undefined'
        && ZoroBranchRestrictions.isProductUnavailableAtBranch(product, branchCode);
    
    // Calculate discounted price
    const pricing = getDiscountedPrice(product);
    const showDiscount = APPLY_DISCOUNTS && pricing.original !== pricing.discounted;
    
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300x250?text=${encodeURIComponent(product.name)}'">
        </div>
        <div class="product-info">
            <h3 class="product-name">
                ${product.name}
                ${product.isSpicy ? '<span class="spicy-indicator" title="Very Spicy">🌶️🌶️🌶️</span>' : ''}
            </h3>
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
                    ${isOutOfStockHere ? 'Not available' : 'Add to Cart'}
                </button>
            </div>
        </div>
    `;
    
    // Add click event to the button
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    if (isOutOfStockHere) {
        return card;
    }
    
    // Handle both click and touch events for mobile compatibility
    const handleButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const productId = parseInt(addToCartBtn.dataset.productId);
        const productToAdd = products.find(p => p.id === productId);
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
            if (productToAdd.isCombo && !isCustomMealCombo) {
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
        handleButtonClick(e);
    }, { passive: false });

    // Removed card click handlers - only button is clickable now
    
    return card;
}

// Add to Cart (legacy function for simple adds without size/addons)
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // For items without size/addons, create a simple key
    const itemKey = `${product.id}-default`;
    const existingItemIndex = cart.findIndex(item => item.key === itemKey || (!item.key && item.id === productId && !item.size));
    
    if (existingItemIndex !== -1) {
        const existingItem = cart[existingItemIndex];
        existingItem.quantity += 1;
        const addonsTotal = (existingItem.addons || []).reduce((sum, addon) => sum + addon.price, 0);
        existingItem.total = (existingItem.price + addonsTotal) * existingItem.quantity;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            key: itemKey,
            total: product.price
        });
    }
    
    saveCart();
    updateCartUI();
    showCartNotification('Item added to cart!');
}

// Add Combo to Cart (directly adds without modal or options)
function addComboToCart(product) {
    if (!product || !product.isCombo) return;
    
    // Calculate discounted price
    const pricing = getDiscountedPrice(product);
    
    // Create a simple key for combos
    const itemKey = `${product.id}-combo`;
    const existingItemIndex = cart.findIndex(item => item.key === itemKey || (item.id === product.id && item.isCombo));
    
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
            total: pricing.discounted,
            isCombo: true
        });
    }
    
    saveCart();
    updateCartUI();
    showCartNotification('Meal added to cart!');
}

// Add Dessert to Cart (directly adds without modal or options)
function addDessertToCart(product) {
    if (!product || product.category !== 'desserts') return;
    
    // Calculate discounted price
    const pricing = getDiscountedPrice(product);
    
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
    
    saveCart();
    updateCartUI();
    showCartNotification('Item added to cart!');
}

// Remove from Cart (by item key or index)
function removeFromCart(itemKey) {
    // If itemKey is a number, treat it as index
    if (typeof itemKey === 'number') {
        cart = cart.filter((item, index) => index !== itemKey);
    } else {
        cart = cart.filter(item => item.key !== itemKey);
    }
    saveCart();
    updateCartUI();
}

// Update Quantity (by item index)
function updateQuantity(itemIndex, change) {
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
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map((item, index) => {
            // Calculate item total (price + addons) * quantity
            const addonsTotal = (item.addons || []).reduce((sum, addon) => sum + addon.price, 0);
            const itemTotal = item.total || ((item.price + addonsTotal) * item.quantity);
            
            // Build details content
            const hasSize = item.size && item.size !== 'default';
            const hasWingType = item.wingType;
            const hasDrink = !!item.drink;
            const hasAddons = item.addons && item.addons.length > 0;
            const hasDetails = hasSize || hasWingType || hasDrink || hasAddons;
            
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

            const drinkDetail = hasDrink ? `
                <div class="cart-detail-label">Drink:</div>
                <div class="cart-detail-value">${item.drink}</div>
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
                            <span class="cart-quantity-value">${item.quantity}</span>
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
        return sum + ((item.price + addonsTotal) * item.quantity);
    }, 0);
    cartTotal.textContent = total.toLocaleString();
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
    console.log('toggleCart called (menu-script)');
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
        const effectiveBranch = (typeof selectedBranch !== 'undefined' ? selectedBranch : null) || localStorage.getItem('selectedBranch');
        if (ZoroBranchRestrictions.isProductUnavailableAtBranch(product, effectiveBranch)) {
            const isPermanent = ZoroBranchRestrictions.isIsbOrKarachiLocalBranchCode(effectiveBranch)
                && ZoroBranchRestrictions.isProductUnavailableAtIsbKarachi(product);
            alert(
                isPermanent
                    ? 'Loaded Fries, Milk Shakes, and Funnel Cakes are not available at Islamabad and Karachi branches. Please choose another branch from the home page, or select a Lahore branch at checkout.'
                    : 'This item is currently unavailable at your selected branch. Please choose another item or branch.'
            );
            return;
        }
    }
    renderProductModalBody(product);
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Change quantity in modal
function changeQuantityInModal(delta) {
    if (!window.currentModalQuantity) window.currentModalQuantity = 1;
    window.currentModalQuantity = Math.max(1, window.currentModalQuantity + delta);
    document.getElementById('quantityValue').textContent = window.currentModalQuantity;
}

// Add to cart from modal
function addToCartFromModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = buildCartItemFromModal(product);
    if (!cartItem) return;
    cartItem.key = `${cartItem.id}-${cartItem.size}-${cartItem.addons.map(a => a.name).join(',')}`;

    const existingItem = cart.find(item => item.key === cartItem.key);
    if (existingItem) {
        existingItem.quantity += cartItem.quantity;
        existingItem.total = existingItem.quantity * (existingItem.price + (existingItem.addons || []).reduce((sum, a) => sum + a.price, 0));
    } else {
        cart.push(cartItem);
    }

    saveCart();
    updateCartUI();
    showCartNotification('Item added to cart!');
    closeProductModal();
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
if (productModal) {
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeProductModal();
        }
    });
}

// Location Modal Functions
function setupLocationModal() {
    if (!deliveryBtn || !findBranchBtn || !startOrderBtn || !locationModal) return; // Skip if elements don't exist
    
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
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

