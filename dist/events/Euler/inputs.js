import { calculateEulerApproach} from "../../calculus/Euler/index.js"
import { calculateExactSolution} from "../../calculus/Exact/index.js"

var rangeOfH = document.getElementById('rangeOfH');
var numberForRangeOfH = document.getElementById('numberForRangeOfH');

var fxy = document.getElementById('fxy');
var exactFxy = document.getElementById('exactSolution');
var x0  = document.getElementById('x0');
var y0  = document.getElementById('y0');
var xf  = document.getElementById('xf');

var btnCalculate = document.getElementById('btnCalculate');

rangeOfH.oninput = function (event) {
    calculateEulerApproach(parseFloat(rangeOfH.value), parseFloat(x0.value), parseFloat(y0.value), parseFloat(xf.value), fxy.value);
    numberForRangeOfH.value = parseFloat(rangeOfH.value);
}
numberForRangeOfH.oninput = function (event) {
    calculateEulerApproach(parseFloat(numberForRangeOfH.value));
    rangeOfH.value = parseFloat(numberForRangeOfH.value);
}
// calculateExactSolution(parseFloat(rangeOfH.value), parseFloat(xf.value), exactFxy.value)
// initialize(parseFloat(rangeOfH.value), parseFloat(x0), parseFloat(y0), parseFloat(xf), fxy);

btnCalculate.onclick = ()=>{
    calculateExactSolution(null, parseFloat(xf.value), exactFxy.value)
    calculateEulerApproach(parseFloat(rangeOfH.value), parseFloat(x0.value), parseFloat(y0.value), parseFloat(xf.value), fxy.value);
}