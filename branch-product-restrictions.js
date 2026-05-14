/**
 * Islamabad + Karachi branches: Truffle Royal, all Loaded Fries, all Premium Shakes are unavailable.
 * Used by menu, home, and checkout.
 */
(function (global) {
    const KARACHI_JOHAR_BRANCH_REGEX = /karachi\s+j(auh|oh)ar/i;

    function isKarachiJoharBranchName(branch) {
        return !!(branch && KARACHI_JOHAR_BRANCH_REGEX.test(String(branch)));
    }

    function isKarachiBadarBranchName(branch) {
        return !!(branch && /karachi\s+badar/i.test(String(branch)));
    }

    function isIslamabadBranchName(branch) {
        return !!(branch && /islamabad/i.test(String(branch)));
    }

    /** Full branch name as on checkout (e.g. "Islamabad", "Karachi Jauhar") */
    function isIsbOrKarachiCheckoutBranch(branchName) {
        if (!branchName) return false;
        const s = String(branchName);
        return isIslamabadBranchName(s) || isKarachiJoharBranchName(s) || isKarachiBadarBranchName(s);
    }

    /** Codes stored in localStorage from the welcome modal (index) */
    function isIsbOrKarachiLocalBranchCode(code) {
        if (!code) return false;
        const c = String(code).toLowerCase();
        return c === 'islamabad' || c === 'karachi' || c === 'karachi_badar';
    }

    const LOADED_FRIES_IDS = [22, 23, 24, 25];
    const PREMIUM_SHAKE_IDS = [33, 34, 35, 36, 37, 38, 39, 40];

    function isProductUnavailableAtIsbKarachi(product) {
        if (!product) return false;
        if (product.id === 6) return true;
        if (product.category === 'loaded-fries' || LOADED_FRIES_IDS.includes(product.id)) return true;
        if (product.category === 'premium-shakes' || PREMIUM_SHAKE_IDS.includes(product.id)) return true;
        return false;
    }

    function cartItemBlockedAtIsbKarachi(item) {
        if (!item) return false;
        if (item.id === 6) return true;
        if (item.category === 'loaded-fries' || LOADED_FRIES_IDS.includes(item.id)) return true;
        if (item.category === 'premium-shakes' || PREMIUM_SHAKE_IDS.includes(item.id)) return true;
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

    global.ZoroBranchRestrictions = {
        isKarachiJoharBranchName,
        isKarachiBadarBranchName,
        isIslamabadBranchName,
        isIsbOrKarachiCheckoutBranch,
        isIsbOrKarachiLocalBranchCode,
        isProductUnavailableAtIsbKarachi,
        cartItemBlockedAtIsbKarachi,
        getCartConflictsForIsbKarachi
    };
})(typeof window !== 'undefined' ? window : global);
