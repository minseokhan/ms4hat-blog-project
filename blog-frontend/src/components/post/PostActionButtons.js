import React, { useState } from 'react';
import styled from 'styled-components';
import AskRemoveModal from './AskRemoveModal';

const PostActionButtonsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -1.5rem;
`;

const ActionButton = styled.button`
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  color: rgba(244, 129, 107, 0.6);
  font-weight: bold;
  border: 1px solid rgba(244, 129, 107, 0.6);
  outline: none;
  font-size: 0.875rem;
  cursor: pointer;
  background: none;
  &:hover {
    background: rgba(244, 129, 107, 0.6);
    color: white;
  }
  & + & {
    margin-left: 0.45rem;
  }
`;

const PostActionButtons = ({ onEdit, onRemove }) => {
  const [modal, setModal] = useState(false);

  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
    onRemove();
  };
  return (
    <>
      <PostActionButtonsBlock>
        <ActionButton onClick={onEdit}>수정</ActionButton>
        <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
      </PostActionButtonsBlock>
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};

export default PostActionButtons;
