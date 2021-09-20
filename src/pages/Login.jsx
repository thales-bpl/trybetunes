import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import LoginForm from '../Components/LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  handleChange(event) { // broken
    this.setState({
      name: event.target.value,
    });
  }

  async registerUser(event) {
    event.preventDefault();
    const { name } = this.state;
    await createUser({ name });
  }

  render() {
    const { name } = this.state;
    return (
      <div data-testid="page-login">
        <LoginForm
          onSubmit={ this.registerUser }
          user={ name }
          onChange={ this.handleChange }
        />
      </div>
    );
  }
}

export default Login;
