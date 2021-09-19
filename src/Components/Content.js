import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Search from '../pages/Search';

class Content extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <p>TrybeTunes</p>
          <div data-testid="page-login">
            <Route exact path="/" component={ Login } />
          </div>
          <div data-testid="page-search">
            <Route path="/search" component={ Search } />
          </div>
          <div data-testid="page-album">
            <Route path="/album/:id" component={ Album } />
          </div>
          <div data-testid="page-favorites">
            <Route path="/favorites" component={ Favorites } />
          </div>
          <div data-testid="page-profile">
            <Route path="/profile" component={ Profile } />
          </div>
          <div data-testid="page-profile-edit">
            <Route path="/profile/edit" component={ ProfileEdit } />
          </div>
          <div data-testid="page-not-found">
            <Route path="*" component={ NotFound } />
          </div>
        </main>
      </BrowserRouter>
    );
  }
}

export default Content;
