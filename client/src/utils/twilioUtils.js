import axios from 'axios';

export const checkIfRoomExists = async (roomId) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_SERVER_BASE_URL}/twilio/room-exists`,
    {
      roomId,
    },
  );

  return data;
};
