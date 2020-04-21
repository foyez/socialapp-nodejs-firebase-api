const router = require('express').Router()

const { db } = require('../../util/admin')

router.get('/users', async (req, res) => {
  // try {
  //   const data = await db.collection('screams').get()
  //   let screams = []
  //   data.forEach((doc) => {
  //     screams.push(doc.data())
  //   })
  //   return res.json(screams)
  // } catch (err) {
  //   console.log(err)
  // }
  res.send('Hello world')
})

module.exports = router
