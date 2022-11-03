import _ from 'lodash';
import React from 'react';
import Button from 'react-bootstrap/Button';
import githubLogo from '../../../assets/images/github-logo.svg';

const Header = ({
  authSuccess = false,
  showFavs = false,
  username = '',
  onFavsClick = () => {},
  onClick = () => {}
}) => {
  return (
    <div className="bg-light p-3 d-flex flex-row justify-content-between">
      <div>
        <img src={githubLogo} alt="github logo" style={{ heigth: 38, width: 38 }} />{' '}
        <a
          target="_blank"
          style={{ fontSize: 14 }}
          className="mx-2"
          href={`https://github.com/${username}`}
        >
          {username || 'Github Repo Viewer'}
        </a>
      </div>
      <div>
        {authSuccess && username && (
          <Button
            variant={showFavs ? 'info' : 'warning'}
            className="mx-4"
            size="sm"
            onClick={onFavsClick}
          >
            {showFavs ? `Show ${username}'s repos` : `Show ${username}'s favs`}
          </Button>
        )}
        <Button variant={authSuccess ? 'danger' : 'info'} onClick={onClick}>
          {authSuccess ? 'Sign out' : 'Login'}
        </Button>
      </div>
    </div>
  );
};

export default Header;
