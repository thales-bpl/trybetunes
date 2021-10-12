import React, { Component } from 'react';
import Header from '../Components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      favoriteTracks: [],
    };
    this.fetchFavoriteSongs = this.fetchFavoriteSongs.bind(this);
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  componentDidUpdate() {
    this.fetchFavoriteSongs();
  }

  fetchFavoriteSongs() {
    getFavoriteSongs().then((favoriteTracks) => {
      this.setState({
        loading: false,
        favoriteTracks,
      });
    });
  }

  render() {
    const { loading, favoriteTracks } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">Favorites</div>
        { loading ? <Loading /> : '' }
        <ul>
          {favoriteTracks.map((track, index) => (
            <li
              key={ index }
            >
              <MusicCard
                track={ track }
              />
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Favorites;
