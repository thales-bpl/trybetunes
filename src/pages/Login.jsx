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
      /* email: '',
      description: '',
      profilePic: '', */
      loading: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      name: event.target.value,
      /* email: event.target.value,
      description: event.target.value,
      profilePic: event.target.value, */
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { name/* , email, description, profilePic */ } = this.state;
    this.setState({ loading: true }); // test refat state
    await createUser({ name/* , email, description, profilePic */ });
    (this.setState({ loading: false, redirect: true }));
  }

  render() {
    const { name, /* email, description, profilePic, */ loading, redirect } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-login">
        <LoginForm
          name={ name }
          /* email={ email }
          description={ description }
          profilePic={ profilePic } */
          handleSubmit={ this.handleSubmit }
          handleChange={ this.handleChange }
        />
        {redirect ? <Redirect to="/search" /> : null}
      </div>
    );
  }
}

export default Login;
