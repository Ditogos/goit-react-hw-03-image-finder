import React from 'react';
import { ButonLoadMore } from './Button.styled';

export const Button = ({ onFindMore }) => {
  return (
    <ButonLoadMore type="button" onClick={onFindMore}>
      <span className="button-label">Load More</span>
    </ButonLoadMore>
  );
};
