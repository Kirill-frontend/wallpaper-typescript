const Router = require('express')
const router = Router()

const path = require('path')
const fs = require('fs')


const Post = require('../models/Post')
const User = require('../models/User')

const fetch = require('node-fetch')
const config = require('config')

router.post('/new', async (req, res) => {
  try {
    const file = req.file
    const title = req.body.photoTitle
    const userId = req.body.userId
    const tags = req.body.photoTags

    const user = await User.findById(userId)



    if (!user) {
      return res.json({ message: 'Error when creating a post' })
    }

    if (title.length < 4) {
      res.json({ message: 'Uncorrect Title' })
    }


    if (!file) {
      return res.json({ message: 'Uncorrect File' })
    }

    if (!tags || tags.length < 4) {
      return res.json({ message: 'You must write one or more tags' })
    }

    if (!userId) {
      return res.json({ message: 'Auth Error' })
    }

    const tagInArray = tags.split(',').map(tag => tag.trim())

    const pathToFile = `http://localhost:5000/upload/${file.filename}`

    const post = await Post.create({
      title, photo: pathToFile, author: user.username, authorId: user._id, tags: tagInArray, statistic: {
        favorites: 0,
        downloads: 0,
        likes: 0
      }
    })

    if (!post) {
      return res.json({ message: 'Error when creating a post' })
    }


    return res.json({ data: post })
  } catch (e) {
    console.log(e);
    return res.json({ message: 'Fetching error' })
  }
})

router.get('/:picname', (req, res) => {
  const reqPictureName = req.path
  const filename = reqPictureName.split('/')[1]
  const pathToFile = path.resolve(`pictures/${filename}`)

  if (!fs.existsSync(pathToFile)) {
    res.json({ message: 'Server Error when taking files' })
  }

  res.sendFile(pathToFile)
})



module.exports = router