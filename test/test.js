var bspline = require("../bspline.js")
var test = require("tape")

test("bspline", function(t) {
	var cp = [[0,0], [200,0], [200,200], [0,200], [400,300], [600,200], [100,100]]
	var knots = [1,2,3,4,5,6,7,8,9,10]
	var tessellation = 5
	var degree = knots.length - cp.length - 1

	for(var i = 0; i <= 10; i++) {
		t.equal(bspline(cp, knots, i).length,
			i * (cp.length - degree),
			"spline length with tessellation level " + i)
	}

	cp = [[0,0], [200,0], [200,200], [0,200], [400,300], [600,200], [100,100], [1,23], [124,32]]
	while(degree < cp.length - 1) {
		cp = cp.slice(1)
		degree = knots.length - cp.length - 1
		t.equal(bspline(cp, knots, tessellation).length,
			tessellation * (cp.length - degree),
			"knots.length, cp.length, degree - " + knots.length + ", " + cp.length + ", " + degree)
	}

	var cp = [[0,0], [200,0], [200,200], [0,200], [400,300], [600,200], [100,100]]
	var knots = [1,2,3,4,5,6,7,8,9,10]
	for(var i = 0; i < 10; i++) {
		cp.push([Math.random()*400, Math.random()*400])
		knots.push(knots[knots.length - 1] + 1)
		degree = knots.length - cp.length - 1
		t.equal(bspline(cp, knots, tessellation).length,
			tessellation * (cp.length - degree),
			"knots.length, cp.length, degree - " + knots.length + ", " + cp.length + ", " + degree)
	}

	t.throw(bspline([[1,0]], [1,2,3,4,5]),
		"cp.length < d, add more control points, or remove knots",
		"knots = points + degree + 1")
	t.end()
})
