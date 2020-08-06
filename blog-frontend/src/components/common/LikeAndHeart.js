import React from 'react';
import { FaHeart } from 'react-icons/fa';
import styled from 'styled-components';

const LikeHeart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.postStyle ? '13px' : '15px')};
  color: #7d7d7d;
  position: absolute;
  right: 3px;
  padding-right: ${(props) => (props.postStyle ? '0' : '5px')};
  .heart_color {
    color: ${(props) =>
      props.like ? 'rgb(244, 129, 107)' : 'rgba(244, 129, 107, 0.4)'};
    font-size: ${(props) => (props.postStyle ? '12px' : '16px')};
    margin-left: 3px;
  }
`;

const LikeAndHeart = ({ postStyle, likePostNum, likeboolean, likeHeart }) => {
  return (
    <LikeHeart postStyle={postStyle} like={likeboolean}>
      {likeHeart ? likeHeart : likePostNum}
      <FaHeart className="heart_color" />
    </LikeHeart>
  );
};

export default LikeAndHeart;
