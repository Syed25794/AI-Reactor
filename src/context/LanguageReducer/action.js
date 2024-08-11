import { SET_LANGUAGE } from "./actionTypes";

// set the language
export const setLanguage = (language) => ({
    type: SET_LANGUAGE,
    payload: language
});
