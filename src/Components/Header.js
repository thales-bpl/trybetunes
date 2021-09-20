import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    getUser()
      .then(({ name }) => this.setState({
        name,
        loading: false,
      }));
  }

  render() {
    const { name, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { name }
        </p>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
