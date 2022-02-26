function Euler(h_, x0_, y_, vertices_) {
    var y_ = nerdamer(document.getElementById('fx').value);
    vertices_ = []

    h   = h_    || 0.1;
    x0  = x0_   || 0;
    y   = y_    || 1;

    verticesEuler.push(new THREE.Vector3(x0 * 10, y * 10, 0));

    for (let x = 0; x < 1; x += h) {
        // console.log(nerdamer(document.getElementById('fx').value, {x0, y}));
        y = y + h * (x0 + y);
        x0 = x0 + h;
        verticesEuler.push(new THREE.Vector3(x * 10, y * 10, 0));
    }
    // geometryBlackLine.setFromPoints(verticesEuler);
    // geometryEulerPoints.setFromPoints(verticesEuler);
    // console.log(verticesEuler);
}

export  {
    Euler
}