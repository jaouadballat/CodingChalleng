import React from 'react';

const List = ({owner, full_name,description, open_issues_count, stargazers_count}) => (
  <div>
    <div className="user__avatar">
        <img src={owner.avatar_url} />
    </div>
    <div className="user__info">
      <h3>{full_name}</h3>
      <p>{description}</p>
      <p>
        <span>issues: {open_issues_count}</span>
        <span>stars: {stargazers_count}</span>
        Submites 30 days ago by {owner.login}
      </p>
    </div>
  </div>
);

export default List;
