import './Paint.modules.css';
import { useRef } from 'react';

const Paint = (props) => {
    // const canvasRef = useRef(null);
    // const canvas = document.getElementById('canvas');
    // const context = canvas.getContext("2d");
    const { changeColor, drawColor, handlePenWidth } = props;

    const canvasRef = useRef(null);
    const canvas = canvasRef.current;

    var redColor = 'red';

    let colorPicker = '';

    const handleColorPicker = (e) => {
        colorPicker = document.getElementById('color-picker').value;
        localStorage.setItem('penColor', colorPicker);
    }

    return (
        <>
        <div className="paint-tools">
            {/* <div onClick = { changeColor(this) } id="red" className="color-field" style={{ backgroundColor: "red" }}></div>
            <div onClick = { changeColor(this) } className="color-field" style={{ backgroundColor: 'blue' }}></div>
            <div onClick = { changeColor(this) } className="color-field" style={{ backgroundColor: 'green' }}></div>
            <div onClick = { changeColor(this) } className="color-field" style={{ backgroundColor: 'yellow' }}></div> */}
            <input type="radio" for="red" style={{display: 'none'}}></input>
            <label onClick={ (e) => localStorage.setItem('penColor', 'red') } id="red" name="red" className="color-field" style={{ backgroundColor: "red" }}></label>
            <input type="radio" for="blue" style={{display: 'none'}}></input>
            <label onClick={ (e) => localStorage.setItem('penColor', 'blue') } id="blue" name="blue" className="color-field" style={{ backgroundColor: "blue" }}></label>
            <input type="radio" for="green" style={{display: 'none'}}></input>
            <label onClick={ (e) => localStorage.setItem('penColor', 'green') } type="radio" id="green" name="green" className="color-field" style={{ backgroundColor: "green" }}></label>
            <input type="radio" for="yellow" style={{display: 'none'}}></input>
            <label onClick={ (e) => localStorage.setItem('penColor', 'yellow') } type="radio" id="yellow" name="yellow" className="color-field" style={{ backgroundColor: "yellow" }}></label>

            <input onInput={ handleColorPicker } id="color-picker" type="color" class="color-picker"></input>
            <input onInput={ () => handlePenWidth() } id="pen-width" type="range" min="1" max="50" class="pen-width"></input>
        </div>
        </>
    )
}

export default Paint;