const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://dpthinha25036_db_user:5XZ6MBIUPSiJLklM@cluster0.lyv6eq0.mongodb.net/?appName=Cluster0/users_db');
        console.log('Ket noi MongoDB thanh cong');
    } catch (err) {
        console.error('Loi ket noi MongoDB:',err);
        process.exit(1);
    }
};

module.exports = connectDB;