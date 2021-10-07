import { ObjectId } from 'mongodb'
import { createClient } from './client.js'


export const getCustomerCollection = async () => {
  const client = await createClient()
  const db = client.db('mdSportsWearDatabase')
  return db.collection('customers')
}

export const createCustomer = async ({custName, phoneNumber, email, address, repeat}) => {
  const customerCollection = await getCustomerCollection()
  const ret = await customerCollection.insertOne({custName, phoneNumber, email, address, repeat})
  return ret;
}

export const findCustomers = async () => {
  const customerCollection = await getCustomerCollection()
  const ret = await customerCollection.find({})
  // return ret; object single doc
  return ret.toArray()
}


export const findCustomersById = async (id) => {
  const customerCollection = await getCustomerCollection()
  const ret = await customerCollection.findOne(id)
  return ret
}

// export const findCustomersById = async (id) => {
//   const customerCollection = await getCustomerCollection()
//   const ret = await customerCollection.findOne(id)
//   return ret
// }