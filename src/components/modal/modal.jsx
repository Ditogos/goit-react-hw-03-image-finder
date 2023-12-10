import React, { Component } from 'react';
import { Overlay, ModalImg } from './modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.closeModal();
    }
  };
  render() {
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalImg>
          <img src={this.props.modalImage} alt="modalImage" />
        </ModalImg>
      </Overlay>
    );
  }
}
