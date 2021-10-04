import React, { Component } from 'react';
import Header from '../Components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
/*   constructor(props) {
    super(props);
    this.state = {
      loading: true,
      favoriteTracks: [],
    };
  } */

  componentDidMount() {
    getFavoriteSongs();
  }

  render() {
    return (
      <>
        <Header />
        <div data-testid="page-favorites">Favorites</div>
      </>
    );
  }
}

export default Favorites;
