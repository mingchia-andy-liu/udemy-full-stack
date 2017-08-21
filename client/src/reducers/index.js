import { combineReducers } from 'redux'
import authReducer from './authReducer'

export const initState = {}

export default combineReducers({
    auth: authReducer
})
