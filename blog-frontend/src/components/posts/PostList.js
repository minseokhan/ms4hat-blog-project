import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Button from '../common/Button';
import qs from 'qs';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';
import LikeAndHeartContainer from '../../containers/common/LikeAndHeartContainer';
import Skeleton from 'react-loading-skeleton';

const PostListBlock = styled.div`
  width: 74%;
  margin: 2rem 13% 0 13%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 0 2rem;
`;

const PostLeftBlock = styled.div``;

const RecentPostBlock = styled.div`
  display: grid;
  margin-bottom: 4rem;
  padding-right: 1.5rem;
  .title {
    font-size: 1.125rem;
    color: #7d7d7d;
    padding-bottom: 5px;
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: #ced4da;
    margin-bottom: 0.75rem;
  }
`;

const RecentItem = styled.div`
  display: grid;
  color: #7d7d7d;
  p {
    margin: 0;
  }
  .date {
    font-size: 0.9rem;
    margin-bottom: 0.125rem;
  }
  span {
    font-size: 1.125rem;
    cursor: pointer;
    color: rgba(244, 129, 107, 0.6);
  }
  .content {
    font-size: 0.9rem;
    margin-top: 0.125rem;
  }
  .underline {
    width: 60%;
    height: 1px;
    background: #ced4da;
    margin: 0.5rem 0;
  }
`;

const TagsListBlock = styled.div`
  display: grid;
  padding-right: 1.5rem;
  .title {
    font-size: 1.125rem;
    color: #7d7d7d;
    padding-bottom: 5px;
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: #ced4da;
    margin-bottom: 0.75rem;
  }
`;

const TagsItem = styled.span`
  font-size: 1rem;
  color: #7d7d7d;
  cursor: pointer;
  &:hover {
    color: rgba(244, 129, 107, 0.6);
  }
`;

const PostRightBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem 1.25rem;
`;

const PostListHeader = styled.div`
  border-bottom: 1px solid #ced4da;
  padding-bottom: 0.7rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  position: relative;
  p {
    font-size: 35px;
    font-weight: 300;
    color: #7d7d7d;
    margin: 0;
  }
`;

const SearchBox = styled.div`
  width: 200px;
  font-size: 15px;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 10px;
  color: #7d7d7d;
  .search_icon {
    position: absolute;
    font-size: 18px;
    left: 0;
  }
  .close_icon {
    position: absolute;
    font-size: 22px;
    right: 0;
  }
  input {
    width: 100%;
    height: 30px;
    border: none;
    color: #7d7d7d;
    padding-left: 25px;
    border-bottom: 1px solid #ced4da;
    &:focus {
      outline: none;
    }
  }
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 2rem 13% 0 0;
`;

const PostItemBlock = styled.div`
  border: 1px solid rgba(112, 112, 112, 0.3);
  display: grid;
  grid-template-rows: 170px 1fr;
  height: 100%;
  img {
    width: 100%;
    height: 170px;
    border-bottom: 1px solid rgba(112, 112, 112, 0.3);
  }
  h2 {
    font-size: 1.125rem;
    margin-top: 0;
    margin-bottom: 0.7rem;
    font-weight: 300;
    padding-left: 2px;
    color: #7d7d7d;
    &:hover {
      color: rgba(244, 129, 107, 0.6);
    }
  }
  p {
    font-size: 0.8rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    padding-left: 4px;
    font-weight: 300;
    letter-spacing: 0.5px;
    word-break: break-all;
    color: #7d7d7d;
  }
`;

const PostItemContentBlock = styled.div`
  padding: 1rem;
`;

const PostItemFooter = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  position: relative;
  p {
    font-size: 0.8rem;
    color: #7d7d7d;
    margin: 0;
    padding-right: 15px;
    padding-left: 0;
    cursor: pointer;
  }
`;

const PostItem = ({ loading, post, showWriteButton, admin }) => {
  return (
    <PostItemBlock>
      {loading && post === null ? (
        <>
          <span style={{ lineHeight: 0 }}>
            <Skeleton height={170} />
          </span>
          <div style={{ padding: '0 1rem 0.75rem 1rem' }}>
            <p style={{ margin: '1.25rem 0 0.25rem 0' }}>
              <Skeleton width={150} />
            </p>
            <h2 style={{ marginBottom: '0.7rem' }}>
              <Skeleton />
            </h2>
            <p style={{ margin: '0.25rem 0' }}>
              <Skeleton count={4} />
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '0.75rem 0 0.5rem 0',
                padding: '0 0 0.3rem 0.25rem',
                borderBottom: '1px solid #ced4da',
              }}
            >
              <p style={{ marginRight: '0.5rem', padding: 0 }}>
                <Skeleton width={60} />
              </p>
              <p style={{ padding: 0 }}>
                <Skeleton width={60} />
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                position: 'relative',
              }}
            >
              <p style={{ paddingRight: '15px' }}>
                <Skeleton width={60} />
              </p>
              <p>
                <Skeleton width={100} />
              </p>
              <p style={{ position: 'absolute', right: 0 }}>
                <Skeleton width={30} />
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <img src={post.imageUrl} alt="" />
          <PostItemContentBlock>
            <p>{new Date(post.publishedData).toLocaleDateString()} / ms4hat</p>
            <h2>
              <Link to={`/@${post.user.username}/${post._id}`}>
                {post.title}
              </Link>
            </h2>
            <p className="body">{post.body}</p>
            <Tags border={true} list="true" tags={post.tags} />
            <PostItemFooter>
              <p>{post.viewer} views</p>
              <p>Write a comment</p>
              <LikeAndHeartContainer
                likeHeart={post.likeHeart}
                postStyle={true}
                postId={post._id}
              />
            </PostItemFooter>
          </PostItemContentBlock>
        </>
      )}
    </PostItemBlock>
  );
};

const PostList = ({
  location,
  posts,
  error,
  loading,
  showWriteButton,
  admin,
  tagList,
  recentList,
}) => {
  const { tag } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  if (error) {
    return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
  }
  return (
    <>
      <WritePostButtonWrapper>
        {showWriteButton && admin && (
          <Button orange to="/write">
            새 글 작성하기
          </Button>
        )}
      </WritePostButtonWrapper>
      <PostListBlock>
        <PostLeftBlock>
          <RecentPostBlock>
            <span className="title">최근 포스트 목록</span>
            <div className="line" />
            {recentList ? (
              recentList.map((post, index) => (
                <RecentItem key={index}>
                  <p className="date">
                    {new Date(post._doc.publishedData).toLocaleDateString()} /
                    ms4hat
                  </p>
                  <span>
                    <Link to={`/@${post._doc.user.username}/${post._doc._id}`}>
                      {post._doc.title}
                    </Link>
                  </span>
                  <p className="content">{post.body}</p>
                  {index === 2 ? '' : <div className="underline" />}
                </RecentItem>
              ))
            ) : (
              <>
                <div style={{ marginBottom: '0.5rem' }}>
                  <Skeleton width={130} />
                  <Skeleton height={30} />
                  <Skeleton count={2} duration={10} />
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <Skeleton width={130} />
                  <Skeleton height={30} />
                  <Skeleton count={2} duration={10} />
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <Skeleton width={130} />
                  <Skeleton height={30} />
                  <Skeleton count={2} duration={10} />
                </div>
              </>
            )}
          </RecentPostBlock>
          <TagsListBlock>
            <span className="title">태그 목록</span>
            <div className="line" />
            {tagList ? (
              tagList.map((tag, index) => (
                <TagsItem key={index}>
                  <Link to={`/?tag=${tag.name}`}>
                    {tag.name} ({tag.num})
                  </Link>
                </TagsItem>
              ))
            ) : (
              <Skeleton count={4} />
            )}
          </TagsListBlock>
        </PostLeftBlock>
        {!loading && posts ? (
          <PostRightBlock>
            {posts.map((post) => (
              <PostItem loading={false} post={post} key={post._id} />
            ))}
          </PostRightBlock>
        ) : (
          <PostRightBlock style={{ marginBottom: 'calc(7rem + 29px)' }}>
            <PostItem loading={true} post={null} />
            <PostItem loading={true} post={null} />
            <PostItem loading={true} post={null} />
            <PostItem loading={true} post={null} />
            <PostItem loading={true} post={null} />
            <PostItem loading={true} post={null} />
          </PostRightBlock>
        )}
      </PostListBlock>
    </>
  );
};
export default withRouter(PostList);
