import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import BubbleChart from './bubbleChart';
import HashLoader from 'react-spinners/HashLoader';
import {useColorMode} from 'theme-ui';
import styled from '@emotion/styled';
import {Field} from '@leveluptuts/fresh';
import StyledForm from '../../../../src/components/styles/form';
import mediaqueries from '@styles/media';

const GET_WORDS_QUERY = gql`
  query getWords($terms: String!, $language: String) {
    words(terms: $terms, language: $language)
  }
`;

const ErrorMessage = styled.h3`
  color: hsla(3, 100%, 69%, 1);
`;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 35px;
  width: 100%;
  max-width: 680px;
  ${mediaqueries.desktop`
    max-width: 507px;
  `}
  ${mediaqueries.tablet`
    max-width: 486px;
    margin: 0 auto 25px;
  `};
  ${mediaqueries.phablet`
    padding: 0 20px;
  `};
`;

function GetTwitterData() {
  const {loading, error, data, refetch} = useQuery(GET_WORDS_QUERY, {
    variables: {terms: '#BuiltWithGatsby', language: 'en'},
  });
  const [colorMode] = useColorMode();
  const fill = colorMode === 'dark' ? '#fff' : '#000';

  const renderedChart = () => {
    if (loading) {
      return <HashLoader size="80" color={fill} loading={loading} />;
    }

    const {words = []} = data;
    console.log(words);
    const wordCounts =
      words &&
      words.reduce((obj, item) => {
        if (!obj[item]) {
          obj[item] = 0;
        }
        obj[item]++;
        return obj;
      }, {});

    const wordCountArray =
      words &&
      Object.entries(wordCounts)
        .filter(([k, v]) => v > 2)
        .map(([k, v]) => {
          return {name: k, value: v};
        });

    const bubbleChartRoot = {
      name: 'root',
      children: wordCountArray || [],
    };

    if (bubbleChartRoot.children.length === 0)
      return (
        <ErrorMessage>
          Not enough words found, or some other error. Try again with a
          different term, another language, or in a few moments---I may have
          reached the temporary limit in the Twitter API, and it resets after 15
          minutes.
        </ErrorMessage>
      );

    return <BubbleChart colorMode={colorMode} root={bubbleChartRoot} />;
  };

  return (
    <OuterContainer>
      <StyledForm
        onSubmit={({data: formData}) => {
          const lang = formData.language || 'en';
          refetch({terms: formData.terms, language: lang});
        }}
        cancelButton={false}>
        <Field placeholder="#BuiltWithGatsby" defaultValue="#BuiltWithGatsby">
          Terms
        </Field>
        <Field type="select" defaultValue="en" options={['en', 'es']}>
          Language
        </Field>
      </StyledForm>
      <div
        style={{
          width: `100%`,
          height: `500px`,
          margin: `0`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
        }}>
        {renderedChart()}
      </div>
    </OuterContainer>
  );
}

export default GetTwitterData;
