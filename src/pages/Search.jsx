import React, { Component } from 'react';
import Header from '../Components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      artist: target.value,
    });
  }

  render() {
    const { artist } = this.state;
    const MIN_LENGTH = 2;
    return (
      <>
        <Header />
        <div data-testid="page-search">Search</div>
        <form>
          {/* onSubmit */}
          <input
            data-testid="search-artist-input"
            type="text"
            value={ artist }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ artist.length < MIN_LENGTH }
          >
            Procurar
          </button>
        </form>
      </>
    );
  }
}

export default Search;
