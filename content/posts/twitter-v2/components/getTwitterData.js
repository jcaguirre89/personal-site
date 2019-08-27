import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled'
import axios from 'axios';
import BubbleChart from './bubbleChart';
import { HashLoader } from 'react-spinners/HashLoader'

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

const ChartContainer = styled.div`
  margin: 0;
  width: 100%;
  height: 500px;
`

function GetTwitterData() {
  const [terms, setTerms] = useState('Chile');
  const lang = 'es';
  const url = 'https://5zoc7b1wnf.execute-api.us-east-1.amazonaws.com/default/scrape_twitter_api'

  const [{data, isLoading, isError}, doFetch] = useTwitterApi();

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
    name: "root",
    children: wordCountArray
  }

  console.log(bubbleChartRoot)

  return (
    <div style={{ margin: 0, width: `100%` }}>
      <form
        onSubmit={event => {
          doFetch({ url, terms, lang });
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={terms}
          onChange={event => setTerms(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <div>Loading...</div>}
      {!isLoading && wordCountArray && wordCountArray.length > 0 && (
        <ChartContainer>
          <BubbleChart root={bubbleChartRoot} />
        </ChartContainer>
      )}
    </div>
  );
}

export default GetTwitterData;
