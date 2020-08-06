import React from 'react';
import AskModal from '../common/AskModal';

const AskSaveModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <AskModal
      visible={visible}
      title="포스트 저장"
      description="포스트를 저장했는지 확인해주세요."
      confirmText="확인"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default AskSaveModal;
