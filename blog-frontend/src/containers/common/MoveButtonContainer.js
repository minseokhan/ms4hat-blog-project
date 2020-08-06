import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { likeheartUpdate } from '../../modules/post';
import MoveButton from '../../components/common/MoveButton';

const MoveButtonContainer = () => {
  const { user, post, likeboolean } = useSelector(({ user, post }) => ({
    user: user.user,
    post: post.post,
    likeboolean: post.likeboolean,
  }));
  const dispatch = useDispatch();

  const onHeartClick = () => {
    const userId = user._id;
    const postId = post._id;
    if (user) {
      dispatch(likeheartUpdate({ userId, postId }));
    }
  };

  return <MoveButton onHeartClick={onHeartClick} likeboolean={likeboolean} />;
};

export default MoveButtonContainer;
