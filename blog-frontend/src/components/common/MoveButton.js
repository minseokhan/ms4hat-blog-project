import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import {
  AiOutlineArrowUp,
  AiOutlineHeart,
  AiOutlineLink,
  AiFillHeart,
} from 'react-icons/ai';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SnackbarProvider, wrapComponent } from 'react-snackbar-alert';
import { ScrollTo } from 'react-scroll-to';

const ButtonBigBox = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background-color: rgba(244, 129, 107, 0.6);
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26), 0 2px 10px 0 rgba(0, 0, 0, 0.22);
  cursor: pointer;
  ${(props) =>
    props.open &&
    css`
      background: rgba(244, 129, 107, 0.7);
      a {
        opacity: 1;
        width: 60px;
        height: 60px;
        transition-delay: 0s;
        &:hover {
          transition-delay: 0s;
          transition: 0.125s;
          border: none;
          color: white;
          background: rgba(244, 129, 107, 0.25);
        }
        &:nth-child(2) {
          right: 88px;
          bottom: 0;
        }
        &:nth-child(3) {
          right: 68px;
          bottom: 68px;
        }
        &:nth-child(4) {
          right: 0;
          bottom: 88px;
        }
      }
      .plus {
        transition: 0.125s all ease-in;
        transform: rotate(45deg);
      }
    `};
`;

const ButtonBox = styled.a`
  transition: 0.3s;
  opacity: 0;
  width: 0px;
  height: 0px;
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
  color: rgba(244, 129, 107, 0.25);
  font-size: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${(props) => props.color};
  position: absolute;
  right: 30px;
  bottom: 30px;
`;

const Container = wrapComponent(function ({ createSnackbar, url }) {
  const showSnackbar = () => {
    createSnackbar({
      message: '링크가 복사되었습니다',
      dismissable: false,
      pauseOnHover: false,
      progressBar: true,
      sticky: false,
      theme: 'success',
      timeout: 3000,
    });
  };

  return (
    <CopyToClipboard text={url}>
      <ButtonBox onClick={showSnackbar}>
        <AiOutlineLink />
      </ButtonBox>
    </CopyToClipboard>
  );
});

const MoveButton = ({ onHeartClick, likeboolean }) => {
  const [open, setOpen] = useState(false);
  const onToggle = () => setOpen(!open);
  const url = window.location.href;

  return (
    <SnackbarProvider position="top-right">
      <ButtonBigBox onClick={onToggle} open={open}>
        <FiPlus className="plus" />
        <Container url={url} />
        <ButtonBox onClick={onHeartClick}>
          {likeboolean ? <AiFillHeart /> : <AiOutlineHeart />}
        </ButtonBox>
        <ScrollTo>
          {({ scroll }) => (
            <ButtonBox onClick={() => scroll({ y: 0, smooth: true })}>
              <AiOutlineArrowUp />
            </ButtonBox>
          )}
        </ScrollTo>
      </ButtonBigBox>
    </SnackbarProvider>
  );
};

export default MoveButton;
