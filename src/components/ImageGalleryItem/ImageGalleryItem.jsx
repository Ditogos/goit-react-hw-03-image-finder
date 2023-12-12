import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItemList } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ showModal, webformatURL, alt }) => {
  return (
    <ImageGalleryItemList onClick={() => showModal(webformatURL)}>
      <img src={webformatURL} alt={alt} />
    </ImageGalleryItemList>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  alt: PropTypes.string,
  showModal: PropTypes.func.isRequired,
};
