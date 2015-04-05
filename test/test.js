canvas = document.body.appendChild(document.createElement('canvas'))
var ctx = canvas.getContext('2d')

canvas.width = window.innerWidth - 20
canvas.height = window.innerHeight - 20

var bspline = require("../bspline.js")

var spline1 = bspline(
  //points
    [[0,0], [200,0], [200,200], [0,200], [400,300], [600,200], [100,100]],
  //knots
    [1,2,3,4,5,6,7,8,9,10],
  //tessellation
    10)

var drawPath = function(arr) {
  for(var i=0; i<arr.length-1; i++) {
    ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
    ctx.beginPath()
    ctx.moveTo(arr[i][0], arr[i][1])
    ctx.lineTo(arr[(i+1)%arr.length][0], arr[(i+1)%arr.length][1])
    ctx.stroke()
  }
}

drawPath(spline1)
