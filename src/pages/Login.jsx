import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import LoginForm from '../Components/LoginForm';
import Loading from '../Components/Loading';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loading: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      name: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name }).then(
      this.setState({ loading: false, redirect: true }),
    );
  }

  render() {
    const { name, loading, redirect } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-login">
        <LoginForm
          name={ name }
          handleSubmit={ this.handleSubmit }
          handleChange={ this.handleChange }
        />
        {redirect ? <Redirect to="/search" /> : null}
      </div>
    );
  }
}

export default Login;
