import styled from 'styled-components';

export const ParticipantVideo = styled.div`
  height: min-content;
  background: #000411;
  border-radius: 10px;
  padding: 5px;
  margin: 13px 10px;

  p {
    color: #fff;
  }
`;

export const VideoWrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  padding-top: 56.25% !important;
  position: relative;
`;

export const StyledVideo = styled.video`
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  border-radius: 10px;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
  ${(props) =>
    props.inverted
      ? `
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  `
      : ''}
`;

export const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px 0;

  .name {
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    color: #fff;
    font-weight: 500;
  }

  .controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    width: 50px;
  }
`;

export const StyledAudio = styled.audio``;
