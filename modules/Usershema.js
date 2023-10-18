const mongoose = require ("mongoose")

const Signin = new mongoose.Schema({
    username: {type:String, trim:true, default: ''},
    password: {type:String, trim:true, default: ''},
    email: {type:String, trim:true, default:''}
})

module.exports = mongoose.model('Signin', Signin)