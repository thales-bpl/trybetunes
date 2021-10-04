import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      /* favorite: false, // Não preciso da favorite como state aqui */
      favoriteTracks: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchFavoriteSongs = this.fetchFavoriteSongs.bind(this);
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  async handleChange({ target }) {
    const { track } = this.props;
    this.setState({ loading: true });
    if (target.checked) {
      await addSong(track);
      this.setState({
        loading: false,
        /* favorite: true, // kill */
      });
      this.fetchFavoriteSongs();
    } else {
      await removeSong(track);
      this.setState({
        loading: false,
        /* favorite: false, // kill */
      });
      this.fetchFavoriteSongs();
    }
  }

  fetchFavoriteSongs() {
    getFavoriteSongs().then((favoriteTracks) => {
      this.setState({
        favoriteTracks,
      });
    });
  }

  // resgatar fav songs pela getFavoriteSongs() e verificar se alguma trackId === favsongs
  // onde armazenar o array de favs? Acho que state..

  render() {
    const { track: { trackId, trackName, previewUrl } } = this.props;
    const { loading, favoriteTracks /* , favorite */ } = this.state;
    if (loading) {
      return (
        <div className="div-music-card">
          <Loading />
        </div>
      );
    }
    return (
      <div className="div-music-card">
        <span style={ { padding: '10px' } }>
          { trackName }
        </span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            onChange={ this.handleChange }
            /* checked={ favorite } // passar uma lógica com output booleano */
            checked={ favoriteTracks.some((song) => song.trackId === trackId) }
            value={ trackId }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number,
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
