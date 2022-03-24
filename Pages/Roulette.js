class Roulette {
	constructor(pages) {
		this.pageAnchor = document.getElementById('rollerArea');

		this.pages = pages;

		this.actualSelected = null;
		this.onMore = false;

		this.handleclick = this.handleclick.bind(this);
		this.handleclickmore = this.handleclickmore.bind(this);
		this.displaySelected = this.displaySelected.bind(this);
		this.unmount = this.unmount.bind(this);
		this.mount = this.mount.bind(this);
		this.render = this.render.bind(this);

		loadPage('/Pages/Roulette.html').then((e) => {
			this.pageAnchor.innerHTML = e;
			this.rouletteAnchor = document.getElementById('roulette');

			this.render();
		})
	}

	handleclick(event) {
		if (this.actualSelected) document.getElementById(this.actualSelected).className = 'pageName';
		if (this.onMore) document.getElementById(this.actualSelected+'more').className = 'pageName';

		const id = event.target.id;

		document.getElementById(id).className = 'selected';
		this.actualSelected = id;
		this.onMore = false;

		const i = this.pages.pages.findIndex(e => e.name === id);

		const prev_i = this.pages.i;
		this.pages.i = i;

		this.pages._more = false;

		const moving_factor = 0.02;

		this.pages.unmount();
		if (prev_i < i)	startRotate([moving_factor, 0, 0]);
		else if (prev_i > i) startRotate([moving_factor, 0, 0]);
		else startRotate([0, -moving_factor, 0]);

		this.render();
		setTimeout(() => this.pages.render(), 2000);
	}

	handleclickmore(event) {
		if (this.actualSelected) document.getElementById(this.actualSelected).className = 'pageName';
		if (this.onMore) document.getElementById(this.actualSelected+'more').className = 'pageName';

		const id = event.target.id.slice(0, event.target.id.length-4);

		document.getElementById(id).className = 'selected';
		document.getElementById(id+'more').className = 'selected';
		this.actualSelected = id;
		this.onMore = true;

		const i = this.pages.pages.findIndex(e => e.name === id);

		const prev_i = this.pages.i;
		this.pages.i = i;

		this.pages._more = true;

		const moving_factor = 0.02;

		this.pages.unmount();
		if (prev_i < i)	startRotate([moving_factor, 0, 0]);
		else if (prev_i > i) startRotate([moving_factor, 0, 0]);
		else startRotate([0, moving_factor, 0]);

		this.render();
		setTimeout(() => this.pages.render(), 2000);
	}

	displaySelected() {
		if (this.actualSelected) document.getElementById(this.actualSelected).className = 'pageName';
		if (this.onMore) document.getElementById(this.actualSelected+'more').className = 'pageName';
		this.onMore = false;

		const id = this.pages.pages[this.pages.i].name;

		document.getElementById(id).className = 'selected';

		if (this.pages._more) {
			document.getElementById(id+'more').className = 'selected';
			this.onMore = true;
		}

		this.actualSelected = id;
	}

	unmount() {
		this.pageAnchor.style.display = 'none';
	}

	async mount() {
		this.pageAnchor.style.display = 'flex';
	}

	render() {

		this.rouletteAnchor.innerHTML = '';

		if (window.mobileCheck()) {
			this.pages.pages.forEach((e, i) => {
				if (i > this.pages.i - 2 && i < this.pages.i + 2 || this.pages.i < 2 && i < 3 || this.pages.i > this.pages.pages.length - 1 && i >= this.pages.pages.length - 1) {
					this.rouletteAnchor.innerHTML += `
						<div class="pageHolder" >
							<div>
								<p id="${e.name}" class="pageName" >
									${findPageContent(e.name).title}
								</p>
							</div>
							<div>
								${findPageContent(this.pages.pages[i].name).more ? `<p id="${e.name}more" class="more" >${getLangue() === 'Fr' ? '/plus' : '/more'}</p>` : '' }
							</div>
						</div>
					`
				}
			});
		} else {
			this.pages.pages.forEach((e, i) => {
				if (i > this.pages.i - 3 && i < this.pages.i + 3 || this.pages.i < 2 && i < 5 || this.pages.i > this.pages.pages.length - 3 && i >= this.pages.pages.length - 5) {
					this.rouletteAnchor.innerHTML += `
						<div class="pageHolder" >
							<div>
								<p id="${e.name}" class="pageName" >
									${findPageContent(e.name).title}
								</p>
							</div>
							<div>
								${findPageContent(this.pages.pages[i].name).more ? `<p id="${e.name}more" class="more" >${getLangue() === 'Fr' ? '/plus' : '/more'}</p>` : '' }
							</div>
						</div>
					`
				}
			});
		}

		const texts = document.getElementsByClassName('pageName');

		for (let i = 0; i < texts.length; i++) {
			texts[i].onclick = this.handleclick;
		}

		const mores = document.getElementsByClassName('more');

		for (let i = 0; i < mores.length; i++) {
			mores[i].onclick = this.handleclickmore;
		}

		this.displaySelected();

	}
}