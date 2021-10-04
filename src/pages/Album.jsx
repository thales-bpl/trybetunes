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
      /* favoriteTracks: [], */
    };
    this.fetchAlbumData = this.fetchAlbumData.bind(this);
    /* this.fetchFavorites = this.fetchFavorites.bind(this); */
  }

  componentDidMount() {
    this.fetchAlbumData();
  /*   this.fetchFavorites();
  }

  async fetchFavorites() {
    await getFavoriteSongs()
      .then((favoriteTracks) => {
        this.setState({
          favoriteTracks,
        });
      }); */
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
      <>
        <Header />
        <section className="album-page-section" data-testid="page-album">
          {/* { loading ? <Loading /> : '' } */}
          <section className="album-info-section">
            <img
              className="album-img"
              src={ albumData[0].artworkUrl100 }
              alt={ albumData[0].collectionName }
            />
            <h2 data-testid="album-name">
              { albumData[0].collectionName }
            </h2>
            <h3 data-testid="artist-name">
              { albumData[0].artistName }
            </h3>
          </section>
          <aside className="music-list-aside">
            {albumData.slice(1).map((track, index) => (
              <MusicCard
                key={ index }
                track={ track }
              />
            ))}
          </aside>
        </section>
      </>
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
