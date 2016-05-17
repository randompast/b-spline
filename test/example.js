canvas = document.body.appendChild(document.createElement('canvas'))
ctx = canvas.getContext('2d')

canvas.width = window.innerWidth - 20
canvas.height = window.innerHeight - 20

bspline = require("../bspline.js")

cps = [[0,0], [200,0], [200,200], [0,200], [200,400], [400,0], [100,100]]
for(var i = 0; i<cps.length; i++){
  cps[i][0] += 50
  cps[i][1] += 50
}

// bspline(points, knots, tesselation)
spline0 = bspline(
  cps
  ,[1,2,3,4,5,6,7,8] //Degree 0 spline
  ,5)
spline1 = bspline(
  cps
  ,[1,2,3,4,5,6,7,8,9] //Degree 1 spline
  ,5)
spline2 = bspline(
  cps
  ,[1,2,3,4,5,6,7,8,9,10] //Degree 2 spline
  ,5)
spline3 = bspline(
  cps
  ,[1,2,3,4,5,6,7,8,9,10,11] //Degree 3 spline
  ,5)
spline4 = bspline(
  cps
  ,[1,2,3,4,5,6,7,8,9,10,11,12,13,14] //Degree 6 spline
  ,5)

spline5 = bspline(
  cps
  ,[1,2,2,3,4,5,6,7,7,8] //2,2 and 7,7 clamps the end points
  ,5)
spline6 = bspline(
  cps
  ,[1,2,2,3,4,4,5,6,6,7] //4,4 clamps the middle point
  ,5)

spline7 = bspline(
  cps
  ,[0,0,0,0,0,0,0,1,1,1,1,1,1,1] //Bezier, degree 6
  ,15)

var drawPath = function(arr) {
  for(var i=0; i<arr.length-1; i++) {
    ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16) //256*256*256-1
    // ctx.strokeStyle = "hsla("+Math.floor(Math.random()*256)+","+(Math.floor(Math.random()*50)+50)+"%,50%,1)"
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(arr[i][0], arr[i][1])
    ctx.lineTo(arr[(i+1)%arr.length][0], arr[(i+1)%arr.length][1])
    ctx.stroke()
  }
}

// drawPath(spline0)
drawPath(spline1)
// drawPath(spline2)
// drawPath(spline3)
drawPath(spline5)
// drawPath(spline6)
drawPath(spline7)

for(var i = 0; i<cps.length; i++){
  ctx.fillRect(cps[i][0]-5,cps[i][1]-5,10,10)
}

// Sanity check, worked by hand
// console.log(bspline([[-24], [24], [-48], [0]] ,[-4,-3,-2,-1,1,2,3,4], 2).join(" "))
