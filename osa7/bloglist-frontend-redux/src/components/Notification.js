import React from 'react';
import { Alert } from 'react-bootstrap';

const Notification = (props) => {
  const notification = props.store.getState().notification
  if(notification){
    return (
      <div>
        <Alert variant="success">{notification}</Alert>
      </div>
    )
  }else{
    return null
  }

}

export default Notification
