import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Lottie from 'react-lottie';
import animation from '../assets/animations/rightpoint_animation.json';
import styled from 'styled-components';
import Search from './Search';
import { AppState } from '../store';
import { getDefaultPhotos } from '../store/photos/actions';
import { GalleryError, Photo } from '../core/models';
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
  overflow-y: auto;
  overflow-x: hidden;
`;

interface IHomeProps {
  isLoading: boolean;
  error: GalleryError;
  photos: Photo[];
  getDefaultPhotos: () => Promise<void>;
}

const Home: React.FC<IHomeProps> = (props) => {
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
  }, []);

  return (
    <HomeContainer>
      {animationActive ? (
        <Animation>
          <Lottie options={options} />
        </Animation>
      ) : (
        <>
          <Search />
          <Gallery />
        </>
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
