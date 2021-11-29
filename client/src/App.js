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
      canvas.style.width = "650px";
      canvas.style.height = "600px";
      // Allows 2d lines and shapes to be displayed
      const context = canvas.getContext("2d");
      context.scale(2, 2);
      context.lineCap = "round";
      context.strokeStyle = localStorage.getItem('penColor');
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
    context.fillStyle = default_background_color;
    context.clearRect(0 , 0, canvas.width, canvas.height);
    context.fillRect(0 , 0, canvas.width, canvas.height);
  } 
  
  const changeColor = (e) => {
    setDrawColor(e);
    }

  const download = async() => {
    const image = canvasRef.current.toDataURL('image/png');
    const blob = await (await fetch(image)).blob();
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = 'image.png';
    link.click();
  }

  const handlePenWidth = (e) => {
    setPenWidth(document.getElementById('pen-width').value);
}

  return (
    <>
      <canvas
      id = 'canvas'
        onMouseDown = { startDrawing }
        onTouchStart = { startDrawing }
        onMouseMove = { draw }
        onTouchMove = { draw }
        onMouseUp = { stopDrawing }
        onMouseOut = { stopDrawing }
        onTouchEnd = { stopDrawing }
        ref = { canvasRef }
        style = {{ border: '3px solid black', width: '20px', height: '20px', textAlign: 'center', paddingLeft: 0, paddingRight: 0, marginTop: '2%', marginLeft: 'auto', marginRight: 'auto', display: 'block', backgroundColor: 'white', cursor: 'crosshair' }}
      />

      <div className="paint-tools" style = {{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', width: '50%', margin: 'auto', padding: '5px', marginTop: '1%' }}>
        <div>
          <Paint changeColor = { changeColor } drawColor = { drawColor } handlePenWidth = { handlePenWidth }/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: 'auto', width: '80%', marginTop: '2%' }}>
          <div>
            {/* <button id="undo" onClick={ () => undo() } className="undo" style = {{ width: '8em', height: '3em', fontFamily: 'DejaVu Sans Mono, monospace', fontSize: '16px' }}>Undo</button> */}
          </div>
          <div>
            <button onClick={ () => clearCanvas() } className="clear" style = {{ width: '8em', height: '3em', fontFamily: 'DejaVu Sans Mono, monospace', fontSize: '16px' }}>Clear</button>
          </div>
          <div>
            <button onClick={ download } className="download" style = {{ width: '8em', height: '3em', fontFamily: 'DejaVu Sans Mono, monospace', fontSize: '16px' }}>Download</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;