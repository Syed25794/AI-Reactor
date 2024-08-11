import { SET_ERROR_FALSE, SET_ERROR_TRUE, SET_LOADING_FALSE, SET_LOADING_TRUE, SET_SUCCESS_FALSE, SET_SUCCESS_TRUE } from "./actionTypes"

// set loading state true
export const setLoadingTrue = () => ({
    type: SET_LOADING_TRUE,
    payload: true
})

// set loading state false
export const setLoadingFalse = () => ({
    type: SET_LOADING_FALSE,
    payload: false
})

// set error and it's message
export const setError = (message) => ({
    type: SET_ERROR_TRUE,
    payload: message
})

// reset error 
export const resetError = () => ({
    type: SET_ERROR_FALSE,
    payload : null 
});
// set success and it's message
export const setSuccess = (message) => ({
    type: SET_SUCCESS_TRUE,
    payload: message
})

// reset success 
export const resetSuccess = () => ({
    type: SET_SUCCESS_FALSE,
    payload : null 
});