import { useEffect, useState, useRef } from 'react';
import Paint from './components/Paint';
import Undo from './components/Undo';
import './App.css';
import CanvasDraw from 'react-canvas-draw';

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [ isDrawing, setIsDrawing ] = useState(false);
  const [ drawColor, setDrawColor ] = useState();
  const [ canvasDrawing, setCanvasDrawing ] = useState([]);
  const [ penWidth, setPenWidth ] = useState(5);
  
  let drawArr = [];
  let index = -1;
  // let penWidth = 5;
  let canvasHistory = [];

  // Creates the canvas
  useEffect(() => {
      const canvas = canvasRef.current;
      canvas.width = 1350;
      canvas.height = 1250;
      canvas.style.width = "675px";
      canvas.style.height = "625px";
      // Allows 2d lines and shapes to be displayed
      const context = canvas.getContext("2d");
      context.scale(2, 2);
      context.lineCap = "round";
      context.strokeStyle = localStorage.getItem('penColor');
      context.lineWidth = penWidth;
      contextRef.current = context;
  }, [ localStorage.getItem('penColor'), penWidth ]);

    // useEffect(() => {
    //   setDrawColor(localStorage.getItem('penColor'));
    // }, [ ])

  const startDrawing = ({ nativeEvent }) => {
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
  }

  const stopDrawing = (e) => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if(isDrawing) {
        context.stroke();
        context.closePath();
        // setCanvasDrawing(localStorage.setItem('canvas-drawing', canvas.toDataURL()));
        canvasHistory.push(canvas.toDataURL());
        console.log(canvasHistory);
        console.log(canvasHistory.length);
        setIsDrawing(false);
      }
      e.preventDefault();
      // if(e.type !== 'mouseout') {
      //   // drawArr.push(context.getImageData(0, 0, canvas.width, canvas.height));
      //   // index += 1;
      //   // console.log(drawArr);
      //   // canvasHistory.push(context.getImageData(0, 0, canvas.width, canvas.height));
      // }
  }

  const draw = ({ nativeEvent }) => {
      if(!isDrawing) {
      return;
      }
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
  }

  let default_background_color = "white";
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = default_background_color;
    context.clearRect(0 , 0, canvas.width, canvas.height);
    context.fillRect(0 , 0, canvas.width, canvas.height);
  } 

  const undo = () => {
    // if(index <= 0) {
    //   clearCanvas();
    // } else {
    //   const canvas = canvasRef.current;
    //   const context = canvas.getContext("2d");
    //   index -= 1;
    //   drawArr.pop();
    //   context.putImageData(drawArr[index], 0, 0);
    // }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
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
        onMouseUp = { stopDrawing }
        onMouseMove = { draw }
        ref = { canvasRef }
        style = {{ border: '3px solid black', width: '20px', height: '20px', textAlign: 'center', paddingLeft: 0, paddingRight: 0, marginTop: '2%', marginLeft: 'auto', marginRight: 'auto', display: 'block', backgroundColor: 'white' }}
      />

      <div className="paint-tools" style = {{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', width: '50%', margin: 'auto', padding: '5px', marginTop: '1%' }}>
        <div>
          <Paint changeColor = { changeColor } drawColor = { drawColor } handlePenWidth = { handlePenWidth }/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: 'auto', width: '80%', marginTop: '2%' }}>
          <div>
            <button id="undo" onClick={ undo } className="undo" style = {{ width: '8em', height: '3em', fontFamily: 'DejaVu Sans Mono, monospace', fontSize: '16px' }}>Undo</button>
          </div>
          <div>
            <button onClick={ clearCanvas } className="clear" style = {{ width: '8em', height: '3em', fontFamily: 'DejaVu Sans Mono, monospace', fontSize: '16px' }}>Clear</button>
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