import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../Components/Loading';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumData: [],
      loading: true,
    };
    this.fetchAlbumData = this.fetchAlbumData.bind(this);
  }

  componentDidMount() {
    this.fetchAlbumData();
  }

  fetchAlbumData() {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((albumData) => this.setState({
      loading: false,
      albumData,
    }));
    console.log(this.state.albumData);
  }
  /* fetchAlbumData() {
    const { match: { params: { id } } } = this.props;
    getMusics(id)
      .then((albumData) => JSON.stringify(albumData))
      .then((albumData) => this.setState({
        loading: false,
        albumData,
      }));
  } */

  render() {
    const { loading, albumData } = this.state;
    /* const { artistName } = albumData[0]; */
    if ({ albumData } === 0) {
      return (
        <p>albumData vazio</p>
      );
    }
    return (
      <section data-testid="page-album">
        <Header />
        { loading ? <Loading /> : '' }
        <h2>{ albumData.length }</h2>
      </section>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}.isRequired;

export default Album;
