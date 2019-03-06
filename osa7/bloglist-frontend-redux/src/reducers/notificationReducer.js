
const notificationReducer = (state = null, action) => {
    switch (action.type) {
    case 'NOTIFY':
      return action.data.notification
    default:
      return state
    }
}

export const notify = (notification, time) => {
        return {
          type: 'NOTIFY',
          data: {notification: notification}
        }
    }
    

export default notificationReducer