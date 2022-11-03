import _ from 'lodash';
import { Button } from 'react-bootstrap';

const Repo = ({ username = 'octocat', isFav = false, repo = {}, onFav = () => {} }) => {
  return (
    <div
      key={repo?.id}
      className="py-2 px-3 m-2 bg-light border border-dark rounded d-flex flex-row w-50"
    >
      <div className="d-flex flex-column mx-1 w-25">
        <span style={{ fontSize: 12, fontWeight: 'bold' }}>Author/Contributor:</span>
        <a target="_blank" style={{ fontSize: 14 }} href={`https://github.com/${username}`}>
          {_.truncate(username, { length: 20 })}
        </a>
      </div>
      <div className="d-flex flex-column mx-1 w-25">
        <span style={{ fontSize: 12, fontWeight: 'bold' }}>Name:</span>
        <a target="_blank" style={{ fontSize: 14 }} href={repo?.url}>
          {_.truncate(repo?.name, { length: 20 })}
        </a>
      </div>
      <div className="d-flex flex-column mx-1 w-25">
        <span style={{ fontSize: 12, fontWeight: 'bold' }}>Stars:</span>
        <span style={{ fontSize: 14, fontWeight: 'bold' }}>{`${repo?.stargazerCount} ⭐️`}</span>
      </div>
      <div className="d-flex flex-column mx-1 w-25">
        <Button onClick={() => onFav(repo, isFav)} variant={isFav ? 'danger' : 'info'}>
          {isFav ? 'Remove fav' : 'Mark as fav'}
        </Button>
      </div>
    </div>
  );
};

export default Repo;
