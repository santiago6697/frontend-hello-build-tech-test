import _ from 'lodash';
import Auth from '../components/templates/Auth/Auth';
import { useSelector, useDispatch } from 'react-redux';
import {
  getFavsThunk,
  getReposThunk,
  loginThunk,
  putFavsThunk,
  checkLocalStorage,
  signUpThunk,
  signOut,
  dismissError
} from '../features/users';
import { useEffect, useState } from 'react';
import Repo from '../components/collections/RowItems/Repo';
import Header from '../components/collections/Header/Header';
import DismissibleAlert from '../components/collections/Alert/DismissibleAlert';
import LoadingSpinner from '../components/collections/Spinner/LoadingSpinner';

const Main = () => {
  const { authSuccess, error, message, loading, username, favs, favsIds, repos } = useSelector(
    (state) => state.users
  );
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

  const handleDismiss = () => {
    dispatch(dismissError());
  };

  const handleFavsClick = () => {
    if (showFavs) {
      setShowFavs(false);
      return;
    }
    setShowFavs(true);
  };

  const handleSignOut = () => {
    dispatch(signOut());
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
        <LoadingSpinner show={loading} />
        <Header
          authSuccess={authSuccess}
          username={username}
          showFavs={showFavs}
          onClick={handleSignOut}
          onFavsClick={handleFavsClick}
        />
        <Auth authSuccess={authSuccess} onLogin={handleLogin} onSignUp={handleSignUp} />
        <div className="py-3">
          {_.isEmpty(showFavs ? favs : repos) ? (
            <h4 className="text-center my-5">{`You have no ${showFavs ? 'favs' : 'repos'}`}</h4>
          ) : (
            _.map(showFavs ? favs : repos, (repo) => (
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
      <DismissibleAlert show={error} message={message} onClick={handleDismiss} />
    </>
  );
};

export default Main;
