const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // MongoDB connection string format:
        // mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
        
        // Option 1: Use full connection string from .env
        // Note: Make sure to include the database name in the connection string
        // Format: mongodb+srv://user:pass@cluster.mongodb.net/database_name?retryWrites=true&w=majority
        let mongoURI = "mongodb+srv://hamzadha5_db_user:3256IerAr1WK22eJ@ordersinfo.vt3hvgd.mongodb.net/test?retryWrites=true&w=majority";
        
        // Option 2: Build from components (if MONGODB_URI not provided)
        if (!mongoURI) {
            const user = process.env.MONGODB_USER || 'hamzadha5_db_user';
            const password = process.env.MONGODB_PASSWORD || '3256lerAr1WK22eJ';
            const cluster = process.env.MONGODB_CLUSTER || 'cluster0.xxxxx'; // Replace xxxxx with your cluster ID
            const db = process.env.MONGODB_DB || 'zoro_burger';
            
            mongoURI = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/${db}?retryWrites=true&w=majority`;
        }
        
        if (!mongoURI || mongoURI.includes('xxxxx')) {
            console.error('⚠️  Please configure your MongoDB connection string!');
            console.error('   Update .env file with MONGODB_URI or edit config/database.js');
            console.error('   See MONGODB_SETUP.md for instructions');
            process.exit(1);
        }
        console.log("Mongodb uri si ", mongoURI)
        // Disable buffering to prevent timeout errors
        mongoose.set('bufferCommands', true);
        
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 50000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 450000, // Close sockets after 45s of inactivity
        });
        
        console.log('✅ MongoDB Connected Successfully');
        console.log(`   Database: ${mongoose.connection.name}`);
        console.log(`   Host: ${mongoose.connection.host}`);
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        console.error('\n💡 Make sure:');
        console.error('   1. Your MongoDB Atlas cluster is running');
        console.error('   2. Your IP address is whitelisted in Network Access');
        console.error('   3. Your username and password are correct');
        console.error('   4. Your connection string is correct');
        console.error('\n   Connection string format:');
        console.error('   mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority');
        process.exit(1);
    }
};

module.exports = connectDB;

