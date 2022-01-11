import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  ${(props) =>
    props.isShrinked
      ? `
  width: 25%;
  max-height: 95%;
  padding: 0 5px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;

  &::-webkit-scrollbar {
    width: 10px;
    background: #e1efe6;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #aeb7b3;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #000411;
  }`
      : `
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  align-content: center;
  flex-wrap: wrap;`}
`;

const ParticipantShrinked = (props) => {
  return <Wrapper isShrinked={props.isShrinked}>{props.children}</Wrapper>;
};

export default ParticipantShrinked;
