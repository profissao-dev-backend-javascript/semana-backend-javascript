const express = require('express')
const { MongoClient } = require('mongodb')

const url = 'mongodb+srv://admin:F7bO3w2SRMr48qKL@cluster0.ik2tzro.mongodb.net'
const client = new MongoClient(url)
const dbName = 'db-semana-backend-javascript'

async function main() {
  // Conexão com Banco de Dados
  console.info("Connecting to database...")
  await client.connect()
  console.info("Database connected successfully!")

  const db = client.db(dbName)
  const collection = db.collection('items')

  // Inicialização do express
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
  app.get("/items", async function (req, res) {
    const documents = await collection.find().toArray()

    res.send(documents)
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
  app.post("/items", async function (req, res) {
    // Extraio a informação do corpo da requisição
    const item = req.body

    // Validamos o corpo da requisição, garantindo que tem
    // as propriedades corretas
    if (!item || !item.name || !item.imageUrl) {
      return res.status(400).send({
        message: "name & imageUrl are required."
      })
    }

    // Calculamos o novo ID a partir da quantidade de itens na lista
    // item.id = items.length + 1

    // Insiro ela na lista
    // items.push(item)

    // Inserir o item na collection
    await collection.insertOne(item)

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

    // Pegamos todas as propriedades do newItem e atualizamos
    // na lista, mantendo o ID atual
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

    // Buscamos o índice da lista para o elemento com o ID passado
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
}

main()
