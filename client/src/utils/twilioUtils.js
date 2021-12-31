import axios from 'axios';

export const checkIfMeetingExists = async (meetId) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_SERVER_BASE_URL}/twilio/meet-exists`,
    {
      meetId,
    },
  );

  return data;
};

export const getAccessToken = async (identity) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_SERVER_BASE_URL}/twilio/token`,
    {
      identity: identity,
    },
  );

  return data.accessToken;
};

export const trackpubsToTracks = (trackMap) => {
  return Array.from(trackMap.values())
    .map((publication) => {
      return publication.track;
    })
    .filter((track) => track !== null);
};
