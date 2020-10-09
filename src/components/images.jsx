import React from 'react';
// Import de l'image
import LOGO from './logo.png';

function image() {
  return (
    <div className="container">
      <img src={LOGO} alt="Logo" />
    </div>
  );
}

export default image;
