// import { useRef, useEffect } from 'react';

// const Canvas = (props) => {
//     // const {
//     //     width,
//     //     height,
//     //     backgroundColor,
//     //     children,
//     //     ...otherProps
//     // } = props;

//     // const canvasRef = useRef(null);

//     // const draw = (ctx) => {
//     //     ctx.fillStyle = '#000000'
//     //     ctx.beginPath()
//     //     ctx.moveTo(0, 0)
//     // }

//     // useEffect(() => {
//     //     const canvas = document.getElementById('canvas');
//     //     const ctx = canvas.getContext('2d');
//     //     ctx.fillStyle = backgroundColor;
//     //     ctx.fillRect(0, 0, width, height);
//     // }, [width, height, backgroundColor]);
//     const canvas = document.getElementById("canvas");
//     canvas.width = window.innerWidth - 60;
//     canvas.height = 400;

//     // Allows 2d lines and shapes to be displayed
//     let context = canvas.getContext("2d");
//     // Fills canvas background white
//     context.fillStyle = "white";
//     // Covers the entire canvas height and width with the fillStyle color
//     context.fillRect(0, 0, canvas.width, canvas.height);




//     return (
//         <div className="field">
//             <canvas
//             ref={canvasRef}
//             id="canvas"
//             width={width}
//             height={height}
//             style={{
//                 backgroundColor,
//                 ...otherProps,
//             }}
//             >
//                 <div className="tools">
//                     {children}
//                 </div>
//             </canvas>
//     </div>
//     );
// }

// export default Canvas;