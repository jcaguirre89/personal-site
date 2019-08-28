import styled from '@emotion/styled'

const StyledInput = styled.input`
  background-color: transparent;
  box-sizing: border-box;
  box-shadow: none;
  max-width: 100%;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: ${props => props.theme.colors.articleText};
  color: ${props => props.theme.colors.articleText};
  border-radius: 3px;
  font: inherit;
  margin: 0.5em 0px;
  padding: 0.75em;
  transition: border-color 0.2s ease 0s;
`;

export default StyledInput
