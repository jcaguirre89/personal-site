import React, {useState} from 'react';

function GetTwitterData({terms, lang, apiKey}) {
  const url =
    'https://zs63emuqmk.execute-api.us-east-1.amazonaws.com/default/scrape_twitter_api';

  const body = JSON.stringify({
    terms,
    lang,
  });

  console.log(body);

  const getData = async (terms, lang) => {
    const data = fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        terms,
        lang,
      }),
    })
      .then(response => response.json())
      .catch(error => console.error(error));
    return data;
  };

  console.log(getData(terms, lang));

  return <pre>{JSON.stringify(getData(terms, lang))}</pre>;
}

export default GetTwitterData;
