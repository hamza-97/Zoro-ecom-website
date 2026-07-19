/**
 * Branch product rules: permanent Islamabad/Karachi restrictions + admin toggles from MongoDB.
 * Used by menu, home, and checkout.
 */
(function (global) {
    const KARACHI_JOHAR_BRANCH_REGEX = /karachi\s+j(auh|oh)ar/i;

    const BRANCH_CODE_TO_NAME = {
        gulberg: 'Gulberg II, Lahore',
        jt: 'Johar Town, Lahore',
        dha: 'DHA Phase 5, Lahore',
        islamabad: 'Islamabad',
        karachi: 'Karachi Jauhar',
        karachi_badar: 'Karachi Badar'
    };

    /** branch_name -> product_id[] (admin marked unavailable) */
    let adminUnavailableByBranch = {};

    function isKarachiJoharBranchName(branch) {
        return !!(branch && KARACHI_JOHAR_BRANCH_REGEX.test(String(branch)));
    }

    function isKarachiBadarBranchName(branch) {
        return !!(branch && /karachi\s+badar/i.test(String(branch)));
    }

    function isIslamabadBranchName(branch) {
        return !!(branch && /islamabad/i.test(String(branch)));
    }

    function isIsbOrKarachiCheckoutBranch(branchName) {
        if (!branchName) return false;
        const s = String(branchName);
        return isIslamabadBranchName(s) || isKarachiJoharBranchName(s) || isKarachiBadarBranchName(s);
    }

    function isIsbOrKarachiLocalBranchCode(code) {
        if (!code) return false;
        const c = String(code).toLowerCase();
        return c === 'islamabad' || c === 'karachi' || c === 'karachi_badar';
    }

    function resolveBranchName(branchRef) {
        if (!branchRef) return null;
        const raw = String(branchRef).trim();
        if (BRANCH_CODE_TO_NAME[raw]) {
            return BRANCH_CODE_TO_NAME[raw];
        }
        const lower = raw.toLowerCase();
        if (BRANCH_CODE_TO_NAME[lower]) {
            return BRANCH_CODE_TO_NAME[lower];
        }
        if (/islamabad/i.test(raw)) return 'Islamabad';
        if (/karachi\s+badar/i.test(raw)) return 'Karachi Badar';
        if (KARACHI_JOHAR_BRANCH_REGEX.test(raw)) return 'Karachi Jauhar';
        if (/gulberg/i.test(raw)) return 'Gulberg II, Lahore';
        if (/dha/i.test(raw)) return 'DHA Phase 5, Lahore';
        if ((/johar/i.test(raw) || /\bjt\b/.test(lower)) && !/karachi/i.test(raw)) {
            return 'Johar Town, Lahore';
        }
        return raw;
    }

    const LOADED_FRIES_IDS = [22, 23, 24, 25];
    const PREMIUM_SHAKE_IDS = [33, 34, 35, 36, 37, 38, 39, 40];

    function isProductUnavailableAtIsbKarachi(product) {
        if (!product) return false;
        if (product.id === 6) return true;
        if (product.category === 'loaded-fries' || LOADED_FRIES_IDS.includes(product.id)) return true;
        if (product.category === 'premium-shakes' || PREMIUM_SHAKE_IDS.includes(product.id)) return true;
        if (product.category === 'desserts') return true;
        return false;
    }

    function isAdminUnavailableAtBranch(product, branchRef) {
        if (!product || typeof product.id !== 'number') return false;
        const branchName = resolveBranchName(branchRef);
        if (!branchName) return false;
        const ids = adminUnavailableByBranch[branchName];
        return Array.isArray(ids) && ids.includes(product.id);
    }

    function isProductUnavailableAtBranch(product, branchRef) {
        if (!product) return false;
        const branchName = resolveBranchName(branchRef);
        if (branchName && isIsbOrKarachiCheckoutBranch(branchName) && isProductUnavailableAtIsbKarachi(product)) {
            return true;
        }
        if (isIsbOrKarachiLocalBranchCode(branchRef) && isProductUnavailableAtIsbKarachi(product)) {
            return true;
        }
        return isAdminUnavailableAtBranch(product, branchRef);
    }

    function cartItemBlockedAtIsbKarachi(item) {
        if (!item) return false;
        if (item.id === 6) return true;
        if (item.category === 'loaded-fries' || LOADED_FRIES_IDS.includes(item.id)) return true;
        if (item.category === 'premium-shakes' || PREMIUM_SHAKE_IDS.includes(item.id)) return true;
        if (item.category === 'desserts') return true;
        return false;
    }

    function getCartConflictsForIsbKarachi(cart) {
        const conflicts = [];
        if (!Array.isArray(cart)) return conflicts;
        cart.forEach((item, index) => {
            if (cartItemBlockedAtIsbKarachi(item)) {
                conflicts.push({
                    index: index,
                    name: item.name || ('Item #' + item.id)
                });
            }
        });
        return conflicts;
    }

    function getCartConflictsForBranch(cart, branchRef) {
        const conflicts = [];
        if (!Array.isArray(cart)) return conflicts;
        cart.forEach((item, index) => {
            if (isProductUnavailableAtBranch(item, branchRef)) {
                conflicts.push({
                    index: index,
                    name: item.name || ('Item #' + item.id),
                    id: item.id
                });
            }
        });
        return conflicts;
    }

    function getApiBaseUrl() {
        if (typeof window === 'undefined') return '';
        const host = window.location.hostname;
        if (host === 'localhost' || host === '127.0.0.1') {
            return 'http://localhost:3000/api';
        }
        if (host === 'zoroburger.com' || host.endsWith('.zoroburger.com')) {
            return 'https://zoroburger.com/api';
        }
        return window.location.origin + '/api';
    }

    function setAdminUnavailableByBranch(unavailableMap) {
        adminUnavailableByBranch = unavailableMap && typeof unavailableMap === 'object'
            ? unavailableMap
            : {};
    }

    async function fetchBranchProductAvailability() {
        try {
            const response = await fetch(getApiBaseUrl() + '/branch-product-availability');
            if (!response.ok) {
                return adminUnavailableByBranch;
            }
            const data = await response.json();
            setAdminUnavailableByBranch(data.unavailable || {});
            return adminUnavailableByBranch;
        } catch (err) {
            console.warn('Could not load branch product availability:', err);
            return adminUnavailableByBranch;
        }
    }

    const availabilityReady = fetchBranchProductAvailability();

    global.ZoroBranchRestrictions = {
        isKarachiJoharBranchName,
        isKarachiBadarBranchName,
        isIslamabadBranchName,
        isIsbOrKarachiCheckoutBranch,
        isIsbOrKarachiLocalBranchCode,
        isProductUnavailableAtIsbKarachi,
        isProductUnavailableAtBranch,
        isAdminUnavailableAtBranch,
        resolveBranchName,
        cartItemBlockedAtIsbKarachi,
        getCartConflictsForIsbKarachi,
        getCartConflictsForBranch,
        fetchBranchProductAvailability,
        setAdminUnavailableByBranch,
        get availabilityReady() {
            return availabilityReady;
        }
    };
})(typeof window !== 'undefined' ? window : global);
