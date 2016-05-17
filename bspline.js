var deBoor = function(controlPoints, t, d, u, j) {
  var arr = controlPoints.map(function(i) {
      return i.slice()
  })
  var length = t[j+2] - t[j+1]
  u *= length
  u += t[j+1]
  for(var h = 0; h < d; h++) {
    for(var i = 0; i < d-h; i++) {
      var low = j + i + h - (d - 2), //(d-2) is a hack, maybe not suitable for d > 3
          high = low + d - h,
          l = (t[low] !== t[high]) ? (u - t[low]) / (t[high] - t[low]) : 0
      for(var p = 0; p < arr[0].length; p++) {
        arr[i][p] = (1 - l) * arr[i][p] + l * arr[i+1][p]
      }
    }
  }
  return arr[0]
}

var getControlPoints = function(controlPoints, degree, index){
  var arr = new Array(degree+1)
  for(var i = index; i < index + degree + 1; i++) {
    arr[i-index] = controlPoints[i].slice()
  }
  return arr
}

var makeBspline = function(controlPoints, knots, tesselation) {
  var d = knots.length - controlPoints.length - 1 //degree
  if(controlPoints.length <= d) {
    throw new TypeError("cp.length < d, k === cp + d + 1")
  }
  var b = new Array(tesselation*(controlPoints.length - d)+1) //spline
  for(var j = d - 1; j < controlPoints.length - 1; j++) {//knot index
    var cp = getControlPoints(controlPoints, d, j-d+1)
    for(var i = 0; i < tesselation; i++) {
      b[i + (j-d+1)*tesselation] = deBoor(cp, knots, d, i/tesselation, j)
    }
  }
  b[b.length-1] = deBoor(getControlPoints(controlPoints, d, j-d), knots, d, 1, j-1) //end point
  return b
}

module.exports = makeBspline
