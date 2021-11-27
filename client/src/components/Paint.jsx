import './Paint.modules.css';

const Paint = (props) => {
    // const canvasRef = useRef(null);
    // const canvas = document.getElementById('canvas');
    // const context = canvas.getContext("2d");
    const { handlePenWidth } = props;

    let colorPicker = '';

    const handleColorPicker = (e) => {
        colorPicker = document.getElementById('color-picker').value;
        localStorage.setItem('penColor', colorPicker);
    }
    
    const selectColor = (color) => {
        localStorage.setItem('penColor', color);
        if(localStorage.getItem('penColor' === color)) {
            document.getElementById(color).style.border = '3px solid black';
        }
    }

    return (
        <>
        <div className="paint-tools">
            <input type="radio" htmlFor="red" style={{display: 'none'}}></input>
            <label onClick={ () => selectColor('red') } id="red" name="red" className="color-field" style={{ backgroundColor: 'red', border: localStorage.getItem('penColor') === 'red' ? '3px solid black' : 'None' }}></label>
            <input type="radio" htmlFor="blue" style={{display: 'none'}}></input>
            <label onClick={ () => selectColor('blue') } id="blue" name="blue" className="color-field" style={{ backgroundColor: "blue" }}></label>
            <input type="radio" htmlFor="green" style={{display: 'none'}}></input>
            <label onClick={ () => selectColor('green') } type="radio" id="green" name="green" className="color-field" style={{ backgroundColor: "green", border: localStorage.getItem('penColor') === 'green' ? '3px solid black' : 'None' }}></label>
            <input type="radio" htmlFor="yellow" style={{display: 'none'}}></input>
            <label onClick={ () => selectColor('yellow') } type="radio" id="yellow" name="yellow" className="color-field" style={{ backgroundColor: "yellow", border: localStorage.getItem('penColor') === 'yellow' ? '3px solid black' : 'None' }}></label>

            <input onInput={ handleColorPicker } id="color-picker" type="color" class="color-picker"></input>
            <input onInput={ () => handlePenWidth() } id="pen-width" type="range" min="1" max="50" defaultValue={ handlePenWidth } class="pen-width"></input>
        </div>
        </>
    )
}

export default Paint;