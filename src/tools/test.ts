
function isArray(t) {
  if (Array.isArray) return Array.isArray(t);
  return Object.prototype.toString.call(t).slice(8, 13) === 'Array';
}


function flatArray(t) {
  if (!t || !isArray(t)) return t;
  return t.reduce((o, a) => {
    isArray(a) ? (o = o.concat(flatArray(a))) : o.push(a);
    return o;
  }, []);
}

console.log(flatArray([1, 2, [3, 4]]))