import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Lottie from 'react-lottie';
import animation from '../assets/animations/rightpoint_animation.json';
import styled from 'styled-components';
import Search from './Search';
import { AppState } from '../store';
import { getDefaultPhotos } from '../store/photos/actions';
import { GalleryError, Photo } from '../core/models';

interface IGalleryProps {
  isLoading: boolean;
  error: GalleryError;
  photos: Photo[];
  getDefaultPhotos: () => void;
}

const GalleryContainer = styled.div`
  width: 65%;
  display: grid;
  column-gap: 12px;
  row-gap: 12px;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 60% 60% 60%;
  flex: 1;
  padding-bottom: 30px;
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

const Gallery: React.FC<IGalleryProps> = (props) => {
  const { isLoading, error, photos, getDefaultPhotos } = props;

  useEffect(() => {
    getDefaultPhotos();
  }, []);

  return (
    <GalleryContainer>
      {photos.map((photo) => {
        return (
          <PhotoContainer key={photo.id}>
            <Image src={photo.urls.small} />
          </PhotoContainer>
        );
      })}
    </GalleryContainer>
  );
};

const mapStateToProps = (state: AppState) => ({
  isLoading: state.photosState.isLoading,
  error: state.photosState.error,
  photos: state.photosState.photos,
});

const mapDispatchToProps = (dispatch: any) => ({
  getDefaultPhotos: () => dispatch(getDefaultPhotos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
