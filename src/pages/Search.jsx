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

  render() {
    const { artist, searchedArtist, loading,
      displaySearchResult, artistData } = this.state;
    const MIN_LENGTH = 2;
    if (loading) {
      return <Loading />;
    }
    if (!displaySearchResult) {
      return (
        <>
          <Header />
          <div data-testid="page-search">Search</div>
          <form onSubmit={ this.handleSubmit }>
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
              Pesquisar
            </button>
          </form>
        </>
      );
    }

    if (displaySearchResult) {
      return (
        <section>
          <p>
            Resultado de álbuns de:
            {' '}
            {searchedArtist}
            {/* bug */}
          </p>
          {artistData.map((album) => (
            <AlbumCard
              key={ album.collectionId }
              id={ album.collectionId }
              url={ album.artworkUrl100 }
              albumName={ album.collectionName }
            />
          ))}
        </section>
      );
    }
    if ({ artistData }.length === 0) { // bug
      return <p>Nenhum álbum foi encontrado</p>;
    }
  }
}

export default Search;
