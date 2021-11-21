import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { removeChargeAction } from '../actions';

class TableData extends React.Component {
  render() {
    const { expenses, removeExpenses } = this.props;
    return (
      <table>
        {expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ expense.value }</td>
            <td>{ expense.exchangeRates[expense.currency].name.split('/')[0] }</td>
            <td>
              {Number(expense.exchangeRates[expense.currency].ask)
                .toFixed(2)}
            </td>
            <td>
              {Number(expense.exchangeRates[expense.currency].ask * expense.value)
                .toFixed(2)}
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => removeExpenses(expense.description) }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpenses: (payload) => dispatch(removeChargeAction(payload)),
});

TableData.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableData);
