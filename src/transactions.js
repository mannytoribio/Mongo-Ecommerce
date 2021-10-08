import { createClient } from './client.js'


export const getTransactionCollection = async () => {
  const client = await createClient()
  const db = client.db('mdSportsWearDatabase')
  return db.collection('transactions')
}

export const createTransactions = async ({customerId, inventoryId, date}) => {
  const customerCollection = await getTransactionCollection()
  await customerCollection.insertOne({customerId, inventoryId, date})
  return {customerId, inventoryId, date}
}

export const findTransactions = async () => {
  const transactionCollecion = await getTransactionCollection()
  const ret = await transactionCollecion.find({})
  return ret.toArray()
}