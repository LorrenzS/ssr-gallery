import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { searchPhotos } from '../store/photos/actions';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 100px auto;
`;

const Input = styled.input`
  height: 20px;
  width: 40%;
  border-radius: 10px;
`;

const Search: React.FC = ({ searchPhotos }: any) => {
  const [searchTerms, setSerachTerms] = useState('');

  const onSearchClick = () => {
    searchPhotos(searchTerms);
  };

  return (
    <SearchContainer>
      <Input
        type="text"
        value={searchTerms}
        onChange={(event) => setSerachTerms(event.target.value)}
      />
      <button onClick={onSearchClick}>Search</button>
    </SearchContainer>
  );
};

const mapStateToProps = ({ initialText }: any) => ({
  initialText,
});

const mapDispatchToProps = (dispatch: any) => ({
  searchPhotos: (searchQuery: string) => dispatch(searchPhotos(searchQuery)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
