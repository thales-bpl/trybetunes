import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: '',
      email: '',
      image: '',
      description: '',
      redirect: false,
    };
    this.profileEditForm = this.profileEditForm.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getUserData();
  }

  handleChange({ target: { id, value } }) {
    this.setState({
      [id]: value,
    });
  }

  async handleClick(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const { name, email, image, description } = this.state;
    const newUser = { name, email, image, description };
    await updateUser(newUser);
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  getUserData() {
    getUser()
      .then(({ name, email, image, description }) => this.setState({
        loading: false,
        name,
        email,
        image,
        description,
      }));
  }

  profileEditForm() {
    const { name, email, image, description } = this.state;
    const enable = name !== '' && email !== '' && image !== '' && description !== ''; // crédito: Michael Caxias
    return (
      <form>
        <h2>Editar Perfil</h2>
        <label htmlFor={ name }>
          Nome:
          <input
            type="text"
            data-testid="edit-input-name"
            value={ name }
            id="name"
            onChange={ this.handleChange }
            required
          />
        </label>
        <label htmlFor={ email }>
          E-Mail:
          <input
            type="email"
            data-testid="edit-input-email"
            value={ email }
            id="email"
            onChange={ this.handleChange }
            required
          />
        </label>
        <label htmlFor={ image }>
          Avatar:
          <input
            type="text"
            data-testid="edit-input-image"
            value={ image }
            id="image"
            onChange={ this.handleChange }
            required
          />
        </label>
        <label htmlFor={ description }>
          Descrição:
          <input
            type="text"
            data-testid="edit-input-description"
            value={ description }
            id="description"
            onChange={ this.handleChange }
            required
          />
        </label>
        <button
          type="submit"
          data-testid="edit-button-save"
          onClick={ this.handleClick }
          disabled={ !enable }
        >
          Salvar
        </button>
      </form>
    );
  }

  render() {
    const { loading, redirect } = this.state;
    return (
      <section>
        <div data-testid="page-profile-edit">
          <Header />
          {loading ? <Loading /> : this.profileEditForm()}
          {redirect ? <Redirect to="/profile" /> : ''}
        </div>
      </section>
    );
  }
}

export default ProfileEdit;
