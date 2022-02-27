import { calculateRungeKuttaApproach } from "../../calculus/rungeKutta/index.js"
import { calculateExactSolution } from "../../calculus/Exact/index.js"
import { calculateError } from "../../calculus/rungeKutta/error.js"

var rangeOfH = document.getElementById('rangeOfH');
var numberForRangeOfH = document.getElementById('numberForRangeOfH');

var h = parseFloat(rangeOfH.value);
var fxy = document.getElementById('fxy');
var exactFxy = document.getElementById('exactSolution');
var x0 = document.getElementById('x0');
var y0 = document.getElementById('y0');
var xf = document.getElementById('xf');

var initialExpression = document.getElementById('initial');
initialExpression.innerHTML = `<p>Ecuacion inicial</p>
                                <p>\\(${nerdamer(fxy.value).toTeX()}\\)</p>`

var resolvedExpression = document.getElementById('resolved');
resolvedExpression.innerHTML = `<p>Solucion exacta</p>
                                <p>\\(${nerdamer(exactFxy.value).toTeX()}\\)</p>`




var btnCalculate = document.getElementById('btnCalculate');

rangeOfH.oninput = function (event) {
    h = parseFloat(rangeOfH.value);
    calculateRungeKuttaApproach(parseFloat(x0.value), parseFloat(xf.value), parseFloat(y0.value), h);
    calculateError()
    numberForRangeOfH.value = h;
}
numberForRangeOfH.oninput = function (event) {
    h = parseFloat(numberForRangeOfH.value);
    calculateRungeKuttaApproach(parseFloat(x0.value), parseFloat(xf.value), parseFloat(y0.value), h);
    calculateError()
    rangeOfH.value = parseFloat(h);
}

btnCalculate.onclick = () => {
    calculateExactSolution(null, parseFloat(x0.value), null, parseFloat(xf.value), exactFxy.value, true)
    calculateRungeKuttaApproach(parseFloat(x0.value), parseFloat(xf.value), parseFloat(y0.value), h);
    resolvedExpression.innerHTML = `<p>Solucion exacta</p>
                                <p>\\(${nerdamer(exactFxy.value).toTeX()}\\)</p>`
    initialExpression.innerHTML = `<p>Ecuacion inicial</p>
                                <p>\\(${nerdamer(fxy.value).toTeX()}\\)</p>`
}
export {
    fxy,
    exactFxy,
    x0,
    y0,
    xf,
    h
}