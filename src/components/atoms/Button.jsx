import React from 'react';

const Button = ({color, children}) => {
  return(
    <button 
    className={`bg-${color} text-white rounded-md px-4 py-2 hover:bg-${color}/90  hover:scale-105 transition-all duration-300 shadow-neumorphic-card hover:shadow-neumorphic-dark`}>
      {children}
    </button>
  )

};

export default Button;