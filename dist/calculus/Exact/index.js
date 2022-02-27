var vertices = [];

// Geometry
const geometryBlueLine = new THREE.BufferGeometry()

function calculateExactSolution(h_, xf_, fxy_) {
    vertices = [];

    let h       = h_    || 0.01;
    let fxy     = fxy_  || '-0.5x^4+4x^3-10x^2+8.5x+1'
    let xf      = xf_   || 4
    for (let x = 0; x < xf; x += h) {
        const y = nerdamer(fxy, { x: x }).text();
        vertices.push(new THREE.Vector3(x * 10, y * 10, 0));
    }
    geometryBlueLine.setFromPoints(vertices)
    return vertices;
}
// ----------------------
calculateExactSolution(0.01);

// Material
const materialBlueLine      = new THREE.LineBasicMaterial({ color: 'blue' });
// Object
const lineBlueExactSolution = new THREE.Line(geometryBlueLine, materialBlueLine);

export {
    calculateExactSolution,
    lineBlueExactSolution
}

