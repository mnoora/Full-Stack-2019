
const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'NOTIFY':
    return action.data.notification;
  default:
    return state;
  }
};

export const notify = (notification) => ({
  type: 'NOTIFY',
  data: { notification },
});


export default notificationReducer;
