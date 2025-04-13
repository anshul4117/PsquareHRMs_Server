const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = async () => {
    try {
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        process.exit(1); // Exit process with failure
    }

};

module.exports =  connectToDatabase ;
