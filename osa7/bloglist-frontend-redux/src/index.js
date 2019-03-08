import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs:blogReducer
})

const store = createStore(reducer)

const renderApp = () => {
  ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)