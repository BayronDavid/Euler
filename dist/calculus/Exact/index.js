var vertices = [];

// Geometry
const geometry = new THREE.BufferGeometry()

function calculateExactSolution(h_, x0_, y0_, xf_, fxy_, graph) {
    vertices = [];
    if(graph == null) {graph = true}
    let h       = h_    || 0.01;
    let fxy     = fxy_  || '-0.5x^4+4x^3-10x^2+8.5x+1'
    let xf      = xf_   || 4
    let x0      = x0_   || 0

    for (let x = x0; x < xf; x += h) {
        const y = nerdamer(fxy, { x: x }).text();
        vertices.push(new THREE.Vector3(x * 10, y * 10, 0));
    }
    if(graph){
        geometry.setFromPoints(vertices);
    }
    return vertices;
}

geometry.setFromPoints(calculateExactSolution());

// Material
const materialBlueLine      = new THREE.LineBasicMaterial({ color: 'blue' });
// Object
const lineBlueExactSolution = new THREE.Line(geometry, materialBlueLine);

export {
    calculateExactSolution,
    lineBlueExactSolution
}

