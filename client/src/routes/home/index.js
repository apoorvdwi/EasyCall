import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Button, Avatar, Image, message } from 'antd';
import { AiOutlineLogout, AiFillClockCircle } from 'react-icons/ai';
import { FaHome } from 'react-icons/fa';
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

const CurrentRoute = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Sora', sans-serif;
  color: #160c28;
  font-size: 25px;
  font-weight: 600;
  border-bottom: 3px solid #160c28;
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
  }
`;

const HomePage = () => {
  const context = useContext(ClientContext);
  const { user, signOutUser } = context;
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
              <AiFillClockCircle size={30} />
              &nbsp;Recent Meetings
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
          <div className="rightContainer" />
        </BottomContainer>
      </HomeWrapper>
    </Wrapper>
  );
};

export default HomePage;
