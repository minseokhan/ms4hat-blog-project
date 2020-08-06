import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

const WritePage = () => {
  const { admin } = useSelector(({ user }) => ({
    admin: user.admin,
  }));
  if (!admin) {
    return <div>관리자 이외에는 접속하실 수가 없습니다.</div>;
  }
  return (
    <>
      <Helmet>
        <title>글 작성하기 - REACTERS</title>
      </Helmet>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
    </>
  );
};

export default WritePage;
