// import CubicInterpolator from './interpolators/CubicInterpolator.js'; 
// import QuadraticInterpolator from './interpolators/QuadraticInterpolator.js'; 
import CubicInterpolator from './interpolators/HenryCubicInterpolator.js'; 

const createPointPlotter = (canvas, renderInterval) => {
    let points = []; 
    let t = 0; 
    const interpolatorX = new CubicInterpolator(0); 
    const interpolatorY = new CubicInterpolator(0); 

    document.getElementById('abc').innerHTML = "a";

    const render = () => {
        const ctx = canvas.getContext('2d'); 
        ctx.clearRect(0, 0, canvas.width, canvas.height);  

        ctx.strokeStyle = 'black'; 

        ctx.beginPath(); 

        for (let i = 0; i < t-1; i += renderInterval) {
            ctx.lineTo(
                interpolatorX.getPointAt(i), 
                canvas.height - interpolatorY.getPointAt(i)
            ); 
        }
        ctx.stroke(); 

        for (const point of points) {
            ctx.fillRect(point[0]-2, canvas.height - point[1]-2, 4, 4); 
        }
    }; 

    return (x, y) => {
        interpolatorX.addPoint([t, x]); 
        interpolatorY.addPoint([t, y]);
        t++;
        points.push([x, y]); 
        render(); 
    }
}

try {
    const plotPoint = createPointPlotter(
        document.getElementById("canvas"), 0.01); 

    const canvas = document.getElementById("canvas"); 

    canvas.addEventListener("click", (evt) => {
        const x = evt.offsetX; 
        const y = evt.offsetY; 

        plotPoint(x, canvas.height - y); 
    }); 

    // plotPoint(0, 0); 
    // plotPoint(150, 50);
    // plotPoint(150, 150); 
    // plotPoint(251, 150); 
    // plotPoint(250, 100); 
    // plotPoint(251, 0); 
    // plotPoint(251, 0); 
} catch (err) {
    document.getElementById('abc').innerHTML = `${err.lineNumber} ${err}`; 
}