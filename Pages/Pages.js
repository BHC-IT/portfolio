let pages = null;
let roulette = null;

interpolate = (min, max, value) => {

	return (max - min) * value + min;
}

interpolateBHC = (e, {height, width}) => {
	const value = e[1] / height;

	return `rgb(${interpolate(0x31, 0x88, value)}, ${interpolate(0x91, 0x31, value)}, ${interpolate(0xcf, 0xb7, value)})`;
}

interpolateBHCLine = (e1, e2, {height, width}) => {
	const value = e1[1] / height;

	return `rgb(${interpolate(0x31, 0x88, value)}, ${interpolate(0x91, 0x31, value)}, ${interpolate(0xcf, 0xb7, value)})`;
}

interpolateDosismart = (e, {height, width}) => {
	const value = e[0] / width;

	return `rgb(${interpolate(0x9f, 0x32, value)}, ${interpolate(0xe5, 0x5f, value)}, ${interpolate(0xba, 0x84, value)})`;
}

interpolateDosismartLine = (e1, e2, {height, width}) => {
	const value = e1[0] / width;

	return `rgb(${interpolate(0x9f, 0x32, value)}, ${interpolate(0xe5, 0x5f, value)}, ${interpolate(0xba, 0x84, value)})`;
}

interpolateAuthAPI = (e, {height, width, deep}) => {
	const value = e[2] / deep;

	return `rgb(${interpolate(0xff, 0x26, value)}, ${interpolate(0xff, 0x4a, value)}, ${interpolate(0xff, 0x75, value)})`;
}

interpolateAuthAPILine = (e1, e2, {height, width, deep}) => {
	const value = e1[2] / deep;

	return `rgb(${interpolate(0xff, 0x26, value)}, ${interpolate(0xff, 0x4a, value)}, ${interpolate(0xff, 0x75, value)})`;
}

interpolateBKC = (e, {height, width, deep}) => {
	const value = e[2] / deep;

	return `rgb(${interpolate(0x02, 0x32, value)}, ${interpolate(0x85, 0x5f, value)}, ${interpolate(0xa1, 0x84, value)})`;
}

interpolateBKCLine = (e1, e2, {height, width, deep}) => {
	const value = e1[2] / deep;

	return `rgb(${interpolate(0x02, 0x32, value)}, ${interpolate(0x85, 0x5f, value)}, ${interpolate(0xa1, 0x84, value)})`;
}

interpolateArya = (e, {height, width, deep}) => {
	const value = e[2] / deep;

	return `rgb(${interpolate(0xe1, 0xff, value)}, ${interpolate(0x00, 0xff, value)}, ${interpolate(0x15, 0xff, value)})`;
}

interpolateAryaLine = (e1, e2, {height, width, deep}) => {
	const value = e1[2] / deep;

	return `rgb(${interpolate(0xe1, 0xff, value)}, ${interpolate(0x00, 0xff, value)}, ${interpolate(0x15, 0xff, value)})`;
}

interpolateBLC = (e, {height, width, deep}) => {
	const value = e[2] / deep;

	return `rgb(${interpolate(0xb2, 0x5f, value)}, ${interpolate(0x22, 0x42, value)}, ${interpolate(0x22, 0xf4, value)})`;
}

interpolateBLCLine = (e1, e2, {height, width, deep}) => {
	const value = e1[2] / deep;

	return `rgb(${interpolate(0xb2, 0x5f, value)}, ${interpolate(0x22, 0x42, value)}, ${interpolate(0x22, 0xf4, value)})`;
}

interpolateScalability = (e, {height, width, deep}) => {
	const value = e[0] / width;

	return `rgb(${interpolate(0x19, 0x68, value)}, ${interpolate(0x8f, 0xbb, value)}, ${interpolate(0x9d, 0xc4, value)})`;
}

interpolateScalabilityLine = (e1, e2, {height, width, deep}) => {
	const value = e1[0] / width;

	return `rgb(${interpolate(0x19, 0x68, value)}, ${interpolate(0x8f, 0xbb, value)}, ${interpolate(0x9d, 0xc4, value)})`;
}

interpolateJ4 = (e, {height, width, deep}) => {
	const value = e[1] / height;

	return `rgb(${interpolate(0xca, 0x81, value)}, ${interpolate(0x8f, 0x5b, value)}, ${interpolate(0x2f, 0x1e, value)})`;
}

interpolateJ4Line = (e1, e2, {height, width, deep}) => {
	const value = e1[1] / height;

	return `rgb(${interpolate(0xca, 0x81, value)}, ${interpolate(0x8f, 0x5b, value)}, ${interpolate(0x2f, 0x1e, value)})`;
}

interpolateContact = (e, {height, width, deep}) => {
	const value = e[2] / deep;

	return `rgb(${interpolate(0xc0, 0x32, value)}, ${interpolate(0xc0, 0x5f, value)}, ${interpolate(0xc0, 0x84, value)})`;
}

interpolateContactLine = (e1, e2, {height, width, deep}) => {
	const value = e1[2] / deep;

	return `rgb(${interpolate(0xc0, 0x32, value)}, ${interpolate(0xc0, 0x5f, value)}, ${interpolate(0xc0, 0x84, value)})`;
}

class Pages {
	constructor(tuto) {
		this.pageAnchor = document.getElementById('pageArea');

		this.pageAnchor.style.display = 'flex';

		this.i = 0;
		this._more = false;

		this.tuto = tuto;
	}

	loadPages = async () => {
		try {
			this.pages = [];

			this.pages[0] = {};
			this.pages[0].name = 'Home';
			this.pages[0].page = await loadPage('/Pages/screens/landing.html');
			this.pages[0]._more = null;
			this.pages[0].colorDot = interpolateBHC;
			this.pages[0].colorLine = interpolateBHCLine;

			this.pages[1] = {};
			this.pages[1].name = 'Dosismart';
			this.pages[1].page = await loadPage('/Pages/screens/Dosismart.html');
			this.pages[1]._more = await loadPage('/Pages/screens/Dosismart_more.html');
			this.pages[1].colorDot = interpolateDosismart;
			this.pages[1].colorLine = interpolateDosismartLine;

			this.pages[2] = {};
			this.pages[2].name = 'Auth API';
			this.pages[2].page = await loadPage('/Pages/screens/BhcAuth.html');
			this.pages[2]._more = await loadPage('/Pages/screens/BhcAuth_more.html');
			this.pages[2].colorDot = interpolateAuthAPI;
			this.pages[2].colorLine = interpolateAuthAPILine;

			this.pages[3] = {};
			this.pages[3].name = 'BKC';
			this.pages[3].page = await loadPage('/Pages/screens/BKC.html');
			this.pages[3]._more = await loadPage('/Pages/screens/BKC_more.html');
			this.pages[3].colorDot = interpolateBKC;
			this.pages[3].colorLine = interpolateBKCLine;


			this.pages[4] = {};
			this.pages[4].name = 'Arya mobile App';
			this.pages[4].page = await loadPage('/Pages/screens/Arya.html');
			this.pages[4]._more = await loadPage('/Pages/screens/Arya_more.html');
			this.pages[4].colorDot = interpolateArya;
			this.pages[4].colorLine = interpolateAryaLine;


			this.pages[5] = {};
			this.pages[5].name = 'BLC - BFC';
			this.pages[5].page = await loadPage('/Pages/screens/BLC_BFC.html');
			this.pages[5]._more = await loadPage('/Pages/screens/BLC_BFC_more.html');
			this.pages[5].colorDot = interpolateBLC;
			this.pages[5].colorLine = interpolateBLCLine;

			this.pages[6] = {};
			this.pages[6].name = 'Project : Automated distribution';
			this.pages[6].page = await loadPage('/Pages/screens/ServerScalability.html');
			this.pages[6]._more = await loadPage('/Pages/screens/ServerScalability_more.html');
			this.pages[6].colorDot = interpolateScalability;
			this.pages[6].colorLine = interpolateScalabilityLine;

			this.pages[7] = {};
			this.pages[7].name = 'In Dev : J4';
			this.pages[7].page = await loadPage('/Pages/screens/J4.html');
			this.pages[7]._more = await loadPage('/Pages/screens/J4_more.html');
			this.pages[7].colorDot = interpolateJ4;
			this.pages[7].colorLine = interpolateJ4Line;

			this.pages[8] = {};
			this.pages[8].name = 'Contact';
			this.pages[8].page = await loadPage('/Pages/screens/Contact.html');
			this.pages[8]._more = null;
			this.pages[8].colorDot = interpolateContact;
			this.pages[8].colorLine = interpolateContactLine;

		} catch (e) {
			console.error(e);
		}
	}

	next() {
		this._more = false;
		this.i++;
	}

	prev() {
		this._more = false;
		this.i--;
	}

	more() {
		if (this._more || !this.pages[this.i]._more) return false;

		this._more = true;
		return true;
	}

	less() {
		if (!this._more) return false;
		this._more = false;

		return true;
	}

	unmount() {
		this.tuto.unmount();
		this.pageAnchor.innerHTML = '';
		this.pageAnchor.style.display = 'none';
	}

	render() {
		this.pageAnchor.style.display = 'flex';
		if (this._more) this.pageAnchor.innerHTML = this.pages[this.i]._more;
		else this.pageAnchor.innerHTML = this.pages[this.i].page;
		cloud.color_dot = this.pages[this.i].colorDot;
		cloud.color_line = this.pages[this.i].colorLine;
		this.tuto.mount();
	}
}

startRotate = (angle) => {
	roulette.render();
	roulette.displaySelected();
	if (!rotating) {
		cloud.angle = angle;
		cloud.moveDot(false);
		setTimeout(() => {
			cloud.rotDot(true)
			setTimeout(stopRotate, 1000);
		}, 500);
	}
}

stopRotate = () => {
	cloud.angle = [0,0,0];
	cloud.rotDot(false);
	setTimeout(() => cloud.moveDot(true), 500);
}

const moving_factor = 0.02;

pageUp = (pages) => {
	if (pages.i === 0) return;


	pages.unmount();
	pages.prev();
	startRotate([moving_factor, 0, 0]);

	if (!rotating) {
		setTimeout(() => {
			rotating = false;
			pages.render();
		}, 2000);
	}
	rotating = true;
}

pageDown = (pages) => {
	if (pages.i >= pages.pages.length - 1) return;

	pages.unmount();
	pages.next();
	startRotate([-moving_factor, 0, 0]);

	if (!rotating) {
		setTimeout(() => {
			rotating = false;
			pages.render();
		}, 2000);
	}
	rotating = true;
}

pageLeft = (pages) => {
	if (!pages.less()) return;

	pages.unmount();
	startRotate([0, moving_factor, 0]);

	if (!rotating) {
		setTimeout(() => {
			rotating = false;
			pages.render();
		}, 2000);
	}
	rotating = true;
}

pageRight = (pages) => {
	if (!pages.more()) return;

	pages.unmount();
	startRotate([0, -moving_factor, 0]);

	if (!rotating) {
		setTimeout(() => {
			rotating = false;
			pages.render();
		}, 2000);
	}
	rotating = true;
}

handleKeyDown = (event) => {
	if (event.keyCode == 37) { // left

		pageLeft(pages);

	} else if (event.keyCode == 38) { // up

		pageUp(pages);

	} else if (event.keyCode == 39) { // right

		pageRight(pages);

	} else if (event.keyCode == 40) { // down

		pageDown(pages);

	}
}

let lastY = 0;
let startY = 0;

let lastX = 0;
let startX = 0;

handleTouchstart = (e) => {
	let currentY = e.changedTouches[0].screenY;
	let currentX = e.changedTouches[0].screenX;

	startY = currentY;
	startX = currentX;
	lastY = currentY;
	lastX = currentX;
}

handleTouchmove = (e) => {
	let currentY = e.changedTouches[0].screenY;
	let currentX = e.changedTouches[0].screenX;

	lastY = currentY;
	lastX = currentX;
}

handleTouchend = (e) => {
	const resiliance = window.innerHeight / 20;

	if (lastY > startY + resiliance) {

		pageUp(pages);

	} else if (lastY < startY - resiliance) {

		pageDown(pages);

	} else if (lastX > startX + resiliance) {

		pageLeft(pages);

	} else if ( lastX < startX - resiliance ) {

		pageRight(pages);

	}
}

let lastScrollY = 0;
let startScrollY = 0;

handleScroll = (event) => {
	lastScrollY += event.deltaY;

	if (lastScrollY > 0) {

		pageDown(pages);
		lastScrollY = 0;

	} else if (lastScrollY < 0) {

		pageUp(pages);
		lastScrollY = 0;

	}
}

initPaginer = async () => {

	localStorage.setItem('tuto', 'done');

	const tuto = new Tuto();


	if (pages === null)
		pages = new Pages(tuto);

	await pages.loadPages();

	roulette = new Roulette(pages);

	roulette.mount();
	pages.render();

	document.addEventListener('keydown', handleKeyDown);

	document.addEventListener('touchstart', handleTouchstart);

	document.addEventListener('touchmove', handleTouchmove);

	document.addEventListener('touchend', handleTouchend);

	document.onwheel = handleScroll;


	document.getElementsByClassName('tutoArea')[0].style.display = 'none';


	tuto.pageAnchor.onclick = () => {
		roulette.unmount();
		pages.unmount();

		document.removeEventListener('keydown', handleKeyDown);
		document.removeEventListener('touchstart', handleTouchstart);
		document.removeEventListener('touchmove', handleTouchmove);
		document.removeEventListener('touchend', handleTouchend);

		document.onwheel = () => {};

		startText(initPaginer, true);
	};
};

const pagesReady = true;