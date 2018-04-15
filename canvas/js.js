var yy = document.getElementById('xx');
var actions = document.getElementById('actions');
var ereaser = document.getElementById('ereaser');
var pen = document.getElementById('pen');

var context = yy.getContext('2d');
var ereaserEnabled = false;
var using = false;

listenToMouse(yy);
autosetsize(yy);

pen.onclick = function(){
	ereaserEnabled = false;
	pen.classList.add('active');
	ereaser.classList.remove('active');
}

ereaser.onclick = function(){
	ereaserEnabled = true;
	pen.classList.remove('active');
	ereaser.classList.add('active');
}

red.onclick = function(){
	context.fillStyle = 'red';
	context.strokeStyle = 'red';
	red.classList.add('active');
	green.classList.remove('active');
	blue.classList.remove('active');
}

green.onclick = function(){
	context.fillStyle = 'green';
	context.strokeStyle = 'green';
	green.classList.add('active');
	red.classList.remove('active');
	blue.classList.remove('active');
}

blue.onclick = function(){
	context.fillStyle = 'blue';
	context.strokeStyle = 'blue';
	blue.classList.add('active');
	green.classList.remove('active');
	red.classList.remove('active');
}
clear.onclick = function(){
	context.clearRect(0,0,yy.width,yy.height)
}
download.onclick = function(){
	var url = yy.toDataURL("image/png");
	var a = document.createElement('a');
	document.body.appendChild(a);
	a.href = url;
	a.download = 'x';
	a.target = '_blank'
	a.click();
}
function listenToMouse(canvas) {

	var lastPoint = { x: undefined, y: undefined };

	//特性检测
	if (document.body.ontouchstart !== undefined) {
		canvas.ontouchstart = function (a) {
			var x = a.touches[0].clientX;
			var y = a.touches[0].clientY;
			using = true;
			if (ereaserEnabled) {
				context.clearRect(x - 5, y - 5, 10, 10)
			} else {
				lastPoint = { "x": x, "y": y };
			}

		};
		canvas.ontouchmove = function (a) {
			var x = a.touches[0].clientX;
			var y = a.touches[0].clientY;
			if (!using) { return };
			if (ereaserEnabled) {
				context.clearRect(x - 5, y - 5, 10, 10)
			} else {
				var newPoint = { "x": x, "y": y }
				drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
				lastPoint = newPoint
			}			
		}
		canvas.ontouchend = function () {
			using = false;
		}
	} else 
	{
		canvas.onmousemove = function (a) {
			var x = a.clientX;
			var y = a.clientY;
			if (!using) { return };
			if (ereaserEnabled) {
				context.clearRect(x - 5, y - 5, 10, 10)
			} else {
				var newPoint = { "x": x, "y": y }
				drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
				lastPoint = newPoint
			}
		}
		canvas.onmousedown = function (a) {
			var x = a.clientX;
			var y = a.clientY;
			using = true;
			if (ereaserEnabled) {
				context.clearRect(x - 5, y - 5, 10, 10)
			} else {
				lastPoint = { "x": x, "y": y };
			}
		}
		canvas.onmouseup = function (a) {
			using = false;
		}
	}

}
function autosetsize(canvas) {
	setsize();
	window.onresize = function () {
		setsize();
	}
	function setsize() {
		var pageWidth = document.documentElement.clientWidth;
		var pageHeight = document.documentElement.clientHeight;
		canvas.width = pageWidth;
		canvas.height = pageHeight;
	}
}

function drawCircle(x, y, radius) {
	context.beginPath();
	context.arc(x, y, radius, 0, Math.PI * 2);
	context.fill();
}

function drawLine(x1, y1, x2, y2) {
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineWidth = 10;
	context.lineTo(x2, y2);
	context.stroke();
	context.closePath();
}