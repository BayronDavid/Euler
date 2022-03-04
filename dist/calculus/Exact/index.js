var vertices = [];

// Geometry
const geometry = new THREE.BufferGeometry()

function calculateExactSolution(h_, x0_, y0_, xf_, fxy_, graph) {
    vertices = [];
    if(graph == null) {graph = true}
    let h       = h_    || 0.2;
    let fxy     = fxy_  || "-125x+5x^3-(7x^2)/2 + 20"
    let x0      = x0_   || 0
    let xf      = xf_   || 4

    for (let x = x0; x < xf+h; x += h) {
        const y = nerdamer(fxy, { x: x }).text();
        vertices.push(new THREE.Vector3(x * 10, y/10, 0));
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

