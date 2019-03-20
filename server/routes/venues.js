const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()

// Get Venues
router.get('/', async (req, res) => {
  const venues = await loadVenuesCollection()
  res.send(await venues.find({}).toArray())
})

// Add Venue
router.post('/', async (req, res) => {
  const venues = await loadVenuesCollection()
  await venues.insertOne({
    venue: req.body.text,
    createdAt: new Date()
  })
  res.status(201).send()
})

// Delete Venue
router.delete('/:id', async (req, res) => {
  const venues = await loadVenuesCollection()
  await venues.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
  res.status(200).send()
})

async function loadVenuesCollection() {
  const client = await mongodb.MongoClient.connect('mongodb://neilgamb123:gamble123@ds145694.mlab.com:45694/jazzfest-grids', {
    useNewUrlParser: true
  })

  return client.db('jazzfest-grids').collection('venues')
}

module.exports = router
