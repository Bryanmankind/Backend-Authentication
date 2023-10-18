const express = require ('express')

const app = express()

app.use(express.static('./public'))

app.get('/sigin', (req,res)=> {
    res.json({
        username: 'makinde',
        password: 'mankind007@',
        email: 'shegeemankind@gmail.com'
    })
})
app.listen(5000, () => {
    console.log('server listening on post 5000...')
})