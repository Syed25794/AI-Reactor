import { translations } from "../../utils/LanguageData";
import { SET_LANGUAGE } from "./actionTypes";

const initialState = {
  language: 'en',
  translations: translations['en'], // default to English
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      const newLanguage = action.payload;
      return {
        ...state,
        language: newLanguage,
        translations: translations[newLanguage], // Update the translations based on the selected language
      };
    default:
      return state;
  }
};

export default languageReducer;

  