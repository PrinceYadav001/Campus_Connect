const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        default: '',
    },
    branch: {
        type: String,
        enum: ['CSE', 'ECE', 'IT', 'MBA', 'Other'],
        default: 'CSE',
    },
    year: {
        type: Number,
        min: 1,
        max: 4,
        default: 1,
    },
    enrollmentNo: {
        type: String,
        default: '',
    },
    bio: {
        type: String,
        default: '',
        maxlength: 300,
    },
    phone: {
        type: String,
        default: '',
    },
    github: {
        type: String,
        default: '',
    },
    linkedin: {
        type: String,
        default: '',
    },
    skills: {
        type: [String],
        default: [],
    },
    avatarColor: {
        type: String,
        default: '#7c3aed',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
