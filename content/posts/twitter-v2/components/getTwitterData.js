import React from 'react';
import {useQuery } from '@apollo/react-hooks'
import gql from "graphql-tag";
import BubbleChart from './bubbleChart';
import HashLoader from 'react-spinners/HashLoader';
import {useColorMode} from 'theme-ui';
import { Field } from "@leveluptuts/fresh";
import StyledForm from '../../../../src/components/styles/form'

const GET_WORDS_QUERY = gql`
query getWords($terms: String!, $language: String) {
  words(terms: $terms, language: $language)
}
`;

function GetTwitterData() {
  const { loading, error, data: {words}, refetch } = useQuery(GET_WORDS_QUERY, {
    variables: { terms: 'Maradona', language: 'es' }
  });
  const [colorMode] = useColorMode();
  const fill = colorMode === 'dark' ? '#fff' : '#000';


    const wordCounts = words && words.reduce((obj, item) => {
      if (!obj[item]) {
        obj[item] = 0;
    }
    obj[item]++;
    return obj;
    }, {});

    const wordCountArray = words && Object.entries(wordCounts)
    .filter(([k, v]) => v > 2)
    .map(([k, v]) => {
      return {name: k, value: v};
    });

    const bubbleChartRoot = {
      name: 'root',
      children: wordCountArray || [],
    };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <StyledForm
        onSubmit={({data: formData}) => {
          const lang = formData.language || 'es';
          refetch({terms: formData.terms, language: lang})
        }}
        cancelButton={false}
        >
          <Field placeholder='Maradona' defaultValue='Maradona'>Terms</Field>
          <Field type='select' defaultValue='es' options={['es', 'en']}>Language</Field>
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
        <HashLoader size="80" color={fill} loading={loading} />
        {!loading && bubbleChartRoot.children.length && (
          <BubbleChart colorMode={colorMode} root={bubbleChartRoot} />
        )}
      </div>
    </div>
  );
}

export default GetTwitterData;
