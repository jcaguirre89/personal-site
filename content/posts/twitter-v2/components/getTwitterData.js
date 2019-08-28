import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import BubbleChart from './bubbleChart';
import HashLoader from 'react-spinners/HashLoader';
import {useColorMode} from 'theme-ui';
import { Form, Field } from "@leveluptuts/fresh";
import mediaqueries from "@styles/media";

const useTwitterApi = () => {
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    url:
      'https://5zoc7b1wnf.execute-api.us-east-1.amazonaws.com/default/scrape_twitter_api',
    terms: 'Maradona',
    lang: 'es',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const requestOptions = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      terms: params.terms,
      lang: params.lang,
      max_size: 500,
    }),
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(params.url, requestOptions);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [params]);

  return [{data, isLoading, isError}, setParams];
};

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

function GetTwitterData() {
  const url =
    'https://5zoc7b1wnf.execute-api.us-east-1.amazonaws.com/default/scrape_twitter_api';

  const [{data, isLoading, isError}, doFetch] = useTwitterApi();

  const [colorMode] = useColorMode();
  const fill = colorMode === 'dark' ? '#fff' : '#000';

  const wordCounts = data.reduce((obj, item) => {
    if (!obj[item]) {
      obj[item] = 0;
    }
    obj[item]++;
    return obj;
  }, {});

  const wordCountArray = Object.entries(wordCounts)
    .filter(([k, v]) => v > 2)
    .map(([k, v]) => {
      return {name: k, value: v};
    });

  const bubbleChartRoot = {
    name: 'root',
    children: wordCountArray,
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <StyledForm
        onSubmit={({data}) => {
          const lang = data.language || 'es';
          doFetch({url, terms: data.terms, lang})}
        }
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
        <HashLoader size="80" color={fill} loading={isLoading} />
        {!isLoading && wordCountArray && wordCountArray.length > 0 && (
          <BubbleChart root={bubbleChartRoot} />
        )}
      </div>
    </div>
  );
}

export default GetTwitterData;
