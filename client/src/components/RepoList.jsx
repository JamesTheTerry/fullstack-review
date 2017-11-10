import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repoCount} repos.
      {props.repos.map(repo => {
        return <div className='repoSuper'>
          <p className='title'><a href={repo.url}>{repo.name} by {repo.username}</a></p>
          <p className='stars'>{repo.stars} stars</p>
        </div>
      })}
  </div>
)

export default RepoList;
