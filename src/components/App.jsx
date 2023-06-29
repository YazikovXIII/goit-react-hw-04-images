import React, { useEffect, useState } from 'react';
import { Container } from './styled/Container.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from './helpers/fetch';
import { BtnContainer } from './styled/ContainerBtn.styled';
import { LoadMoreButton } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { StyledImg, StyledPar } from './styled/App.styled';

// export class App extends React.Component {
//   state = {
//     images: [],
//     query: '',
//     page: 1,
//     per_page: 12,
//     error: null,
//     isEmpty: false,
//     isLoading: false,
//     isShowButton: false,
//     total: null,
//     showModal: false,
//     imgModal: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { query, page } = this.state;
//     if (prevState.query !== query || prevState.page !== page) {
//       this.getImages(query, page);
//     }
//   }

//   handleSubmit = value => {
//     this.setState({
//       query: value,
//       page: 1,
//       images: [],
//       error: null,
//       isEmpty: false,
//       isShowButton: false,
//     });
//   };

//   getImages = async (query, page) => {
//     const { per_page } = this.state;
//     this.setState({ isLoading: true });
//     try {
//       const response = await fetchImages(query, page);
//       const { hits, totalHits } = response.data;

//       if (!totalHits) {
//         this.setState({ isEmpty: true });
//         return;
//       }
//       this.setState(prevState => ({
//         images: [...prevState.images, ...hits],
//         total: totalHits,
//         isShowButton: page < Math.ceil(totalHits / per_page),
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   handleClickBtn = () => {
//     this.setState(prev => ({
//       page: prev.page + 1,
//     }));
//   };

//   openModal = e => {
//     this.setState({ imgModal: e.target.dataset.url });
//     this.toggleModal();
//   };

//   toggleModal = () => {
//     this.setState({ showModal: !this.state.showModal });
//   };

//   render() {
//     const {
//       images,
//       isEmpty,
//       isLoading,
//       error,
//       isShowButton,
//       total,
//       showModal,
//       imgModal,
//     } = this.state;
//     return (
//       <Container>
//         <Searchbar onSubmit={this.handleSubmit} />
//         <ImageGallery images={images} modalOnShow={this.openModal} />
//         {showModal && (
//           <Modal modalHide={this.toggleModal}>
//             <StyledImg src={imgModal} alt="Ooops!"></StyledImg>
//           </Modal>
//         )}
//         {isEmpty && <StyledPar>Sorry. There are no images ... 😭</StyledPar>}
//         {isLoading && <Loader />}
//         {error && <StyledPar>{error}</StyledPar>}
//         {isShowButton && (
//           <BtnContainer>
//             <LoadMoreButton onClick={this.handleClickBtn}>
//               Load More...
//             </LoadMoreButton>
//           </BtnContainer>
//         )}
//         {total === images.length && <StyledPar>That's all,folks!</StyledPar>}
//       </Container>
//     );
//   }
// }

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  // const [per_page, setPerPage] = useState(12);
  const per_page = 12;
  const [error, setError] = useState(null);
  const [isEmpty, setEmpty] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isShowButton, setShowButton] = useState(false);
  const [total, setTotal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imgModal, setImgModal] = useState(null);

  const loadImages = async () => {
    setLoading(true);
    try {
      const response = await fetchImages(query, page);
      const { hits, totalHits } = response.data;

      if (!totalHits) {
        setEmpty(true);
        return;
      }
      setImages(prevImages => [...prevImages, ...hits]);
      setTotal(totalHits);
      setShowButton(page < Math.ceil(totalHits / per_page));
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query !== '') {
      loadImages();
    }
  }, [query, page, per_page]);

  const handleSubmit = value => {
    setQuery(value);
    setPage(1);
    setImages([]);
    setError(null);
    setEmpty(false);
    setShowButton(false);
  };

  const handleClickBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = e => {
    setImgModal(e.target.dataset.url);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} modalOnShow={openModal} />
      {showModal && (
        <Modal modalHide={toggleModal}>
          <StyledImg src={imgModal} alt="Ooops!"></StyledImg>
        </Modal>
      )}
      {isEmpty && <StyledPar>Вибачте. Немає зображень ... 😭</StyledPar>}
      {isLoading && <Loader />}
      {error && <StyledPar>{error}</StyledPar>}
      {isShowButton && (
        <BtnContainer>
          <LoadMoreButton onClick={handleClickBtn}>
            Завантажити ще...
          </LoadMoreButton>
        </BtnContainer>
      )}
      {total === images.length && <StyledPar>Це все, люди!</StyledPar>}
    </Container>
  );
};
