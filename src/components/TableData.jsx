import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { removeChargeAction, changingInfoAction } from '../actions';
import './table-data.css';

class TableData extends React.Component {
  constructor(props) {
    super(props);

    this.currencyFormat = this.currencyFormat.bind(this);
  }

  currencyFormat(name) {
    if (name.exchangeRates[name.currency]) {
      const string = name.exchangeRates[name.currency].code;
      return string;
    }
  }

  render() {
    const { expenses, removeExpenses, startEdition, isEditing } = this.props;
    return (
      <tbody className="table-container">
        {expenses.map((expense) => (
          <tr key={ expense.id } className="table-data-row">
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ 
                  Number(expense.value).toLocaleString('pt-BR',
                   { 
                    style: 'currency',
                    currency: `${ this.currencyFormat(expense) }`,
                   })
                }
            </td>
            <td>{ expense.exchangeRates[expense.currency].name.split('/')[0] }</td>
            <td>
              {Number(expense.exchangeRates[expense.currency].ask)
                .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </td>
            <td>
              {Number(expense.exchangeRates[expense.currency].ask * expense.value)
                .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </td>
            <div className="button-container">
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => startEdition(expense.id) }
                className="edit-btn"
                disabled={ isEditing }
              >
                <img
                  src="https://img.icons8.com/glyph-neue/64/000000/edit.png"
                  alt="lápis"
                  width="20px"
                  height="20px"
                />
              </button>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => removeExpenses(expense.id) }
                className="delete-btn"
                disabled={ isEditing }
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/delete-sign--v2.png"
                  alt="letra X"
                  width="20px"
                  height="20px"
                />
              </button>
            </div>
          </tr>
        ))}
      </tbody>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  isEditing: wallet.editingExpense,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpenses: (payload) => dispatch(removeChargeAction(payload)),
  startEdition: (payload) => dispatch(changingInfoAction(payload)),
});

TableData.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpenses: PropTypes.func.isRequired,
  startEdition: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableData);
