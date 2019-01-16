import React from 'react';

function SubmitButton(props) {
  return (
    <SubmitButton
      className={props.className}
      onClick={props.onClick} {...props} />
  );
}

export default SubmitButton;