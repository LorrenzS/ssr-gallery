import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useOutsideClick } from '../core/hooks';
import { ExpandedImage } from '../core/models';
import imageLoadingAnimation from '../assets/animations/image_loading.json';
import CloseIcon from '../assets/images/close_icon.svg';
import Lottie from 'react-lottie';

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
  image?: ExpandedImage;
  onClose: () => void;
}

const Image: React.FC<IImageProps> = props => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { image, onClose } = props;

  const options = {
    loop: true,
    autoplay: true,
    animationData: imageLoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const imageRef = useRef<HTMLDivElement>(null);

  useOutsideClick(imageRef, () => {
    if (image) {
      onClose();
      setImageLoaded(false);
    }
  });

  const onImageLoaded = () => {
    setImageLoaded(true);
  };

  return image && image.imageUrl && image.loadingImageUrl ? (
    <ImageBackground>
      {!imageLoaded && (
        <LoadingAnimation>
          <Lottie options={options} />
        </LoadingAnimation>
      )}
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>
      <ImageOuterContainer ref={imageRef} style={{ display: imageLoaded ? 'block' : 'none' }}>
        <ImageDisplay src={image.imageUrl} onLoad={onImageLoaded} />
      </ImageOuterContainer>
    </ImageBackground>
  ) : null;
};

export default Image;
