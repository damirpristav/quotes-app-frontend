import React from 'react';
import isEmpty from 'is-empty';

const TextArea = (props) => {
  return (
    <div className="form-box">
      <label htmlFor={props.id}>{props.label}</label>
      <textarea
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        className={!isEmpty(props.error) ? 'input-field invalid' : 'input-field'}
        value={props.value}
        onChange={props.onChange}
      ></textarea>
      {props.error ? (<p className="field-error">{props.error}</p>) : null}
    </div>
  );
}

export default TextArea;