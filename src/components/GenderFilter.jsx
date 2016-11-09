import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

const FilterLink = ({ filter, children }) => (
  <Link
    to={filter === 'all' ? '' : filter}
    activeStyle={{
      textDecoration: 'none',
      color: 'black'
    }}
  >
    {children}
  </Link>
);

const GenderFilter = () => (
  <p>
    Gender:
    {'   '}
    <FilterLink filter='all'>All</FilterLink>
    {'   '}
    <FilterLink filter='male'>Male</FilterLink>
    {'   '}
    <FilterLink filter='female'>Female</FilterLink>
  </p>
);

export default GenderFilter;