import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)
  
    switch (action.type) {

      case 'NEW_BLOG':
        return state.concat(action.data)

      default:
        return state
      }
  }


export const createBlog = async (data) => {

    const newBlog =1 // await blogService.create(data)
    return {
        type: 'NEW_BLOG',
        data: newBlog,
    }

}

export default blogReducer