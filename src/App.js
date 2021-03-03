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

import { auth } from './actions/user';
import { fetchOwn } from './actions/own';
import { fetchFavorites } from './actions/favorites';

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

  const routes = {
    user: [
      { path: '/favorites', component: Favorites },
      { path: '/new', component: New },
      { path: '/own', component: Own },
    ],
    auth: [
      { path: '/login', component: Login },
      { path: '/register', component: Register }
    ]
  }

  return isReady && (
    <>
      <Header />
      <main className="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/meal/:id" component={Single} />
          {user && routes.user.map(route => <Route key={route.path} path={route.path} component={route.component} />)}
          {!user && routes.auth.map(route => <Route key={route.path} path={route.path} component={route.component} />)}
          <Redirect to="/" />
        </Switch>
      </main>
    </>
  )
}

export default App;