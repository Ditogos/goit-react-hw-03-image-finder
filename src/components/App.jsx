import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Wrapper } from './App.styled';
import { toast } from 'react-toastify';
import { Searchbar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { fetchGallery } from 'Api/FetchGallery';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    searchQuery: '',
    isShowModal: false,
    modalImage: '',
    images: null,
    loading: false,
    page: 1,
    hiddenBnt: false,
  };

  showErrorMsg = () => {
    toast.error('Sorry, there are no more images matching your search query.');
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchQuery !== this.props.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true, images: null, hiddenBnt: false });
      setTimeout(() => {
        fetchGallery(this.props.searchQuery, this.state.page)
          .then(({ hits }) => {
            if (hits.length === 0) {
              this.showErrorMsg();
            } else {
              this.setState(prevState => ({
                images: prevState.images
                  ? [...prevState.images, ...hits]
                  : hits,
              }));
            }
          })
          .catch(error => this.setState({ error }))
          .finally(() => this.setState({ loading: false }));
      });
    }
  }

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
        {this.state.images && this.state.images.length > 0 && (
          <ImageGallery
            showModal={this.showModal}
            searchQuery={this.state.searchQuery}
          />
        )}
        {this.state.page >= 1 &&
          this.state.images &&
          this.state.images.length >= 15 && <Button />}
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
