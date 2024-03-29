import axios from 'axios'

import { FETCH_USER, FETCH_SURVEYS } from './types'

export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user')

    dispatch({
        type: FETCH_USER,
        payload: res.data
    })
}

export const handleToken = (token) => async (dispatch) => {
    const res = await axios.post('/api/stripe', token)

    // assume the api endpoint returns the same User Model
    // thus re-using the same type
    dispatch({
        type: FETCH_USER,
        payload: res.data
    })
}

export const submitSurvey = (values, history) => async (dispatch) => {
    const res = await axios.post('/api/surveys', values)

    history.push('/surveys')
    dispatch({
        type: FETCH_USER,
        payload: res.data
    })
}

export const fetchSurvey = (values) => async (dispatch) => {
    const res = await axios.get('/api/surveys')

    dispatch({
        type: FETCH_SURVEYS,
        payload: res.data
    })
}
