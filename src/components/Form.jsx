import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addChargeAction } from '../actions';
import currencyApi from '../extrafunction/currencyApi';
import CurrencyOptions from './CurrencyOptions';
import EditForm from './EditForm';
import './form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.addExpenseClick = this.addExpenseClick.bind(this);
    this.formRender = this.formRender.bind(this);
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  formRender() {
    const { value, description, method, tag, currency } = this.state;
    return (
      <>
        <label htmlFor="value" className="form-label">
          Valor &nbsp;
          <input
            type="number"
            id="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
            className="form-input"
            placeholder="15,99"
          />
        </label>
        <label htmlFor="description" className="form-label">
          Descrição &nbsp;
          <input
            type="text"
            id="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleChange }
            className="form-input"
            placeholder="1kg ração pets"
          />
        </label>
        <CurrencyOptions handleChange={ this.handleChange } value={ currency } />
        <label htmlFor="method" className="form-label">
          Método de pagamento &nbsp;
          <select
            id="method" value={ method }
            data-testid="method-input"
            onChange={ this.handleChange }
            className="form-select"
          >
            <option>Dinheiro</option>
            <option>Crédito</option>
            <option>Débito</option>
          </select>
        </label>
        <label htmlFor="tag" className="form-label">
          Tag &nbsp;
          <select
            id="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.handleChange }
            className="form-select"
          >
            <option>Alimentação</option>
            <option>Saúde</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.addExpenseClick }
          className="form-button"
        >
          Adicionar Despesa
        </button>
      </>
    );
  }

  async addExpenseClick() {
    const { dispatchExpenses } = this.props;
    const exchangeRates = await currencyApi();
    this.setState({
      exchangeRates,
    });
    dispatchExpenses(this.state);
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  render() {
    const { editingExpense } = this.props;
    return (
      <form className="form-container">
        { editingExpense ? <EditForm /> : this.formRender() }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  editingExpense: state.wallet.editingExpense,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpenses: (payload) => dispatch(addChargeAction(payload)),
});

Form.propTypes = {
  dispatchExpenses: PropTypes.func.isRequired,
  editingExpense: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
