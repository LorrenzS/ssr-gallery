import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useOutsideClick } from '../core/hooks';
import { Photo } from '../core/models';
import imageLoadingAnimation from '../assets/animations/image_loading.json';
import CloseIcon from '../assets/images/close_icon.svg';
import Lottie from 'react-lottie';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { clearExpandedImage } from '../store/photos/actions';

const ImageBackground = styled.div`
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left 0;
    background-color: rgba(0,0,0,0.85);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ImageOuterContainer = styled.div`
  max-height: 85%;
  height: 85%;
  max-width: 85%;
  position: relative;
`;

const ImageDisplay = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
`;

const LoadingAnimation = styled.div`
  width: 100px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  width: 34px;
  height: 34px;
  &:hover {
    cursor: pointer;
  }
`;

interface IImageProps {
  expandedImage?: Photo;
  clearExpandedImage: () => void;
}

const Image: React.FC<IImageProps> = props => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { expandedImage, clearExpandedImage } = props;

  console.log(expandedImage);

  const options = {
    loop: true,
    autoplay: true,
    animationData: imageLoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const closeImage = () => {
    clearExpandedImage();
    setImageLoaded(false);
  };

  const imageRef = useRef<HTMLDivElement>(null);

  useOutsideClick(imageRef, () => {
    if (expandedImage) {
      closeImage();
    }
  });

  const onImageLoaded = () => {
    setImageLoaded(true);
  };

  return expandedImage ? (
    <ImageBackground>
      {!imageLoaded && (
        <LoadingAnimation>
          <Lottie options={options} />
        </LoadingAnimation>
      )}
      <CloseButton onClick={closeImage}>
        <CloseIcon />
      </CloseButton>
      <ImageOuterContainer ref={imageRef} style={{ display: imageLoaded ? 'block' : 'none' }}>
        <ImageDisplay src={expandedImage.urls.regular} onLoad={onImageLoaded} />
      </ImageOuterContainer>
    </ImageBackground>
  ) : null;
};

const mapStateToProps = (state: AppState) => ({
  expandedImage: state.photosState.expandedImage,
});

const mapDispatchToProps = (dispatch: any) => ({
  clearExpandedImage: () => dispatch(clearExpandedImage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Image);
