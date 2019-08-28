import React, {useState} from 'react';
import styled from '@emotion/styled';

const Switch = styled.div`
  display: flex;
  width: 200px;
  height: 35px;
  margin: 0.5em 0px;
`;

const Slider = styled.div`
  cursor: pointer;
  background-color: ${props => props.checked ? props.theme.colors.accent : '#ccc'};
  transition: 0.4s;
  border-radius: 34px;
  width: 60px;


  :before {
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    transform: translateX(${props => props.checked ? '26px' : '0px'});
  }

`;


const Toggle = ({value, handleChange}) => {
  return (
    <Switch>
      <div>Spanish</div>
      <Slider checked={value} onClick={e => handleChange(e)}/>
      <div>English</div>
    </Switch>
  );
};

export default Toggle;
