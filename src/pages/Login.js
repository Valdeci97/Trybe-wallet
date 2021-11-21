import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmailAction } from '../actions';

import './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.emailValidator = this.emailValidator.bind(this);
    this.onClickRedirect = this.onClickRedirect.bind(this);
  }

  onClickRedirect() {
    const { history, dispatchEmail } = this.props;
    const { email } = this.state;
    dispatchEmail(email);
    history.push('/carteira');
  }

  emailValidator() {
    const { email, password } = this.state;
    const MININUM_CARACTERE = 6;
    const matcher = /^([\w-.]+)@((\[[\d]{1,3}\.)|(([\w]+\.)+))([a-zA-Z]{2,4}|[\d]{1,3})$/;

    const activateButton = !(matcher.test(email) && password.length >= MININUM_CARACTERE);
    this.setState({
      isDisabled: activateButton,
    });
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    }, () => this.emailValidator());
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div className="login-container">
        <form className="login-form">
          <label htmlFor="email">
            Email: &nbsp;&nbsp;
            <input
              data-testid="email-input"
              type="email"
              id="email"
              placeholder="trybewallet@react-redux.com"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <label htmlFor="password">
            Senha: &nbsp;
            <input
              data-testid="password-input"
              type="password"
              id="password"
              placeholder="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.onClickRedirect }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (payload) => dispatch(saveEmailAction(payload)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatchEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

// Expressão regular (regex) original da variável matcher: ^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$
// O que entendi: (^)indica o começo de um texto ([a-zA-Z0-9_]) percorre letras maiúsculas e minúsculas incluindo dígitos e underline/sublinhado (\d) subtitui [0-9], etc.
// fonte de leitura para alterar a regex original para uma com menos de 90 caracteres e que funciona mais ou menos. https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions
// segunda fonte das alterações que fiz na regex da variável matcher https://pt.wikipedia.org/wiki/Express%C3%A3o_regular
