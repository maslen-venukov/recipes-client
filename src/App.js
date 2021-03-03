import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Single from './pages/Single';
import Own from './pages/Own';
import New from './pages/New';
import Favorites from './pages/Favorites';

import Header from './components/Header';

import { auth } from './redux/actions/user';
import { fetchOwn, fetchFavorites } from './redux/actions/meal';

const App = () => {
  const dispatch = useDispatch();

  const isReady = useSelector(({ user }) => user.isReady);
  const user = useSelector(({ user }) => user.currentUser);
  const token = useSelector(({ user }) => user.token);

  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(auth(token));
  }, [dispatch])

  useEffect(() => {
    token && dispatch(fetchOwn(token));
    token && dispatch(fetchFavorites(token));
  }, [dispatch, token])

  return isReady && (
    <>
      <Header />
      <main className="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/meals/:id" component={Single} />
          {user && <Route path="/favorites" component={Favorites} />}
          {user && <Route path="/new" component={New} />}
          {user && <Route path="/own" component={Own} /> }
          {!user && <Route path="/login" component={Login} />}
          {!user && <Route path="/register" component={Register} />}
          <Redirect to="/" />
        </Switch>
      </main>
    </>
  )
}

export default App;