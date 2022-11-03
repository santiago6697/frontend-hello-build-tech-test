import _ from 'lodash';
import Auth from '../components/templates/Auth/Auth';
import { useSelector, useDispatch } from 'react-redux';
import {
  getFavsThunk,
  getReposThunk,
  loginThunk,
  putFavsThunk,
  checkLocalStorage,
  signUpThunk
} from '../features/users';
import { useEffect, useState } from 'react';
import Repo from '../components/collections/RowItems/Repo';
import Header from '../components/collections/Header/Header';
import DismissibleAlert from '../components/collections/Alert/DismissibleAlert';

const Main = () => {
  const { authSuccess, error, message, loading, username, favs, favsIds, repos } = useSelector(
    (state) => state.users
  );
  const [items, setItems] = useState(repos);
  const [showFavs, setShowFavs] = useState(false);
  const dispatch = useDispatch();

  const handleSignUp = (values) => {
    dispatch(signUpThunk(values));
  };

  const handleLogin = (values) => {
    dispatch(loginThunk(values));
  };

  const handleFav = (repo, isFav) => {
    const newRepo = _.cloneDeep(repo);
    newRepo.checked = !isFav;

    dispatch(putFavsThunk(newRepo));
  };

  const handleFavsClick = () => {
    if (showFavs) {
      setItems(favs);
      setShowFavs(false);
      return;
    }
    setItems(repos);
    setShowFavs(true);
  };

  const handleSignClick = (repo, isFav) => {
    const newRepo = _.cloneDeep(repo);
    newRepo.checked = !isFav;

    dispatch(putFavsThunk(newRepo));
  };

  useEffect(() => {
    dispatch(checkLocalStorage());
  }, []);

  useEffect(() => {
    if (authSuccess) {
      dispatch(getReposThunk());
      dispatch(getFavsThunk());
    }
  }, [authSuccess]);

  return (
    <>
      <div className="h-100 position-relative">
        <Header
          authSuccess={authSuccess}
          username={username}
          showFavs={showFavs}
          onClick={handleSignClick}
          onFavsClick={handleFavsClick}
        />
        <Auth authSuccess={authSuccess} onLogin={handleLogin} onSignUp={handleSignUp} />
        <div className="py-3">
          {_.isEmpty(items) ? (
            <h4 className="text-center my-5">{`You have no ${showFavs ? 'favs' : 'repos'}`}</h4>
          ) : (
            _.map(items, (repo) => (
              <Repo
                key={repo?.id}
                repo={repo}
                username={username}
                isFav={repo.id in favsIds}
                onFav={handleFav}
              />
            ))
          )}
        </div>
      </div>
      <DismissibleAlert show={error} message={message} error={error} onClick={console.log} />
    </>
  );
};

export default Main;
