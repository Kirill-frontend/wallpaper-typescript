const Post = require("../models/Post")

// ADD_FAV, REM_FAV, ADD_DOWNLOAD, LIKE_PHOTO, UNLIKE_PHOTO
async function statisticPhoto(type, postId) {
  try {
    const post = await Post.findById(postId)


    if (type === 'ADD_FAV') {
      await Post.updateOne({ _id: postId }, { $set: { "statistic.favorites": post.statistic.favorites + 1 } })
    } else if (type === 'REM_FAV') {
      await Post.updateOne({ _id: postId }, { $set: { "statistic.favorites": post.statistic.favorites - 1 } })
    } else if (type === 'ADD_DOWNLOAD') {
      await Post.updateOne({ _id: postId }, { $set: { "statistic.downloads": post.statistic.downloads + 1 } })
    } else if (type === 'LIKE_PHOTO') {
      await Post.updateOne({ _id: postId }, { $set: { "statistic.likes": post.statistic.likes + 1 } })
    } else if (type === 'UNLIKE_PHOTO') {
      await Post.updateOne({ _id: postId }, { $set: { "statistic.likes": post.statistic.likes - 1 } })
    }
  } catch (e) {
    console.log(e);
    return new Error(e)
  }
}

module.exports = statisticPhoto