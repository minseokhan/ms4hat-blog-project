import React, { useState, useCallback, useEffect } from 'react';

const InputBox = () => {
  const [image, setImage] = useState('');

  const onChange = useCallback(e => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  }, []);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const formData = new formData();
      formData.append('img', image);
      setImage('');
    },
    [image],
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="file" onChange={onChange} />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputBox;
