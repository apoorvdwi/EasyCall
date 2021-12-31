import React, { useState, createContext, useEffect, useCallback } from 'react';
import { connect, LocalAudioTrack, LocalVideoTrack } from 'twilio-video';

const MeetingContext = createContext();

const MeetingProvider = ({ children }) => {
  const [meetId, setMeetId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [meeting, setMeeting] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [userAudio, setUserAudio] = useState(true);
  const [userVideo, setUserVideo] = useState(true);

  const endMeeting = useCallback(() => {
    setMeeting((prevMeeting) => {
      if (prevMeeting) {
        prevMeeting.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevMeeting.disconnect();
      }
      return null;
    });
  }, []);

  const leaveMeeting = () => {
    // do this when a user leaves the room
    if (!meeting || !meeting.localParticipant) return;
    meeting.on('disconnected', (meeting) => {
      // Detach the local media elements
      meeting.localParticipant.tracks.forEach((publication) => {
        const attachedElements = publication.track.detach();
        attachedElements.forEach((element) => element.remove());
      });
    });
  };

  const connectToMeeting = async (
    accessToken,
    meetId = 'test-room',
    setMeeting,
  ) => {
    const constraints = {
      audio: true,
      video: {
        wdith: 640,
        height: 480,
      },
      networkQuality: {
        local: 1,
        remote: 2,
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(async (stream) => {
        const audioTrack = new LocalAudioTrack(stream.getAudioTracks()[0]);
        const videoTrack = new LocalVideoTrack(stream.getVideoTracks()[0]);

        const tracks = [audioTrack, videoTrack];

        const meeting = await connect(accessToken, {
          name: meetId,
          tracks,
        });

        setMeeting(meeting);

        meeting.localParticipant.setNetworkQualityConfiguration({
          local: 2,
          remote: 1,
        });
        setIsConnecting(false);
      })
      .catch((err) => {
        console.log(
          'Error occured when trying to access to local devices',
          err,
        );
      });
  };

  const participantConnected = (participant) => {
    // when a new participant gets connected
    setParticipants((prevParticipants) => [...prevParticipants, participant]);
  };

  const participantDisconnected = (participant) => {
    // when a participant gets disconnected
    setParticipants((prevParticipants) =>
      prevParticipants.filter((p) => p !== participant),
    );
  };

  return (
    <MeetingContext.Provider
      value={{
        meetId,
        setMeetId,
        accessToken,
        setAccessToken,
        meeting,
        setMeeting,
        endMeeting,
        leaveMeeting,
        connectToMeeting,
        isConnecting,
        setIsConnecting,
        participants,
        setParticipants,
        participantConnected,
        participantDisconnected,
        userAudio,
        setUserAudio,
        userVideo,
        setUserVideo,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export { MeetingContext, MeetingProvider };
