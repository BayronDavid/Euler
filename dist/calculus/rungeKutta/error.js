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

    
    let containerTable = inputs.containerTable;

    let table = inputs.table;
    let tBody = inputs.tblBody;

    let tHead = document.createElement("thead")
    var hilera = document.createElement("tr");
    
    var headEuler = document.createElement("th");
    var headExact = document.createElement("th");
    var x = document.createElement("th");
    var re = document.createElement("th");


    table.innerHTML = "";
    tBody.innerHTML = "";
    tHead.innerHTML = "";

    x.appendChild(document.createTextNode('x'))
    headExact.appendChild(document.createTextNode('Exact'))
    headEuler.appendChild(document.createTextNode('Runge Kutta'))
    re.appendChild(document.createTextNode('Error Relativo'))


    hilera.appendChild(x);
    hilera.appendChild(headExact);
    hilera.appendChild(headEuler);
    hilera.appendChild(re);
    tHead.appendChild(hilera);
    table.appendChild(tHead);

    let pos = 0;

    let rungeKutta = calculateRungeKuttaApproach(x0_, xf_, y0_, h_, false);
    let exact = calculateExactSolution(h_, x0_, y0_, xf_, inputs.exactFxy.value, false);
    let e, eR;

    for (let i = 0; i <= xf_ - x0_ - h_; i += h_) {
        hilera = document.createElement("tr");

        var celdaX = document.createElement("td");
        var textoceldaX = document.createTextNode((exact[pos].x/10).toFixed(3))
        celdaX.appendChild(textoceldaX);

        var celdaExact = document.createElement("td");
        var textoceldaExact = document.createTextNode((exact[pos].y/10).toFixed(3))
        celdaExact.appendChild(textoceldaExact);

        var celdaEuler = document.createElement("td");
        var textoceldaEuler = document.createTextNode((rungeKutta[pos].y/10).toFixed(3))
        celdaEuler.appendChild(textoceldaEuler);

        e = Math.abs(((rungeKutta[pos].y) - (exact[pos].y)));
        error.push(new THREE.Vector3(i*10, e*10, 0));

        eR = Math.abs(((rungeKutta[pos].y) - (exact[pos].y)) / Math.abs(exact[pos].y));
        relativeError.push(new THREE.Vector3(i*10, eR*1000, 0));

                       
        var celdaEr = document.createElement("td");
        var textoceldaEr = document.createTextNode((eR*100).toFixed(2) + "%")
        celdaEr.appendChild(textoceldaEr);

        hilera.appendChild(celdaX);
        hilera.appendChild(celdaExact);
        hilera.appendChild(celdaEuler);
        hilera.appendChild(celdaEr);

        tBody.appendChild(hilera);
        table.appendChild(tBody);

        pos++;
    }
    geometryRelativeError.setFromPoints(relativeError);
    geometryError.setFromPoints(error);
    containerTable.appendChild(table)

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