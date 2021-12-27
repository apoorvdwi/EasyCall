import React, { useState, createContext, useEffect } from 'react';

const MeetingContext = createContext();

const MeetingProvider = ({ children }) => {
  const [meetId, setMeetId] = useState(null);
  return (
    <MeetingContext.Provider
      value={{
        meetId,
        setMeetId,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export { MeetingContext, MeetingProvider };
