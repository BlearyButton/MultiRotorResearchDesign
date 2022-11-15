import React from 'react';
import './Input.scss';

export default function Input({
  label,
  handleChange,
  onBlur,
  value,
  placeholder,
  outline,
  white,
  inputType,
  handleRef,
  onKeyDown,
  className,
  style,
}) {
  return (
    <div className="Input">
      {label && <p className="label">{label}</p>}
      <div className="input-wrapper">
        <input
          onChange={handleChange}
          ref={handleRef}
          onBlur={onBlur}
          value={value}
          type={inputType}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          className={`input ${white ? 'white' : ''} ${outline ? 'outline' : ''} ${className ?? ''}`}
          style={style}
          // id="input"
        />
      </div>
    </div>
  );
}
