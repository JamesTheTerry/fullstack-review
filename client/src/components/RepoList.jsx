import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
      {props.repos.map(repo => {
        return <div className='repoSuper'>
          <p className='title'><a href='{repo.url}'>{repo.name}</a></p>
          <p className='stars'>{repo.stars} stars</p>
        </div>

        // return <a href='https://www.google.com'><div className='repoSuper'>
        //   <p className='title'>jtek-chat</p>
        //   <p className='stars'>0 stars</p>
        // </div></a>
      })}
  </div>
)

export default RepoList;
