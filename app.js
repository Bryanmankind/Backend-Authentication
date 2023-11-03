if (process.env.NODE_ENV !== "production") {
    require ('dotenv').config()
}

const express = require ('express')
const path = require('path')
const collection = require('./modules/Usershema')
const hbs = require('hbs');
const templatePath = path.join(__dirname, "./templates");
const publicPath = path.join(__dirname, './public');
const bcrypt = require('bcrypt')
const passportInitialize = require('./passportConfig')
const flash = require ('express-flash')
const session = require ('express-session')
const passport = require('passport')
const { check, validationResult } = require('express-validator');

const app = express()
app.use(express.urlencoded({extended: false}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(publicPath));
app.use(express.json())
app.set('view engine', "hbs")
app.set('views', templatePath)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

passportInitialize(passport)

app.use((req, res, next) => {
    res.locals.errorMessage = req.flash('error');
    next();
});

app.get('/', (req,res) => {
    res.render("index")
})

app.get('/CreateAcc', (req,res) => {
    res.render('CreateAcc')
})

app.post ('/index', passport.authenticate ("local", {
    successRedirect: "/Homepage",
    failureRedirect: "/",
    failureFlash: true
}));

app.post(
    '/CreateAcc',
    [
        check('email').isEmail().withMessage('Invalid email address'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            req.flash('error', errorMessages);
            return res.redirect('/CreateAcc');
        }

        const saltRound = 10;

        const usersPassword = await bcrypt.hash(req.body.password, saltRound);
        const data = {
            username: req.body.username,
            password: usersPassword,
            email: req.body.email
        };

        await collection.insertMany([data]);

        res.render('index');
    }
);

app.get('/Homepage', (req,res)=> {
    res.render("Homepage");
});

app.listen(5000, () => {
    console.log('server listening on post 5000...');
});
