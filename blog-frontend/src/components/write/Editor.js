import React, { useRef } from 'react';
import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor.min.css';
import 'tui-editor/dist/tui-editor-contents.min.css';
import { Editor } from '@toast-ui/react-editor';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const EditorBlock = styled.div`
  margin: 2rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  width: 100%;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
`;

const StyledButton = styled(Button)`
  margin-top: 2rem;
  height: 2.125rem;
`;

const Editor2 = ({
  title,
  body,
  onChangeField,
  imageUpload,
  originalPostId,
}) => {
  const editorRef = useRef(null);

  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  const saveBody = () => {
    const data = editorRef.current.getInstance().getHtml();
    onChangeField({ key: 'body', value: data });
  };

  return (
    <EditorBlock>
      <TitleInput
        placeholder="제목을 입력하세요"
        onChange={onChangeTitle}
        value={title}
      />
      <Editor
        initialValue={originalPostId ? body : ''}
        previewStyle="vertical"
        height="800px"
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={editorRef}
        exts={[
          {
            name: 'chart',
            minWidth: 100,
            maxWidth: 600,
            minHeight: 100,
            maxHeight: 300,
          },
          'scrollSync',
          'colorSyntax',
          'uml',
          'mark',
          'table',
        ]}
        hooks={{
          addImageBlobHook: (blob, callback) => {
            imageUpload(blob, callback);
          },
        }}
      />
      <StyledButton cyan onClick={saveBody}>
        포스트 저장
      </StyledButton>
    </EditorBlock>
  );
};

export default Editor2;
