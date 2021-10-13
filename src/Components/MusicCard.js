import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      favoriteTracks: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchFavoriteSongs = this.fetchFavoriteSongs.bind(this);
    this.renderFavoriteSong = this.renderFavoriteSong.bind(this);
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  handleChange({ target }) { // ajuda com essa função: Theo Lima
    const { track, onChange } = this.props;
    this.setState({ loading: true });
    if (target.checked) {
      addSong(track).then(() => {
        this.setState({ loading: false });
      });
    } else {
      removeSong(track).then(() => {
        this.setState({ loading: false });
      });
    }
    this.fetchFavoriteSongs();
    if (onChange) {
      onChange();
    }
  }

  fetchFavoriteSongs() {
    getFavoriteSongs().then((favoriteTracks) => {
      this.setState({
        favoriteTracks,
      });
    });
  }

  renderFavoriteSong(trackId, favoriteTracks) {
    return (
      <label htmlFor={ trackId }>
        Favorita
        <input
          type="checkbox"
          data-testid={ `checkbox-music-${trackId}` }
          id={ trackId }
          onChange={ this.handleChange }
          checked={ favoriteTracks.some((song) => song.trackId === trackId) }
          value={ trackId }
        />
      </label>
    );
  }

  render() {
    const { track: { trackId, trackName, previewUrl } } = this.props;
    const { loading, favoriteTracks } = this.state;
    return (
      <section className="div-music-card">
        <span style={ { padding: '10px' } }>
          { trackName }
        </span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        {loading ? <Loading /> : this.renderFavoriteSong(trackId, favoriteTracks) }
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number,
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
