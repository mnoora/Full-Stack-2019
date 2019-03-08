const blogReducer = (state = [], action) => {

  switch (action.type) {
  case 'NEW_BLOG':
    return state.concat(action.data);

  default:
    return state;
  }
};


export const createBlog = async () => {
  const newBlog = 1; // await blogService.create(data)
  return {
    type: 'NEW_BLOG',
    data: newBlog,
  };
};

export default blogReducer;
