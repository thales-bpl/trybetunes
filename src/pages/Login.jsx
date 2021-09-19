// O botão para entrar só deve ser habilitado caso o nome digitado tenha 3 ou mais caracteres.
// Ao clicar no botão Entrar, utilize a função createUser da userAPI para salvar o nome digitado. A função createUser espera receber como argumento um objeto com as informações da pessoa

import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <>
        <form>
          <label htmlFor="login-name-input">
            User:
            <input
              data-testid="login-name-input"
              name=""
              /* value={ name } */
              /* onChange={ handleChange } */
              type="text"
            />
          </label>
        </form>
        <button
          data-testid="login-submit-button"
          type="submit"
        >
          Entrar
        </button>
      </>
    );
  }
}

export default Login;
