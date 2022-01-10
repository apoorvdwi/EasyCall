import React, { useContext, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MeetingContext } from '../../context/meetingContext';
import { UserContext } from '../../context/userContext';
import { SocketContext } from '../../context/socketContext';
import { trackpubsToTracks } from '../../utils/twilioUtils';
import {
  BsMicFill,
  BsMicMuteFill,
  BsCameraVideoFill,
  BsCameraVideoOffFill,
} from 'react-icons/bs';

const ParticipantVideo = styled.div`
  height: min-content;
  background: #000411;
  border-radius: 10px;
  padding: 5px;
  margin: 13px 10px;

  p {
    color: #fff;
  }
`;

const VideoWrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  padding-top: 56.25% !important;
  position: relative;
`;

const StyledVideo = styled.video`
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

const BottomContainer = styled.div`
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

const StyledAudio = styled.audio``;

const Participant = ({ participant, me = false }) => {
  const meetingContext = useContext(MeetingContext);
  const socketContext = useContext(SocketContext);
  const { usersList } = socketContext;
  const { participantWidth, userAudio, userVideo, setScreenTrack } =
    meetingContext;
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const [participantUser, setParticipantUser] = useState(null);
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [isVideoEnabled, setIsVideoEnabled] = useState(!!videoTracks.length);
  const [isAudioEnabled, setIsAudioEnabled] = useState(!!audioTracks.length);

  const videoRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    participant.on('trackSubscribed', (track) => {
      trackDisabled(track);
      trackEnabled(track);
      trackSubscribed(track);
    });

    participant.on('trackUnsubscribed', trackUnsubscribed);

    participant.on('trackPublished', async (remoteTrackPublication) => {
      while (true) {
        if (remoteTrackPublication.track) break;
        await new Promise((res) => {
          setTimeout(res, 1);
        });
      }
      setScreenTrack(remoteTrackPublication.track);
    });

    participant.on('trackUnpublished', (remoteTrackPublication) => {
      setScreenTrack(null);
    });

    participant.tracks.forEach((publication) => {
      if (publication.track) {
        trackDisabled(publication.track);
        trackEnabled(publication.track);

        publication.track.on('disabled', (track) => trackDisabled(track));
        publication.track.on('enabled', (track) => trackEnabled(track));
      }
    });

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    if (usersList && participant) {
      const participantData = usersList.filter(
        (user) => user.id === participant.identity,
      );
      setParticipantUser(participantData[0]);
    }
  }, [usersList, participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  const trackSubscribed = (track) => {
    if (track.kind === 'video') {
      setVideoTracks((videoTracks) => [...videoTracks, track]);
    } else if (track.kind === 'audio') {
      setAudioTracks((audioTracks) => [...audioTracks, track]);
    }
    track.on('disabled', (track) => trackDisabled(track));
    track.on('enabled', (track) => trackEnabled(track));
  };

  const trackUnsubscribed = (track) => {
    if (track.kind === 'video') {
      setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
    } else if (track.kind === 'audio') {
      setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
    }
  };

  const trackDisabled = (track) => {
    track.on('disabled', () => {
      if (track.kind === 'video') {
        setIsVideoEnabled(false);
      }
      if (track.kind === 'audio') {
        setIsAudioEnabled(false);
      }
    });
  };

  function trackEnabled(track) {
    track.on('enabled', () => {
      if (track.kind === 'video') {
        setIsVideoEnabled(true);
      }
      if (track.kind === 'audio') {
        setIsAudioEnabled(true);
      }
    });
  }

  return (
    <ParticipantVideo style={{ width: `${participantWidth}%` }}>
      <VideoWrapper>
        <StyledVideo inverted={me} ref={videoRef} playsInline autoPlay />
      </VideoWrapper>
      <StyledAudio ref={audioRef} autoPlay muted={me} />
      <BottomContainer>
        <span className="name">
          {participantUser && participantUser.displayName}
          {participantUser && participantUser.id === user.id ? ' (You)' : ''}
        </span>
        <div className="controls">
          {isAudioEnabled ? (
            <BsMicFill size={20} />
          ) : (
            <BsMicMuteFill size={20} />
          )}
          {isVideoEnabled ? (
            <BsCameraVideoFill size={20} />
          ) : (
            <BsCameraVideoOffFill size={20} />
          )}
        </div>
      </BottomContainer>
    </ParticipantVideo>
  );
};

export default Participant;
