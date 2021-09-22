import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const { collectionId, artworkUrl100, collectionName } = this.props;
    return (
      <Link
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        <img src={ artworkUrl100 } alt={ collectionName } />
        <p>{ collectionName }</p>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  collectionId: PropTypes.number,
  artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string,
}.isRequired;

export default AlbumCard;
