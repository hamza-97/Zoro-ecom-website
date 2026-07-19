const path = require('path');
const fs = require('fs');

const catalogPath = path.join(__dirname, 'menuProductCatalog.json');
const MENU_PRODUCT_CATALOG = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

module.exports = { MENU_PRODUCT_CATALOG };
