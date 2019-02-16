const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if(blogs.length === 0){
    return 0
  }
  return blogs.map( blog => blog.likes).reduce((firstValue, secondValue) => firstValue + secondValue)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const mostLiked = Math.max.apply( Math, likes )
  const favBlog = blogs.find(blog => blog.likes === mostLiked)
  return favBlog
}

const mostBlogs = (blogs) => {
  const groupedBlogs = _.groupBy(blogs, 'author')

  const mBlogs = _.max(_.values(groupedBlogs), function(blog) { return blog.length})
  return { author: mBlogs[0].author,
    blogs: mBlogs.length }
}

const mostLikes = (blogs) => {
  const groupBlogs = _.groupBy(blogs, blog => blog.author)
  const mLikes = _.sortBy(groupBlogs, b => totalLikes(b))
  const idx = _.keys(groupBlogs).length - 1
  const numberOfLikes =totalLikes(mLikes[idx])
  const author = mLikes[idx][0].author
  return { author: author,
    likes: numberOfLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}