const Router = require('express')
const router = Router()

const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const config = require('config')

const User = require('../models/User')

const authMiddleware = require('../middleware/auth.middleware')


// /api/auth/registation
router.post('/registation',
  body('email').isEmail(),
  body('password').isLength({ min: 4, max: 12 }),
  async (req, res) => {
    try {
      const { email, password, username } = req.body

      const isValid = validationResult(req).errors

      if (isValid.length) {
        res.status(400).json({ message: 'Uncorrect data' })
      }

      const candidateEmail = await User.findOne({ email })

      if (candidateEmail) {
        return res.status(409).json({ message: 'This mail is already taken' })
      }

      const candidateUsername = await User.findOne({ username })

      if (candidateUsername) {
        return res.status(409).json({ message: 'This username is already taken' })
      }

      const hashPassword = await bcrypt.hash(password, 5)

      const newUser = await User.create({
        email,
        password: hashPassword,
        username
      })


      return res.status(201).json({ message: 'User succesfuly created', data: newUser })
    } catch (e) {
      console.log(e);
      res.json({ message: 'Server Error' })
    }
  })


router.post('/login', async (req, res) => {
  try {

    const { email, password } = req.body

    const user = await User.findOne({ email })


    if (!user) res.status(404).json({ message: 'User not found' })

    const isPassValid = bcrypt.compareSync(password, user.password)

    if (!isPassValid) {
      return res.status(401).json({ message: 'Password not sync' })
    }


    const token = jwt.sign({ id: user.id }, config.get('Secret-Key'), { expiresIn: '24h' })

    return res.json({
      message: 'You success login',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        favorites: user.favorites,
        posts: user.posts
      }
    })
  } catch (e) {
    console.log(e);
    return res.json({ message: 'Server Error' })
  }
})

// /api/auth/auth

router.get('/auth', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)  

    if (!user) res.status(404).json({ message: 'User not found' })


    const token = jwt.sign({ id: user.id }, config.get('Secret-Key'), { expiresIn: '1h' })

    return res.json({
      message: 'Success log in',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        favorites: user.favorites,
        posts: user.posts
      }
    })
  } catch (e) {
    console.log(e);
    res.send({ message: 'Server Error' })
  }
})


module.exports = router
