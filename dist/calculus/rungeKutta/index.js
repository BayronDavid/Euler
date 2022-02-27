import { calculateExactSolution } from '../Exact/index.js'

const geometry = new THREE.BufferGeometry();

var vertices=[];

function RungeKutta(y, x, h) {
    let k1 = h * f(y, x)
    let k2 = h * f(y + 0.5 * k1, x + 0.5 * h)
    let k3 = h * f(y + 0.5 * k2, x + 0.5 * h)
    let k4 = h * f(y + k3, x + h)
    return y + (k1 + 2 * k2 + 2 * k3 + k4) / 6;

}
function f(y, x){
    return nerdamer(document.getElementById('fxy').value, { x, y }).evaluate().text();
}


function calculateRungeKuttaApproach(x_, xf_, y_, h_, graph_){
    vertices = []

    let graph   = graph_    || true;
    let x       = x_        || 0;
    let xf      = xf_       || 4;
    let y       = y_        || 1;
    let h       = h_        || 0.5;

    vertices.push(new THREE.Vector3(x * 10, y * 10, 0));
    
    while (x <xf-h) {
        y = RungeKutta(y, x, h);
        x += h;
        vertices.push(new THREE.Vector3(x*10, y*10, 0));
    }
    if (graph) {
        geometry.setFromPoints(vertices)
    }
    return vertices;
}
calculateRungeKuttaApproach()

// Materials
const materialBlackLine = new THREE.LineBasicMaterial({ color: 'black' });
const materialRedPoints = new THREE.PointsMaterial({ color: 'red' });

// Objects
const blackLineRungeKutta = new THREE.Line(geometry, materialBlackLine);
const pointsRungeKutta = new THREE.Points(geometry, materialRedPoints);

export{
    blackLineRungeKutta,
    pointsRungeKutta,
    calculateRungeKuttaApproach
}
