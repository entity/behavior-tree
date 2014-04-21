
/**
 * behavior-tree
 */

exports = module.exports = some;

function some(cond, arr){
  var i = 0;
  var len = arr.length;
  var ret, fn;
  return function next(){
    fn = arr[i];
    ret = fn.call(this);
    if (ret === undefined) ret = true;
    if (ret !== cond) return ret !== null && (i = 0), ret;
    if (++i === len) return i = 0, cond;
    return next.call(this);
  };
}

exports.sequence = function(arr){
  return some(true, arr);
};

exports.select = function(arr){
  return some(false, arr);
};
