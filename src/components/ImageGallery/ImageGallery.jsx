import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryUl, Container } from './ImageGallery.styled';
import React, { Component } from 'react';

export class ImageGallery extends Component {
  render() {
    const { img } = this.props;

    return (
      <Container>
        <ImageGalleryUl>
          {img &&
            img.length > 0 &&
            img.map(({ id, description, largeImage }) => (
              <ImageGalleryItem
                key={id}
                description={description}
                largeImage={largeImage}
              />
            ))}
        </ImageGalleryUl>
      </Container>
    );
  }
}
