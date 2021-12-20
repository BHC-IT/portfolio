let pages = null;
let roulette = null;
var pagesReady = false;

const max_length = 200;
const fullDraw = 190;

const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight;
const maxDeep = window.innerHeight;

const margeWidth = 20;
const margeHeight = 20;
const margeDeep = 20;

const margeRight = maxWidth - margeWidth;
const margeDown = maxHeight - margeHeight;
const margeProf = maxDeep - margeDeep;

function interpolate(min, max, value) {

	return (max - min) * value + min;
}

function opacMargePoint(e, {height, width}) {

	const opacTable = [
		interpolate(1, 0, (margeWidth - e[0]) / margeWidth),
		interpolate(1, 0,  (e[0] - (margeRight)) / margeWidth),
		interpolate(1, 0, (margeHeight - e[1]) / margeHeight),
		interpolate(1, 0,  (e[1] - (margeDown)) / margeHeight),
		interpolate(1, 0, (margeDeep - e[2]) / margeDeep),
		interpolate(1, 0,  (e[2] - (margeProf)) / margeDeep),
	].filter((e) => e >= 0 && e <= 1)

	const margeValue = opacTable.length ? Math.min(...opacTable) : 1

	return `${margeValue > 0 ? margeValue : 0}`
}


function opacLine(e1, e2, {height, width}) {
	const distance = Math.sqrt( Math.pow(e1[0] - e2[0], 2) + Math.pow(e1[1] - e2[1], 2) + Math.pow(e1[2] - e2[2], 2))

	const opacTable = [
		interpolate(1, 0, (margeWidth - e1[0]) / margeWidth),
		interpolate(1, 0,  (e1[0] - (margeRight)) / margeWidth),
		interpolate(1, 0, (margeWidth - e2[0]) / margeWidth),
		interpolate(1, 0,  (e2[0] - (margeRight)) / margeWidth),

		interpolate(1, 0, (margeHeight - e1[1]) / margeHeight),
		interpolate(1, 0,  (e1[1] - (margeDown)) / margeHeight),
		interpolate(1, 0, (margeHeight - e2[1]) / margeHeight),
		interpolate(1, 0,  (e2[1] - (margeDown)) / margeHeight),

		interpolate(1, 0, (margeDeep - e1[2]) / margeDeep),
		interpolate(1, 0,  (e1[2] - (margeProf)) / margeDeep),
		interpolate(1, 0, (margeDeep - e2[2]) / margeDeep),
		interpolate(1, 0,  (e2[2] - (margeProf)) / margeDeep),
	].filter((e) => e >= 0 && e <= 1)

	const margeValue = opacTable.length ? Math.min(...opacTable) : 100

	if (margeValue < 0)
		margeValue = 0;

	const valueOp = distance < fullDraw ? 0 : (distance - fullDraw)/(max_length - fullDraw)
	const distanceOpac = interpolate(1, 0, valueOp);

	if (distanceOpac < 0)
		distanceOpac = 0;

	const finalOpac = distanceOpac < margeValue ? distanceOpac : margeValue

	return `${finalOpac < 0 ? 0 : finalOpac}`
}

function interpolateBHC(e, {height, width}) {
	const value = e[1] / height;

	return `rgba(${interpolate(0x31, 0x88, value)}, ${interpolate(0x91, 0x31, value)}, ${interpolate(0xcf, 0xb7, value)}, ${opacMargePoint(e, {height, width})})`;
}

function interpolateBHCLine(e1, e2, {height, width}) {
	const value = e1[1] / height;

	return `rgba(${interpolate(0x31, 0x88, value)}, ${interpolate(0x91, 0x31, value)}, ${interpolate(0xcf, 0xb7, value)}, ${opacLine(e1, e2, {height, width})})`;
}

function interpolateDosismart(e, {height, width}) {
	const value = e[0] / width;

	return `rgb(${interpolate(0x9f, 0x32, value)}, ${interpolate(0xe5, 0x5f, value)}, ${interpolate(0xba, 0x84, value)}, ${opacMargePoint(e, {height, width})})`;
}

function interpolateDosismartLine(e1, e2, {height, width}) {
	const value = e1[0] / width;

	return `rgb(${interpolate(0x9f, 0x32, value)}, ${interpolate(0xe5, 0x5f, value)}, ${interpolate(0xba, 0x84, value)}, ${opacLine(e1, e2, {height, width})})`;
}

function interpolateAuthAPI(e, {height, width, deep}) {
	const value = e[2] / deep;

	return `rgb(${interpolate(0xff, 0x26, value)}, ${interpolate(0xff, 0x4a, value)}, ${interpolate(0xff, 0x75, value)}, ${opacMargePoint(e, {height, width})})`;
}

function interpolateAuthAPILine(e1, e2, {height, width, deep}) {
	const value = e1[2] / deep;

	return `rgb(${interpolate(0xff, 0x26, value)}, ${interpolate(0xff, 0x4a, value)}, ${interpolate(0xff, 0x75, value)}, ${opacLine(e1, e2, {height, width})})`;
}

function interpolateBKC(e, {height, width, deep}) {
	const value = e[2] / deep;

	return `rgb(${interpolate(0x02, 0x32, value)}, ${interpolate(0x85, 0x5f, value)}, ${interpolate(0xa1, 0x84, value)}, ${opacMargePoint(e, {height, width})})`;
}

function interpolateBKCLine(e1, e2, {height, width, deep}) {
	const value = e1[2] / deep;

	return `rgb(${interpolate(0x02, 0x32, value)}, ${interpolate(0x85, 0x5f, value)}, ${interpolate(0xa1, 0x84, value)}, ${opacLine(e1, e2, {height, width})})`;
}

function interpolateArya(e, {height, width, deep}) {
	const value = e[2] / deep;

	return `rgb(${interpolate(0xe1, 0xff, value)}, ${interpolate(0x00, 0xff, value)}, ${interpolate(0x15, 0xff, value)}, ${opacMargePoint(e, {height, width})})`;
}

function interpolateAryaLine(e1, e2, {height, width, deep}) {
	const value = e1[2] / deep;

	return `rgb(${interpolate(0xe1, 0xff, value)}, ${interpolate(0x00, 0xff, value)}, ${interpolate(0x15, 0xff, value)}, ${opacLine(e1, e2, {height, width})})`;
}

function interpolateBLC(e, {height, width, deep}) {
	const value = e[2] / deep;

	return `rgb(${interpolate(0xb2, 0x5f, value)}, ${interpolate(0x22, 0x42, value)}, ${interpolate(0x22, 0xf4, value)}, ${opacMargePoint(e, {height, width})})`;
}

function interpolateBLCLine(e1, e2, {height, width, deep}) {
	const value = e1[2] / deep;

	return `rgb(${interpolate(0xb2, 0x5f, value)}, ${interpolate(0x22, 0x42, value)}, ${interpolate(0x22, 0xf4, value)}, ${opacLine(e1, e2, {height, width})})`;
}

function interpolateScalability(e, {height, width, deep}) {
	const value = e[0] / width;

	return `rgb(${interpolate(0x19, 0x68, value)}, ${interpolate(0x8f, 0xbb, value)}, ${interpolate(0x9d, 0xc4, value)}, ${opacMargePoint(e, {height, width})})`;
}

function interpolateScalabilityLine(e1, e2, {height, width, deep}) {
	const value = e1[0] / width;

	return `rgb(${interpolate(0x19, 0x68, value)}, ${interpolate(0x8f, 0xbb, value)}, ${interpolate(0x9d, 0xc4, value)}, ${opacLine(e1, e2, {height, width})})`;
}

function interpolateJ4(e, {height, width, deep}) {
	const value = e[1] / height;

	return `rgb(${interpolate(0xca, 0x81, value)}, ${interpolate(0x8f, 0x5b, value)}, ${interpolate(0x2f, 0x1e, value)}, ${opacMargePoint(e, {height, width})})`;
}

function interpolateJ4Line(e1, e2, {height, width, deep}) {
	const value = e1[1] / height;

	return `rgb(${interpolate(0xca, 0x81, value)}, ${interpolate(0x8f, 0x5b, value)}, ${interpolate(0x2f, 0x1e, value)}, ${opacLine(e1, e2, {height, width})})`;
}

function interpolateContact(e, {height, width, deep}) {
	const value = e[2] / deep;

	return `rgb(${interpolate(0xc0, 0x32, value)}, ${interpolate(0xc0, 0x5f, value)}, ${interpolate(0xc0, 0x84, value)}, ${opacMargePoint(e, {height, width})})`;
}

function interpolateContactLine(e1, e2, {height, width, deep}) {
	const value = e1[2] / deep;

	return `rgb(${interpolate(0xc0, 0x32, value)}, ${interpolate(0xc0, 0x5f, value)}, ${interpolate(0xc0, 0x84, value)}, ${opacLine(e1, e2, {height, width})})`;
}

class Pages {
	constructor(tuto) {
		this.pageAnchor = document.getElementById('pageArea');

		this.pageAnchor.style.display = 'flex';

		this.i = 0;
		this._more = false;

		this.onclickbtn = this.onclickbtn.bind(this);
		this.loadPages = this.loadPages.bind(this);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
		this.more = this.more.bind(this);
		this.less = this.less.bind(this);
		this.unmount = this.unmount.bind(this);
		this.render = this.render.bind(this);

		this.tuto = tuto;

		this.displayBtnMore = false;
		this.pageAnchor.onmousemove = event => {
			if (findPageContent(this.pages[this.i].name).more) {
				if(!this.displayBtnMore) {
					this.pageAnchor.innerHTML += `
						<div id="btnMore">
							<p id="txtBtnMore">></p>
						</div>
						<style type="text/css">
							#btnMore {
								display: flex;
								justify-content: center;
								align-items: center;
								position: fixed;
								height: 100vh;
								width: 5vw;
								right: 0;
								cursor: pointer;
								background: none;
							}
							#btnMore:hover {
								background: linear-gradient(to right, rgba(0,0,0,0) 0%, #080808af 50%, #080808af 100%);
							}
							#txtBtnMore {
								color: white;
								font-size: 2rem;
								font-weight: lighter;
							}
						</style>
					`;

					const btnMore = document.getElementById("btnMore")

					btnMore.onclick = this.onclickbtn;

					this.displayBtnMore = true;
				}
			}
		}
	}

	onclickbtn() {
		pageRight(this)
	}

	async loadPages() {
		try {
			this.pages = [];

			this.pages[0] = {};
			this.pages[0].name = 'Home';
			this.pages[0].colorDot = interpolateBHC;
			this.pages[0].colorLine = interpolateBHCLine;

			this.pages[1] = {};
			this.pages[1].name = 'Dosismart';
			this.pages[1].colorDot = interpolateDosismart;
			this.pages[1].colorLine = interpolateDosismartLine;

			this.pages[2] = {};
			this.pages[2].name = 'Auth API';
			this.pages[2].colorDot = interpolateAuthAPI;
			this.pages[2].colorLine = interpolateAuthAPILine;

			this.pages[3] = {};
			this.pages[3].name = 'BKC';
			this.pages[3].colorDot = interpolateBKC;
			this.pages[3].colorLine = interpolateBKCLine;


			this.pages[4] = {};
			this.pages[4].name = 'Arya mobile App';
			this.pages[4].colorDot = interpolateArya;
			this.pages[4].colorLine = interpolateAryaLine;

			this.pages[5] = {};
			this.pages[5].name = 'BLC - BFC';
			this.pages[5].colorDot = interpolateBLC;
			this.pages[5].colorLine = interpolateBLCLine;

			this.pages[6] = {};
			this.pages[6].name = 'Project : Automated distribution';
			this.pages[6].colorDot = interpolateScalability;
			this.pages[6].colorLine = interpolateScalabilityLine;

			this.pages[7] = {};
			this.pages[7].name = 'In Dev : J4';
			this.pages[7].colorDot = interpolateJ4;
			this.pages[7].colorLine = interpolateJ4Line;

			this.pages[8] = {};
			this.pages[8].name = 'Contact';
			this.pages[8].colorDot = interpolateContact;
			this.pages[8].colorLine = interpolateContactLine;

		} catch (e) {
			console.error(e);
		}
	}

	next() {
		this.displayBtnMore = false;
		this._more = false;
		this.i++;
	}

	prev() {
		this.displayBtnMore = false;
		this._more = false;
		this.i--;
	}

	more() {
		if (this._more || !findPageContent(this.pages[this.i].name).more) return false;

		this._more = true;
		return true;
	}

	less() {
		this.displayBtnMore = false;
		if (!this._more) return false;
		this._more = false;

		return true;
	}

	unmount() {
		this.tuto.unmount();
		this.pageAnchor.innerHTML = '';
		this.pageAnchor.style.display = 'none';
	}

	displayNormalPage(urlImg, content) {
		return (`
			<div id="mainSpace" >
				<img src=${urlImg} class="illustration" alt="DosismartLogo">
				<div class="textSpace" >
					${content}
				</div>
			</div>
		`)
	}

	displayMorePage(content) {
		return (`
			<div id="mainSpaceMore" >
				${content}
			</div>
		`)
	}

	render() {
		let pageContent = findPageContent(this.pages[this.i].name);
		this.pageAnchor.style.display = 'flex';
		if (this._more) this.pageAnchor.innerHTML = this.displayMorePage(pageContent.more);
		else this.pageAnchor.innerHTML = this.displayNormalPage(pageContent.urlImg, pageContent.normal);
		cloud.color_dot = this.pages[this.i].colorDot;
		cloud.color_line = this.pages[this.i].colorLine;
		this.tuto.mount();
	}
}

function startRotate(angle) {
	roulette.render();
	roulette.displaySelected();
	if (!rotating) {
		cloud.angle = angle;
		cloud.moveDot(false);
//		setTimeout(() => {
			cloud.rotDot(true)
			setTimeout(stopRotate, 1000);
//		}, 500);
	}
}

function stopRotate() {
	cloud.angle = [0,0,0];
	cloud.rotDot(false);
	setTimeout(() => cloud.moveDot(true), 500);
}

const moving_factor = 0.02;

function pageUp(pages) {
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

function pageDown(pages) {
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

function pageLeft(pages) {
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

function pageRight(pages) {
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

function handleKeyDown(event) {
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

function handleTouchstart(e) {
	let currentY = e.changedTouches[0].screenY;
	let currentX = e.changedTouches[0].screenX;

	startY = currentY;
	startX = currentX;
	lastY = currentY;
	lastX = currentX;
}

function handleTouchmove(e) {
	let currentY = e.changedTouches[0].screenY;
	let currentX = e.changedTouches[0].screenX;

	lastY = currentY;
	lastX = currentX;
}

function handleTouchend(e) {
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

function handleScroll(event) {
	lastScrollY += event.deltaY;

	if (lastScrollY > 0) {

		pageDown(pages);
		lastScrollY = 0;

	} else if (lastScrollY < 0) {

		pageUp(pages);
		lastScrollY = 0;

	}
}

async function initPaginer() {

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

	const test2 = document.getElementById('langSelectorText');
	test2.onclick = switchLang;
};

pagesReady = true;
