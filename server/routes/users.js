const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()

router.get('/', async (req, res) => {
  const users = await loadUsersCollection()
  res.send(await users.find({}).toArray())
})

router.post('/', async (req, res) => {
  const users = await loadUsersCollection()
  console.log(req)
  await users.insertOne({
    user: req.body.text,
    createdAt: new Date()
  })
  res.status(201).send()
})

router.delete('/:id', async (req, res) => {
  const users = await loadUsersCollection()
  await users.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
  res.status(200).send()
})

async function loadUsersCollection() {
  const client = await mongodb.MongoClient.connect('mongodb://neilgamb123:gamble123@ds145694.mlab.com:45694/jazzfest-grids', {
    useNewUrlParser: true
  })

  return client.db('jazzfest-grids').collection('users')
}

module.exports = router
