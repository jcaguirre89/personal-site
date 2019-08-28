import styled from '@emotion/styled'

const StyledButton = styled.button`
  width: 10em;
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.articleText};
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: inherit;
  border-radius: 3px;
  font: inherit;
  margin: 0.5em 0px;
  padding: 0.75em;
  transition: ${props => props.theme.colorModeTransition};

  :hover {
    cursor: pointer;
    }
`

export default StyledButton
