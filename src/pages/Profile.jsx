import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: '',
      email: '',
      description: '',
      profilePic: '',
    };
    this.displayUserProfile = this.displayUserProfile.bind(this);
  }

  componentDidMount() {
    getUser()
      .then(({ name, email, description, profilePic }) => this.setState({
        loading: false,
        name,
        email,
        description,
        profilePic,
      }));
  }

  displayUserProfile() {
    const { name, email, description, profilePic } = this.state;
    return (
      <>
        <img data-testid="profile-image" src={ profilePic } alt={ name } />
        <Link to="/profile/edit">Editar perfil</Link>
        <span>
          <p>Nome:</p>
          <p>{ name }</p>
        </span>
        <span>
          <p>Email:</p>
          <p>{ email }</p>
        </span>
        <span>
          <p>Descrição:</p>
          <p>{ description }</p>
        </span>
      </>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile">Profile</div>
        { loading ? <Loading /> : this.displayUserProfile() }
      </>
    );
  }
}

export default Profile;
