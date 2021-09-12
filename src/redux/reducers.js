// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './reducers/auth'
import navbar from './reducers/navbar'
import layout from './reducers/layout'
import group from './reducers/groups'
import simulator from './reducers/simulators'
import lesson from './reducers/lessons'
import page from './reducers/pages'
import chapters from './reducers/chapters'
import promocodes from './reducers/promocodes'
import characters from './reducers/characters'
import theory from './reducers/theory'
import shop from './reducers/shop'

const rootReducer = combineReducers({
  auth,
  navbar,
  group,
  simulator,
  page,
  layout, 
  lesson, 
  chapters, 
  promocodes,
  characters,
  theory,
  shop
})

export default rootReducer
