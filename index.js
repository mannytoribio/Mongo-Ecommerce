import dotenv from 'dotenv' //npm i dotenv
import express from 'express'
import { ObjectId } from 'mongodb'
// import functions from 'firebase-functions'
import { createCustomer, findCustomers, findCustomersById, updateCutomer } from './src/customers.js'
import { createInventory, findInventory } from './src/inventory.js'
import { createTransactions, findTransactions, findTransactionById } from './src/transactions.js'

dotenv.config()

const app = express()
app.use(express.json())


app.get('/customers/:id', async (req, res) => {
  try {
    const id = new ObjectId(req.params.id)
    let customer = await findCustomersById(req.body)
    res.status(200).send(customer)
  } catch (err) {
    res.status(500).send(err)
    console.log(err)
  }
})

app.patch('/customers/:id', async (req, res) => {
  try {
    const id = new ObjectId(req.params.id)
    let customer = await updateCutomer(req.body)
    res.status(200).send(customer)
  } catch (err) {
    res.status(500).send(err)
    console.log(err)
  }
})

app.get('/customers/', async (req, res) => {
  try { 
    let customer = await findCustomers(req.body)
    res.status(200).send(customer)
  } catch (err) {
    res.status(500).send(err)
    console.log(err)
  }
})

app.post('/customers', async (req, res) => {
  try {
    let customer = await createCustomer(req.body)
    res.status(201).send(customer)
  } catch (err) {
    res.status(500).send(err)
    console.log(err)
  }
})

app.get('/inventory/:id', async (req, res) => findInventory)
app.post('/inventory', async (req, res) => createInventory)

app.post("/transactions", async (req,res) => {
  let transaction =  await createTransactions(req.body)
  try {
    res.status(201).send(transaction)
  } catch(err) {
    res.status(500).send(err)
  }
})
app.get("/transactions", async (req,res) => {
  try {
    let transactions =  await findTransactions()
    res.status(201).send(transactions)
  } catch(err) {
    res.status(500).send(err)
  }
})
app.get("/transactions/:id", async (req,res) => {
  try {
    let id =  new ObjectId(req.params.id)
    let transaction =  await findTransactionById(id)
    res.status(201).send(transaction)
  } catch(err) {
    res.status(500).send(err)
  }
})



app.listen(3000, () => console.log('listening on port 3000'))
// exports.app = functions.https.onRequest(app)
