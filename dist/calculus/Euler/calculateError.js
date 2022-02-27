import { calculateEulerApproach } from "./index.js"
import { calculateExactSolution } from "../Exact/index.js"

// Geometry
const geometryBlueLine = new THREE.BufferGeometry()
let error = []

function calculateError(h_){
    error = []

    let euler = calculateEulerApproach(h_);
    let exact = calculateExactSolution(h_);
    let y 
    for (let i = 0; i <euler.length-1; i++) {
        y = Math.abs(((euler[i].y) - (exact[0].y)) / 10);
        error.push(new THREE.Vector3(i*10 ,y*10, 0));
    }
    geometryBlueLine.setFromPoints(error);
    return error;
}

calculateError(0.5);

// Material
const materialBlueLine = new THREE.LineBasicMaterial({ color: 'blue' });
// Object
const lineBlueError = new THREE.Line(geometryBlueLine, materialBlueLine);

export{
    lineBlueError
}