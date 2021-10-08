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
  const inventoryCollection = await getInventoryCollection()
  const ret = inventoryCollection.find({})
  return ret.toArray()
}

export const findInventoryById = async (id) => {
  const inventoryCollection = await getInventoryCollection()
  const ret = inventoryCollection.findOne(id)
  return ret
}

export const updateInventory = async (id, {prodName, prodType, prodPrice, prodColor}) => {
  const inventoryCollection = await getInventoryCollection()
  const ret = await inventoryCollection.updateOne({_id:id}, {prodName, prodType, prodPrice, prodColor})
  return ret
}

export const deleteInventory = async (id) => {
  const inventoryCollection = await getInventoryCollection()
  const ret = await inventoryCollection.deleteOne({id})
  return ret
}