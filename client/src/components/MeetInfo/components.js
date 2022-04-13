import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  width: 24%;
  border-left: 3px solid #160c28;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: hidden;
`;

export const InfoWrapper = styled.div`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: 20px 10px;
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

export const Heading = styled.h2`
  font-family: 'Sora', sans-serif;
  font-size: 30px;
  font-weight: 600;
  color: #000411;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  border-radius: 10px;
  background: #000411;
  font-family: 'Sora', sans-serif;
  color: #fff;

  .heading {
    font-size: 17px;
    margin-bottom: 10px;
  }

  .data {
    width: 90%;
    font-size: 11.5px;
    text-overflow: ellipsis;
    text-align: left;
    overflow-wrap: break-word;
  }
`;
