const Router = require('express')
const router = Router()

const path = require('path')
const fs = require('fs')
const mime = require('mime')
const statisticPhoto = require('../functions/statistic')
const { default: fetch } = require('node-fetch')
const config = require('config')
const Post = require('../models/Post')

const localUrl = 'https://localhost:5000'


router.get('/:picname', async (req, res) => {  

  const reqPictureName = req.path  

  
  
  const filename = reqPictureName.split('/')[1]      
  console.log(filename)
  const file = path.resolve(`pictures/${filename}`)    
    
  if (!fs.existsSync(file)) {    
    res.json({message: 'Server Error when taking files'})
  }  


  let jsonPhotos = await Post.findOne({photo: `${localUrl}/upload/${filename}`})  

  console.log(jsonPhotos)

  // statisticPhoto('ADD_DOWNLOAD', jsonPhotos._id)
  
  res.download(file)
})


module.exports = router