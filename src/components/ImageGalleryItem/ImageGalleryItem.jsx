import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItemList } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  render() {
    return (
      <ImageGalleryItemList onClick={this.props.showModal}>
        <img src={this.props.smallImg} alt={this.props.alt} />
      </ImageGalleryItemList>
    );
  }
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
