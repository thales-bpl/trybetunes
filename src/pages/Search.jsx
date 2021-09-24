import React, { Component } from 'react';
/* import { Link } from 'react-router-dom'; */
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../Components/Loading';
import AlbumCard from '../Components/AlbumCard';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      searchedArtist: '',
      displaySearchResult: false,
      loading: false,
      artistData: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderizer = this.renderizer.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      artist: target.value,
      searchedArtist: target.value,
    });
  }

  handleSubmit() {
    const { searchedArtist } = this.state;
    this.setState({
      artist: '',
      loading: true,
    });
    searchAlbumsAPI(searchedArtist)
      .then((artistData) => this.setState({
        displaySearchResult: true,
        loading: false,
        artistData,
      }));
  }

  renderizer() { // crédito: Helena Greco
    const { artistData, searchedArtist } = this.state;
    if (artistData.length === 0) {
      return (
        <div>
          <p>Nenhum álbum foi encontrado</p>
        </div>
      );
    }
    return (
      <>
        <p>
          Resultado de álbuns de:
          {' '}
          {searchedArtist}
        </p>
        <ul>
          {artistData.map((album) => (
            <li
              key={ album.collectionId }
            >
              <AlbumCard
                collectionId={ album.collectionId }
                artworkUrl100={ album.artworkUrl100 }
                collectionName={ album.collectionName }
              />
            </li>
          ))}
        </ul>
      </>
    );
  }

  render() {
    const { artist, loading, displaySearchResult } = this.state;
    const MIN_LENGTH = 2;

    return (
      <>
        <Header />
        { loading ? <Loading /> : '' }
        <div data-testid="page-search">Search</div>
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            value={ artist }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artist.length < MIN_LENGTH }
            onClick={ this.handleSubmit }
          >
            Pesquisar
          </button>
        </form>
        <section>
          { displaySearchResult ? this.renderizer() : '' }
        </section>
      </>
    );
  }
}

export default Search;
