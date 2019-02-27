
const notificationReducer = (state = null, action) => {
    switch (action.type) {
    case 'NOTIFY':
      return action.data.notification
    default:
      return state
    }
}

export const notify = (notification) => {
    return (dispatch) => {
        dispatch({
          type: 'NOTIFY',
          data: {notification: notification}
        })
        setTimeout(() => {
            dispatch({ 
                type: 'NOTIFY',
                data: {
                    notification: null 
                }})
          }, 5000)
    }}
    

export default notificationReducer