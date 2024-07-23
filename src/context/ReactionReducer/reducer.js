import { ADD_REACTANT, ADD_TO_HISTORY, REMOVE_REACTANT, SET_CHEMICAL_REACTIONS_HISTORY, UPDATE_REACTANT } from "./actionTypes";

const initialState = {
  reactants: [],
  products: [],
  history: [],
};

const reactionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log(type,payload);
  switch (type) {
    case ADD_REACTANT:
      return { ...state, reactants: [...state.reactants, payload] };
    case UPDATE_REACTANT:
      return { ...state, reactants: state.reactants.map((reactant)=> reactant.id === payload.id ? payload : reactant ) };
    case REMOVE_REACTANT:
      return { ...state, reactants: state.reactants.filter(reactant => reactant.id !== action.payload) };
    case SET_CHEMICAL_REACTIONS_HISTORY:
      return { ...state, history: action.payload };
    case ADD_TO_HISTORY:
      return { ...state, history: [...state.history, action.payload] };
    default:
      return state;
  }
};

export default reactionReducer;
