const Router = require('express')
const router = Router()

const Post = require('../models/Post')


router.get('/search', async (req, res) => {
  try {
    const criteria = req.query.search

    const posts = await Post.find({ tags: criteria })

    res.json(posts)
  } catch (e) {
    console.log(e);
    throw e
  }
})




module.exports = router