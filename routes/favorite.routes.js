const Router = require('express')
const router = Router()

const authMiddleware = require('../middleware/auth.middleware')

const statisticPhoto = require('../functions/statistic')
const User = require('../models/User')
const Post = require('../models/Post')



router.post('/add', authMiddleware, async (req, res) => {
  try {    
    const userId = req.user.id
    const postId = req.body._id    
        
    const post = await Post.findById(postId)      
    
    const user = await User.findById(userId)

    const favorites = await User.updateOne({_id: userId}, {favorites: [...user.favorites, post]})

    statisticPhoto('ADD_FAV', postId)

    res.status(201).json({ message: 'Successfuly added to favorite', favorites })
  } catch (e) {
    console.log(e);
    res.json({ message: 'Server Error' })
  }
})

router.post('/remove', authMiddleware, async (req, res) => {
  try {

    const userId = req.user.id
    const postId = req.body._id    

    const user = await User.findById(userId)

    console.log('user favorites: ', user.favorites[0]._id)
    console.log('postId: ', postId !== user.favorites[0]._id.toString())

    const filtered = user.favorites.filter(f => f._id.toString() !== postId)

    await User.updateOne({_id: userId}, {favorites: filtered})

    statisticPhoto('REM_FAV', postId)

    res.status(201).json({ message: 'Successfuly removed favorite', favorites: filtered })
  } catch (e) {
    console.log(e);
    res.statusCode(500).json({ message: 'Server Error' })
  }
})

router.get('/get', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id    

    const user = await User.findById(userId)

    const favorites = user.favorites

    if (!favorites) {
      res.json({message: 'Server Error when favorites'})
    }

    res.json(favorites)
  } catch (e) {
    console.log(e);
    res.json({message: e})
  }
})


module.exports = router