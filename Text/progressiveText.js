class progressiveText {
	constructor({text, time, space}) {

		this.text = text;
		this.to_write = '';

		this.time = time;
		this.deltaTime = time / text.length;

		this.space = space;

		this.i = 0;

		this.onStart = () => {};
		this.onFinish = () => {};
	}

	render = () => {
		this.to_write += this.text[this.i];
		this.space.innerHTML = `<p>${this.to_write}</p>`
		this.i++;
		if (this.i < this.text.length)
			setTimeout(this.render, this.deltaTime);
		else
			this.onFinish();
	}

	supp = () => {
		this.space.innerHTML = '<p></p>';
	}

	write = () => {
		if (this.onStart)
			this.onStart();
		this.render();
	}
}