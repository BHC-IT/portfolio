class Tuto {
	constructor() {
		this.pageAnchor = document.getElementById('tutoRestart');
		this.text = document.getElementById('restartText');

		this.unmount = this.unmount.bind(this);
		this.mount = this.mount.bind(this);

		this.pageAnchor.onmouseover = function() {
			this.text.style.color = 'silver';
		}.bind(this);

		this.pageAnchor.onmouseout = function() {
			this.text.style.color = 'white';
		}.bind(this);
	}

	unmount() {
		this.pageAnchor.style.display = 'none';
	}

	mount() {
		this.pageAnchor.style.display = 'flex';
	}
}