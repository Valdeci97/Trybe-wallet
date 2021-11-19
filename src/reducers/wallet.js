// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCY_DATA, ADD_CHARGE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCY_DATA:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_CHARGE:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length,
        ...action.payload,
      }],
    };
  default:
    return state;
  }
};

export default wallet;
