const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'HTML on helppoa',
    author: 'Matti',
    url: 'www.html.com',
    likes: 2,
    user: {
      id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'Selain pystyy suorittamaan vain javascriptiä',
    author: 'Matti',
    url: 'www.js.com',
    likes: 54,
    user: {
      id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    title: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
    author: 'Matti',
    url: 'www.http.com',
    likes: 9,
    user: {
      id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }
]

const setToken = newToken => {
  `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll , setToken }