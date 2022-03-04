import { calculateExactSolution } from '../Exact/index.js'

const geometry = new THREE.BufferGeometry();

var vertices=[];

function Heun(y, x, h) {
    let k1 = h * f(y, x)
    let k2 = h * f(y+k1 ,x+h)
    return y+(1/2)*(k1+k2);

}
function f(y, x){
    return nerdamer(document.getElementById('fxy').value, { x, y }).evaluate().text();
}


function calculateHeunApproach(x_, xf_, y_, h_, graph_){
    vertices = []

    let graph   = graph_    || true;
    let x       = x_        || 0;
    let xf      = xf_       || 4;
    let y       = y_        || 1;
    let h       = h_        || 0.2;

    vertices.push(new THREE.Vector3(x*10, y/10, 0));
    
    while (x <xf-h) {
        y = Heun(y, x, h);
        x += h;
        vertices.push(new THREE.Vector3(x*10, y/10, 0));
    }
    if (graph) {
        geometry.setFromPoints(vertices)
    }
    return vertices;
}
calculateHeunApproach()

// Materials
const materialBlackLine = new THREE.LineBasicMaterial({ color: 'black' });
const materialRedPoints = new THREE.PointsMaterial({ color: 'red' });

// Objects
const blackLineHeun = new THREE.Line(geometry, materialBlackLine);
const pointsHeun = new THREE.Points(geometry, materialRedPoints);

export{
    blackLineHeun,
    pointsHeun,
    calculateHeunApproach
}
