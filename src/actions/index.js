import currencyApi from '../extrafunction/currencyApi';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const CHANGE_MODE = 'CHANGE_MODE';
export const GET_CURRENCY_DATA = 'GET_CURRENCY_DATA';
export const ADD_CHARGE = 'ADD_CHARGE';
export const REMOVE_CHARGE = 'REMOVE_CHARGE';
export const CHANGING_INFO = 'CHANGING_INFO';
export const CHANGED_INFO = 'CHANGED_INFO';

export const saveEmailAction = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

// export const changeModeAction = (payload) => ({
//   type: CHANGE_MODE,
//   payload,
// });

export const getCurrencyAction = (payload) => ({
  type: GET_CURRENCY_DATA,
  payload,
});

export const addChargeAction = (payload) => ({
  type: ADD_CHARGE,
  payload,
});

export const removeChargeAction = (payload) => ({
  type: REMOVE_CHARGE,
  payload,
});

export const changingInfoAction = (payload) => ({
  type: CHANGING_INFO,
  payload,
});

export const changedInfoAction = (payload) => ({
  type: CHANGED_INFO,
  payload,
});

export const currencyApiThunk = () => async (dispatch) => {
  try {
    const response = await currencyApi();
    dispatch(getCurrencyAction(Object.entries(response)));
  } catch (error) {
    console.log(error);
  }
};
