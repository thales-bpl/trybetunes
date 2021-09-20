import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginForm extends Component {
  render() {
    const { user, onSubmit, handleChange } = this.props;
    const MIN_LENGTH = 3;
    return (
      <form onSubmit={ (event) => onSubmit(event) }>
        <label htmlFor="login-name-input">
          User:
          <input
            data-testid="login-name-input"
            value={ user }
            onChange={ (event) => handleChange(event) }
            type="text"
          />
        </label>
        <button
          disabled={ user.length < MIN_LENGTH }
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
