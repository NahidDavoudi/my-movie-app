import React from 'react';

const Button = ({ children, onClick, variant = 'primary' }) => {
  return (
    <button className={`bg-${variant} text-white px-4 py-2 rounded-md shadow-neumorphic-light hover:shadow-neumorphic-dark`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;