import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';

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

  async fetchAlbumData() {
    const { match: { params: { id } } } = this.props;
    await getMusics(id).then((albumData) => this.setState({
      loading: false,
      albumData,
    }));
  }

  /* console.log(getMusics(697650603)) */

  render() {
    const { loading, albumData } = this.state;
    if (!albumData.length) {
      return (
        <p>albumData vazio</p>
      );
    }
    return (
      <section data-testid="page-album">
        <Header />
        { loading ? <Loading /> : '' }
        <h2 data-testid="artist-name">
          { albumData[0].artistName }
        </h2>
        <h3 data-testid="album-name">
          { albumData[0].collectionName }
        </h3>
        <aside>
          <MusicCard
            trackName={ albumData[1].trackName }
            previewUrl={ albumData[1].previewUrl }
          />
        </aside>
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
