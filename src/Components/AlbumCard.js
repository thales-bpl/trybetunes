import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const { id, url, albumName } = this.props;
    return (
      <Link to={ `/album/${id}` }>
        <section>
          <img src={ url } alt={ albumName } />
          <p>{ albumName }</p>
        </section>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string,
  albumName: PropTypes.string,
  key: PropTypes.string,
}.isRequired;

export default AlbumCard;
