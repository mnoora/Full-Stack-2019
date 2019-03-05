import React from 'react';

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: 'green'
  }

  if(props.notification){
    return (
      <div style={style}>
        {props.notification}
      </div>
    )
  }else{
    return null
  }

}



export default Notification
