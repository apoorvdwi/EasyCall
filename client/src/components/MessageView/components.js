import styled from 'styled-components';
import { Input, Button } from 'antd';

export const Heading = styled.span`
  font-family: 'Sora', sans-serif;
  font-size: 25px;
  font-weight: 600;
  color: #000411;
  display: flex;
  align-items: center;
`;

export const StyledSubmitButton = styled(Button)`
  height: 40px;
  border-radius: 20px;
  font-family: 'Sora', sans-serif;
  background: #efcb68;
  color: #160c28;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: unset;
  border: 2px solid transparent;
  text-transform: none;

  &:hover,
  &:focus,
  &:active {
    color: #160c28;
    background: #efcb68;
    border-color: unset;
  }

  &:hover {
    border: 2px solid #160c28;
  }
`;

export const RecentMeetings = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  border-radius: 20px;
  font-family: 'Sora', sans-serif;
  color: #160c28;
  font-size: 20px;
  font-weight: 400;
  background: #e1efe6;
  cursor: pointer;
  padding: 5px 20px;

  &:hover {
    background: #efcb68;
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  border-radius: 20px;
  background-color: #aeb7b3;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  border-radius: 20px;
  background-color: #aeb7b3;
  position: relative;
`;

export const ChatsWrapper = styled.div`
  width: 100%;
  max-height: calc(90% - 60px);
  min-height: calc(90% - 60px);
  overflow-y: auto;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;

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

export const Message = styled.div`
  width: auto;
  max-width: 95%;
  padding: 5px 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 25px;
  background: #000411;
  font-family: 'Sora', sans-serif;
  color: #fff;

  p {
    font-size: 12px;
    max-width: 100%;
    overflow-wrap: break-word;
    ${(props) =>
    props.me
      ? `
text-align: right;`
      : `
text-align: left;`}
  }

  ${(props) =>
    props.me
      ? `
    align-items: flex-end;
    align-self: flex-end;`
      : `
    align-items: flex-start;
    align-self: flex-start;`}

  span {
    font-size: 15px;
  }
`;

export const MessageInput = styled(Input)`
  width: calc(100%-8px) !important;
  font-size: 17px;
  margin-right: 8px;
  outline: none;
  border-color: #160c28;
  border-radius: 10px;
  background: #e1efe6;
  font-family: 'Sora', sans-serif;
  border: 2px solid #160c28;

  &:hover,
  &:focus,
  &:active {
    color: #160c28;
    background: #e1efe6;
    border: 2px solid #160c28;
    box-shadow: none;
  }
`;

export const InputWrapper = styled.form`
  width: 100%;
  position: sticky;
  padding: 5px 10px 10px;
  bottom: 0;
  left: 0;
  display: flex;
`;

export const TopDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 30px 0;
  justify-content: space-between;
  align-items: center;
`;

export const ChatContainer = styled.div`
  padding: 20px;
  width: 100%;
  max-height: 90%;
  overflow-y: auto;
`;
