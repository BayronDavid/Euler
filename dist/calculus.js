// var y = nerdamer('integrate(x^2-3*x+5, x)');
// console.log(y.toString());
// https://nerdamer.com/quickstart.html
// https://nerdamer.com/functions/integrate.html
// https://nerdamer.com/functions/integrate.html

// https://nerdamer.com/demo
// https://github.com/jiggzson/nerdamer
var graphContainer = document.getElementById('errorGraph');

var graphWidth = graphContainer.offsetWidth;
var graphHeight = graphContainer.offsetHeight;

var sceneGraph = new THREE.Scene();
var cameraGraph = new THREE.PerspectiveCamera(50, graphWidth / graphHeight, 0.1, 1000);
cameraGraph.position.z = 50;

var GraphRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: 1 });
GraphRenderer.setSize(graphWidth, graphHeight);
graphContainer.appendChild(GraphRenderer.domElement);

var graphControls = new THREE.TrackballControls(cameraGraph, graphContainer);

// Grid
const gridHelperGRAPH = new THREE.GridHelper(100, 40);
gridHelperGRAPH.rotation.x = Math.PI / 2;
sceneGraph.add(gridHelperGRAPH);

// AXis 
const arrowHelperYGRAPH = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0).normalize(), new THREE.Vector3(0, 0, 0), 500, new THREE.Color('green'));
const arrowHelperXGRAPH = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0).normalize(), new THREE.Vector3(0, 0, 0), 500, new THREE.Color('red'));
sceneGraph.add(arrowHelperXGRAPH);
sceneGraph.add(arrowHelperYGRAPH);


function GrapAnimate() {
    graphWidth = graphContainer.offsetWidth;
    graphHeight = graphContainer.offsetHeight;

    requestAnimationFrame(GrapAnimate);
    GraphRenderer.render(sceneGraph, cameraGraph);
    graphControls.update();
}
GrapAnimate();