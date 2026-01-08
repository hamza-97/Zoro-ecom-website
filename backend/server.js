// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const webpush = require('web-push');
const connectDB = require('./config/database');
const Order = require('./models/Order');
const Product = require('./models/Product');
const AdminUser = require('./models/AdminUser');
const Rider = require('./models/Rider');
const Customer = require('./models/Customer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'user-id', 'user-type', 'user_id', 'user_type', 'Authorization'],
    exposedHeaders: ['Content-Type'],
    credentials: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../')));

// VAPID keys for push notifications
// Load from environment variables (set in .env file)
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    console.error('❌ ERROR: VAPID keys not found!');
    console.error('Please set VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY in your .env file');
    console.error('Generate keys using: node generate-vapid-keys.js');
    process.exit(1);
}

console.log('✅ VAPID keys loaded successfully');

webpush.setVapidDetails(
    'mailto:admin@zoroburger.com',
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
);

// Helper function to send push notifications to all available riders
async function notifyAllRiders(orderData) {
    try {
        // Determine location based on branch
        let riderLocation = 'gulberg'; // default
        if (orderData.branch && orderData.branch.toLowerCase().includes('johar')) {
            riderLocation = 'jt';
        } else if (orderData.branch && orderData.branch.toLowerCase().includes('gulberg')) {
            riderLocation = 'gulberg';
        }

        const availableRiders = await Rider.find({ 
            is_active: true, 
            is_available: true,
            location: riderLocation, // Filter by location
            'push_subscriptions.0': { $exists: true } // Has at least one subscription
        });

        if (availableRiders.length === 0) {
            console.log(`No riders with push subscriptions available for location: ${riderLocation}`);
            return;
        }

        console.log(`Notifying ${availableRiders.length} riders in ${riderLocation} for order ${orderData.order_number}`);

        const notificationPayload = JSON.stringify({
            title: 'New Order Available! 🚴',
            body: `Order ${orderData.order_number} - ${orderData.customer_name} (${orderData.branch})`,
            url: '/rider.html?tab=available',
            orderId: orderData._id.toString()
        });

        const promises = [];
        
        for (const rider of availableRiders) {
            for (const subscription of rider.push_subscriptions) {
                try {
                    const pushSubscription = {
                        endpoint: subscription.endpoint,
                        keys: {
                            p256dh: subscription.keys.p256dh,
                            auth: subscription.keys.auth
                        }
                    };
                    
                    promises.push(
                        webpush.sendNotification(pushSubscription, notificationPayload)
                            .catch(err => {
                                console.error(`Failed to send notification to rider ${rider.name}:`, err);
                                // Remove invalid subscription
                                if (err.statusCode === 410 || err.statusCode === 404) {
                                    rider.push_subscriptions = rider.push_subscriptions.filter(
                                        sub => sub.endpoint !== subscription.endpoint
                                    );
                                    rider.save().catch(e => console.error('Error removing subscription:', e));
                                }
                            })
                    );
                } catch (error) {
                    console.error(`Error processing subscription for rider ${rider.name}:`, error);
                }
            }
        }

        await Promise.allSettled(promises);
        console.log(`✅ Push notifications sent to ${availableRiders.length} rider(s)`);
    } catch (error) {
        console.error('Error sending push notifications:', error);
    }
}

// Helper function to generate order number
function generateOrderNumber() {
    return 'ZORO-' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
}

// Initialize default admin user (only after MongoDB is connected)
async function initializeAdmin() {
    try {
        // Wait for MongoDB connection
        if (mongoose.connection.readyState !== 1) {
            console.log('Waiting for MongoDB connection...');
            await new Promise((resolve) => {
                mongoose.connection.once('connected', resolve);
            });
        }
        
        const adminExists = await AdminUser.findOne({ username: 'admin' });
        if (!adminExists) {
            await AdminUser.create({
                username: 'admin',
                password: 'admin123',
                user_type: 'super_admin'
            });
            console.log('✅ Default admin user created');
        } else if (!adminExists.user_type) {
            // Update existing admin to have super_admin type
            adminExists.user_type = 'super_admin';
            await adminExists.save();
            console.log('✅ Updated existing admin user with user_type');
        }
    } catch (error) {
        console.error('Error initializing admin:', error);
    }
}

// Initialize default riders (only after MongoDB is connected)
async function initializeRiders() {
    try {
        // Wait for MongoDB connection
        if (mongoose.connection.readyState !== 1) {
            await new Promise((resolve) => {
                mongoose.connection.once('connected', resolve);
            });
        }
        
        const riders = [
            { phone: '03001234567', password: 'rider123', name: 'Ahmed Khan', username: 'ahmed_khan', location: 'gulberg' },
            { phone: '03001234568', password: 'rider123', name: 'Ali Hassan', username: 'ali_hassan', location: 'jt' },
            { phone: '03001234569', password: 'rider123', name: 'Usman Malik', username: 'usman_malik', location: 'gulberg' }
        ];
        
        // Update existing riders that don't have usernames or location
        const existingRidersNeedingUpdate = await Rider.find({ 
            $or: [
                { username: { $exists: false } },
                { username: null },
                { username: '' },
                { location: { $exists: false } },
                { location: null },
                { location: '' }
            ]
        });
        for (const rider of existingRidersNeedingUpdate) {
            const updateData = {};
            
            // Generate username if needed
            if (!rider.username) {
                let baseUsername = rider.name ? rider.name.toLowerCase().replace(/\s+/g, '_') : `rider_${rider.phone}`;
                let username = baseUsername;
                let counter = 1;
                
                // Ensure username is unique
                while (await Rider.findOne({ username, _id: { $ne: rider._id } })) {
                    username = `${baseUsername}_${counter}`;
                    counter++;
                }
                updateData.username = username;
            }
            
            // Set default location if missing
            if (!rider.location) {
                updateData.location = 'gulberg'; // default location
            }
            
            if (Object.keys(updateData).length > 0) {
                await Rider.findByIdAndUpdate(rider._id, updateData, { runValidators: false });
                console.log(`✅ Updated existing rider: ${rider.name}`, updateData);
            }
        }
        
        for (const riderData of riders) {
            const riderExists = await Rider.findOne({ phone: riderData.phone });
            if (!riderExists) {
                await Rider.create({
                    username: riderData.username,
                    name: riderData.name,
                    phone: riderData.phone,
                    password: riderData.password,
                    vehicle_type: 'bike',
                    is_active: true,
                    is_available: true,
                    location: riderData.location
                });
                console.log(`✅ Default rider created: ${riderData.name} (${riderData.location})`);
            } else {
                // Update existing rider if missing username or location
                const updateData = {};
                if (!riderExists.username) {
                    updateData.username = riderData.username;
                }
                if (!riderExists.location) {
                    updateData.location = riderData.location;
                }
                if (Object.keys(updateData).length > 0) {
                    await Rider.findByIdAndUpdate(riderExists._id, updateData);
                    console.log(`✅ Updated rider: ${riderData.name}`, updateData);
                }
            }
        }
    } catch (error) {
        console.error('Error initializing riders:', error);
    }
}

// Connect to MongoDB and initialize
(async () => {
    try {
        await connectDB();
        await initializeAdmin();
        await initializeRiders();
    } catch (error) {
        console.error('Failed to initialize:', error);
    }
})();

// API Routes

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({ available: true }).sort({ category: 1, name: 1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create order
app.post('/api/orders', async (req, res) => {
    try {
        const {
            customer_name,
            customer_email,
            customer_phone,
            customer_address,
            branch,
            order_type,
            items,
            subtotal,
            delivery_fee,
            tax,
            total,
            payment_method,
            notes,
            delivery_location,
            source
        } = req.body;

        if (!customer_name || !customer_phone || !branch || !order_type || !items || !total) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const orderNumber = generateOrderNumber();

        const orderData = {
            order_number: orderNumber,
            customer_name,
            customer_email: customer_email || '',
            customer_phone,
            customer_address: customer_address || '',
            branch,
            order_type,
            items,
            subtotal,
            delivery_fee: delivery_fee || 0,
            discount: 0,
            tax: tax || 0,
            total,
            payment_method: payment_method || 'cash',
            notes: notes || '',
            status: 'ordered',
            payment_status: 'pending',
            source: source || 'website'
        };

        // Add delivery location if provided
        if (delivery_location && delivery_location.latitude && delivery_location.longitude) {
            orderData.delivery_location = {
                latitude: delivery_location.latitude,
                longitude: delivery_location.longitude,
                timestamp: delivery_location.timestamp ? new Date(delivery_location.timestamp) : new Date()
            };
        }

        const order = await Order.create(orderData);

        res.json({
            success: true,
            order_id: order._id,
            order_number: orderNumber,
            message: 'Order placed successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Authentication middleware for admin routes
async function authenticateAdmin(req, res, next) {
    try {
        // HTTP headers are case-insensitive, but Express converts them to lowercase
        const user_id = req.headers['user_id'] || req.headers['user-id'];
        const user_type = req.headers['user_type'] || req.headers['user-type'];
        
        console.log('Auth headers received:', { user_id, user_type, allHeaders: Object.keys(req.headers) });
        
        if (!user_id || !user_type) {
            console.error('Missing auth headers:', { user_id: !!user_id, user_type: !!user_type });
            return res.status(401).json({ error: 'Authentication required' });
        }
        
        // Verify user exists and is valid
        const user = await AdminUser.findById(user_id);
        if (!user) {
            console.error('User not found for ID:', user_id);
            return res.status(401).json({ error: 'Invalid authentication' });
        }
        
        // Ensure user_type is set
        let userType = user.user_type;
        if (!userType) {
            userType = 'super_admin';
            user.user_type = userType;
            await user.save();
        }
        
        if (userType !== user_type) {
            console.error('User type mismatch:', { db: userType, header: user_type });
            return res.status(401).json({ error: 'Invalid authentication' });
        }
        
        // Attach user info to request
        req.user = {
            id: user._id.toString(),
            username: user.username,
            user_type: userType
        };
        
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ error: 'Authentication failed' });
    }
}

// Get all orders (for admin)
app.get('/api/orders', authenticateAdmin, async (req, res) => {
    try {
        const { status, limit = 100 } = req.query;
        const query = status ? { status } : {};
        
        // Filter by branch based on user type (case-insensitive partial match)
        if (req.user.user_type === 'gulberg') {
            query.branch = { $regex: /gulberg/i }; // Case-insensitive match for "Gulberg"
        } else if (req.user.user_type === 'jt') {
            query.branch = { $regex: /(jt|johar)/i }; // Case-insensitive match for "JT" or "Johar" anywhere in string
        }
        // super_admin sees all orders (no branch filter)
        
        const orders = await Order.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .lean(); // Use lean() for better performance
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get single order
app.get('/api/orders/:id', async (req, res) => {
    try {
        let order;
        
        // Try to find by MongoDB _id first
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            order = await Order.findById(req.params.id);
        }
        
        // If not found, try by order_number
        if (!order) {
            order = await Order.findOne({ order_number: req.params.id });
        }

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update order status or details (for admin)
app.patch('/api/orders/:id', authenticateAdmin, async (req, res) => {
    try {
        // Find the order first
        let order;
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            order = await Order.findById(req.params.id);
        } else {
            order = await Order.findOne({ order_number: req.params.id });
        }

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const { 
            status, 
            payment_status,
            customer_name,
            customer_email,
            customer_phone,
            customer_address,
            branch,
            order_type,
            items,
            subtotal,
            delivery_fee,
            discount,
            tax,
            total,
            payment_method,
            notes
        } = req.body;

        const updateData = {};
        const isEditRequest = customer_name || items || branch || order_type || subtotal !== undefined || total !== undefined;
        
        // If this is an edit request (not just status update), check if order can be edited
        if (isEditRequest) {
            // Orders can only be edited if status is 'ordered' or 'pending'
            if (order.status !== 'ordered' && order.status !== 'pending') {
                return res.status(400).json({ 
                    error: 'Order cannot be edited because it has already been confirmed or is in progress. Only orders with status "ordered" or "pending" can be edited.' 
                });
            }
            
            // Allow editing all order fields
            if (customer_name) updateData.customer_name = customer_name;
            if (customer_email !== undefined) updateData.customer_email = customer_email;
            if (customer_phone) updateData.customer_phone = customer_phone;
            if (customer_address !== undefined) updateData.customer_address = customer_address;
            if (branch) updateData.branch = branch;
            if (order_type) updateData.order_type = order_type;
            if (items) updateData.items = items;
            if (subtotal !== undefined) updateData.subtotal = subtotal;
            if (delivery_fee !== undefined) updateData.delivery_fee = delivery_fee;
            if (discount !== undefined) updateData.discount = discount;
            if (tax !== undefined) updateData.tax = tax;
            if (total !== undefined) updateData.total = total;
            
            // Recalculate total if items, subtotal, discount, delivery_fee, or tax changed
            if (items || subtotal !== undefined || discount !== undefined || delivery_fee !== undefined || tax !== undefined) {
                const currentSubtotal = subtotal !== undefined ? subtotal : (items ? 
                    items.reduce((sum, item) => sum + (item.total || (item.price * (item.quantity || 1))), 0) : 
                    order.subtotal);
                const currentDiscount = discount !== undefined ? discount : (order.discount || 0);
                const currentDeliveryFee = delivery_fee !== undefined ? delivery_fee : (order.delivery_fee || 0);
                const currentTax = tax !== undefined ? tax : ((currentSubtotal - currentDiscount) * 0.16); // 16% tax on subtotal after discount
                const calculatedTotal = currentSubtotal - currentDiscount + currentDeliveryFee + currentTax;
                updateData.total = calculatedTotal;
                if (tax === undefined) updateData.tax = currentTax;
            }
            if (payment_method) updateData.payment_method = payment_method;
            if (notes !== undefined) updateData.notes = notes;
        }
        
        // Status and payment_status can always be updated (separate from edit)
        if (status) updateData.status = status;
        if (payment_status) updateData.payment_status = payment_status;

        // When admin confirms order, set status to awaiting_rider if it's a delivery order
        if (status === 'confirmed') {
            const currentOrder = order;
            if (currentOrder && currentOrder.order_type === 'delivery') {
                updateData.status = 'awaiting_rider';
            }
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        // Update the order
        let updatedOrder;
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            updatedOrder = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true });
        } else {
            updatedOrder = await Order.findOneAndUpdate(
                { order_number: req.params.id },
                updateData,
                { new: true }
            );
        }

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Send push notification to all riders when order becomes awaiting_rider
        if (updateData.status === 'awaiting_rider' && updatedOrder.order_type === 'delivery') {
            notifyAllRiders(updatedOrder).catch(err => console.error('Error notifying riders:', err));
        }

        res.json({ success: true, message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get order statistics (for admin dashboard)
app.get('/api/stats', authenticateAdmin, async (req, res) => {
    try {
        const stats = {};
        
        // Build branch filter based on user type (case-insensitive partial match)
        const branchFilter = {};
        if (req.user.user_type === 'gulberg') {
            branchFilter.branch = { $regex: /gulberg/i }; // Case-insensitive match for "Gulberg"
        } else if (req.user.user_type === 'jt') {
            branchFilter.branch = { $regex: /^(jt|johar|johar town)/i }; // Case-insensitive match for "JT" or "Johar"
        }
        // super_admin sees all stats (no branch filter)

        // Total orders
        stats.total_orders = await Order.countDocuments(branchFilter);

        // Orders by status
        const statusCounts = await Order.aggregate([
            { $match: branchFilter },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        stats.orders_by_status = {};
        statusCounts.forEach(item => {
            stats.orders_by_status[item._id] = item.count;
        });

        // Total revenue (from paid orders)
        const revenueMatch = { payment_status: 'paid', ...branchFilter };
        const revenueResult = await Order.aggregate([
            { $match: revenueMatch },
            { $group: { _id: null, total: { $sum: '$total' } } }
        ]);
        stats.total_revenue = revenueResult[0]?.total || 0;

        // Today's orders
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const todayMatch = {
            createdAt: {
                $gte: today,
                $lt: tomorrow
            },
            ...branchFilter
        };

        const todayStats = await Order.aggregate([
            {
                $match: todayMatch
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                    total: { $sum: '$total' }
                }
            }
        ]);

        stats.today_orders = todayStats[0]?.count || 0;
        stats.today_revenue = todayStats[0]?.total || 0;

        res.json(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get all customers (extracted from orders)
app.get('/api/customers', authenticateAdmin, async (req, res) => {
    try {
        // Only super_admin can view customers
        if (req.user.user_type !== 'super_admin') {
            return res.status(403).json({ error: 'Access denied. Super admin only.' });
        }
        
        // Aggregate unique customers from orders
        const customers = await Order.aggregate([
            {
                $group: {
                    _id: '$customer_phone',
                    name: { $first: '$customer_name' },
                    phone: { $first: '$customer_phone' },
                    email: { $first: '$customer_email' },
                    address: { $first: '$customer_address' },
                    total_orders: { $sum: 1 },
                    total_spent: { $sum: '$total' },
                    first_order_date: { $min: '$createdAt' },
                    last_order_date: { $max: '$createdAt' }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    phone: 1,
                    email: 1,
                    address: 1,
                    total_orders: 1,
                    total_spent: 1,
                    first_order_date: 1,
                    last_order_date: 1
                }
            },
            {
                $sort: { last_order_date: -1 }
            }
        ]);

        res.json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: error.message });
    }
});

// Admin login (simple authentication)
app.post('/api/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        const admin = await AdminUser.findOne({ username, password });

        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Ensure user_type is set (for existing users created before user_type was added)
        let userType = admin.user_type;
        if (!userType) {
            // Default to super_admin for existing users without user_type
            userType = 'super_admin';
            admin.user_type = userType;
            await admin.save();
        }

        res.json({ 
            success: true, 
            message: 'Login successful',
            user: {
                id: admin._id.toString(),
                username: admin.username,
                user_type: userType
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all admin users
app.get('/api/admin/users', authenticateAdmin, async (req, res) => {
    try {
        // Only super_admin can view users
        if (req.user.user_type !== 'super_admin') {
            return res.status(403).json({ error: 'Access denied. Super admin only.' });
        }
        
        const users = await AdminUser.find({}).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        console.error('Error fetching admin users:', error);
        res.status(500).json({ error: error.message });
    }
});

// Create new admin user
app.post('/api/admin/users', authenticateAdmin, async (req, res) => {
    try {
        // Only super_admin can create users
        if (req.user.user_type !== 'super_admin') {
            return res.status(403).json({ error: 'Access denied. Super admin only.' });
        }
        
        const { username, password, user_type } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        if (!user_type || !['gulberg', 'jt', 'super_admin'].includes(user_type)) {
            return res.status(400).json({ error: 'Valid user_type required (gulberg, jt, or super_admin)' });
        }

        // Check if username already exists
        const existingUser = await AdminUser.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const newUser = await AdminUser.create({
            username,
            password,
            user_type
        });

        // Return user without password
        const userResponse = await AdminUser.findById(newUser._id).select('-password');
        res.status(201).json({
            success: true,
            user: userResponse,
            message: 'Admin user created successfully'
        });
    } catch (error) {
        console.error('Error creating admin user:', error);
        res.status(500).json({ error: error.message });
    }
});

// Update admin user
app.patch('/api/admin/users/:id', authenticateAdmin, async (req, res) => {
    try {
        // Only super_admin can update users
        if (req.user.user_type !== 'super_admin') {
            return res.status(403).json({ error: 'Access denied. Super admin only.' });
        }
        
        const { id } = req.params;
        const { username, password, user_type } = req.body;

        const updateData = {};
        if (username) updateData.username = username;
        if (password) updateData.password = password;
        if (user_type) {
            if (!['gulberg', 'jt', 'super_admin'].includes(user_type)) {
                return res.status(400).json({ error: 'Invalid user_type' });
            }
            updateData.user_type = user_type;
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        // Check if username already exists (if updating username)
        if (username) {
            const existingUser = await AdminUser.findOne({ 
                username, 
                _id: { $ne: id } 
            });
            if (existingUser) {
                return res.status(400).json({ error: 'Username already exists' });
            }
        }

        const updatedUser = await AdminUser.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            success: true,
            user: updatedUser,
            message: 'Admin user updated successfully'
        });
    } catch (error) {
        console.error('Error updating admin user:', error);
        res.status(500).json({ error: error.message });
    }
});

// Delete admin user
app.delete('/api/admin/users/:id', authenticateAdmin, async (req, res) => {
    try {
        // Only super_admin can delete users
        if (req.user.user_type !== 'super_admin') {
            return res.status(403).json({ error: 'Access denied. Super admin only.' });
        }
        
        const { id } = req.params;

        // Prevent deleting the default admin user
        const user = await AdminUser.findById(id);
        if (user && user.username === 'admin') {
            return res.status(400).json({ error: 'Cannot delete the default admin user' });
        }

        const deletedUser = await AdminUser.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            success: true,
            message: 'Admin user deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting admin user:', error);
        res.status(500).json({ error: error.message });
    }
});

// ==================== RIDER API ENDPOINTS ====================

// Rider login
app.post('/api/riders/login', async (req, res) => {
    try {
        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(400).json({ error: 'Phone and password required' });
        }

        const rider = await Rider.findOne({ phone, password, is_active: true });

        if (!rider) {
            return res.status(401).json({ error: 'Invalid credentials or rider inactive' });
        }

        res.json({
            success: true,
            rider: {
                id: rider._id,
                name: rider.name,
                phone: rider.phone,
                email: rider.email,
                vehicle_type: rider.vehicle_type,
                is_available: rider.is_available,
                location: rider.location
            },
            message: 'Login successful'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get available orders (awaiting rider assignment)
app.get('/api/riders/available-orders', async (req, res) => {
    try {
        const { rider_id } = req.query;
        
        // Get rider's location
        let riderLocation = null;
        if (rider_id) {
            const rider = await Rider.findById(rider_id);
            if (rider) {
                riderLocation = rider.location;
            }
        }
        
        const orders = await Order.find({
            status: 'awaiting_rider',
            order_type: 'delivery',
            rider_id: null
        })
        .sort({ createdAt: 1 }) // Oldest first (first come first serve)
        .lean();
        
        // Filter orders by location if rider location is available
        let filteredOrders = orders;
        if (riderLocation) {
            filteredOrders = orders.filter(order => {
                if (!order.branch) return false;
                const branchLower = order.branch.toLowerCase();
                
                if (riderLocation === 'jt') {
                    return branchLower.includes('johar');
                } else if (riderLocation === 'gulberg') {
                    return branchLower.includes('gulberg');
                }
                return false;
            });
        }

        res.json(filteredOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Accept an order (first come first serve)
app.post('/api/riders/accept-order/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { rider_id, rider_name } = req.body;

        if (!rider_id || !rider_name) {
            return res.status(400).json({ error: 'Rider ID and name required' });
        }

        // Check if rider exists and is active
        const rider = await Rider.findById(rider_id);
        if (!rider || !rider.is_active) {
            return res.status(404).json({ error: 'Rider not found or inactive' });
        }

        // Find the order
        let order;
        if (orderId.match(/^[0-9a-fA-F]{24}$/)) {
            order = await Order.findById(orderId);
        } else {
            order = await Order.findOne({ order_number: orderId });
        }

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Check if order location matches rider location
        if (rider.location && order.branch) {
            const branchLower = order.branch.toLowerCase();
            const isJoharOrder = branchLower.includes('johar');
            const isGulbergOrder = branchLower.includes('gulberg');
            
            if ((rider.location === 'jt' && !isJoharOrder) || 
                (rider.location === 'gulberg' && !isGulbergOrder)) {
                return res.status(403).json({ 
                    error: 'You can only accept orders from your assigned location' 
                });
            }
        }

        // Check if order is still available (first come first serve)
        if (order.status !== 'awaiting_rider' || order.rider_id) {
            return res.status(400).json({ error: 'Order already assigned to another rider' });
        }

        // Assign order to rider atomically
        const updatedOrder = await Order.findOneAndUpdate(
            {
                _id: order._id,
                status: 'awaiting_rider',
                rider_id: null
            },
            {
                rider_id: rider_id,
                rider_name: rider_name,
                accepted_at: new Date(),
                status: 'in_kitchen' // Move to in_kitchen after rider accepts
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(409).json({ error: 'Order was just accepted by another rider. Please refresh and try again.' });
        }

        res.json({
            success: true,
            order: updatedOrder,
            message: 'Order accepted successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get rider's assigned orders
app.get('/api/riders/my-orders/:riderId', async (req, res) => {
    try {
        const { riderId } = req.params;
        const { status } = req.query;

        const query = { rider_id: riderId };
        if (status) {
            query.status = status;
        }

        const orders = await Order.find(query)
            .sort({ accepted_at: -1, createdAt: -1 })
            .lean();

        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update order status (for rider)
app.patch('/api/riders/orders/:orderId/status', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status, rider_id, delivery_location } = req.body;

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        if (!rider_id) {
            return res.status(400).json({ error: 'Rider ID is required' });
        }

        // Find the order
        let order;
        if (orderId.match(/^[0-9a-fA-F]{24}$/)) {
            order = await Order.findById(orderId);
        } else {
            order = await Order.findOne({ order_number: orderId });
        }

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Verify rider owns this order
        if (order.rider_id && order.rider_id.toString() !== rider_id) {
            return res.status(403).json({ error: 'You are not assigned to this order' });
        }

        // Update order status
        order.status = status;
        
        // If delivery location is provided (when marking as delivered), save it
        // If status is delivered but no location is provided, that's okay - location is optional
        if (delivery_location && status === 'delivered') {
            order.delivery_location = {
                latitude: delivery_location.latitude,
                longitude: delivery_location.longitude,
                accuracy: delivery_location.accuracy || null,
                timestamp: delivery_location.timestamp ? new Date(delivery_location.timestamp) : new Date()
            };
        } else if (status === 'delivered' && !delivery_location) {
            // Mark that location was not provided - set delivery_location to null explicitly
            // This allows us to distinguish between "not delivered yet" and "delivered without location"
            order.delivery_location = {
                latitude: null,
                longitude: null,
                accuracy: null,
                timestamp: new Date()
            };
        }
        
        await order.save();

        res.json({
            success: true,
            order: order,
            message: 'Order status updated successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update rider availability
app.patch('/api/riders/:riderId/availability', async (req, res) => {
    try {
        const { riderId } = req.params;
        const { is_available } = req.body;

        const rider = await Rider.findByIdAndUpdate(
            riderId,
            { is_available: is_available !== undefined ? is_available : true },
            { new: true }
        );

        if (!rider) {
            return res.status(404).json({ error: 'Rider not found' });
        }

        res.json({
            success: true,
            rider: rider,
            message: 'Availability updated successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get VAPID public key for push notifications
app.get('/api/push/vapid-public-key', (req, res) => {
    res.json({ publicKey: VAPID_PUBLIC_KEY });
});

// Save push subscription for a rider
app.post('/api/riders/:riderId/push-subscription', async (req, res) => {
    try {
        const { riderId } = req.params;
        const { subscription } = req.body;

        if (!subscription || !subscription.endpoint || !subscription.keys) {
            return res.status(400).json({ error: 'Invalid subscription data' });
        }

        const rider = await Rider.findById(riderId);
        if (!rider) {
            return res.status(404).json({ error: 'Rider not found' });
        }

        // Check if subscription already exists
        const existingIndex = rider.push_subscriptions.findIndex(
            sub => sub.endpoint === subscription.endpoint
        );

        if (existingIndex >= 0) {
            // Update existing subscription
            rider.push_subscriptions[existingIndex] = {
                endpoint: subscription.endpoint,
                keys: {
                    p256dh: subscription.keys.p256dh,
                    auth: subscription.keys.auth
                },
                createdAt: rider.push_subscriptions[existingIndex].createdAt || new Date()
            };
        } else {
            // Add new subscription
            rider.push_subscriptions.push({
                endpoint: subscription.endpoint,
                keys: {
                    p256dh: subscription.keys.p256dh,
                    auth: subscription.keys.auth
                },
                createdAt: new Date()
            });
        }

        await rider.save();

        res.json({
            success: true,
            message: 'Push subscription saved successfully'
        });
    } catch (error) {
        console.error('Error saving push subscription:', error);
        res.status(500).json({ error: error.message });
    }
});

// Serve admin dashboard
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin.html'));
});

// Serve order detail page
app.get('/order-detail', (req, res) => {
    res.sendFile(path.join(__dirname, '../order-detail.html'));
});

// Serve rider app
app.get('/rider', (req, res) => {
    res.sendFile(path.join(__dirname, '../rider.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Admin dashboard: http://localhost:${PORT}/admin`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
});
