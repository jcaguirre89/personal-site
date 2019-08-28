import React, {useState} from 'react';
import StyledInput from './styles/input';
import StyledButton from './styles/button';
import styled from '@emotion/styled';
import { Styled } from 'theme-ui';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 50px;
`;

const Label = styled.label`
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.serif};
`

const SearchInput = ({value, handleChange}) => {
  return (
    <Container>
      <Label htmlFor="search">Search</Label>
      <div style={{display: `flex`}}>
        <StyledInput
          type="text"
          name="search"
          value={value}
          onChange={e => handleChange(e.target.value)}
        />
        <StyledButton type='submit'>Search</StyledButton>
      </div>
    </Container>
  );
};

export default SearchInput;
