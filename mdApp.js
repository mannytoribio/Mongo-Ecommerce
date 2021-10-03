import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv' //npm i dotenv
import faker from 'faker'

dotenv.config();
let _client;

const createClient = async () => {
  if(!_client) {
    _client = new MongoClient(process.env.MONGO_URL)
    await _client.connect()
    }
  return _client
};

const getCustomerCollection = async () => {
  const client = await createClient()
  const db = client.db('mdSportsWearDatabase')
  return db.collection('customers')
}

const createCustomer = async ({custName, phoneNumber, email, address, repeat}) => {
  const customerCollection = await getCustomerCollection()
  const ret = await customerCollection.insertOne({custName, phoneNumber, email, address, repeat})
  return ret;
}

// how can we add multiple customers at a time?


const getInventoryCollection = async () => {
  const client = await createClient()
  const db = client.db('mdSportsWearDatabase')
  return db.collection('inventory')
}

const createInventory = async ({prodName, prodType, prodPrice, prodColor}) => {
  const invetoryCollection = await getInventoryCollection()
  return await invetoryCollection.insertOne({prodName, prodType, prodPrice, prodColor})
}

const getTransactionCollection = async () => {
  const client = await createClient()
  const db = client.db('mdSportsWearDatabase')
  return db.collection('transactions')
}

let date = new Date()

const createTransactions = async ({customerId, inventoryId, date}) => {
  const customerCollection = await getTransactionCollection()
  await customerCollection.insertOne({customerId, inventoryId, date})
  return {customerId, inventoryId, date}
}

const runNTimes = (n) => {
  
}

const findCustomers = async () => {
  const customerCollection = await getCustomerCollection()
  const ret = await customerCollection.find({});
  // return ret; object single doc
  return ret.toArray()
};


// the code below runs and adds new documents

const run = async () => {
  const client = await createClient()
  const customers = await findCustomers()
  console.log(customers)
  await client.close()
}


// const run = async () => {
//   const client = await createClient()
//   const customer = await createCustomer({
//     custName: faker.name.firstName(), 
//     phoneNumber: faker.phone.phoneNumber(), 
//     email: faker.internet.email(), 
//     address: faker.address.city(), 
//     repeat: true,
//   })
//   const inventory = await createInventory({
//     prodName: faker.commerce.productName(), 
//     prodType: faker.commerce.productDescription(), 
//     prodPrice: faker.commerce.price(), 
//     prodColor: faker.commerce.color(), 
    
//   })
//   const transaction = await createTransactions({
//     customerId: customer.insertedId, 
//     inventoryId: inventory.insertedId, 
//     date: faker.date.past()
//   })
//   console.log(customer.insertedId);
//   console.log(inventory.insertedId);
//   console.log(transaction.insertedId);
//   await client.close()
// }

run().then()

// list out customers, inventory, and transactions; use find and filters. 
// Find orders by customer ID
// filter product by color (find by)
