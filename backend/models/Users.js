const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    securityQuestion: {type: String, required: true},
    securityAnswer: {type: String, required: true},
    points: {type: Number, default: 0},
    profileImage: {type: mongoose.Schema.Types.ObjectId, ref: 'profileImages', default: null},
    
    // Pickup address for published items
    address: {type: String},
    city: {type: String},
    phoneNumber: {type: String},
    addressNotes: {type: String},

    // User type removed - all users are now community members
});

const User = mongoose.model('User', userSchema);

module.exports = User;