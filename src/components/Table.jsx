import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { removeChargeAction } from '../actions';

class Table extends React.Component {
  render() {
    const { expenses, removeExpenses } = this.props;
    return (
      <table>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </table>
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
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => removeExpenses(expense.id) }
              >
                Excluir
              </button>
            </tr>
          ))}
        </table>
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

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);

// Fonte sobre como montar tabela com react: https://www.youtube.com/watch?v=R6sRxQ9nd0A
