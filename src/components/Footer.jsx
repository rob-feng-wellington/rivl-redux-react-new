import React from 'react';
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

const Footer = () => (
  <p>
    Show:
    {'   '}
    <FilterLink filter='all'>All</FilterLink>
    {'   '}
    <FilterLink filter='male'>MALE</FilterLink>
    {'   '}
    <FilterLink filter='female'>FEMALE</FilterLink>
  </p>
);

export default Footer;