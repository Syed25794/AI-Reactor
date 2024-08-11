import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './AuthReducer/reducer.js';
import { thunk } from 'redux-thunk';
import languageReducer from './LanguageReducer/reducer.js';
import reactionReducer from './ReactionReducer/reducer.js';
import loadingReducer from './LoadingReducer/reducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  language: languageReducer,
  reactions: reactionReducer,
  loading: loadingReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
