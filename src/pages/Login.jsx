// O botão para entrar só deve ser habilitado caso o nome digitado tenha 3 ou mais caracteres.
// Ao clicar no botão Entrar, utilize a função createUser da userAPI para salvar o nome digitado. A função createUser espera receber como argumento um objeto com as informações da pessoa

import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  registerUser = () => {
    const { userName } = this.state;
    createUser({ name: userName }); // falhando
  }

  render() {
    const { userName } = this.state;
    const MIN_LENGTH = 3;
    return (
      <>
        <form>
          <label htmlFor="login-name-input">
            User:
            <input
              data-testid="login-name-input"
              value={ userName }
              onChange={ this.handleChange }
              type="text"
            />
          </label>
        </form>
        <button
          disabled={ userName.length > MIN_LENGTH } // falhando
          data-testid="login-submit-button"
          type="submit"
          onClick={ this.registerUser }
        >
          Entrar
        </button>
      </>
    );
  }
}

export default Login;
