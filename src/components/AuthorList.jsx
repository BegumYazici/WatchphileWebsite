import React from 'react';

import styled from '@emotion/styled';

import { AuthorListItem } from './AuthorListItem';


export const AuthorList = (props) => (
  <AuthorListUl className="author-list">
    {props.authors.map(author => (
      <AuthorListItem key={author.name} author={author} tooltip={props.tooltip} />
    ))}
  </AuthorListUl>
);

export const AuthorListUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 4px;
  padding: 0;
  list-style: none;
`;
