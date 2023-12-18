
var img_power = document.getElementById('poweroff');
var img_power_ctx = img_power.getContext('2d');
var img = new Image();
img.onload = function () { img_power_ctx.drawImage(img, 0, 0); };
img.src = './images/poweroff-400.png';
img_power.style.visibility = 'hidden';

function power_img_call(param) {
	if (param === "0") {
		img_power.style.visibility = 'visible';
		img_power.style.visibility = "";
		// visibility 아닌거 같음 두 번 설정하고있는데 밑에처럼 display설정인거같음
	}
	else if (param === "1") {
		img_power.style.visibility = 'hidden';
		img_power.style.display = "none"
	}
}

function check_power() {
	var url = 'http://' + location.host + ':8000/power';
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send();
	xhr.onreadystatechange = function (e) {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				var ret = JSON.parse(xhr.responseText).POWER.STATUS;
				power_img_call(ret);
			} else {
				console.log('Error!');
			}
		}
	}
}
check_power();
setInterval(function () {
	check_power();
}, 5000);

//$scope.onSendKeysTypeChange = function() {
function onSendKeys(data) {
	var url = 'http://' + location.host + ':8000/functionkey';
	var xhr = new XMLHttpRequest();
	xhr.open('PUT', url);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(JSON.stringify(data));
	xhr.onreadystatechange = function (e) {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				console.log(xhr.readyState);
			} else {
				console.log('Error!');
				console.log(xhr.readyState);
			}
		}
	}
};



function onRightCtrl() {
	var data = { KEY: "right_ctrl" };
	onSendKeys(data);
	console.log("data:", data);
}
function onRightAlt() {
	var data = { KEY: "right_alt" };
	onSendKeys(data);
}
function onRightWindows() {
	var data = { KEY: "right_windows" };
	onSendKeys(data);
}
function onRightWindows2() {
	var data = { KEY: "Right_windows_PR" };
	onSendKeys(data);
}
function onLeftCtrl() {
	var data = { KEY: "left_ctrl" };
	onSendKeys(data);
}
function onLeftAlt() {
	var data = { KEY: "left_alt" };
	onSendKeys(data);
}
function onLeftWindows() {
	var data = { KEY: "left_windows" };
	onSendKeys(data);
}
function onLeftWindows2() {
	var data = { KEY: "left_windows_PR" };
	onSendKeys(data);
}
function onRelase() {
	var data = { KEY: "release_key" };
	onSendKeys(data);
}
function onCtrlAtlDel() {
	var data = { KEY: "ctrl_alt_del_PR" };
	onSendKeys(data);
}
function onContextMenu() {
	var data = { KEY: "context_menu_PR" };
	onSendKeys(data);
}
function onPrintScreen() {
	var data = { KEY: "print_screen_PR" };
	onSendKeys(data);
}




var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
var isIE = 0;
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
	isIE = 1;
var isEdge = !isIE && !!window.StyleMedia;

var clientOS;
function getOS() {
	var userAgent = window.navigator.userAgent,
		platform = window.navigator.platform,
		macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
		windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
		iosPlatforms = ['iPhone', 'iPad', 'iPod'],
		os = null;

	if (macosPlatforms.indexOf(platform) !== -1) {
		os = 'Mac OS';
	} else if (iosPlatforms.indexOf(platform) !== -1) {
		os = 'iOS';
	} else if (windowsPlatforms.indexOf(platform) !== -1) {
		os = 'Windows';
	} else if (/Android/.test(userAgent)) {
		os = 'Android';
	} else if (!os && /Linux/.test(platform)) {
		os = 'Linux';
	}

	return os;
}
clientOS = getOS();
console.log(clientOS);


var pscanvas = document.getElementById('pscanvas');
var psctx = pscanvas.getContext('2d');
/*
pscanvas.style.left = "100px";
pscanvas.style.top = "100px";
pscanvas.style.position = "absolute"
pscanvas.style.width = '1920px';
pscanvas.style.visibility = 'hidden';
*/

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.addEventListener('keydown', doKeyDown, true);
canvas.addEventListener('keyup', doKeyUp, true);
canvas.addEventListener('mousedown', doMouseDown, true);
canvas.addEventListener('mouseup', doMouseUp, true);
canvas.addEventListener('mousemove', doMouseDrag, true);
canvas.style.left = "100px";
canvas.style.top = "100px";
canvas.style.position = "absolute";
canvas.style.width = '1920px';
client_width = 1920;
client_height = (client_width * host_height) / host_width;

var mouseEnable = 1;

var _sock = new ketiWebsock();

var proxy_socket_1 = 7887;
var proxy_socket_2 = 7787;

var url = "ws://" + location.host + ":" + proxy_socket_1;
var _sock1 = new ketiWebsock();
var url2 = "ws://" + location.host + ":" + proxy_socket_2;
var _ast2500 = new Ast2500();
var _AST = {
	mode: 420, pixels_per_block: 8, MB: 4096, mb_width: 0, mb_height: 0, Y_Sel: 4, UV_Sel: 20,
	Datalen: 0, SessionID: 0, VideoEnable: 0, KbMsEnable: 0, KickUserEnable: 0, VMEnable: 0
};
var _stop_send_mouse_up = 0;

_sock.open(url, ['binary']);

_sock.on('message', function () {
});
_sock.on('open', function () {
	console.log("starting handshake");
});

_sock.on('close', function (e) {
	console.log("websocket on-close event");
	console.log("Why console");
	alert("Connection Closed by Another Client");
	self.close();
});
_sock.on('error', function (e) {
	console.log("websocket on-error event");
});
_sock.on('draw', function (e, length) {
	var Data = e;
	var DataLen = length;
	var DecodeInfo = {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
		Mode: _AST.mode,
		Y_Sel: _AST.Y_Sel,
		UV_Sel: _AST.UV_Sel,
		Datalen: DataLen,
		Data: Data
	};
	_ast2500.decode(DecodeInfo, null, ctx);
	var mOutBuf = _ast2500.mOutBuffer;
	_ast2500.drawCtx();

});
_sock.on('response', function () {
});

_sock1.open(url2, ['binary']);
_sock1.on('open', function () {
	console.log("starting handshake");
});
_sock1.on('close', function (e) {
	console.log("websocket on-close event");
});
_sock1.on('message', function () {
	console.log("msg from _sock1");
	_stop_send_mouse_up = 1;
});
_sock1.on('error', function (e) {
	console.log("websocket on-error event");
});

_ast2500.on('modchng', function (width, height) {
	console.log("host mod change : " + width + " : " + height);
	host_width = width;
	host_height = height;
	client_height = (client_width * host_height) / host_width;
});
var x = 100;
var y = 100;
var length;
var input_val;

var host_width;
var host_height;
var client_width = 1920;
var client_height;

var reset_ready = 0;
var move_ready = 0;

var drag_state = 0;

function makeResult(e) {
	var tmi = 0;
	var result = String(e[0]) + String(e[1]) + String(e[2]) + String(e[3]) + String(e[4])
		+ String(e[5]) + String(e[6]) + String(e[7]) + String(e[8]) + String(e[9])
		+ String(e[10]) + String(e[11]) + String(e[12]) + String(e[13]) + String(e[14]);
	console.log("make result : " + result);
	if (result[0] === '2' && result[1] === '1') {
		// console.log("result is 21..! come in ");
		while (!_stop_send_mouse_up) {
			// console.log("");
			_sock1.send_string(result);
			if (tmi++ > 5) {
				break;
			}
		}
		_stop_send_mouse_up = 0;
	} else {
		_sock1.send_string(result);
	}
}

function doKeyDown(e) {
	var send_buf = new Uint8Array(15);
	var keyCode = e.keyCode
	if (clientOS === 'Windows') {
		if (e.keyCode === 220)
			keyCode = 192;
		else if (e.keyCode === 222)
			keyCode = 220;
		else if (e.keyCode === 192)
			keyCode = 222;
	}

	input_val = keyCode.toString().split('');

	length = input_val.length;
	send_buf[0] = length;
	send_buf[1] = 0;
	var j = 0;
	for (var i = 4; i > (4 - length); i--) {
		send_buf[i] = input_val[j++];
	}

	makeResult(send_buf);
	e.preventDefault();
}


function doKeyUp(e) {
	if (e.keyCode === 16 || e.keyCode === 17 || e.keyCode === 18) {
		var send_buf = new Uint8Array(15);
		input_val = e.keyCode.toString().split('');
		length = input_val.length;
		send_buf[0] = length;
		send_buf[1] = 2;
		var j = 0;
		for (var i = 4; i > (4 - length); i--) {
			send_buf[i] = input_val[j++];
		}

		makeResult(send_buf);
		e.preventDefault();
	}
}

function doMouseDown(e) {
	if (mouseEnable === 1) {
		drag_state = 1;
		var send_buf = new Uint8Array(15);
		var e = e || window.event;
		var btnCode;
		if (typeof e === 'object') {
			btnCode = e.button;
			if (isIE || isEdge) {
				var actual_x = Math.floor(((e.layerX - 100) * 10000) / client_width).toString();
				var actual_y = Math.floor(((e.layerY - 100) * 10000) / client_height).toString();
			} else {
				var actual_x = Math.floor((e.layerX * 10000) / client_width).toString();
				var actual_y = Math.floor((e.layerY * 10000) / client_height).toString();
			}
			send_buf[0] = btnCode + 1;
			send_buf[1] = 1;

			send_buf[2] = actual_x.length;
			send_buf.set(actual_x, 3);
			send_buf[8] = actual_y.length;
			send_buf.set(actual_y, 9);

			makeResult(send_buf);
		}
		if (btnCode === 2) {
			console.log("right button");
			e.preventDefault();
		}
	}
}

function doMouseUp(e) {
	if (mouseEnable === 1) {
		drag_state = 0;
		var send_buf = new Uint8Array(15);
		var e = e || window.event;
		var btnCode;
		if (typeof e === 'object') {
			btnCode = e.button;
			if (isIE || isEdge) {
				var actual_x = Math.floor(((e.layerX - 100) * 10000) / client_width).toString();
				var actual_y = Math.floor(((e.layerY - 100) * 10000) / client_height).toString();
			} else {
				var actual_x = Math.floor((e.layerX * 10000) / client_width).toString();
				var actual_y = Math.floor((e.layerY * 10000) / client_height).toString();
			}
			send_buf[0] = btnCode + 2;
			send_buf[1] = 1;

			send_buf[2] = actual_x.length;
			send_buf.set(actual_x, 3);
			send_buf[8] = actual_y.length;
			send_buf.set(actual_y, 9);

			makeResult(send_buf);
		}
		e.preventDefault();
	}
}

function doMouseDrag(e) {
	if (mouseEnable === 1) {
		if (drag_state) {
			var send_buf = new Uint8Array(15);
			var e = e || window.event;
			var btnCode;
			if (typeof e === 'object') {
				btnCode = e.button;
				if (isIE || isEdge) {
					var actual_x = Math.floor(((e.layerX - 100) * 10000) / client_width).toString();
					var actual_y = Math.floor(((e.layerY - 100) * 10000) / client_height).toString();
				} else {
					var actual_x = Math.floor((e.layerX * 10000) / client_width).toString();
					var actual_y = Math.floor((e.layerY * 10000) / client_height).toString();
				}
				send_buf[0] = btnCode + 1;
				send_buf[1] = 1;

				send_buf[2] = actual_x.length;
				send_buf.set(actual_x, 3);
				send_buf[8] = actual_y.length;
				send_buf.set(actual_y, 9);

				makeResult(send_buf);
			}
		}
		e.preventDefault();
	}
}

function sendclose() {
	_sock.send_string("clo");
	_sock1.send_string("close0123456789");
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


function pause_video() {
	/*
		psctx.drawImage(ctx, 0, 0);
		pscanvas.style.visibility = 'visible';
		canvas.style.visibility = 'hidden';
	*/
}

function resume_video() {
	/*
		pscanvas.style.visibility = 'hidden';
		canvas.style.visibility = 'visible';
	*/
}

function screen_capture() {
}



function BMC_RESET() {
	var url = 'http://' + location.host + ':8000/bmcReset';
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send();
	xhr.onreadystatechange = function (e) {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				console.log(xhr.responseText);
			} else {
				console.log('Error!');
			}
		}
	};
}


function set_power(data) {
	var url = 'http://' + location.host + ':8000/power';
	var xhr = new XMLHttpRequest();
	xhr.open('PUT', url);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(JSON.stringify(data));
	xhr.onreadystatechange = function (e) {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				console.log(xhr.responseText);
			} else {
				console.log('Error!');
			}
		}
	};
}
function reset_server() {
	var data = { STATUS: 1 };
	set_power(data);
}
function power_off_server_immediate() {
	var data = { STATUS: 2 };
	set_power(data);
}
function power_off_server_orderly() {
	var data = { STATUS: 3 };
	set_power(data);
}
function power_on_server() {
	var data = { STATUS: "4" };
	set_power(data);
}
function power_cycle_server() {
	var data = { STATUS: 5 };
	set_power(data);
}




function setMouseEnable() {
	mouseEnable = 1;
}
function setMouseDisable() {
	mouseEnable = 0;
}



function send_ctrl_alt_del() {
	var send_buf = new Uint8Array(15);

	var keyCode = 17;
	input_val = keyCode.toString().split('');
	length = input_val.length;
	send_buf[0] = length;
	send_buf[1] = 0;
	var j = 0;
	for (var i = 4; i > (4 - length); i--) {
		send_buf[i] = input_val[j++];
	}
	makeResult(send_buf);

	setTimeout(function () {
		var keyCode = 18;
		input_val = keyCode.toString().split('');
		length = input_val.length;
		send_buf[0] = length;
		send_buf[1] = 0;
		var j = 0;
		for (var i = 4; i > (4 - length); i--) {
			send_buf[i] = input_val[j++];
		}
		makeResult(send_buf);
	}, 100);

	setTimeout(function () {
		var keyCode = 46;
		input_val = keyCode.toString().split('');
		length = input_val.length;
		send_buf[0] = length;
		send_buf[1] = 0;
		var j = 0;
		for (var i = 4; i > (4 - length); i--) {
			send_buf[i] = input_val[j++];
		}
		makeResult(send_buf);
	}, 200);


	setTimeout(function () {
		var keyCode = 17;
		input_val = keyCode.toString().split('');
		length = input_val.length;
		send_buf[0] = length;
		send_buf[1] = 2;
		var j = 0;
		for (var i = 4; i > (4 - length); i--) {
			send_buf[i] = input_val[j++];
		}
		makeResult(send_buf);

	}, 300);

	setTimeout(function () {
		var keyCode = 18;
		input_val = keyCode.toString().split('');
		length = input_val.length;
		send_buf[0] = length;
		send_buf[1] = 2;
		var j = 0;
		for (var i = 4; i > (4 - length); i--) {
			send_buf[i] = input_val[j++];
		}
		makeResult(send_buf);
	}, 400);
}


function size_w1920() {
	pscanvas.style.width = '1920px';
	canvas.style.width = '1920px';
	client_width = 1920;
	client_height = (client_width * host_height) / host_width;
	window.resizeTo(1910, 1291);
}
function size_w1280() {
	pscanvas.style.width = '1280px';
	canvas.style.width = '1280px';
	client_width = 1280;
	client_height = (client_width * host_height) / host_width;
	window.resizeTo(1330, 951);
}
function size_w800() {
	pscanvas.style.width = '800px';
	canvas.style.width = '800px';
	client_width = 800;
	client_height = (client_width * host_height) / host_width;
	window.resizeTo(900, 651);
}

