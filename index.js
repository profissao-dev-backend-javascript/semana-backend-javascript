const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/oi', function (req, res) {
  res.send('Olá, mundo!')
})

// CRUD de lista de DevMon

const items = ["Java", "Android", "Kotlin", "Express", "NestJS"]

// READ ALL - [GET] /items
app.get("/items", function (req, res) {
  res.send(items)
})

app.listen(3000, function () {
  console.log("App running on http://localhost:3000")
})
