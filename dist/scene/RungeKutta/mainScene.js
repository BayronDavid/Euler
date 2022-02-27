import { blackLineRungeKutta, pointsRungeKutta, } from '../../calculus/rungeKutta/index.js'
import { lineBlueExactSolution, calculateExactSolution } from '../../calculus/Exact/index.js'
import { blueLineError, redLineRelativeError, error, relativeError } from "../../calculus/rungeKutta/error.js"


var container = document.getElementById('canvas');

var canvasWidth = container.offsetWidth;
var canvasHeight = container.offsetHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, canvasWidth / canvasHeight, 0.1, 1000);
camera.position.z = 50;
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: 1 });
renderer.setSize(canvasWidth, canvasHeight);

container.appendChild(renderer.domElement);

var controls = new THREE.TrackballControls(camera, container);

// Grid
const gridHelper = new THREE.GridHelper(1000, 100);
gridHelper.rotation.x = Math.PI / 2;
scene.add(gridHelper);

// AXis 
const arrowHelperY = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0).normalize(), new THREE.Vector3(0, 0, 0), 500, new THREE.Color('green'));
const arrowHelperX = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0).normalize(), new THREE.Vector3(0, 0, 0), 500, new THREE.Color('red'));
scene.add(arrowHelperX);
scene.add(arrowHelperY);

// Add objects to scene

// Add exact solution curve
scene.add(lineBlueExactSolution);
// Add RungeKutta approach curve and points
scene.add(blackLineRungeKutta)
scene.add(pointsRungeKutta)

function animate() {
    canvasWidth = container.offsetWidth;
    canvasHeight = container.offsetHeight;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}
animate();