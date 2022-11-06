import Interpolator from "../Interpolator.js";
import Utils from '../Utils.js'; 

export default class ImprovedCubicInterpolator extends Interpolator {
    constructor(initialSlope, initialPoints = []) {
        super(initialSlope, initialPoints, 2); 
    }
    runCalculate([lastPoint, point, nextPoint], equations) {
        const slopeFactor = 0.001; 
        // const lastEq = this.equations[this.equations.length - 1]?.eq; 

        // slope is zero at every point

        // document.getElementById('abc').innerHTML = `${lastPoint}; ${point}; ${nextPoint}`;

        const m1 = Utils.slope(lastPoint, point);
        const m2 = Utils.slope(point, nextPoint); 

        const percent = (Utils.dist(lastPoint, point))/(Utils.dist(lastPoint, point)+Utils.dist(point, nextPoint)); 
        console.log(percent);

        const avgM = m1+percent*(m2-m1);  

        const lastEq = equations[equations.length - 1]?.eq; 
        // eq slope
        // maybe just use derivative for slope here
        const lastSlope = equations.length === 0 ? this.initialSlope : 
            Utils.slope(
                [lastPoint[0]-slopeFactor, lastEq(lastPoint[0]-slopeFactor)], 
                [lastPoint[0], lastEq(lastPoint[0])], 
            ); 


        // 1st slope
            // f(x) = ax^3+bx^2+cx+d
            // f'(x)=3ax^2+2bx+c
        const a1 = 3*lastPoint[0]*lastPoint[0]; 
        const b1 = 2*lastPoint[0]; 
        const c1 = 1; 
        const d1 = 0;
        const e1 = lastSlope; 

        // 2nd slope
        const a2 = 3*point[0]*point[0]; 
        const b2 = 2*point[0]; 
        const c2 = 1; 
        const d2 = 0; 
        const e2 = avgM; 

        // point 1
        const a3 = Math.pow(lastPoint[0], 3); 
        const b3 = Math.pow(lastPoint[0], 2); 
        const c3 = lastPoint[0];
        const d3 = 1;  
        const e3 = lastPoint[1]; 

        // point 2
        const a4 = Math.pow(point[0], 3); 
        const b4 = Math.pow(point[0], 2);
        const c4 = point[0]; 
        const d4 = 1; 
        const e4 = point[1]; 


        const answMat = [[e1], [e2], [e3], [e4]]; 

        const inv = math.inv([[a1, b1, c1, d1], [a2, b2, c2, d2], [a3, b3, c3, d3], [a4, b4, c4, d4]]); 

        const solutions = math.multiply(inv, answMat); 

        // document.getElementById('abc').innerHTML = solutions; 

        return ({
            left: lastPoint[0], 
            right: point[0],
            eq: (x) => {
                return solutions[0][0] * x * x * x + solutions[1][0] * x * x + solutions[2][0] * x + solutions[3][0]
            }
        }); 
    }
}