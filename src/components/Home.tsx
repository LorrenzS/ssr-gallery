import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Lottie from 'react-lottie';
import animation from '../assets/animations/rightpoint_animation.json';
import styled, { keyframes } from 'styled-components';
import Search from './Search';
import { AppState } from '../store';
import { getDefaultPhotos } from '../store/photos/actions';
import { GalleryError, PhotosResponse } from '../core/models';
import Gallery from './Gallery';

const Animation = styled.div`
  width: 600px;
`;

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
`;

const slideUp = keyframes`
  from {
    top: 100%;
    opacity: 0%;
  }
  to {
    top: 0;
    opacity: 100%;
  }
`;

const ContentContainer = styled(HomeContainer)`
  position: absolute;
  top: 100%;
  opacity: 0;

  &.active {
    top: 0;
    opacity: 100;
    animation: ${slideUp} 0.3s ease-in;
  }
`;

interface IHomeProps {
  isLoading: boolean;
  error: GalleryError;
  photos: PhotosResponse;
  getDefaultPhotos: () => Promise<void>;
}

const Home: React.FC<IHomeProps> = (props) => {
  const { getDefaultPhotos } = props;
  const [animationActive, setAnimationActive] = useState(true);

  const options = {
    loop: false,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const displayAnimation = () => {
    setTimeout(() => setAnimationActive(false), 6000);
  };

  useEffect(() => {
    displayAnimation();
    getDefaultPhotos();
  }, []);

  return (
    <HomeContainer>
      {animationActive ? (
        <Animation>
          <Lottie options={options} />
        </Animation>
      ) : (
        <ContentContainer className={animationActive ? '' : 'active'}>
          <Search />
          <Gallery />
        </ContentContainer>
      )}
    </HomeContainer>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    isLoading: state.photosState.isLoading,
    error: state.photosState.error,
    photos: state.photosState.photos,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getDefaultPhotos: () => dispatch(getDefaultPhotos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
