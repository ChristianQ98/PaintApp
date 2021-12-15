import { useEffect, useState, useRef } from 'react';
import Paint from './components/Paint';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [ isDrawing, setIsDrawing ] = useState(false);
  const [ drawColor, setDrawColor ] = useState();
  const [ penWidth, setPenWidth ] = useState(25);

  // Creates the canvas
  useEffect(() => {
      const canvas = canvasRef.current;
      canvas.width = 1300;
      canvas.height = 1200;
      // Half of the canvas.width
      canvas.style.width = "650px";
      // Half of the canvas.height
      canvas.style.height = "600px";
      // Allows 2d lines and shapes to be displayed
      const context = canvas.getContext("2d");
      context.scale(2, 2);
      context.lineCap = "round";
      // Pen color will change everytime the pen color in local storage gets changed/updated
      context.strokeStyle = localStorage.getItem('penColor');
      // Pen width will change everytime the state of the pen width changes
      context.lineWidth = penWidth;
      contextRef.current = context;
      // eslint-disable-next-line
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setIsDrawing(true);
    context.beginPath();
    context.moveTo(e.clientX - canvas.offsetLeft,
      e.clientY - canvas.offsetTop);
    e.preventDefault();  
  }

  const stopDrawing = (e) => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if(isDrawing) {
        context.stroke();
        context.closePath();
        setIsDrawing(false);
      }
      e.preventDefault();
  }

  const draw = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if(isDrawing) {
      context.lineTo(e.clientX - canvas.offsetLeft,
        e.clientY - canvas.offsetTop);
      context.strokeStyle = localStorage.getItem('penColor');
      context.lineWidth = penWidth;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.stroke();
    }
    e.preventDefault();
  }

  let default_background_color = "white";
  // Clears the entire canvas by making the background color entirely white
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    // Fills entire canvas in white
    context.fillStyle = default_background_color;
    context.clearRect(0 , 0, canvas.width, canvas.height);
    context.fillRect(0 , 0, canvas.width, canvas.height);
  } 
  
  // Changes the state of drawColor to whichever color gets clicked on
  const changeColor = (e) => {
    setDrawColor(e);
    }

    // Downloads drawing and saves it as an image
  const download = async() => {
    const image = canvasRef.current.toDataURL('image/png');
    const blob = await (await fetch(image)).blob();
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = 'image.png';
    link.click();
  }

  // Sets state of penWidth to the value of the penWidth range slider
  const handlePenWidth = (e) => {
    setPenWidth(document.getElementById('pen-width').value);
}

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
      <canvas
      id = 'canvas'
      // When user clicks on their mouse, drawing will start
        onMouseDown = { startDrawing }
        // Mobile: When user touches their screen, drawing will start
        onTouchStart = { startDrawing }
        // When user moves mouse, drawing will appear on the canvas
        onMouseMove = { draw }
        onTouchMove = { draw }
        // When user is not holding down the left mouse button, drawing will stop
        onMouseUp = { stopDrawing }
        // When user mouse is outside the canvas, drawing will stop
        onMouseOut = { stopDrawing }
        onTouchEnd = { stopDrawing }
        ref = { canvasRef }
        style = {{ border: '3px solid black', textAlign: 'center', paddingLeft: 0, paddingRight: 0, marginTop: '2%', marginLeft: 'auto', marginRight: 'auto', display: 'block', backgroundColor: 'white', cursor: 'crosshair' }}
      />

      <div className="tools" style = {{ width: '650px', margin: '0 auto', padding: '5px', marginTop: '1%' }}>
        <div style={{ margin: '0 auto' }}>
          <Paint changeColor = { changeColor } drawColor = { drawColor } handlePenWidth = { handlePenWidth }/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: 'auto', width: '80%', marginTop: '2%' }}>
          <div>
            <button onClick={ () => clearCanvas() } className="clear" style = {{ width: '8em', height: '3em', fontFamily: 'DejaVu Sans Mono, monospace', fontSize: '16px' }}>Clear</button>
          </div>
          <div>
            <button onClick={ download } className="download" style = {{ width: '8em', height: '3em', fontFamily: 'DejaVu Sans Mono, monospace', fontSize: '16px' }}>Download</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;