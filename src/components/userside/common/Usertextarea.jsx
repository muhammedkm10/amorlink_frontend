import React, { useState } from 'react';
import './usertextarea.css'; // Import the CSS file

const Usertextarea = ({name,value,onChange,placeholder}) => {
 

  return (
    <div>
      <textarea
        className="textarea" // Add the "textarea" class to apply the styles
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
      />
    </div>
  );
};

export default Usertextarea;
