import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changedInfoAction } from '../actions/index';
import CurrencyEdit from './CurrencyEdit';
import './form.css';

class EditForm extends React.Component {
  constructor(props) {
    super(props);

    const { expenseToEdit } = this.props;

    this.state = {
      id: expenseToEdit[0].id,
      value: expenseToEdit[0].value,
      currency: expenseToEdit[0].currency,
      method: expenseToEdit[0].method,
      tag: expenseToEdit[0].tag,
      description: expenseToEdit[0].description,
      exchangeRates: expenseToEdit[0].exchangeRates,
    };

    this.handleChange = this.handleChange.bind(this);
    this.editedInfo = this.editedInfo.bind(this);
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  editedInfo() {
    const { edited } = this.props;
    edited(this.state);
  }

  render() {
    const { value, tag, method, description, currency } = this.state;

    return (
      <>
        <label htmlFor="value" onChange={ this.handleChange } className="form-label">
          Valor &nbsp;
          <input
            type="number"
            id="value"
            value={ value }
            data-testid="value-input"
            className="form-input"
          />
        </label>
        <label htmlFor="description" onChange={ this.handleChange } className="form-label">
          Descrição &nbsp;
          <input
            type="text"
            id="description"
            value={ description }
            data-testid="description-input"
            className="form-input"
          />
        </label>
        <CurrencyEdit handleChange={ this.handleChange } value={ currency } />
        <label htmlFor="method" onChange={ this.handleChange } className="form-label">
          Método de pagamento &nbsp;
          <select
            id="method"
            value={ method }
            data-testid="method-input"
            className="form-select"
          >
            <option>Dinheiro</option>
            <option>Crédito</option>
            <option>Débito</option>
          </select>
        </label>
        <label htmlFor="tag" onChange={ this.handleChange } className="form-label">
          Tag &nbsp;
          <select
            id="tag"
            value={ tag }
            data-testid="tag-input"
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
          onClick={ this.editedInfo }
          className="form-button"
        >
          Finalizar edição
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  expenseToEdit: state.wallet.expenseToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  edited: (payload) => dispatch(changedInfoAction(payload)),
});

EditForm.propTypes = {
  expenseToEdit: PropTypes.shape({
    value: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  edited: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
