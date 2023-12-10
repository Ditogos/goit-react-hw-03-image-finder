import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/imageGalleryItem/imageGalleryItem';
import { Loader } from 'components/loader/loader';
import { Button } from 'components/button/button';
import { ImageGalleryUl, Container } from './imageGallery.styled';
import { fetchGallery } from '../../Api/fetchGallery';

export class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
    page: 1,
    hiddenBnt: false,
  };

  showErrorMsg = () => {
    toast.error('Sorry, there are no more images matching your search query.');
  };

  onFindMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
      hiddenBnt: false,
    }));
    setTimeout(() => {
      fetchGallery(this.props.searchQuery, this.state.page)
        .then(({ hits, totalHits }) => {
          if (hits.length === 0) {
            this.showErrorMsg();
            this.setState({ hiddenBnt: true });
          } else
            this.setState(prevState => ({
              images: [...prevState.images, ...hits],
            }));
          if (12 * this.state.page > totalHits) {
            this.setState({ hiddenBnt: true });
            this.showErrorMsg();
          }
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ loading: true, images: null, page: 1, hiddenBnt: false });
      setTimeout(() => {
        fetchGallery(this.props.searchQuery, this.state.page)
          .then(({ hits }) => {
            if (hits.length === 0) {
              this.showErrorMsg();
            } else this.setState({ images: hits });
          })
          .catch(error => this.setState({ error }))
          .finally(() => this.setState({ loading: false }));
      });
    }
  }

  render() {
    return (
      <Container>
        {this.state.loading && <Loader />}

        {this.state.images && this.state.images.length > 0 && (
          <ImageGalleryUl>
            {this.state.images.map(image => {
              return (
                <ImageGalleryItem
                  showModal={() => this.props.showModal(image.largeImageURL)}
                  key={image.id}
                  smallImg={image.webformatURL}
                  alt={image.tags}
                />
              );
            })}
          </ImageGalleryUl>
        )}
        {this.state.images && !this.state.hiddenBnt && (
          <Button onFindMore={() => this.onFindMore()} />
        )}
      </Container>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
