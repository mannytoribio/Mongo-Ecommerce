import { createClient } from './client.js'


export const getInventoryCollection = async () => {
  const client = await createClient()
  const db = client.db('mdSportsWearDatabase')
  return db.collection('inventory')
}

export const createInventory = async ({prodName, prodType, prodPrice, prodColor}) => {
  const inventoryCollection = await getInventoryCollection()
  return await inventoryCollection.insertOne({prodName, prodType, prodPrice, prodColor})
}


export const findInventory = async () => {
  const inventoryCollection = await getTransactionCollection()
  const ret = await inventoryCollection.find({})
  return ret.toArray()
}