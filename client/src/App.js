import React, { useLayoutEffect, useState } from 'react';

const App = () => {
  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'green';
    ctx.fillRect(10,10, 150, 100);
  })


  return (
    <canvas 
    id="canvas" 
    style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}} 
    width={window.innerWidth} 
    height={window.innerHeight}
    >
      Canvas
    </canvas>
  )
}

export default App;