import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import { Helmet } from 'react-helmet-async';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <>
      <Helmet>
        <title>REACTERS</title>
      </Helmet>
      <Route component={PostListPage} path="/" exact />
      <Route component={PostListPage} path={['/blog/@:username', '/blog']} />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={WritePage} path="/write" />
      <Route component={PostPage} path="/@:username/:postId" />
      <Route component={AboutPage} path="/about" />
    </>
  );
}

export default App;
