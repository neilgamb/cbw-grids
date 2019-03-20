const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()

// Get Events
router.get('/', async (req, res) => {
  const events = await loadEventsCollection()
  res.send(await events.find({}).toArray())
})

// Add Event
router.post('/', async (req, res) => {
  const events = await loadEventsCollection()
  await events.insertOne({
    event: req.body.text,
    createdAt: new Date()
  })
  res.status(201).send()
})

// Delete Event
router.delete('/:id', async (req, res) => {
  const events = await loadEventsCollection()
  await events.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
  res.status(200).send()
})

async function loadEventsCollection() {
  const client = await mongodb.MongoClient.connect('mongodb://neilgamb123:gamble123@ds145694.mlab.com:45694/jazzfest-grids', {
    useNewUrlParser: true
  })

  return client.db('jazzfest-grids').collection('events')
}

module.exports = router
