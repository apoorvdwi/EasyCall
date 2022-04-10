import React, { useState, useContext, useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { FaHome } from 'react-icons/fa';
import { BsFillShareFill } from 'react-icons/bs';
import { IoMdChatbubbles } from 'react-icons/io';
import { UserContext } from '../../context/userContext';
import { MeetingContext } from '../../context/meetingContext';
import Logo from '../../assets/logoDarkTransparentHorizhontal.png';
import {
  StyledSubmitButton,
  Wrapper,
  StyledSignoutButton,
  TopNavBar,
  HomeWrapper,
  CurrentRoute,
  BottomContainer,
} from './components';
import HomeView from '../../components/HomeView';
import MessageView from '../../components/MessageView';
import { useSnackbar } from 'notistack';
import { Collapse, Avatar } from '@mui/material';
import './styles.scss';

const HomePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const userContext = useContext(UserContext);
  const meetingContext = useContext(MeetingContext);
  const { endMeeting } = meetingContext;
  const { user, signOutUser } = userContext;
  const [view, setView] = useState('home');

  useEffect(() => {
    endMeeting();
  }, []);

  return (
    <Wrapper>
      <HomeWrapper>
        <TopNavBar>
          <div style={{ display: 'flex' }}>
            <CurrentRoute
              current={view === 'home'}
              onClick={() => {
                setView('home');
              }}
            >
              <FaHome size={30} />
              &nbsp;Home
            </CurrentRoute>
            <CurrentRoute
              disabled
              current={view === 'messages'}
              onClick={() => {
                setView('messages');
              }}
            >
              <IoMdChatbubbles size={30} />
              &nbsp;Messages
            </CurrentRoute>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StyledSignoutButton
              type="default"
              size="large"
              onClick={async () => {
                await signOutUser();
              }}
            >
              <AiOutlineLogout size={30} />
              &nbsp;&nbsp;SignOut
            </StyledSignoutButton>
            <Avatar
              size={55}
              sx={{ width: 55, height: 55 }}
              src={
                user.userImage
                  ? user.userImage
                  : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
              }
            />
          </div>
        </TopNavBar>
        <BottomContainer>
          <div className="leftContainer">
            <img className="logo" alt="logo" src={Logo} />
            <div className="userDetails">
              <span className="title">User Details</span>
              <p>{user.displayName}</p>
              <p>{user.email}</p>
              <StyledSubmitButton
                style={{ marginTop: '10px', width: '70%' }}
                onClick={() => {
                  navigator.clipboard.writeText(user.id).then(() => {
                    enqueueSnackbar('User ID copied', {
                      anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                      },
                      TransitionComponent: Collapse,
                      variant: 'success',
                    });
                  });
                }}
              >
                Share ID&nbsp;&nbsp;
                <BsFillShareFill size={20} />
              </StyledSubmitButton>
            </div>
          </div>
          <div className="rightContainer">
            {view === 'home' ? <HomeView /> : <MessageView />}
          </div>
        </BottomContainer>
      </HomeWrapper>
    </Wrapper>
  );
};

export default HomePage;
