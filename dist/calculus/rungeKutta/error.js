import { calculateRungeKuttaApproach } from "./index.js"
import { calculateExactSolution } from "../Exact/index.js"
import * as inputs from "../../events/RungeKutta/inputs.js"

// Geometry
const geometryError = new THREE.BufferGeometry()
const geometryRelativeError = new THREE.BufferGeometry()
let error = []
let relativeError = []
let auxr = []

// function calculateRungeKuttaApproach(x_, xf_, y_, h_)
function calculateError() {
    error = []
    relativeError = []
    auxr = []

    let h_ = parseFloat(inputs.h);
    let x0_ = parseFloat(inputs.x0.value);
    let y0_ = parseFloat(inputs.y0.value);
    let xf_ = parseFloat(inputs.xf.value);

    let pos = 0;

    let rungeKutta = calculateRungeKuttaApproach(x0_, xf_, y0_, h_, false);
    let exact = calculateExactSolution(h_, x0_, y0_, xf_, inputs.exactFxy.value, false);
    let e, eR, aux
    for (let i = 0; i <= xf_ - x0_ - h_; i += h_) {
        e = Math.abs(((rungeKutta[pos].y) - (exact[pos].y)));
        error.push(new THREE.Vector3(i*10, e*1000, 0));

        eR = Math.abs(((rungeKutta[pos].y) - (exact[pos].y)) / Math.abs(exact[pos].y));
        relativeError.push(new THREE.Vector3(i*10, eR*1000, 0));

        aux = ((exact[pos].y) - (rungeKutta[pos].y))*10000;
        auxr.push(new THREE.Vector3(i * 10, aux , 0))

        pos++;
    }
    geometryRelativeError.setFromPoints(relativeError);
    geometryError.setFromPoints(auxr);
}

calculateError();

// Material
const materialBlueLine = new THREE.LineBasicMaterial({ color: 'black' });
const materialRedLine = new THREE.LineBasicMaterial({ color: 'orange' });
// Object
const blueLineError = new THREE.Line(geometryError, materialRedLine);
const redLineRelativeError = new THREE.Line(geometryRelativeError, materialBlueLine);

const materialRedPoints = new THREE.PointsMaterial({ color: 'black' });
const pointsRungeKutta = new THREE.Points(geometryError, materialRedPoints);

export {
    blueLineError,
    redLineRelativeError,
    calculateError,
    pointsRungeKutta,
    relativeError,
    error
}