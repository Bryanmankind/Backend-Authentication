const express = require ('express')
const path = require('path')
const collection = require('./modules/Usershema')
const hbs = require('hbs');
const templatePath = path.join(__dirname, "./templates");
const publicPath = path.join(__dirname, './public');


const app = express()
app.use(express.static(publicPath));
app.use(express.json())
app.set('view engine', "hbs")
app.set('views', templatePath)
app.use(express.urlencoded({extended: false}))


app.get('/', (req,res) => {

    res.render("index")
})

app.get('/CreateAcc', (req,res) => {
    res.render('CreateAcc')
})

app.post('/CreateAcc', async(req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }
    await collection.insertMany([data])

    res.render('index')
})

// app.get('/homepage', (req,res)=> {
//     res.render("homepage")
// })
app.listen(5000, () => {
    console.log('server listening on post 5000...')
})   