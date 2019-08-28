import { Form } from "@leveluptuts/fresh";
import mediaqueries from "@styles/media";
import styled from '@emotion/styled'

const StyledForm = styled(Form)`
  width: 70%;
  height: 130px;
  margin: 0 auto 25px;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: ${props => props.theme.colors.articleText};
  border-color: ${props => props.theme.colors.articleText};

  ${mediaqueries.phablet`
    flex-direction: column;
    height: 200px;
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
  }
`;

export default StyledForm
