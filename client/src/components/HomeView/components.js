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

export const SubHeading = styled.p`
  font-family: 'Sora', sans-serif;
  color: #160c28;
  font-size: 18px;
  font-weight: 600;
  width: 99%;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const StyledInput = styled(Input)`
  width: 100%;
  font-size: 17px;
  outline: none;
  border-color: #160c28;
  border-radius: 10px;
  background: #e1efe6;
  font-family: 'Sora', sans-serif;
  margin-bottom: 15px;
  border: 2px solid transparent;

  &:hover,
  &:focus,
  &:active {
    color: #160c28;
    background: #e1efe6;
    border: 2px solid #160c28;
    box-shadow: none;
  }
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
