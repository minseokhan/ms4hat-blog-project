import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Helmet } from 'react-helmet-async';
import LikeAndHeartContainer from '../../containers/common/LikeAndHeartContainer';

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
  margin-bottom: 3rem;
  border: 1px solid #ced4da;
  padding: 3rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 2rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 2.7rem;
    line-height: 1.5;
    color: #7d7d7d;
    font-weight: 300;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.025rem;
  color: #7d7d7d;
  margin-bottom: 4rem;
  img {
    max-width: 100%;
  }
  pre {
    padding: 1.5rem 1.8rem;
    background: ${palette.gray[2]};
    border-radius: 10px;
  }
  blockquote {
    border-left: 6px solid rgba(244, 129, 107, 0.6);
    margin-left: 0;
    padding: 0.2rem 0 0.2rem 1.5rem;
  }
`;

const PostFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid #ced4da;
  position: relative;
  padding-top: 0.35rem;
  p {
    color: #7d7d7d;
    margin: 0;
    position: absolute;
    right: 4rem;
  }
`;

const PostViewer = ({ post, error, loading, actionButtons }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
    }
    return <PostViewerBlock>오류 발생!</PostViewerBlock>;
  }

  if (loading || !post) {
    return null;
  }

  const { title, body, tags, publishedData, user, viewer } = post;
  return (
    <PostViewerBlock>
      <Helmet>
        <title>{title} - REACTERS</title>
      </Helmet>
      <PostHead>
        <h1>{title}</h1>
        <SubInfo
          username={user.username}
          publishedDate={publishedData}
          hasMarginTop
        />
        {actionButtons}
      </PostHead>
      <PostContent
        dangerouslySetInnerHTML={{
          __html: body,
        }}
      />
      <PostFooter>
        <Tags border={false} list="false" tags={tags} />
        <p>{viewer} views</p>
        <LikeAndHeartContainer postStyle={false} />
      </PostFooter>
    </PostViewerBlock>
  );
};

export default PostViewer;
