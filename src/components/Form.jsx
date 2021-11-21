import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addChargeAction } from '../actions';
import currencyApi from '../extrafunction/currencyApi';
import CurrencyOptions from './CurrencyOptions';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.addExpenseClick = this.addExpenseClick.bind(this);
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  async addExpenseClick() {
    const { dispatchExpenses } = this.props;
    const exchangeRates = await currencyApi();
    this.setState({
      exchangeRates,
    });
    dispatchExpenses(this.state);
    this.setState({
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  render() {
    const { value, description, method, tag } = this.state;
    return (
      <form>
        <label htmlFor="value" onChange={ this.handleChange }>
          Valor: &nbsp;
          <input
            type="number"
            id="value"
            value={ value }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description" onChange={ this.handleChange }>
          Descrição: &nbsp;
          <input
            type="text"
            id="description"
            value={ description }
            data-testid="description-input"
          />
        </label>
        <CurrencyOptions handleChange={ this.handleChange } />
        <label htmlFor="method" onChange={ this.handleChange }>
          Método de pagamento: &nbsp;
          <select id="method" value={ method } data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag" onChange={ this.handleChange }>
          Tag: &nbsp;
          <select id="tag" value={ tag } data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.addExpenseClick }>Adicionar Despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchExpenses: (payload) => dispatch(addChargeAction(payload)),
});

Form.propTypes = {
  dispatchExpenses: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Form);
