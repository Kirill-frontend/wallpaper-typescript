const Router = require('express')
const router = Router()

const auth = require('../middleware/auth.middleware')

const fetch = require('node-fetch')

const config = require('config')

const urlPosts = config.get('URL-Photos')
const urlUser = config.get('URL-Users')





router.get('/posts', async (req, res) => {
  try {
    const response = await fetch(urlPosts)
    const photos = await response.json()

    if (!response.ok) {
      res.send({ message: '/posts Server Error' })
    }

    res.json(photos)
  } catch (e) {
    console.log(e);
    res.send({ message: 'Server Error' })
  }
})

router.get('/getmyphotos', auth, async (req, res) => {
  try {
    const userId = req.user.id

    let posts = []


    const responseUser = await fetch(urlUser + '/' + userId)
    const jsonUser = await responseUser.json()

    if (!responseUser.ok) {
      res.json({ message: 'No get own posts' })
    }

    const responsePosts = await fetch(urlPosts)
    const responsePostsJSON = await responsePosts.json()

    if (!responsePosts.ok) {
      res.json({ message: 'Server Error' })
    }    
    
    jsonUser.posts.forEach(postId => {      
      responsePostsJSON.forEach(post => {
        if (postId === post.id) {          
          posts.push(post)
        }
      })
    })    

    res.json(posts)
  } catch (e) {
    console.log(e);
    res.json({ message: 'Server Error' })
  }
})

router.post('/delete', auth, async (req, res) => {
  const userId = req.user.id
  const postId = req.body.id

  let posts = []  

  const responseUser = await fetch(urlUser + '/' + userId)
  const jsonUser = await responseUser.json()

  const indexDeletePost = jsonUser.posts.indexOf(postId)


  if (!responseUser.ok) {
    res.json({ message: 'No get own posts' })
  }

  jsonUser.posts = jsonUser.posts.filter((item, index) => index != indexDeletePost)
  jsonUser.favorites = jsonUser.favorites.filter((item, index) => index != indexDeletePost)
  

  // const responsePost = await fetch(urlPosts + '/' + postId)
  // const postJSON = await responsePost.json()

  // if (!responsePost.ok) {
  //   res.json({ message: 'Server Error' })
  // }

  const deletePostREQ = await fetch(urlPosts + '/' + postId, { method: 'DELETE' })

  if (!deletePostREQ.ok) {
    res.json({ message: 'Error when delete photos' })
  }  

  const removePostsRes = await fetch(urlUser + '/' + userId, {
    method: 'PATCH',
    body: JSON.stringify(jsonUser),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!removePostsRes.ok) {
    res.json({ message: 'Error when delete photos' })
  }

  const responsePosts = await fetch(urlPosts)
  const responsePostsJSON = await responsePosts.json()

  

  if (!responsePosts.ok) {
    res.json({ message: 'Server Error' })
  }

  jsonUser.posts.forEach(postId => {      
    responsePostsJSON.forEach(post => {
      if (postId === post.id) {          
        posts.push(post)
      }
    })
  })  

  res.json({ message: 'Success delete photo', posts })
})

module.exports = router