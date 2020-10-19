var cloud = null;

interpolate = (min, max, value) => {

	return (max - min) * value + min;
}

interpolateBHC = (e, props) => {
	const value = e[1] / props.height;

	return `rgb(${interpolate(0x31, 0x88, value)}, ${interpolate(0x91, 0x31, value)}, ${interpolate(0xcf, 0xb7, value)})`;
}

interpolateBHCLine = (e1, e2, {height, width}) => {
	const value = e1[1] / height;

	return `rgb(${interpolate(0x31, 0x88, value)}, ${interpolate(0x91, 0x31, value)}, ${interpolate(0xcf, 0xb7, value)})`;
}

function startCanvas() {
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');

	cloud = new Cloud({
		canvas: ctx,
		height: 1080,
		width: 1920,
		deep: 1080,
		dotNumber: (window.innerWidth * window.innerHeight * 0.0001) | 0,
		dotSpeed: 1,
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

const canvasReady = true;