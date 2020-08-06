import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listPosts, recentPosts } from '../../modules/posts';
import { listTags } from '../../modules/tags';
import PostList from '../../components/posts/PostList';

const PostListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const {
    posts,
    error,
    loading,
    user,
    admin,
    tagList,
    recentList,
  } = useSelector(({ posts, loading, user, tags }) => ({
    posts: posts.posts,
    error: posts.error,
    loading: loading['posts/LIST_POSTS'],
    user: user.user,
    admin: user.admin,
    tagList: tags.tagList,
    recentList: posts.recentList,
  }));

  useEffect(() => {
    const { tag, username, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, location.search]);

  useEffect(() => {
    dispatch(recentPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listTags());
  }, [dispatch]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
      admin={admin}
      tagList={tagList}
      recentList={recentList}
    />
  );
};

export default withRouter(PostListContainer);
