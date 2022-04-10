import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: 20px;
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

export const Participant = styled.div`
  width: 100%;
  height: 50px;
  margin: auto;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background: #000411;
  font-family: 'Sora', sans-serif;
  color: #fff;
  font-size: 20px;
`;
