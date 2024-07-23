// src/context/AuthReducer/action.js
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseAuth } from "../../firebase/firebase";
import { SIGNIN, LOGOUT } from "./actionTypes";

// Action creators
export const signInSuccess = (user) => ({
  type: SIGNIN,
  payload: user,
});

export const logOutSuccess = () => ({
  type: LOGOUT,
});

// Thunk action creators
export const signIn = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const user = userCredential.user;
    dispatch(signInSuccess(user));
    console.log('User signed in:', user);
  } catch (error) {
    console.error('Error signing in:', error);
    // Handle error accordingly, e.g., dispatch an error action
  }
};

export const signUp = (email, password, name) => async (dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: name });
    dispatch(signInSuccess(user)); // Sign in the user after sign-up
    console.log('User signed up:', user);
  } catch (error) {
    console.error('Error signing up:', error);
    // Handle error accordingly, e.g., dispatch an error action
  }
};

export const logOut = () => async (dispatch) => {
  try {
    console.log('User logged out');
    const response = await signOut(firebaseAuth);
    console.log('User logged out:', response)
    dispatch(logOutSuccess());
    console.log('User logged out');
  } catch (error) {
    console.error('Error logging out:', error);
    // Handle error accordingly, e.g., dispatch an error action
  }
};
