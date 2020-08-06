import React from 'react';
import { useSelector } from 'react-redux';
import LikeAndHeart from '../../components/common/LikeAndHeart';

const LikeAndHeartContainer = ({ postStyle, likeHeart }) => {
  const { likeboolean, likePostNum } = useSelector(({ post }) => ({
    likeboolean: post.likeboolean,
    likePostNum: post.likePostNum,
  }));

  return (
    <LikeAndHeart
      likeboolean={likeboolean}
      postStyle={postStyle}
      likePostNum={likePostNum}
      likeHeart={likeHeart}
    />
  );
};

export default LikeAndHeartContainer;
