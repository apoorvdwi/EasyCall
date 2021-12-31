import React, { useContext, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MeetingContext } from '../../context/meetingContext';
import { trackpubsToTracks } from '../../utils/twilioUtils';

const ParticipantVideo = styled.div`
  height: min-content;
  width: 400px;
  background: #000411;
  border-radius: 10px;
  padding: 5px;
  margin: 20px;

  p {
    color: #fff;
  }
`;

const VideoWrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  height: 250px;
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
`;

const StyledAudio = styled.audio``;

const Participant = ({ participant }) => {
  const meetingContext = useContext(MeetingContext);
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const videoRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    // initialise basic values for the participants
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    participant.on('trackSubscribed', (track) => {
      trackDisabled(track);
      trackEnabled(track);
      trackSubscribed(track);
    });

    participant.on('trackUnsubscribed', trackUnsubscribed);

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
    <ParticipantVideo>
      <VideoWrapper>
        <StyledVideo ref={videoRef} playsInline autoPlay />
      </VideoWrapper>
      <StyledAudio ref={audioRef} autoPlay />
      <p>{participant.identity}</p>
    </ParticipantVideo>
  );
};

export default Participant;
