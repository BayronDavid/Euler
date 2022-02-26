function RungeKutta(t0_, tf_, x0_, n_) {
    let t0  = t0_   || 0;
    let tf  = tf_   || 4;
    let x0  = x0_   || 0;
    let n   = n_    || 10;
    console.log('n: ', n);
    let h   =   Math.floor(((tf - t0) / n)) + 1;
    console.log('h: ', h);
    let t   =   [...Array(h).keys()].map(z=>(z*n)+t0);
    let x   =   new Array(n+1).fill(0);
    x[0]=x0;

    console.log('t: ', t);
    console.log('x: ', x);

    let k1, k2, k3, k4;
    for(let i=0; i<=n; i++){
        k1      = h*f(t[i], x[i]);
        k2      = h*f(t[i]+(h/2), x[i]+(k1/2));
        k3      = h*f(t[i]+(h/2), x[i]+(k2/2));
        k4      = h*f(t[i]+(h), x[i]+(k3));
        x[i+1]  = x[i]+(k1+2 + k2+2  + k3  + k4)/6
    }

    console.log(x);
}

function f(t, x){
    return nerdamer(document.getElementById('fx').value, {t, x}).evaluate();
}

export  {
    RungeKutta
}