import React, { useState, createContext, useEffect } from 'react';
import { connect, LocalAudioTrack, LocalVideoTrack } from 'twilio-video';

const MeetingContext = createContext();

const MeetingProvider = ({ children }) => {
  const [meetId, setMeetId] = useState(null);
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [meeting, setMeeting] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [userAudio, setUserAudio] = useState(true);
  const [userVideo, setUserVideo] = useState(true);
  const [panelView, setPanelView] = useState(null);
  const [screenTrack, setScreenTrack] = useState(null);
  const [participantWidth, setParticipantWidth] = useState(50);

  const endMeeting = () => {
    setIsConnecting(true);
    setMeetId(null);
    setAccessToken(null);
    setMeetingDetails(null);
    setMeeting((prevMeeting) => {
      if (prevMeeting) {
        prevMeeting.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevMeeting.disconnect();
      }
      if (screenTrack) {
        screenTrack.stop();
        setScreenTrack(null);
      }
      return null;
    });
  };

  const leaveMeeting = () => {
    if (!meeting || !meeting.localParticipant) return;
    meeting.on('disconnected', (meeting) => {
      meeting.localParticipant.tracks.forEach((publication) => {
        const attachedElements = publication.track.detach();
        attachedElements.forEach((element) => element.remove());
      });
    });
  };

  const connectToMeeting = async (accessToken, meetId) => {
    if (meetId && accessToken) {
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
    }
  };

  const toggleUserAudio = () => {
    if (!meeting || !meeting.localParticipant) return;
    if (userAudio) {
      meeting.localParticipant.audioTracks.forEach((publication) => {
        publication.track.disable();
      });
    } else {
      meeting.localParticipant.audioTracks.forEach((publication) => {
        publication.track.enable();
      });
    }
    setUserAudio(!userAudio);
  };

  const toggleUserVideo = () => {
    if (!meeting || !meeting.localParticipant) return;
    if (userVideo) {
      meeting.localParticipant.videoTracks.forEach((publication) => {
        publication.track.disable();
      });
    } else {
      meeting.localParticipant.videoTracks.forEach((publication) => {
        publication.track.enable();
      });
    }
    setUserVideo(!userVideo);
  };

  const toggleScreenShare = async () => {
    if (!screenTrack) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        const userScreen = new LocalVideoTrack(stream.getTracks()[0]);
        setScreenTrack(userScreen);
        meeting.localParticipant.publishTrack(userScreen);
        userScreen.mediaStreamTrack.onended = () => {
          meeting.localParticipant.unpublishTrack(screenTrack);
          screenTrack.stop();
          setScreenTrack(null);
        };
      } catch (e) {
        console.error(e);
      }
    } else {
      meeting.localParticipant.unpublishTrack(screenTrack);
      screenTrack.stop();
      setScreenTrack(null);
    }
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

  const changePanelView = (view) => {
    if (panelView === view) setPanelView(!panelView);
    else setPanelView(view);
  };

  const contextProps = {
    meetId,
    setMeetId,
    accessToken,
    setAccessToken,
    meeting,
    meetingDetails,
    setMeetingDetails,
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
    toggleUserAudio,
    toggleUserVideo,
    panelView,
    participantWidth,
    setParticipantWidth,
    changePanelView,
    screenTrack,
    setScreenTrack,
    toggleScreenShare,
  };

  return (
    <MeetingContext.Provider value={contextProps}>
      {children}
    </MeetingContext.Provider>
  );
};

export { MeetingContext, MeetingProvider };
