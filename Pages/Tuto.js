class Tuto {
	constructor() {
		this.pageAnchor = document.getElementById('tutoRestart');
		this.text = document.getElementById('restartText');

		this.pageAnchor.onmouseover = () => {
			this.text.style.color = 'silver';
		};

		this.pageAnchor.onmouseout = () => {
			this.text.style.color = 'white';
		};
	}

	unmount = () => {
		this.pageAnchor.style.display = 'none';
	}

	mount = () => {
		this.pageAnchor.style.display = 'flex';
	}
}