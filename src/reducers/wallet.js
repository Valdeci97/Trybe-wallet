// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCY_DATA,
  ADD_CHARGE,
  REMOVE_CHARGE,
  CHANGING_INFO,
  CHANGED_INFO,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editingExpense: false,
  expenseToEdit: {},
};

// const SIXTEEN = 16;
// const NINE = 9;

// const idGenerator = () => Math.random().toString(SIXTEEN).substring(2, NINE);

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
  case REMOVE_CHARGE:
    return {
      ...state,
      expenses: state.expenses
        .filter((expense) => expense.description !== (action.payload)),
    };
  case CHANGING_INFO:
    return {
      ...state,
      editingExpense: true,
      expenseToEdit: { ...state.expenses
        .filter((expense) => expense.description === action.payload) },
    };
  case CHANGED_INFO:
    console.log(action.payload, state.expenses[0].description);
    return {
      ...state,
      editingExpense: false,
      expenses: state
        .expenses.reduce((acc, curr) => (curr.description === action.payload.description
          ? acc.concat(action.payload) : acc.concat(curr)), []),
    };
  default:
    return state;
  }
};

export default wallet;
