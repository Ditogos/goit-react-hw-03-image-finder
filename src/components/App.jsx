import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Wrapper } from './App.styled';
import { toast } from 'react-toastify';
import { Button } from 'components/Button/Button';
import { Searchbar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { fetchGallery } from 'Api/FetchGallery';

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
