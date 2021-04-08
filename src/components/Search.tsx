import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { searchPhotos } from '../store/photos/actions';
import SearchIcon from '../assets/images/search_icon.svg';

const SearchContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 100px auto 50px;
`;

const Input = styled.input`
  height: 40px;
  width: 20%;
  border-radius: 6px 0 0 6px;
  padding: 0 15px;
  border: 2px solid black;
  border-right: none;
`;

const SearchButton = styled.button`
  height: 44px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 18px;

  .search_icon_svg__cls-1 {
    fill: #fff;
  }
`;

const Search: React.FC = ({ searchPhotos }: any) => {
  const [searchTerms, setSerachTerms] = useState('');

  const onSearchClick = () => {
    if (searchTerms) {
      searchPhotos(searchTerms);
    }
  };

  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Search images of..."
        value={searchTerms}
        onChange={(event) => setSerachTerms(event.target.value)}
      />
      <SearchButton onClick={onSearchClick}>
        <SearchIcon />
      </SearchButton>
    </SearchContainer>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  searchPhotos: (searchQuery: string) => dispatch(searchPhotos(1, searchQuery)),
});

export default connect(undefined, mapDispatchToProps)(Search);
