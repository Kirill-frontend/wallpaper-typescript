const Router = require('express')
const router = Router()

const auth = require('../middleware/auth.middleware')
const sAuth = require('../middleware/specialAuth.middleware')

const fetch = require('node-fetch')

const config = require('config')

const urlPosts = config.get('URL-Photos')
const urlUser = config.get('URL-Users')

const statisticPhoto = require('../functions/statistic')
const User = require('../models/User')
const Post = require('../models/Post')


router.get('/posts', sAuth, async (req, res) => {
  try {
    const userId = req.user?.id

    const photos = await Post.find({})


    if (photos.length === 0) {
      res.send([])
    } else {
      if (userId) {
        const user = await User.findById(userId)
        photos.forEach(photo => {
          if (user.liked.includes(photo._id)) {
            photo.isLike = true
          } else {
            photo.isLike = false
          }
        })
      } 


      res.json(photos)
    }
  } catch (e) {
    console.log(e);
    res.send({ message: 'Server Error' })
  }
})

router.get('/getmyphotos', auth, async (req, res) => {
  try {
    const userId = req.user.id

    const user = await User.findById(userId)

    if (!user) {
      res.json({ message: 'No get own posts' })
    }

    const posts = await Post.find({ author: user.username })

    res.json(posts)
  } catch (e) {
    console.log(e);
    res.json({ message: 'Server Error' })
  }
})

router.post('/delete', auth, async (req, res) => {
  const userId = req.user.id
  const postId = req.body._id

  const user = await User.findById(userId)
  

  await Post.deleteOne({ _id: postId })

  await User.updateOne({ _id: userId }, { liked: user.liked.filter(p => p !== postId) })

  const posts = await Post.find({ authorId: user._id })

  res.json({ message: 'Success delete photo', posts })
})

// /api/photo/like/1231231
router.get('/like/:id', auth, async (req, res) => {
  const userId = req.user.id
  const photoId = req.params.id

  const user = await User.findById(userId)

  await User.updateOne({ _id: userId }, { liked: [...user.liked, photoId] })

  await statisticPhoto('LIKE_PHOTO', photoId)

  res.json({ message: 'liked'})

})

router.get('/unlike/:id', auth, async (req, res) => {
  const userId = req.user.id
  const photoId = req.params.id

  const user = await User.findById(userId)

  await User.updateOne({ _id: userId }, { liked: user.liked.filter(p => p !== photoId) })

  await statisticPhoto('UNLIKE_PHOTO', photoId)


  res.json({ message: 'unliked'})
})

module.exports = router

// Delete the file from server 
