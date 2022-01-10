import React, { useContext } from 'react';
import styled from 'styled-components';
import { RiChatNewLine } from 'react-icons/ri';

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  .option {
    height: 47%;
    width: 100%;
    border-radius: 20px;
    background-color: #aeb7b3;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;

    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: top;
      width: 100%;
    }
  }
`;

const MessageView = () => {
  return <></>;
};

export default MessageView;
