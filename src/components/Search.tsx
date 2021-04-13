import React, { useState, KeyboardEvent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getRandomPhoto, searchPhotos } from '../store/photos/actions';
import SearchIcon from '../assets/images/search_icon.svg';
import GiftIcon from '../assets/images/gift_icon.svg';

const SearchContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0px auto 30px;
`;

const InputContainer = styled.div`
  height: 40px;
  width: 25%;
  display: flex;
  align-items: center;
  position: relative;
  border: 2px solid #000;
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  padding: 0 50px 0 15px;
  border: none;
  font-family: Ubuntu;
  font-size: 16px;
  outline: none;

  &:focus {
    box-shadow: 0px 0px 0px 2px red;
  }
`;

const SearchButton = styled.button`
  height: 100%;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  right: 0;

  &:focus {
    box-shadow: 0px 0px 0px 2px red;
  }

  svg {
    height: 25px;

    path {
      fill: #000;
    }
  }
`;

const RandomPhotoButton = styled.button`
  background-color: black;
  border: none;
  outline: none;
  text-decoration: underline;
  height: 44px;
  width: 44px;
  margin-left: 10px;
  cursor: pointer;

  &:focus {
    box-shadow: 0px 0px 0px 2px red;
  }

  &:hover {
    font-weight: bold;
  }

  svg {
    height: 25px;

    path {
      fill: #fff;
    }

    &.cls-1 {
      fill: none;
    }
  }
`;

const Search: React.FC = ({ searchPhotos, getRandomPhoto }: any) => {
  const [searchTerms, setSearchTerms] = useState('');

  const onSearchClick = () => {
    if (searchTerms) {
      searchPhotos(searchTerms);
    }
  };

  const onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && searchTerms) {
      searchPhotos(searchTerms);
    }
  };

  return (
    <SearchContainer>
      <InputContainer>
        <Input
          aria-label="Search Input"
          type="text"
          placeholder="Search images of..."
          value={searchTerms}
          onChange={event => setSearchTerms(event.target.value)}
          onKeyUp={onKeyUp}
        />
        <SearchButton aria-label="Search" onClick={onSearchClick}>
          <SearchIcon />
        </SearchButton>
      </InputContainer>
      <RandomPhotoButton aria-label="View Random Photo" onClick={getRandomPhoto}>
        <GiftIcon />
      </RandomPhotoButton>
    </SearchContainer>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  searchPhotos: (searchQuery: string) => dispatch(searchPhotos(1, searchQuery)),
  getRandomPhoto: () => dispatch(getRandomPhoto()),
});

export default connect(undefined, mapDispatchToProps)(Search);
