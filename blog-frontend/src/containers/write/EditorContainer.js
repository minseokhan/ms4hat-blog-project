import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initialize, changeField } from '../../modules/write';
import Editor2 from '../../components/write/Editor';
import axios from 'axios';

const EditorContainer = () => {
  const dispatch = useDispatch();
  const { title, body, originalPostId } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
    originalPostId: write.originalPostId,
  }));

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  const imageUpload = (blob, callback) => {
    const frm = new FormData();
    frm.append('image', blob);
    console.log(frm);
    axios
      .post('/api/files/file/upload', frm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        const image = res.data;
        const uploadedImageURL = `http://localhost:3000/${image}`;
        callback(uploadedImageURL, 'alt text');
      });
  };

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <Editor2
      onChangeField={onChangeField}
      title={title}
      body={body}
      imageUpload={imageUpload}
      Image={Image}
      originalPostId={originalPostId}
    />
  );
};

export default EditorContainer;
