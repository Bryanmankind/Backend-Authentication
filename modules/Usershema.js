const mongoose = require ("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/signinPage')
.then(() => {
    console.log ('mongodb connected');
})
.catch((error) => {
    console.log("failed to connect", error);
})

const Signin = new mongoose.Schema({ 
    username: { type: String, trim: true },
    password: { type: String, trim: true },
    email: { type: String, trim: true }
});


const collection = new  mongoose.model('Collection1', Signin)

module.exports = collection