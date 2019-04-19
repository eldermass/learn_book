import { actionTypes } from "../actions";

const initState = {
  number: 0
};

const countNumberReducer = function(state = initState, action) {
  // console.log(action)
  switch (action.type) {
    case actionTypes.COUNT_NUMBER:
      return {
        ...state, number: action.payload
      };
    default:
      return state;
  }
};

export default {
  countNumberReducer
};
