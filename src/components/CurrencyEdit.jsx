import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CurrencyEdit extends React.Component {
  render() {
    const { currency, currencies, handleChange } = this.props;

    return (
      <label htmlFor="currency" onChange={ handleChange }>
        Moeda: &nbsp;
        <select id="currency" data-testid="currency-input" value={ currency }>
          {currencies.map((moedas) => (<option key={ moedas[0] }>{ moedas[0] }</option>))}
        </select>
      </label>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(CurrencyEdit);

CurrencyEdit.propTypes = {
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleChange: PropTypes.func.isRequired,
};
