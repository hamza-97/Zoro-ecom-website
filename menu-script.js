// Products Data organized according to official menu structure from zoroburger.com/menu
// Make products globally accessible
const products = [
    // BEEF SMASHERS
    {
        id: 1,
        name: 'Classic American',
        category: 'beef-smashers',
        price: 895,
        image: 'ZoroImages/ClassicAmerican.png',
        description: 'Pickles, Onions, Cheese, Ketchup, Mayo'
    },
    {
        id: 2,
        name: 'Onion Melt',
        category: 'beef-smashers',
        price: 895,
        image: 'ZoroImages/OnionMelt.png',
        description: 'Grilled Onions, Cheese, Lettuce, Crispy Onions, Garlic Aioli'
    },
    {
        id: 3,
        name: 'Frankie',
        category: 'beef-smashers',
        price: 895,
        image: 'ZoroImages/Frankie.png',
        description: 'Pickled Red Onions, Cheese, Tomatoes, Lettuce, Secret Sauce'
    },
    {
        id: 4,
        name: 'Big Ben',
        category: 'beef-smashers',
        price: 895,
        image: 'ZoroImages/BigBen.png',
        description: 'Grilled Onions, Cheese, Crispy Onions, Jalapeno Mayo'
    },
    
    // BEEF SPECIALITY
    {
        id: 5,
        name: 'Tokyo',
        category: 'beef-speciality',
        price: 995,
        image: 'ZoroImages/Tokyo.png',
        description: 'Onion jam, fried onion, garlic aioli, cheese'
    },
    {
        id: 6,
        name: 'Truffle Royal',
        category: 'beef-speciality',
        price: 995,
        image: 'ZoroImages/TruffleRoyal.png',
        description: 'Cheese, Tomatoes, Lettuce, Mustard, Truffle Mayo'
    },
    {
        id: 7,
        name: 'BLT Texas',
        category: 'beef-speciality',
        price: 995,
        image: 'ZoroImages/BltTexas.png',
        description: 'Bacon, Tomatoes, Lettuce, Cheese, BBQ Sauce, Mustard'
    },
    {
        id: 8,
        name: 'Bangkok',
        category: 'beef-speciality',
        price: 995,
        image: 'ZoroImages/Bangkok.png',
        description: 'Lettuce, Jalapenos, Cheese, Chilli Mayo'
    },
    {
        id: 9,
        name: 'BLT Classic',
        category: 'beef-speciality',
        price: 995,
        image: 'ZoroImages/BltClassic.png',
        description: 'Classic BLT: Cheese, Bacon, Tomatoes, Lettuce, Ketchup, Mayo, Mustard Sauce'
    },
    {
        id: 10,
        name: 'Swiss Mushroom',
        category: 'beef-speciality',
        price: 1295,  // Base price for Single (before discount)
        image: 'ZoroImages/SwissMushroom.png',
        description: 'Swiss Mushroom Sauce, Cheese, Mayo'
    },
    
    // CHICKEN BURGERS
    {
        id: 11,
        name: 'Classic Chicken',
        category: 'chicken-burgers',
        price: 695,
        image: 'ZoroImages/ClassicChicken.png',
        description: 'Classic chicken burger with fresh ingredients'
    },
    {
        id: 12,
        name: 'Pepper Chicken',
        category: 'chicken-burgers',
        price: 895,
        image: 'ZoroImages/PepperChicken.png',
        description: 'Chicken Minced Patty, Cheese, Mayo, Ketchup, Lettuce'
    },
    {
        id: 13,
        name: 'Tangy Crunch',
        category: 'chicken-burgers',
        price: 895,
        image: 'ZoroImages/TangyCrunch.png',
        description: 'Breast Fillet, Cheese, Honey Mustard Coleslaw, Mayo'
    },
    {
        id: 14,
        name: 'Roost',
        category: 'chicken-burgers',
        price: 995,  // Updated base price (before discount)
        image: 'ZoroImages/Roost.png',
        description: 'Breast Fillet, Cheese, Lettuce, Tomatoes, Zesty Chick Sauce'
    },
    {
        id: 15,
        name: 'Asian Fusion',
        category: 'chicken-burgers',
        price: 995,
        image: 'ZoroImages/AsianFusion.png',
        description: 'Breast Fillet, Cheese, Sweet & Spicy Asian Sauce, Crispy Onions, Chilli Mayo'
    },
    {
        id: 16,
        name: 'Mexicana',
        category: 'chicken-burgers',
        price: 995,
        image: 'ZoroImages/Mexicana.png',
        description: 'Chicken Breast Fillet, Nacho Chips, Lettuce, Jalapenos, Onions, Salsa Mayo, Cheese'
    },
    {
        id: 17,
        name: 'Hell Fire',
        category: 'chicken-burgers',
        price: 995,
        image: 'ZoroImages/Hellfire.png',
        description: 'Breast Fillet, Cheese, Fiery Buffalo Sauce, Lettuce, Jalapeno, Chilli Mayo'
    },
    
    // WINGS
    {
        id: 18,
        name: 'Carolina Reaper',
        category: 'wings',
        price: 895, // Base price for 6 pieces bone-in
        image: 'ZoroImages/CarolinaReaperWings.png',
        description: 'Extremely spicy wings with Carolina Reaper sauce',
        isSpicy: true
    },
    {
        id: 19,
        name: 'Korean BBQ',
        category: 'wings',
        price: 895, // Base price for 6 pieces bone-in
        image: 'ZoroImages/KoreanBbqWings.png',
        description: 'Crispy Chicken Wings glazed in Korean BBQ Sauce'
    },
    {
        id: 20,
        name: 'Buffalo',
        category: 'wings',
        price: 895, // Base price for 6 pieces bone-in
        image: 'ZoroImages/BuffaloWings.png',
        description: 'Crispy Chicken Wings tossed in Tangy Buffalo Hot Sauce'
    },
    {
        id: 21,
        name: 'Thai',
        category: 'wings',
        price: 895, // Base price for 6 pieces bone-in
        image: 'ZoroImages/ThaiWings.png',
        description: 'Chicken Wings coated in a flavorful blend of Thai Sweet and Spicy Sauce'
    },
    
    // LOADED FRIES
    {
        id: 22,
        name: 'French Truffle',
        category: 'loaded-fries',
        price: 1295,
        image: 'ZoroImages/FrenchTruffleLoadedFries.png',
        description: 'Australian Beef, Melted Cheese, Truffle Mayo'
    },
    {
        id: 23,
        name: 'Chicken Parma',
        category: 'loaded-fries',
        price: 1295,
        image: 'ZoroImages/ChickenParmaLoadedFries.png',
        description: 'Chicken Fillet, Onions, Tomato Relish, Melted Cheese'
    },
    {
        id: 24,
        name: 'Funky Cheese',
        category: 'loaded-fries',
        price: 1295,
        image: 'ZoroImages/FunkyCheeseLoadedFries.png',
        description: 'Chicken Cubes, Spicy Fries, Chilly Mayo, Melted Cheese, Jalapenos'
    },
    {
        id: 25,
        name: 'Philly Cheese',
        category: 'loaded-fries',
        price: 1295,
        image: 'ZoroImages/PhillyCheeseLoadedFries.png',
        description: 'Beef, Grilled Onions, Garlic Aioli, Melted Cheese'
    },
    
    // APPETIZERS
    {
        id: 26,
        name: 'Chicken Crunchers',
        category: 'appetizers',
        price: 595,
        image: 'ZoroImages/ChickenCrunchers.png',
        description: 'Crispy chicken bites perfect for sharing'
    },
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
        price: 499,
        image: 'ZoroImages/SpicyFries.png',
        description: 'Fries with a spicy kick'
    },
    
    // DESSERTS
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
    {
        id: 32,
        name: 'Benzo Cake',
        category: 'desserts',
        price: 795,
        image: 'ZoroImages/BenzoCake.png',
        description: 'Decadent layered cake'
    },
    
    // PREMIUM SHAKES
    {
        id: 33,
        name: 'Oreo Crush',
        category: 'premium-shakes',
        price: 695,
        image: 'ZoroImages/OreoCrushShake.png',
        description: 'Creamy milkshake with crushed Oreo cookies'
    },
    {
        id: 34,
        name: 'Strawberry Oreo',
        category: 'premium-shakes',
        price: 795,
        image: 'ZoroImages/StrawberryOreoShake.png',
        description: 'Strawberry shake with Oreo crumbles'
    },
    {
        id: 35,
        name: 'Caramel Walnut',
        category: 'premium-shakes',
        price: 795,
        image: 'ZoroImages/CaramelWalnutShake.png',
        description: 'Rich caramel shake topped with crunchy walnuts'
    },
    {
        id: 36,
        name: 'Strawberry Pavlova',
        category: 'premium-shakes',
        price: 895,
        image: 'ZoroImages/StrawberryPalovaShake.png',
        description: 'Delicious strawberry shake with pavlova crumbles'
    },
    {
        id: 37,
        name: 'Butter Pecan',
        category: 'premium-shakes',
        price: 895,
        image: 'ZoroImages/ButterPecanShake.png',
        description: 'Smooth butter pecan flavored milkshake'
    },
    {
        id: 38,
        name: 'Hazel Dream',
        category: 'premium-shakes',
        price: 895,
        image: 'ZoroImages/HazelDreamShake.png',
        description: 'Dreamy hazelnut shake that melts in your mouth'
    },
    {
        id: 39,
        name: 'Lotus Swirl',
        category: 'premium-shakes',
        price: 895,
        image: 'ZoroImages/LotusSwirlShake.png',
        description: 'Biscoff lotus cookies blended into creamy perfection'
    },
    {
        id: 40,
        name: 'Pistachio Cream',
        category: 'premium-shakes',
        price: 1095,
        image: 'ZoroImages/PistachioCreamShake.png',
        description: 'Premium pistachio cream shake'
    },
    
    // SOFT DRINKS
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
    },
    {
        id: 44,
        name: 'Coke Zero',
        category: 'soft-drinks',
        price: 195,
        image: 'ZoroImages/CokeZero.png',
        description: 'Zero sugar Coca-Cola'
    },
    {
        id: 45,
        name: 'Sprite Zero',
        category: 'soft-drinks',
        price: 195,
        image: 'ZoroImages/SpriteZero.png',
        description: 'Zero sugar Sprite'
    },
    {
        id: 46,
        name: 'Dasani Water',
        category: 'soft-drinks',
        price: 125,
        image: 'ZoroImages/DasaniWater.png',
        description: 'Pure bottled water'
    },
    
    // BEEF SMASHER MEALS (19.8% off, target discounted: 1195)
    // Original price: 1490, discounted: 1195
    {
        id: 47,
        name: 'Classic American Meal',
        category: 'beef-smasher-meals',
        price: 1490,
        image: 'ZoroImages/ZoroMeals/BEEF/AmericanCombo.png',
        description: 'Classic American Beef (Single Patty Burger) with Fries & Coke',
        isCombo: true
    },
    {
        id: 48,
        name: 'Onion Melt Meal',
        category: 'beef-smasher-meals',
        price: 1490,
        image: 'ZoroImages/ZoroMeals/BEEF/OnionMeltCombo.png',
        description: 'Classic Onion Melt (Single Patty Burger) with Fries & Coke',
        isCombo: true
    },
    {
        id: 49,
        name: 'Frankie Meal',
        category: 'beef-smasher-meals',
        price: 1490,
        image: 'ZoroImages/ZoroMeals/BEEF/FrankieCombo.png',
        description: 'Frankie Beef (Single Patty Burger) with Fries & Coke',
        isCombo: true
    },
    {
        id: 50,
        name: 'Big Ben Meal',
        category: 'beef-smasher-meals',
        price: 1490,
        image: 'ZoroImages/ZoroMeals/BEEF/BigBenCombo.png',
        description: 'Classic Big Ben (Single Patty Burger) with Fries & Coke',
        isCombo: true
    },
    
    // BEEF SPECIALTY MEALS (18.55% off, target discounted: 1295)
    // Original price: 1590, discounted: 1295
    {
        id: 51,
        name: 'Truffle Meal',
        category: 'beef-specialty-meals',
        price: 1590,
        image: 'ZoroImages/ZoroMeals/BEEF/TruffleCombo.png',
        description: 'Truffle Beef (Single Patty Burger) with Fries & Coke',
        isCombo: true
    },
    {
        id: 52,
        name: 'Bangkok Meal',
        category: 'beef-specialty-meals',
        price: 1590,
        image: 'ZoroImages/ZoroMeals/BEEF/BangkokCombo.png',
        description: 'Bangkok Beef (Single Patty Burger) with Fries & Coke',
        isCombo: true
    },
    {
        id: 53,
        name: 'BLT Meal',
        category: 'beef-specialty-meals',
        price: 1590,
        image: 'ZoroImages/ZoroMeals/BEEF/BltClassicCombo.png',
        description: 'BLT Beef (Single Patty Burger) with Fries & Coke',
        isCombo: true
    },
    {
        id: 54,
        name: 'Tokyo Beef Meal',
        category: 'beef-specialty-meals',
        price: 1590,
        image: 'ZoroImages/ZoroMeals/BEEF/TokyoCombo.png',
        description: 'Tokyo Beef (Single Patty Burger) with Fries & Coke',
        isCombo: true
    },
    {
        id: 55,
        name: 'Texas BLT Meal',
        category: 'beef-specialty-meals',
        price: 1590,
        image: 'ZoroImages/ZoroMeals/BEEF/BltTexasCombo.png',
        description: 'Texas BLT Beef (Single Patty Burger) with Fries & Coke',
        isCombo: true
    },
    
    // CHICKEN SPECIALTY MEALS (18.55% off, target discounted: 1295)
    // Original price: 1590, discounted: 1295
    {
        id: 56,
        name: 'Hellfire Meal',
        category: 'chicken-specialty-meals',
        price: 1590,
        image: 'ZoroImages/ZoroMeals/CHICKEN/HellfireCombo.png',
        description: 'Hellfire Chicken (Single Patty Burger) with Fries & Coke',
        isCombo: true
    },
    {
        id: 57,
        name: 'Asian Fusion Meal',
        category: 'chicken-specialty-meals',
        price: 1590,
        image: 'ZoroImages/ZoroMeals/CHICKEN/AsianFusionCombo.png',
        description: 'Asian Fusion Chicken (Single Patty Burger) with Fries & Coke',
        isCombo: true
    },
    {
        id: 58,
        name: 'The Mexicana Meal',
        category: 'chicken-specialty-meals',
        price: 1590,
        image: 'ZoroImages/ZoroMeals/CHICKEN/MexicanaCombo.png',
        description: 'Mexicana Chicken (Single Patty Burger) with Fries & Coke',
        isCombo: true
    },
    
    // SIGNATURE CHICKEN MEALS (19.8% off, target discounted: 1195)
    // Original price: 1490, discounted: 1195
    {
        id: 59,
        name: 'Classic Chicken Meal',
        category: 'signature-chicken-meals',
        price: 1490,
        image: 'ZoroImages/ZoroMeals/CHICKEN/ClassicChickenCombo.png',
        description: 'Classic Chicken (Single Patty Burger) with Fries & Coke',
        isCombo: true
    },
    {
        id: 60,
        name: 'Pepper Chicken Meal',
        category: 'signature-chicken-meals',
        price: 1490,
        image: 'ZoroImages/ZoroMeals/CHICKEN/PepperChickenCombo.png',
        description: 'Pepper Chicken (Single Patty Burger) with Fries & Coke',
        isCombo: true
    },
    {
        id: 61,
        name: 'Roost Meal',
        category: 'signature-chicken-meals',
        price: 1490,
        image: 'ZoroImages/ZoroMeals/CHICKEN/RoostCombo.png',
        description: 'Roost Chicken (Single Patty Burger) with Fries & Coke',
        isCombo: true
    },
    {
        id: 62,
        name: 'Tangy Crunch Meal',
        category: 'signature-chicken-meals',
        price: 1490,
        image: 'ZoroImages/ZoroMeals/CHICKEN/TangyCrunchCombo.png',
        description: 'Tangy Crunch Chicken (Single Patty Burger) with Fries & Coke',
        isCombo: true
    }
];

// Make products globally accessible for other scripts
if (typeof window !== 'undefined') {
    window.products = products;
    window.menuProducts = products; // Alternative name
}

// Category display names
const categoryNames = {
    'beef-smashers': 'Beef Smashers',
    'beef-speciality': 'Beef Speciality',
    'chicken-burgers': 'Chicken Burgers',
    'wings': 'Wings',
    'loaded-fries': 'Loaded Fries',
    'appetizers': 'Appetizers',
    'desserts': 'Desserts',
    'premium-shakes': 'Premium Shakes',
    'soft-drinks': 'Soft Drinks',
    'beef-smasher-meals': 'Beef Smasher Meals',
    'beef-specialty-meals': 'Beef Specialty Meals',
    'chicken-specialty-meals': 'Chicken Specialty Meals',
    'signature-chicken-meals': 'Signature Chicken Meals'
};

// Category images mapping
const categoryImages = {
    'beef-smashers': 'Images/BeefSmashers.png',
    'beef-speciality': 'Images/BeefSpecial.png',
    'chicken-burgers': 'Images/ChickenBurgers.png',
    'wings': 'Images/wings.png',
    'loaded-fries': 'Images/loadedFries.png',
    'appetizers': 'Images/appetizers.png',
    'desserts': 'Images/desserts.png',
    'premium-shakes': 'Images/premiumShakes.png'
};

// Category order (official menu order)
const categoryOrder = [
    'beef-smasher-meals',
    'beef-specialty-meals',
    'chicken-specialty-meals',
    'signature-chicken-meals',
    'beef-smashers',
    'beef-speciality',
    'chicken-burgers',
    'wings',
    'loaded-fries',
    'appetizers',
    'desserts',
    'premium-shakes',
    'soft-drinks'
];

// Toggle to enable/disable discounts globally
// Set to true to apply discounts, false to show original prices only
const APPLY_DISCOUNTS = true;

// Discount rates by category
// Only combo meals have custom discount rates
// All other items (beef-smashers, beef-speciality, chicken-burgers, wings, loaded-fries, appetizers, desserts, premium-shakes, soft-drinks) get 20% off (default)
const discountRates = {
    'beef-smasher-meals': 0.1980,    // 19.8% off (1490 → 1195)
    'beef-specialty-meals': 0.1855,  // 18.55% off (1590 → 1295)
    'chicken-specialty-meals': 0.1855, // 18.55% off (1590 → 1295)
    'signature-chicken-meals': 0.1980, // 19.8% off (1490 → 1195)
    // All other categories: 20% off (default)
};

// Calculate discounted price for a product
function getDiscountedPrice(product) {
    const originalPrice = product.price;
    
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

// Location state
let selectedBranch = localStorage.getItem('selectedBranch') || 'gulberg';
let orderType = localStorage.getItem('orderType') || null; // 'delivery' or 'pickup'

// Initialize
document.addEventListener('DOMContentLoaded', () => {
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
    
    cartBtn.addEventListener('click', () => toggleCart());
    closeCart.addEventListener('click', () => toggleCart());
    cartOverlay.addEventListener('click', () => toggleCart());
    closeModal.addEventListener('click', () => closeProductModal());
    checkoutBtn.addEventListener('click', () => handleCheckout());
    
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
                <button class="add-to-cart-btn" data-product-id="${product.id}">
                    Add to Cart
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
            if (productToAdd.isCombo) {
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
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Show Product Modal
function showProductModal(product) {
    // If it's a combo, add directly to cart without showing modal
    if (product.isCombo) {
        addComboToCart(product);
        return;
    }
    
    // Determine category name
    const categoryName = categoryNames[product.category] || '';
    
    // Calculate discounted price for base product
    const basePricing = getDiscountedPrice(product);
    
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
    // For wings, don't show price in size options (price is shown separately and updates based on type)
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
    window.currentModalQuantity = 1;
    
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
    
    const isWings = product.category && product.category === 'wings';
    
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
    
    // For wings, get the selected type (bone-in or boneless) and calculate price
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
    const quantity = window.currentModalQuantity || 1;
    const itemTotal = (sizePrice + addonsTotal) * quantity;
    
    // Create cart item with unique key for variations
    // For wings, include type in the key
    const itemKey = isWings 
        ? `${product.id}-${sizeName}-${wingType}`
        : `${product.id}-${sizeName}-${selectedAddons.map(a => a.name).join(',')}`;
    
    // Check if this exact item already exists in cart
    const existingItemIndex = cart.findIndex(item => {
        if (isWings) {
            return item.key === itemKey || (
                item.id === product.id && 
                item.size === sizeName && 
                item.wingType === wingType
            );
        } else {
            const itemKeyToCompare = `${item.id}-${item.size || 'default'}-${(item.addons || []).map(a => a.name).join(',')}`;
            return itemKeyToCompare === itemKey;
        }
    });
    
    if (existingItemIndex !== -1) {
        // Update quantity of existing item
        cart[existingItemIndex].quantity += quantity;
        cart[existingItemIndex].total = cart[existingItemIndex].quantity * (cart[existingItemIndex].price + (cart[existingItemIndex].addons || []).reduce((sum, a) => sum + a.price, 0));
    } else {
        // Add new item
        const cartItem = {
            id: product.id,
            name: displayName,
            image: product.image,
            price: sizePrice,
            originalPrice: originalPrice,
            quantity: quantity,
            size: sizeName,
            addons: selectedAddons,
            total: itemTotal,
            key: itemKey
        };
        
        // Add wing type if applicable
        if (isWings && wingType) {
            cartItem.wingType = wingType;
        }
        
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

