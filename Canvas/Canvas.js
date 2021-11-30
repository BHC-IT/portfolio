var cloud = null;
var canvasReady = false;

interpolate = (min, max, value) => {

	return (max - min) * value + min;
}

interpolateBHC = (e, props) => {
	const value = e[1] / props.height;

	return `rgb(${interpolate(0x31, 0x88, value)}, ${interpolate(0x91, 0x31, value)}, ${interpolate(0xcf, 0xb7, value)})`;
}

interpolateBHCLine = (e1, e2, {height, width}) => {
	const value = e1[1] / height;
	const distance = Math.sqrt( Math.pow(e1[0] - e2[0], 2) + Math.pow(e1[1] - e2[1], 2) + Math.pow(e1[2] - e2[2], 2))

	if (e[0] < 50)
		console.log("here");

	return `rgba(${interpolate(0x31, 0x88, value)}, ${interpolate(0x91, 0x31, value)}, ${interpolate(0xcf, 0xb7, value)}, ${distance / 200})`;
}

function startCanvas() {
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');

	cloud = new Cloud({
		canvas: ctx,
		height: window.innerHeight,
		width: window.innerWidth,
		deep: window.innerHeight,
		dotNumber: (window.innerWidth * window.innerHeight * 0.00012) | 0,
//		dotNumber: 100,
		dotSpeed: 0.4,
		dotSize: 3,
		linesLength: 200,
		colorDot: interpolateBHC,
		colorLine: interpolateBHCLine,
		colorBack: '#000000',
		lineWidth: 1,
	});

	sizeCanva = () => {
		const w = window.innerWidth;
		const h = window.innerHeight;

		cloud.width = w;
		cloud.height = h;
		cloud.deep = h;

		ctx.canvas.width = w;
		ctx.canvas.height = h;
	}

	sizeCanva();

	cloud.render();

	window.onresize = sizeCanva;
}

canvasReady = true;
