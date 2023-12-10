import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Wrapper } from './App.styled';

import { Searchbar } from 'components/searchBar/searchBar';
import { ImageGallery } from 'components/imageGallery/imageGallery';
import { Modal } from 'components/modal/modal';

export class App extends Component {
  state = {
    searchQuery: '',
    isShowModal: false,
    modalImage: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  showModal = largeImageURL => {
    this.setState({ isShowModal: true, modalImage: largeImageURL });
  };

  closeModal = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          showModal={this.showModal}
          searchQuery={this.state.searchQuery}
        />
        {this.state.isShowModal && (
          <Modal
            closeModal={this.closeModal}
            modalImage={this.state.modalImage}
          />
        )}
        <ToastContainer autoClose={3000} theme="colored" />
      </Wrapper>
    );
  }
}
