import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItemList } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ showModal, smallImg, alt }) => {
  return (
    <ImageGalleryItemList onClick={showModal}>
      <img src={smallImg} alt={alt} />
    </ImageGalleryItemList>
  );
};

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string,
  alt: PropTypes.string,
  showModal: PropTypes.func.isRequired,
};
