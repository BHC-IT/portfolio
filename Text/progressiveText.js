class progressiveText {
	constructor({text, time, space}) {

		this.text = text;
		this.to_write = '';

		this.time = time;
		this.deltaTime = time / text.length;

		this.space = space;

		this.i = 0;

		this.render = this.render.bind(this);
		this.supp = this.supp.bind(this);
		this.write = this.write.bind(this);

		this.onStart = () => {};
		this.onFinish = () => {};

		this.baliseCloseEnd = -1;
		this.baliseOpen = '';
		this.baliseClose = '';
		this.baliseBefore = '';
		this.baliseContent = '';
	}

	isBalise() {
		const reste = this.text.slice(this.i);
		if (reste[0] === '<') {
			const idxCloseBO = reste.indexOf('>')
			if (idxCloseBO === -1) return false
			const baliseOuvrante = reste.slice(0, idxCloseBO+1)
			const resteSansBaliseOvrante = reste.slice(idxCloseBO+1)
			const idxOpenBF = resteSansBaliseOvrante.indexOf('</')
			if (idxOpenBF === -1) return false
			const interBalise = resteSansBaliseOvrante.slice(0, idxOpenBF)
			const idxCloseBF = resteSansBaliseOvrante.indexOf('>')
			if (idxCloseBF === -1) return false
			const baliseFermante = resteSansBaliseOvrante.slice(idxOpenBF, idxCloseBF+1)
			this.baliseOpen = baliseOuvrante
			this.baliseClose = baliseFermante
			this.baliseContent = interBalise;
			this.baliseBefore = this.text.slice(0, this.i)
			this.baliseCloseEnd = this.i + idxCloseBF + baliseOuvrante.length
			console.log(" this.baliseOpen:", this.baliseOpen)
			console.log(" this.baliseClose:", this.baliseClose)
			console.log(" this.baliseContent:", this.baliseContent)
			return true
		}
		return false
	}

	renderBalise() {
		const renderACarac = (idx) => {
			this.to_write = this.baliseBefore + this.baliseOpen + this.baliseContent.slice(0, idx) + this.baliseClose;
			this.space.innerHTML = `<p>${this.to_write}</p>`
		}

		for (let i = 0; i < this.baliseContent.length + 1; i++) {
			setTimeout(() => renderACarac(i), this.deltaTime)
		}
		console.log("i :", this.i)
		console.log("baliseCloseEnd :", this.baliseCloseEnd)
		this.i = this.baliseCloseEnd
		this.render()
	}

	render() {
		if (this.isBalise()) {
			this.renderBalise()
			console.log("BALISE")
		} else {
			//console.log(this.i)
			this.to_write += this.text[this.i];
			//if (this.text[this.i] === "x")
			//	console.log("towrite :", this.to_write)
			this.space.innerHTML = `<p>${this.to_write}</p>`
			this.i++;
			if (this.i < this.text.length)
				setTimeout(this.render, this.deltaTime);
			else
				this.onFinish();
		}
	}

	supp() {
		this.space.innerHTML = '<p></p>';
	}

	write() {
		if (this.onStart)
			this.onStart();
		this.render();
	}
}