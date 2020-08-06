import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField } from '../../modules/write';
import InputBox from '../../components/write/InputBox';

const InputBoxContainer = () => {
  const dispatch = useDispatch();

  const onChange = url => {
    dispatch(
      changeField({
        key: 'img',
        value: url,
      }),
    );
  };

  return <InputBox onChange={onChange} />;
};

export default InputBoxContainer;
