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
      <>
        <header data-testid="header-component" className="header">
          <p data-testid="header-user-name">
            { name }
          </p>
        </header>
        <nav className="header-nav">
          <Link to="/search" data-testid="link-to-search">
            <button className="nav-link" type="button">Search</button>
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            <button className="nav-link" type="button">Favorites</button>
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            <button className="nav-link" type="button">Profile</button>
          </Link>
        </nav>
      </>
    );
  }
}

export default Header;
