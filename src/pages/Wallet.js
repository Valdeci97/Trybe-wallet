import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changedInfoAction } from '../actions';
import Form from '../components/Form';
import Table from '../components/Table';
import './headerWallet.css';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.chargeAmount = this.chargeAmount.bind(this);
    this.logoff = this.logoff.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    const isAuthenticated = localStorage.getItem('email');
    if (!isAuthenticated) {
      return history.push('/');
    }
  }

  chargeAmount() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, curr) => {
      const { currency, exchangeRates, value } = curr;
      const convertion = Number(exchangeRates[currency].ask * value);
      return acc + convertion;
    }, 0);
    return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  logoff() {
    const { history } = this.props;
    localStorage.removeItem('email');
    history.push('/');
  }

  render() {
    const { email } = this.props;

    return (
      <>
        <header className="header-container">
          <h3 data-testid="email-field">
            { email }
          </h3>
          <span data-testid="total-field">
            Despesa total:
            {' '}
            { this.chargeAmount() }
          </span>
          <button
            type="button"
            className="logoff-btn"
            onClick={ this.logoff }
          >
            Sair
          </button>
        </header>
        <Form />
        <Table />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email || localStorage.getItem('email'),
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  edited: (payload) => dispatch(changedInfoAction(payload)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
