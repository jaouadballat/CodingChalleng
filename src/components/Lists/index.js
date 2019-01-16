import React from 'react';
import List from './List';

const Lists = ({repositories}) => (
  repositories.map((repo, index) => <List {...repo} key={index} />)
);

export default Lists;
