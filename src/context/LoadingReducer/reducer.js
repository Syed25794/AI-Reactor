import { SET_ERROR_FALSE, SET_ERROR_TRUE, SET_LOADING_FALSE, SET_LOADING_TRUE, SET_SUCCESS_FALSE, SET_SUCCESS_TRUE } from "./actionTypes"

const initialState = {
    loading: false,
    error : false,
    errorMessage: '',
    success: false,
    successMessage: ''
}

const loadingReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_LOADING_FALSE:
            return { ...state, loading: false };
        case SET_LOADING_TRUE:
            return { ...state, loading: true };
        case SET_ERROR_FALSE: 
            return { ...state, error: false, errorMessage: action.payload };
        case SET_ERROR_TRUE:
            return { ...state, error: true, errorMessage: action.payload };
        case SET_SUCCESS_FALSE: 
            return { ...state, success: false, successMessage: action.payload };
        case SET_SUCCESS_TRUE:
            return { ...state, success: true, successMessage: action.payload };
        default:
            return state;
    }
};


export default loadingReducer;