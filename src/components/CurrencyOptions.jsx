import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currencyApiThunk } from '../actions';

class CurrencyOptions extends React.Component {
  componentDidMount() {
    const { dispatchCurrency } = this.props;
    dispatchCurrency();
  }

  render() {
    const { handleChange, currencies } = this.props;
    return (
      <label htmlFor="currency" onChange={ handleChange }>
        Moeda: &nbsp;
        <select id="currency" data-testid="currency-input">
          {currencies.map((moedas) => (moedas[0] === 'USDT'
            ? null : <option key={ moedas[0] }>{ moedas[0] }</option>))}
        </select>
      </label>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrency: (payload) => dispatch(currencyApiThunk(payload)),
});

CurrencyOptions.propTypes = {
  dispatchCurrency: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyOptions);
