import React, { Component } from 'react';
import Header from '../Components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
/* import Loading from '../Components/Loading'; */
import MusicCard from '../Components/MusicCard';

// Broken, mas funciona no browser:
// Será validado se a lista de músicas favoritas é atualizada ao remover uma música da lista.

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteTracks: [],
    };
    this.updateFavoriteSongs = this.updateFavoriteSongs.bind(this);
  }

  componentDidMount() {
    this.updateFavoriteSongs();
  }

  componentDidUpdate() {
    this.updateFavoriteSongs();
  }

  updateFavoriteSongs() {
    getFavoriteSongs().then((favoriteTracks) => {
      this.setState({
        favoriteTracks,
      });
    });
  }

  render() {
    const { favoriteTracks } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          {favoriteTracks.map((track, index) => (
            <MusicCard
              key={ index }
              track={ track }
              onChange={ this.updateFavoriteSongs }
            />
          ))}
        </div>
      </>
    );
  }
}

export default Favorites;
