// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_EMAIL, CHANGE_MODE } from '../actions';

const INITIAL_STATE = {
  email: 'teste@teste.com',
  mode: false,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      ...state, email: action.payload,
    };
  case CHANGE_MODE:
    return {
      ...state, mode: !state.mode,
    }
  default:
    return state;
  }
};

export default user;
