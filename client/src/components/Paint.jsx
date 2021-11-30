import './Paint.modules.css';
import { useState } from 'react';

const Paint = (props) => {
    const { handlePenWidth } = props;
    const [ penColor, setPenColor ] = useState(
        [{ 'color': 'red', 'border': false }],
        [{ 'color': 'blue', 'border': false }],
        [{ 'color': 'green', 'border': false }],
        [{ 'color': 'yellow', 'border': false }]
    );

    let colorPicker = '';

    const handleColorPicker = (e) => {
        colorPicker = document.getElementById('color-picker').value;
        localStorage.setItem('penColor', colorPicker);
    }

    const selectColor = (color) => {
        localStorage.setItem('penColor', color)
        setPenColor([...penColor, {'color': penColor, 'border': true}]);
    }

    return (
        <>
            <div className="paint-tools">
                <div>
                    <input type="radio" htmlFor="red" style={{display: 'none'}}></input>
                    <label onClick={ () => selectColor('red') } id="red" name="red" className="color-field red" style={{ backgroundColor: 'red', border: localStorage.getItem('penColor') === 'red' ? '3px solid black' : 'None' }}></label>
                    <input type="radio" htmlFor="blue" style={{display: 'none'}}></input>
                    <label onClick={ () => selectColor('blue') } id="blue" name="blue" className="color-field blue" style={{ backgroundColor: "blue", border: localStorage.getItem('penColor') === 'blue' ? '3px solid black' : 'None' }}></label>
                    <input type="radio" htmlFor="green" style={{display: 'none'}}></input>
                    <label onClick={ () => selectColor('green') } type="radio" id="green" name="green" className="color-field green" style={{ backgroundColor: "green", border: localStorage.getItem('penColor') === 'green' ? '3px solid black' : 'None' }}></label>
                    <input type="radio" htmlFor="yellow" style={{display: 'none'}}></input>
                    <label onClick={ () => selectColor('yellow') } type="radio" id="yellow" name="yellow" className="color-field yellow" style={{ backgroundColor: "yellow", border: localStorage.getItem('penColor') === 'yellow' ? '3px solid black' : 'None' }}></label>

                    <input onInput={ handleColorPicker } id="color-picker" type="color" class="color-picker"></input>
                    {/* Eraser, changes the pen color to white */}
                    <img onClick={ () => selectColor('white') } id="erase" className="color-field eraser" src="https://img.icons8.com/color/60/000000/pencil-eraser.png" alt="eraser" style={{ border: localStorage.getItem('penColor') === 'white' ? '3px solid black' : 'None', padding: '0.3%' }}/>
                    {/* Red color, changes pen color to red if clicked on, and also  */}
                </div>
                <div>
                    <input onInput={ () => handlePenWidth() } id="pen-width" type="range" min="1" max="50" defaultValue={ handlePenWidth } class="pen-width"></input>
                </div>
            </div>
        </>
    )
}

export default Paint;