import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      favorite: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange({ target }) {
    const { trackId } = this.props;
    this.setState({ loading: true });
    if (target.checked) {
      await addSong(trackId);
      this.setState({
        loading: false,
        favorite: true,
      });
    }
  }

  render() {
    const { trackId, trackName, previewUrl } = this.props;
    const { loading, favorite } = this.state;
    if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <div>
        <span>
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
            checked={ favorite }
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
