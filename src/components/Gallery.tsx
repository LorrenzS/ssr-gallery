import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AppState } from '../store';
import { GalleryError, PhotosResponse } from '../core/models';
import loadingAnimation from '../assets/animations/search_loading.json';
import Lottie from 'react-lottie';
import { searchPhotos } from '../store/photos/actions';
import ChevronIcon from '../assets/images/chevron.svg';
import { usePrevious } from '../core/hooks';

interface IGalleryProps {
  isLoading: boolean;
  error: GalleryError;
  photos: PhotosResponse;
  searchPhotos: (pageNumber: number, searchQuery: string) => void;
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

const Image = styled.img`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoadingAnimation = styled.div`
  width: 100px;
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

const Gallery: React.FC<IGalleryProps> = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, error, photos, searchPhotos } = props;
  const { total_pages, results, searchQuery } = photos;

  const prevSearchQuery = usePrevious(searchQuery);

  useEffect(() => {
    if (searchQuery !== prevSearchQuery) {
      setCurrentPage(1);
    }
  }, [searchQuery, prevSearchQuery]);

  const options = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const onPrevClick = () => {
    if (currentPage > 1 && searchQuery) {
      const newCurrentPage = currentPage - 1;
      setCurrentPage(newCurrentPage);
      searchPhotos(newCurrentPage, searchQuery);
    }
  };

  const onNextClick = () => {
    if (currentPage < total_pages && searchQuery) {
      const newCurrentPage = currentPage + 1;
      setCurrentPage(newCurrentPage);
      searchPhotos(newCurrentPage, searchQuery);
    }
  };

  return (
    <GalleryContainer>
      {isLoading ? (
        <LoadingAnimation>
          <Lottie options={options} />
        </LoadingAnimation>
      ) : (
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
              results.map((photo) => {
                return (
                  <PhotoContainer key={photo.id}>
                    <Image src={photo.urls.small} />
                  </PhotoContainer>
                );
              })}
          </GalleryViewer>

          <NextButton
            onClick={onNextClick}
            style={{
              visibility:
                currentPage < total_pages && searchQuery ? 'visible' : 'hidden',
            }}
          >
            <ChevronIcon />
          </NextButton>
        </>
      )}
    </GalleryContainer>
  );
};

const mapStateToProps = (state: AppState) => ({
  isLoading: state.photosState.isLoading,
  error: state.photosState.error,
  photos: state.photosState.photos,
});

const mapDispatchToProps = (dispatch: any) => ({
  searchPhotos: (pageNumber: number, searchQuery: string) =>
    dispatch(searchPhotos(pageNumber, searchQuery)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
