
const notificationReducer = (state = null, action) => {
    switch (action.type) {
    case 'NOTIFY':
      return action.data.notification
    default:
      return state
    }
}

export const notify = (notification, time) => {
    return async (dispatch) => {
        dispatch({
          type: 'NOTIFY',
          data: {notification: notification}
        })
        await setTimeout(() => {
            dispatch({ 
                type: 'NOTIFY',
                data: {
                    notification: null 
                }})
        }, time * 1000)
    }}
    

export default notificationReducer