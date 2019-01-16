import React from 'react';

import style from './style.css';

const List = ({owner, full_name,description, open_issues_count, stargazers_count}) => (
  <div className="repository card card-1">
    <div className="user__avatar">
        <img src={owner.avatar_url} />
    </div>
    <div className="repository__info">
      <h3>{full_name}</h3>
      <p>{description}</p>
      <p>
        <span className="span__bordered">issues: {open_issues_count}</span>
        <span className="span__bordered">stars: {stargazers_count}</span>
        Submitted 30 days ago by {owner.login}
      </p>
    </div>
  </div>
);

export default List;
