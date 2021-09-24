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

  render() {
    const { loading, albumData } = this.state;
    if (loading) {
      return (
        <>
          <Header />
          <Loading />
        </>
      );
    }
    return (
      <section data-testid="page-album">
        <Header />
        {/* { loading ? <Loading /> : '' } */}
        <img src={ albumData[0].artworkUrl100 } alt={ albumData[0].collectionName } />
        <h2 data-testid="artist-name">
          { albumData[0].artistName }
        </h2>
        <h3 data-testid="album-name">
          { albumData[0].collectionName }
        </h3>
        <aside>
          {albumData.slice(1).map((track, index) => (
            <MusicCard
              key={ index }
              trackName={ track.trackName }
              previewUrl={ track.previewUrl }
              trackId={ track.trackId }
            />
          ))}
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
