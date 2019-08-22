import React from 'react';
import GetTwitterData from '../components/getTwitterData';

const apiKey = process.env.TWITTER_API_KEY
console.log(apiKey)

function TwitterData() {
  return <GetTwitterData terms="Chile,Santiago" lang="en" apiKey={apiKey}/>;
}

export default TwitterData;
