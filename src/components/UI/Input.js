import React from 'react';

const Input = (props) => {
  return (
    <div className="form-box">
      <label htmlFor={props.id}>{props.label}</label>
      <input 
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        className={props.error ? 'input-field invalid' : 'input-field'}
        value={props.value}
        onChange={props.onChange} 
      />
      {props.error && <p className="field-error">{props.error}</p>}
      {props.info && <span className="info">{props.info}</span>}
    </div>
  );
}

export default Input;