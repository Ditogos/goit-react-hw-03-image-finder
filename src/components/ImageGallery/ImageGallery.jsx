import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryUl, Container } from './ImageGallery.styled';
import React from 'react';

export const ImageGallery = ({ img, showModal }) => {
  return (
    <Container>
      <ImageGalleryUl>
        {img.map(({ id, description, largeImage, webformatURL }) => (
          <ImageGalleryItem
            key={id}
            description={description}
            webformatURL={webformatURL}
            largeImageURL={largeImage}
            showModal={showModal}
          />
        ))}
      </ImageGalleryUl>
    </Container>
  );
};
