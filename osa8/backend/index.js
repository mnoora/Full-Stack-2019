const { ApolloServer, UserInputError, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const config = require('./util/config')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

mongoose.set('useFindAndModify', false)

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
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author]!
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
    addBook: async (root, args) => {

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
    editAuthor: async (root, args) => {
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
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})