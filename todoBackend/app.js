const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 8000
const todoRoutes = require('./ROUTES/TodoRoutes')
require('dotenv').config()
//frontend url = http://localhost:3000
app.use(cors())
require('./db')
app.use(bodyparser.json())
app.use('/todoRoutes',todoRoutes)

app.get('/',(req,res) => {
    res.json({
        message : 'API is working'
    })
})

app.listen(PORT, () => {
    console.log(`Sever is running on PORT ${PORT}`);
})