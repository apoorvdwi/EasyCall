import styled from 'styled-components';
import { Button } from 'antd';

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

export const Wrapper = styled.div`
  width: 100vw;
  padding: 25px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #000411;
`;

export const StyledSignoutButton = styled(Button)`
  height: 50px;
  border-radius: 40px;
  font-family: 'Sora', sans-serif;
  background: #efcb68;
  color: #160c28;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
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

export const TopNavBar = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 80px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom: 3px solid #000411;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 20px;
`;

export const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e1efe6;
  position: relative;
`;

export const CurrentRoute = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Sora', sans-serif;
  color: #160c28;
  font-size: 25px;
  font-weight: 600;
  margin-right: 50px;
  cursor: pointer;

  ${(props) =>
    props.current
      ? `
  border-bottom : 4px solid #160c28;
  `
      : ''}
`;

export const BottomContainer = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  margin-top: 80px;
  display: flex;

  .leftContainer {
    width: 24%;
    height: 100%;
    border-right: 3px solid #160c28;
    padding: 20px 0;

    .logo {
      width: 82%;
    }

    .userDetails {
      margin-top: 30px;
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .title {
        font-family: 'Sora', sans-serif;
        color: #160c28;
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 15px;
      }

      p {
        font-family: 'Sora', sans-serif;
        color: #160c28;
        font-size: 17px;
        font-weight: 600;
        margin-bottom: 10px;
      }
    }
  }
  .rightContainer {
    width: 76%;
    height: 100%;
    padding: 30px;
    display: grid;
    grid-template-columns: 48.5% 48.5%;
    grid-template-rows: 100%;
    column-gap: 3%;

    .left {
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
    }

    .right {
      border-radius: 20px;
      background-color: #aeb7b3;
      display: flex;
      padding: 20px 30px;
      flex-direction: column;
      justify-content: top;
      align-items: center;
      width: 100%;
      height: 100%;
      max-height: 100%;
      overflow-y: auto;

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
    }
  }
`;
