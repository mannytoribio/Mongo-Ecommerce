import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv'

dotenv.config()
let _client // underscore makes this private and indicates it should not be used

//the below will create 1 client, if it already exist it just returns it
const createClient = async () => {
  if(!_client) {
    _client = new MongoClient(process.env.MONGO_URL)
    await _client.connect()
    }
  return _client
};


const getUserCollection = async () => {
  const client = await createClient()
  const db = client.db('mannysFirstDatabase')
  return db.collection('user')
}


const createUser = async ({userName, dob, email}) => {
  const userCollection = await getUserCollection()
  await userCollection.insertOne({userName, dob, email})
  return {userName, dob, email}
}

const getUsers = async () => {
  const userCollection = await getUserCollection()
  const ret = await userCollection.find({
    userName: 'Manny'
  })
  return ret.toArray()
}

// collection.find(field: { $function })
// $in [v1, v2, v3, v4] is includes at least one of these values
// $all [v1, v2, v3, v4] must include all


const run = async () => {
  const client = await createClient()
  await createUser({
    userName: 'Manny',
    dob: new Date('09/22/1993'),
    email: 'test@gmail.com'
  })
  await client.close()
}

run().then()
