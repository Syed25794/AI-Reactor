import { collection, getDocs, where } from "firebase/firestore";
import {
  UPDATE_REACTANT,
  ADD_REACTANT,
  REMOVE_REACTANT,
  ADD_TO_HISTORY,
  SET_CHEMICAL_REACTIONS_HISTORY,
  RESET_ALL,
} from "./actionTypes";
import { firestoreDb } from "../../firebase/firebase";
import { query } from "firebase/database";
import { setError } from "../LoadingReducer/action";
import { errorMessageGenerator } from "../../constant/constants";

// Action to update the reactants
export const updateReactants = (reactants) => ({
  type: UPDATE_REACTANT,
  payload: reactants,
});

// Action to add a reactant
export const addReactant = (reactant) => ({
  type: ADD_REACTANT,
  payload: reactant,
});

// Action to remove a reactant
export const removeReactant = (id) => ({
  type: REMOVE_REACTANT,
  payload: id,
});

// Action to reset all the reactants, history and products
export const resetAll = () => ({
  type : RESET_ALL
});

// Action to set the chemial Reaction history
export const setChemialReactionHistory = (reactions) => ({
  type: SET_CHEMICAL_REACTIONS_HISTORY,
  payload: reactions,
});

// Action to add a reaction to history
export const addToHistory = (reaction) => ({
  type: ADD_TO_HISTORY,
  payload: reaction,
});

export const getChemicalReactionHistory = (userId) => async (dispatch) => {
  try {
    const chemicalReactions = [];
    const q = query(collection(firestoreDb, 'chemicalReactions'), where('userId', '==', userId));
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      chemicalReactions.push({ id: doc.id, ...doc.data() });
    });
    dispatch(setChemialReactionHistory(chemicalReactions));
  } catch (error) {
    dispatch(setError(errorMessageGenerator('error')));
  }
};
