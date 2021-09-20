import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginForm extends Component {
  render() {
    const { name, handleSubmit, handleChange } = this.props;
    const MIN_LENGTH = 3;
    return (
      <form onSubmit={ (event) => handleSubmit(event) }>
        <label htmlFor="login-name-input">
          User:
          <input
            data-testid="login-name-input"
            name={ name }
            onChange={ handleChange }
            type="text"
          />
        </label>
        <button
          disabled={ name.length < MIN_LENGTH }
          data-testid="login-submit-button"
          type="submit"
        >
          Entrar
        </button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  user: PropTypes.string,
  onSubmit: PropTypes.func,
  handleChange: PropTypes.func,
}.isRequired;

export default LoginForm;
