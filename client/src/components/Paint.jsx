import './Paint.modules.css';

const Paint = (props) => {
    return (
        <>
            <div className="color-field" style={{ background: 'red' }}></div>
            <div className="color-field" style={{ background: 'blue' }}></div>
            <div className="color-field" style={{ background: 'green' }}></div>
            <div className="color-field" style={{ background: 'yellow' }}></div>

            <input type="color" class="color-picker"></input>
            <input type="range" min="1" max="100" class="pen-width"></input>
        </>
    )
}

export default Paint;