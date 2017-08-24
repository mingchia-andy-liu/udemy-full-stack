import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './authReducer'
import surveysReducer from './surveysReducer'

export const initState = {}

export default combineReducers({
    auth: authReducer,
    // has to name it form from redux-from docs
    form: formReducer,
    surveys: surveysReducer
})
