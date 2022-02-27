
function calcularErrorEuler(h) {
  let euler = calculateEuler(h);
  let exact = EulerExacto(h);
  let error = [];
  lo
  for (let i = 0; i > euler.length; i++) {
    console.log(euler[i].x, exact[i].x);
  }

}

