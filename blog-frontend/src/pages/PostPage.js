import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewerContainer from '../containers/post/PostViewerContainer';
import Responsive from '../components/common/Responsive';
import MoveButtonContainer from '../containers/common/MoveButtonContainer';

const PostPage = () => {
  return (
    <>
      <HeaderContainer />
      <Responsive>
        <PostViewerContainer />
      </Responsive>
      <MoveButtonContainer />
    </>
  );
};

export default PostPage;
