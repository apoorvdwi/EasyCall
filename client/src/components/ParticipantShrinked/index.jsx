import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 25%;
  max-height: 95%;
  padding: 10px;
  border-radius: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
`;

const ParticipantShrinked = (props) => {
  return <Wrapper>{props.children}</Wrapper>;
};

export default ParticipantShrinked;
