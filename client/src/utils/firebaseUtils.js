import { db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';

export const getParticipantData = async (userId) => {
  const userPath = doc(db, 'users', `${userId}`);
  const UserObject = await getDoc(userPath);

  if (UserObject.exists()) {
    return { ...UserObject.data(), id: UserObject.id };
  }

  return null;
};

export const getMeetingDetails = async (meetingId) => {
  const meetRef = doc(db, 'meetings', `${meetingId}`);
  const MeetingDetails = await getDoc(meetRef);

  if (MeetingDetails.exists()) {
    return MeetingDetails.data();
  }

  return null;
};
