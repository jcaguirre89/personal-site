import React, {useState, useEffect} from 'react';
import axios from 'axios'

const useTwitterApi = () => {
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    url:
      'https://5zoc7b1wnf.execute-api.us-east-1.amazonaws.com/default/scrape_twitter_api',
    terms: 'Santiago',
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

function GetTwitterData() {
  const [terms, setTerms] = useState('Chile')
  const lang = 'es'
  const url =
    'https://5zoc7b1wnf.execute-api.us-east-1.amazonaws.com/default/scrape_twitter_api';

  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      terms,
      lang,
    }),
  };
  
  const [{ data, isLoading, isError }, doFetch] = useTwitterApi();

  console.log(data);
  return (
    <div>
      <form onSubmit={event => {
        doFetch({url, terms, lang})

        event.preventDefault();
      }}>
        <input
          type="text"
          value={terms}
          onChange={event => setTerms(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

    </div>
  );
}

export default GetTwitterData;
