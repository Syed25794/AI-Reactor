import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './AuthReducer/reducer.js';
import { thunk } from 'redux-thunk';
import themeReducer from './ThemeReducer/reducer.js';
import languageReducer from './LanguageReducer/reducer.js';
import reactionReducer from './ReactionReducer/reducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  language: languageReducer,
  reactions: reactionReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
