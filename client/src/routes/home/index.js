import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Button, Avatar, Image, message, Input } from 'antd';
import { AiOutlineLogout, AiFillClockCircle } from 'react-icons/ai';
import { FaHome } from 'react-icons/fa';
import { BsCameraVideo, BsArrowRightShort } from 'react-icons/bs';
import { MdGroups } from 'react-icons/md';
import { IoMdChatbubbles } from 'react-icons/io';
import { ClientContext } from '../../context';
import Logo from '../../assets/logoDarkTransparentHorizhontal.png';

message.config({
  maxCount: 1,
});

const Wrapper = styled.div`
  width: 100vw;
  padding: 45px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #000411;
`;

const StyledSignoutButton = styled(Button)`
  height: 50px;
  border-radius: 40px;
  font-family: 'Sora', sans-serif;
  background: #efcb68;
  color: #160c28;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;

  &:hover,
  &:focus,
  &:active {
    color: #160c28;
    background: #efcb68;
    border-color: unset;
  }

  &:hover {
    border: 3px solid #160c28;
  }
`;

const TopNavBar = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 80px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom: 2px solid #000411;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 20px;
`;

const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e1efe6;
  position: relative;
`;

const Heading = styled.span`
  font-family: 'Sora', sans-serif;
  font-size: 25px;
  font-weight: 600;
  color: #000411;
  display: flex;
  align-items: center;
`;

const CurrentRoute = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Sora', sans-serif;
  color: #160c28;
  font-size: 25px;
  font-weight: 600;
  margin-right: 50px;
  cursor: pointer;
`;

const BottomContainer = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  margin-top: 80px;
  display: flex;

  .leftContainer {
    width: 26%;
    height: 100%;
    border-right: 1px solid #160c28;
    padding: 20px 0;

    .logo {
      width: 82%;
    }

    .userDetails {
      margin-top: 30px;
      padding-left: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      span {
        font-family: 'Sora', sans-serif;
        color: #160c28;
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 15px;
      }

      p {
        font-family: 'Sora', sans-serif;
        color: #160c28;
        font-size: 17px;
        font-weight: 600;
        margin-bottom: 8px;

        .id {
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
        }
      }
    }
  }
  .rightContainer {
    width: 74%;
    height: 100%;
    padding: 30px;
    display: grid;
    grid-template-columns: 48.5% 48.5%;
    column-gap: 3%;

    .left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;

      .option {
        height: 47%;
        width: 100%;
        border-radius: 20px;
        background-color: #aeb7b3;
        padding: 25px 30px;
        display: flex;
        flex-direction: column;
        justify-content: top;
        align-items: center;

        .content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: top;
          width: 100%;
        }
      }
    }

    .right {
      border-radius: 20px;
      background-color: #aeb7b3;
      display: flex;
      padding: 30px;
      flex-direction: column;
      justify-content: top;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
  font-size: 17px;
  outline: none;
  border-color: #160c28;
  border: 2px solid #160c28;
  border-radius: 10px;
  background: #e1efe6;
  font-family: 'Sora', sans-serif;
  margin-bottom: 10px;

  &:hover,
  &:focus,
  &:active {
    color: #160c28;
    background: #e1efe6;
    border: 3px solid #160c28;
    box-shadow: none;
  }
`;

const SubHeading = styled.p`
  font-family: 'Sora', sans-serif;
  color: #160c28;
  font-size: 18px;
  font-weight: 600;
  width: 99%;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const StyledSubmitButton = styled(Button)`
  height: 40px;
  border-radius: 20px;
  font-family: 'Sora', sans-serif;
  background: #efcb68;
  color: #160c28;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover,
  &:focus,
  &:active {
    color: #160c28;
    background: #efcb68;
    border-color: unset;
  }

  &:hover {
    border: 3px solid #160c28;
  }
`;

const HomePage = () => {
  const context = useContext(ClientContext);
  const { user, signOutUser } = context;
  const [newMeetName, setNewMeetName] = useState('');
  const [joinMeetId, setJoinMeetId] = useState('');
  return (
    <Wrapper>
      <HomeWrapper>
        <TopNavBar>
          <div style={{ display: 'flex' }}>
            <CurrentRoute>
              <FaHome size={30} />
              &nbsp;Home
            </CurrentRoute>
            <CurrentRoute>
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
              src={
                <Image
                  preview={false}
                  src={
                    user.userImage
                      ? user.userImage
                      : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                  }
                  style={{ width: 55 }}
                />
              }
            />
          </div>
        </TopNavBar>
        <BottomContainer>
          <div className="leftContainer">
            <img className="logo" alt="logo" src={Logo} />
            <div className="userDetails">
              <span>User Details</span>
              <p>
                ID :{' '}
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(user.id).then(() => {
                      message.success('User ID copied', 2.5);
                    });
                  }}
                  className="id"
                >
                  {user.id}
                </span>
              </p>
              <p>Name : {user.displayName}</p>
              <p>Email : {user.email}</p>
            </div>
          </div>
          <div className="rightContainer">
            <div className="left">
              <div className="option">
                <Heading>
                  <BsCameraVideo size={40} />
                  &nbsp;&nbsp;Create Meeting
                </Heading>
                <div className="content">
                  <SubHeading>Create your own Meeting</SubHeading>
                  <StyledInput
                    value={newMeetName}
                    onChange={(e) => {
                      setNewMeetName(e.target.value);
                    }}
                    placeholder="Meeting Name (Optional)"
                  />
                  <StyledSubmitButton type="default" size="large">
                    Create
                    <BsArrowRightShort size={30} />
                  </StyledSubmitButton>
                </div>
              </div>
              <div className="option">
                <Heading>
                  <MdGroups size={40} />
                  &nbsp;&nbsp;Join Meeting
                </Heading>
                <div className="content">
                  <SubHeading>Join meeting by meet ID</SubHeading>
                  <StyledInput
                    value={joinMeetId}
                    onChange={(e) => {
                      setJoinMeetId(e.target.value);
                    }}
                    placeholder="Meeting ID (Required)"
                  />
                  <StyledSubmitButton
                    disabled={!joinMeetId}
                    type="default"
                    size="large"
                  >
                    Join
                    <BsArrowRightShort size={30} />
                  </StyledSubmitButton>
                </div>
              </div>
            </div>
            <div className="right">
              <Heading>
                <AiFillClockCircle size={30} />
                &nbsp;Recent Meetings
              </Heading>
            </div>
          </div>
        </BottomContainer>
      </HomeWrapper>
    </Wrapper>
  );
};

export default HomePage;
