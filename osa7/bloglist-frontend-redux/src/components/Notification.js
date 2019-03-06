import React from 'react';
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.store.getState().notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: 'green'
  }
  if(notification){
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }else{
    return null
  }

}
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}


export default Notification
