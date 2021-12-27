import React from 'react';
import styled from 'styled-components';

const randomstring = require('randomstring');

const StyledIframe = styled.iframe`
  height: 500px;
  width: 750px;
  border-radius: 20px;
  border: 5px #000411 solid;
`;

const WhiteBoard = () => {
  const firstPart = randomstring.generate({
    length: 20,
    charset: 'hex',
    capitalization: 'lowercase',
  });

  const secondPart = randomstring.generate({
    length: 22,
    readable: true,
  });

  const url = `https://excalidraw.com/#room=${firstPart},${secondPart}`;

  return url ? (
    <StyledIframe
      src={url}
      name="whiteboard"
      title="whiteboard"
      scrolling="no"
    />
  ) : null;
};

export default WhiteBoard;
