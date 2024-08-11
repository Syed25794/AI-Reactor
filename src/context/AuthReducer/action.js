import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "../../firebase/firebase";
import { SIGNIN, LOGOUT } from "./actionTypes";
import { setError, setLoadingFalse, setLoadingTrue, setSuccess } from "../LoadingReducer/action";
import { errorMessageGenerator, successMessageGenerator } from "../../constant/constants";
import { resetAll } from "../ReactionReducer/action";

// Action creators
export const signInSuccess = (user) => ({
  type: SIGNIN,
  payload: user,
});

export const logOutSuccess = () => ({
  type: LOGOUT,
});

// Thunk action creators
export const signIn = (email, password, language) => async (dispatch) => {
  try {
    dispatch(setLoadingTrue());
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const user = userCredential.user;
    dispatch(signInSuccess(user));
    dispatch(setLoadingFalse());
    dispatch(setSuccess(successMessageGenerator('login',language)))
  } catch (error) {
    dispatch(setLoadingFalse());
    dispatch(setError(errorMessageGenerator(error.code,language)))
  }
};

export const signUp = (email, password, language) => async (dispatch) => {
  try {
    dispatch(setLoadingTrue());
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const user = userCredential.user;
    dispatch(signInSuccess(user));
    dispatch(setSuccess(successMessageGenerator('signup',language)))
    dispatch(setLoadingFalse());
  } catch (error) {
    dispatch(setLoadingFalse());
    dispatch(setError(errorMessageGenerator(error.code,language)))
  }
};
export const forgotPassword = (email, language) => async (dispatch) => {
  dispatch(setLoadingTrue());
  try {
    await sendPasswordResetEmail(firebaseAuth, email);
    dispatch(setSuccess(successMessageGenerator('resetPassword',language)));
  } catch (error) {
    dispatch(setError(errorMessageGenerator(error.code,language)));
  } finally {
    dispatch(setLoadingFalse());
  }
};
export const logOut = (language) => async (dispatch) => {
  try {
    dispatch(setLoadingTrue());
    await signOut(firebaseAuth);
    dispatch(logOutSuccess());
    dispatch(setLoadingFalse());
    dispatch(setSuccess(successMessageGenerator('logout',language)));
    dispatch(resetAll());
  } catch (error) {
    dispatch(setLoadingFalse());
    dispatch(setError(errorMessageGenerator(error.code,language)))

  }
};
