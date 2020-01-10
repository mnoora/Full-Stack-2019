const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const uuid = require('uuid/v1')
const config = require('./util/config')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'secret'

const mongodb = config.MONGO_URI

console.log('connecting to',  mongodb)

mongoose.connect(mongodb, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`

  type Book {
    title: String!
    published: Int!
    author: Author! 
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: ID!
    bookCount: Int
    born: Int!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
      bookCount: () => Book.collection.countDocuments,
      authorCount: () => Author.collection.countDocuments,
      allBooks: async (root, args) => {
        const author = args.author
        const genre = args.genre

        const books = await Book.find({}).populate('author')

        if (!author && !genre){
          return books
        }
        if( author || genre){
          
          const booksFilteredByGenre = books.filter(book => book.genres.indexOf(args.genre) > -1)
          const booksFilteredByAuthor =  books.filter(book => book.author.name === author)

          if (author && genre){
            const booksFilteredByGenreAndAuthor = booksFilteredByAuthor.filter(book => book.genres.indexOf(genre) > -1)
            return booksFilteredByGenreAndAuthor
          }
          if (author) {
            return booksFilteredByAuthor
          }
          if (genre) {
            return booksFilteredByGenre
          }
        }


      },
      allAuthors: (root,args) => {
        return Author.find({})
      },
      me: (root, args, context) => {
        return context.currentUser
      }
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({name: root.name})
      const countBooks = await Book.find({author: author })
      return countBooks.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      console.log(currentUser)
      if(!currentUser){
        throw new AuthenticationError('not authenticated')
      }

      let bookAuthor = await Author.findOne({name: args.author})

      if(bookAuthor === null){
        bookAuthor = await new Author({name: args.author, born: 0})
        try {
          await bookAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      const book = new Book({...args, author: bookAuthor._id }).populate('author')
      try {
        await book.save()
      } catch (error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOne( {name: args.name})

      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: async (root, args) => {
      console.log(args)
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      console.log(user)
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
});