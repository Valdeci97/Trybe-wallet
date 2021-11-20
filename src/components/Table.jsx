import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
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
          {
            expenses.map((expense) => {
              const {
                id,
                description,
                tag,
                method,
                value,
                exchangeRates,
                currency,
              } = expense;
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ value }</td>
                  <td>{ exchangeRates[currency].name.split('/')[0] }</td>
                  <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
                  <td>{ Number(exchangeRates[currency].ask * value).toFixed(2) }</td>
                  <td>Real</td>
                </tr>
              );
            })
          }
        </table>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Table);
