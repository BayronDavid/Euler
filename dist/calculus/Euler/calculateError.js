import { calculateEulerApproach } from "./index.js"
import { calculateExactSolution } from "../Exact/index.js"
import * as inputs                from "../../events/Euler/inputs.js"

// Geometry
const geometryError = new THREE.BufferGeometry()
const geometryRelativeError = new THREE.BufferGeometry()
let error = []
let relativeError = []

function calculateError(){
    error = []
    relativeError = []

    let h_   = parseFloat(inputs.h);
    let x0_  = parseFloat(inputs.x0.value);
    let y0_  = parseFloat(inputs.y0.value);
    let xf_  = parseFloat(inputs.xf.value);

    let pos = 0;

    let euler = calculateEulerApproach(h_, x0_, y0_, xf_, inputs.fxy.value, false);
    let exact = calculateExactSolution(h_, x0_, y0_, xf_, inputs.exactFxy.value, false);
    let e, eR 
    for (let i = 0; i <=xf_-x0_-h_; i+=h_) {
        e = Math.abs(((euler[pos].y) - (exact[pos].y)));
        error.push(new THREE.Vector3(i*10 ,e , 0));

        eR = Math.abs(((euler[pos].y) - (exact[pos].y)) / Math.abs(exact[pos].y));
        relativeError.push(new THREE.Vector3(i*10 ,eR*10 , 0));

        pos++;
    }
    geometryRelativeError.setFromPoints(relativeError);
    geometryError.setFromPoints(error)
    return error;
}

calculateError();

// Material
const materialBlueLine = new THREE.LineBasicMaterial({ color: 'black'});
const materialRedLine = new THREE.LineBasicMaterial({ color: 'orange'});
// Object
const blueLineError = new THREE.Line(geometryError, materialRedLine);
const redLineRelativeError = new THREE.Line(geometryRelativeError, materialBlueLine);

export{
    blueLineError,
    redLineRelativeError,
    calculateError
}