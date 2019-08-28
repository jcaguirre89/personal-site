import { Form } from "@leveluptuts/fresh";
import mediaqueries from "@styles/media";
import styled from '@emotion/styled'

const StyledForm = styled(Form)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: ${props => props.theme.colors.articleText};
  border-color: ${props => props.theme.colors.articleText};

  input :focus, select :focus {
    color: ${props => props.theme.colors.accent};
    border-color: ${props => props.theme.colors.accent};
  }

  ${mediaqueries.tablet`
    flex-direction: column;
    align-items: flex-start;
  `}

  .field-wrapper {
    margin: 0;
  }

  button {
    height: 50px;
    width: 100px;
    margin: 0.5em 0px;
    padding: 0.75em;
    border-radius: 3px;
    border: 1px solid ${props => props.theme.colors.articleText};

    :hover {
      background-color: ${props => props.theme.colors.accent};
    }

    :focus {
      color: ${props => props.theme.colors.articleText};
      border-color: ${props => props.theme.colors.accent};
    }
  }
`;

export default StyledForm
