export default class Interpolator {
    constructor(initialSlope, initialPoints = [], lookAheadPoints = 1) {
        this.initialSlope = initialSlope; 
        this.points = initialPoints ?? []; 
        this.equations = []; 
        this.lookAheadPoints = lookAheadPoints; 
    }

    set slope(slope) {
        this.initialSlope = slope;
        this.calculate();  
    }

    addPoint(point) {
        this.points.push(point);
        // document.getElementById('abc').innerHTML = `Points: ${this.points}`; 
        this.calculate(); 
    }

    getPointAt(x) {
        for (const eqSet of this.equations) {
            if (x < eqSet.left || x > eqSet.right) continue; 
            return eqSet.eq(x);  
        }
        // document.getElementById("abc").innerHTML += x; 
        return null; 
    }

    calculate() {
        this.equations = []; 
        // const slopeFactor = 0.001; 
        // document.getElementById('abc').innerHTML = `${this.points.length}`; 
        if (this.points.length <= this.lookAheadPoints) return; 
        for (let i = 0; i < this.points.length - this.lookAheadPoints; i++) {
            const points = []; 
            // document.getElementById('abc').innerHTML = this.points.length - this.lookAheadPoints;
            for (let j = 0; j <= this.lookAheadPoints; j++) {
                // document.getElementById('abc').innerHTML = `${i+j}`;
                points.push(this.points[i+j]); 
            }
            // document.getElementById('abc').innerHTML = points; 

            this.equations.push(this.runCalculate(points, this.equations)); 
        }
    }

    // runCalculate(points, equations) {

    // }
}