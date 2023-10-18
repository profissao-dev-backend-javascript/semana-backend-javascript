const express = require('express')
const app = express()

// Sinalizar para o Express que o corpo
// das requisições estará sempre em JSON
app.use(express.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/oi', function (req, res) {
  res.send('Olá, mundo!')
})

// CRUD de lista de DevMon

// const items = ["Java", "Kotlin", "Android", "Express", "NestJS"]
const items = [
  {
    "id": 1,
    "name": "Java",
    "imageUrl": "https://salvatore.academy/devmon/1_java.png"
  },
  {
    "id": 2,
    "name": "Kotlin",
    "imageUrl": "https://salvatore.academy/devmon/2_kotlin.png"
  },
]

// READ ALL - [GET] /items
app.get("/items", function (req, res) {
  res.send(items.filter(Boolean))
})

// READ BY ID - [GET] /items/:id
app.get("/items/:id", function (req, res) {
  // Acessamos o parâmetro de rota ID
  // Subtraímos 1 para corrigir a questão do índice
  // da lista que começa em 0
  const id = +req.params.id

  // Acessamos o item na lista a partir do index
  const item = items.find(function (elemento) {
    return elemento.id === id
  })

  // Exibimos o item obtido
  res.send(item)
})

// CREATE - [POST] /items
app.post("/items", function (req, res) {
  // Extraio a informação do corpo da requisição
  const item = req.body

  if (!item || !item.name || !item.imageUrl) {
    return res.status(400).send({
      message: "name & imageUrl are required."
    })
  }

  item.id = items.length + 1

  // Insiro ela na lista
  items.push(item)

  // Enviamos uma mensagem de sucesso
  res.status(201).send(item)
})

// UPDATE - [PUT] /items/:id
app.put("/items/:id", function (req, res) {
  // Acessamos o parâmetro de rota e corrigimos o índice
  const id = +req.params.id

  // Obtemos o novo item a partir do corpo da requisição
  const newItem = req.body

  // Colocamos o novo item na mesma posição do item anterior
  const index = items.findIndex(function (elemento) {
    return elemento.id === id
  })

  items[index] = {
    ...newItem,
    id,
  }

  // Enviamos uma mensagem de sucesso
  res.send(items[index])
})

// DELETE - [DELETE] /items/:id
app.delete("/items/:id", function (req, res) {
  // Acessamos o parâmetro de rota e corrigimos o índice
  const id = +req.params.id

  const index = items.findIndex(function (element) {
    return elemento.id === id
  })

  // Removemos a informação a partir do índice
  delete items[index]

  // Enviamos uma mensagem de sucesso
  res.send("Item deleted successfully.")
})

app.listen(3000, function () {
  console.log("App running on http://localhost:3000")
})
