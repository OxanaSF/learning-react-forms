import React from "react";

const Input = (props) => {
  return (
    <div key={props.key} className={props.className}>
      <label htmlFor={props.id}>{props.content}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {props.hasError && <p className="error-text">{props.par}</p>}
    </div>
  );
};

export default Input;
