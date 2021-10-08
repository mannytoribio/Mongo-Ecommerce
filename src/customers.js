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
  const ret =  customerCollection.find({})
  // return ret; object single doc
  return ret.toArray()
}


export const findCustomersById = async (id) => {
  const customerCollection = await getCustomerCollection()
  const ret = customerCollection.findOne(id)
  return ret
}

export const updateCutomer = async (id, {custName, phoneNumber, email, address, repeat}) => {
  const customerCollection = await getCustomerCollection()
  const ret = await customerCollection.updateOne({_id:id}, {custName, phoneNumber, email, address, repeat})
  return ret
}

export const deleteCutomer = async (id) => {
  const customerCollection = await getCustomerCollection()
  const ret = await customerCollection.deleteOne({id})
  return ret
}