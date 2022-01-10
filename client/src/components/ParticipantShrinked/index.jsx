import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
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
  }
`;

const ParticipantShrinked = (props) => {
  return props.isShrinked ? (
    <Wrapper>{props.children}</Wrapper>
  ) : (
    <>{props.children}</>
  );
};

export default ParticipantShrinked;
