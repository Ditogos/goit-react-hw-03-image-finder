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
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    searchQuery: '',
    isShowModal: false,
    modalImage: '',
    images: [],
    loading: false,
    page: 1,
    hiddenBtn: false,
  };

  showErrorMsg = () => {
    toast.error('Sorry, there are no more images matching your search query.');
  };
  onFindMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });

      fetchGallery(this.state.searchQuery, this.state.page)
        .then(({ hits }) => {
          if (hits.length === 0) {
            this.showErrorMsg();
          } else {
            this.setState(prevState => ({
              images: [...prevState.images, ...hits],
              hiddenBtn: hits.length < 1,
            }));
          }
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, images: [], hiddenBtn: false });
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
        {this.state.loading && <Loader />}
        {this.state.images && (
          <ImageGallery showModal={this.showModal} img={this.state.images} />
        )}
        {this.state.page >= 1 &&
          this.state.images &&
          this.state.images.length >= 15 && (
            <Button onFindMore={this.onFindMore} />
          )}
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
