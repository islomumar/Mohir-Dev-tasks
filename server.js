const express = require('express')
const books = require("./router/books")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', books)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => { 
    console.log(PORT, "chi portni eshitishni boshladi")
})