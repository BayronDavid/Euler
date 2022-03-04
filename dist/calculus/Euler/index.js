var verticesEuler = [];
    verticesEuler.push()
// Geometry - it's the same for lines and points
const geometry = new THREE.BufferGeometry();

function calculateEulerApproach(h_, x0_, y_, xf_, fxy_, graph_) {
    verticesEuler = [];
    let graph = graph_  || true;
    let h   =   h_      || 0.2;
    let x0  =   x0_     || 0;
    let y   =   y_      || 1;
    let xf  =   xf_     || 4;
    let fxy =   fxy_    || '-125x+5x^3-(7x^2)/2 + 20';

    verticesEuler.push(new THREE.Vector3(x0 * 10, y / 10, 0));

    for (let x = x0; x < xf;) {
        y = y + h * nerdamer(fxy, { x: x }).text();
        x = x + h;
        verticesEuler.push(new THREE.Vector3(x * 10, y / 10, 0));
    }
    // Add points to the geometry
    if(graph){
        geometry.setFromPoints(verticesEuler)
    }
    // graph ? geometry.setFromPoints(verticesEuler) : geometry.setFromPoints(new THREE.Vector3(0, 0, 0));
    return verticesEuler;
}

calculateEulerApproach();
// geometry.setFromPoints(calculateEulerApproach());

// Materials
const materialBlackLine = new THREE.LineBasicMaterial({ color: 'black' });
const materialRedPoints = new THREE.PointsMaterial({ color: 'red' });

// Objects
const blackLineEuler = new THREE.Line(geometry, materialBlackLine);
const pointsEuler = new THREE.Points(geometry, materialRedPoints);

export{
    calculateEulerApproach,
    blackLineEuler,
    pointsEuler,
}