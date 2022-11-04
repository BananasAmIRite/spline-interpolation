import Interpolator from "../Interpolator.js";
import Utils from './Utils.js'; 

export default class QuadraticInterpolator extends Interpolator {
    runCalculate(lastPoint, point, equations) {
        const slopeFactor = 0.001; 
        const lastEq = equations[equations.length - 1]?.eq; 
        // eq slope
        // maybe just use derivative for slope here
        const lastSlope = equations.length === 0 ? this.initialSlope : 
            Utils.slope(
                [lastPoint[0]-slopeFactor, lastEq(lastPoint[0]-slopeFactor)], 
                [lastPoint[0], lastEq(lastPoint[0])], 
            ); 

            // f(x) = ax^2+bx+c
            // f'(x)=2ax+b
        const a1 = 2*lastPoint[0]; 
        const b1 = 1; 
        const c1 = lastSlope; 

        // point 1
        const a2 = Math.pow(lastPoint[0], 2); 
        const b2 = lastPoint[0]; 
        const c2 = lastPoint[1]; 

        // point 2
        const a3 = Math.pow(point[0], 2); 
        const b3 = point[0]; 
        const c3 = point[1]; 


        const answMat = [[c1], [c2], [c3]]; 

        const inv = math.inv([[a1, b1, 0], [a2, b2, 1], [a3, b3, 1]]); 

        const solutions = math.multiply(inv, answMat); 

        // document.getElementById('abc').innerHTML = solutions; 

        return ({
            left: lastPoint[0], 
            right: point[0],
            eq: (x) => {
                return solutions[0][0] * x * x + solutions[1][0] * x + solutions[2][0]
            }
        }); 
    }
}