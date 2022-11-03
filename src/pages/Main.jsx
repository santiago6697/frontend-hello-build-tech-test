import _ from 'lodash';
import { Button, Container } from 'react-bootstrap';
import Auth from '../components/templates/Auth/Auth';
import { useSelector, useDispatch } from 'react-redux';
import { getReposThunk, loginThunk } from '../features/users';
import { useEffect, useState } from 'react';
import Repo from '../components/collections/RowItems/Repo';

const Main = () => {
  const { authSuccess, loading, username, favs, repos } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const handleLogin = (values) => {
    dispatch(loginThunk(values));
  };

  useEffect(() => {
    if (authSuccess) {
      dispatch(getReposThunk());
    }
  }, [authSuccess]);

  return (
    <div className="h-100">
      <Auth authSuccess={authSuccess} onLogin={handleLogin} />
      {_.map(repos, (repo) => (
        <Repo repo={repo} username={username} isFav={Math.random() > 0.5} />
      ))}
    </div>
  );
};

export default Main;
