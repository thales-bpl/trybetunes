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
      image: '',
    };
    this.displayUserProfile = this.displayUserProfile.bind(this);
  }

  componentDidMount() {
    getUser()
      .then(({ name, email, description, image }) => this.setState({
        loading: false,
        name,
        email,
        description,
        image,
      }));
  }

  displayUserProfile() {
    const { name, email, description, image } = this.state;
    return (
      <section>
        <img data-testid="profile-image" src={ image } alt={ name } />
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
      </section>
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
