import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AppState } from '../store';
import { Photo, GalleryError, PhotosResponse } from '../core/models';
import loadingAnimation from '../assets/animations/search_loading.json';
import Lottie from 'react-lottie';
import { searchPhotos, setExpandedImage } from '../store/photos/actions';
import ChevronIcon from '../assets/images/chevron.svg';
import { usePrevious } from '../core/hooks';
import { photosPerPage } from '../services/PhotoService';
import Image from './Image';

interface IGalleryProps {
  isLoading: boolean;
  error: GalleryError;
  photos: PhotosResponse;
  searchPhotos: (pageNumber: number, searchQuery: string) => void;
  expandImage: (expandedImage: Photo) => void;
}

const GalleryContainer = styled.section`
  width: 100%;
  display: inline-block;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  position: relative;
`;

const GalleryViewer = styled.div`
  height: 100%;
  width: 65%;
  display: grid;
  column-gap: 12px;
  row-gap: 12px;
  grid-template-columns: 33% 33% 33%;
  justify-content: space-evenly;
`;

const PhotoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const ThumbImage = styled.img`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

  &:hover {
    cursor: -moz-zoom-in;
    cursor: -webkit-zoom-in;
    cursor: zoom-in;
  }
`;

const LoadingAnimationContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 1;
`;

const LoadingAnimation = styled.div`
  width: 100px;
`;

const ErrorMessage = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Ubuntu;
  font-size: 30px;
  text-align: center;
  color: red;
`;

const NextButton = styled.button`
  background-color: transparent;
  border: none;
  height: 40px;
  width: 30px;
  margin-left: 20px;
  display: flex;
  align-items: center;
`;

const PrevButton = styled(NextButton)`
  transform: rotate(180deg);
  margin-right: 20px;
  margin-left: 0;
`;

const Gallery: React.FC<IGalleryProps> = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imageLoadedCount, setImageLoadedCount] = useState(0);
  const { isLoading, error, photos, searchPhotos, expandImage } = props;

  if (error) {
    return <ErrorMessage>There was an error getting photos.</ErrorMessage>;
  }

  const { total_pages, results, searchQuery } = photos;
  const prevSearchQuery = usePrevious(searchQuery);

  const options = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    if (searchQuery !== prevSearchQuery) {
      setCurrentPage(1);
      resetImagesLoaded();
    }
  }, [searchQuery, prevSearchQuery]);

  useEffect(() => {
    if (imageLoadedCount === photosPerPage) {
      setImagesLoaded(true);
    }
  }, [imageLoadedCount]);

  const resetImagesLoaded = () => {
    setImagesLoaded(false);
    setImageLoadedCount(0);
  };

  const onPrevClick = () => {
    if (currentPage > 1 && searchQuery) {
      const newCurrentPage = currentPage - 1;
      setCurrentPage(newCurrentPage);
      searchPhotos(newCurrentPage, searchQuery);
      resetImagesLoaded();
    }
  };

  const onNextClick = () => {
    if (currentPage < total_pages && searchQuery) {
      const newCurrentPage = currentPage + 1;
      setCurrentPage(newCurrentPage);
      searchPhotos(newCurrentPage, searchQuery);
      resetImagesLoaded();
    }
  };

  const onImageLoaded = () => {
    setImageLoadedCount(imageLoadedCount + 1);
  };

  return (
    <>
      <GalleryContainer>
        {(isLoading || !imagesLoaded) && (
          <LoadingAnimationContainer>
            <LoadingAnimation>
              <Lottie options={options} />
            </LoadingAnimation>
          </LoadingAnimationContainer>
        )}
        <>
          <PrevButton
            onClick={onPrevClick}
            style={{
              visibility: currentPage > 1 && searchQuery ? 'visible' : 'hidden',
            }}
          >
            <ChevronIcon />
          </PrevButton>
          <GalleryViewer>
            {results &&
              results.map(photo => {
                return (
                  <PhotoContainer key={photo.id}>
                    <ThumbImage
                      src={photo.urls.small}
                      alt={photo.description}
                      onLoad={onImageLoaded}
                      onClick={() => expandImage(photo)}
                    />
                  </PhotoContainer>
                );
              })}
          </GalleryViewer>

          <NextButton
            onClick={onNextClick}
            style={{
              visibility: currentPage < total_pages && searchQuery ? 'visible' : 'hidden',
            }}
          >
            <ChevronIcon />
          </NextButton>
        </>
      </GalleryContainer>
      <Image />
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  isLoading: state.photosState.isLoading,
  error: state.photosState.error,
  photos: state.photosState.photos,
});

const mapDispatchToProps = (dispatch: any) => ({
  searchPhotos: (pageNumber: number, searchQuery: string) => dispatch(searchPhotos(pageNumber, searchQuery)),
  expandImage: (expandedImage: Photo) => dispatch(setExpandedImage(expandedImage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
