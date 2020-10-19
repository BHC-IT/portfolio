class Cloud {
	constructor({canvas, height, deep, width, dotNumber, dotSpeed, dotSize, linesLength, colorDot, colorLine, colorBack, lineWidth}) {

		this.ctx = canvas;

		this.height = height;
		this.width = width;
		this.deep = deep;

		this.dot_nb = dotNumber;
		this.dot_speed = dotSpeed;
		this.dot_size = dotSize;

		this.lines_length = linesLength;

		this.draw_dot = true;
		this.draw_lines = true;
		this.move_dot = true;
		this.rot_dot = false;

		this.color_dot = colorDot;
		this.color_line = colorLine;
		this.color_back = colorBack;

		this.line_width = lineWidth;

		this.calc_move_dot = this.initCalculateDotMoveNext();
		this.calc_rotation_dot = this.initRotateGrid();

		this.lines = [];
		/*
		*
		* array format : [position x, position y, direction x, direction , y]
		*
		*/
		this.arr = [];

		this.angle = [0,0,0];


		for (let i = 0; i < this.dot_nb; i++) {
			this.arr.push([
				Math.random() * this.width,
				Math.random() * this.height,
				Math.random() * this.deep,
				(Math.random() * this.dot_speed) - 0.5 / this.dot_speed,
				(Math.random() * this.dot_speed) - 0.5 / this.dot_speed,
				(Math.random() * this.dot_speed) - 0.5 / this.dot_speed]);
		}


		this.linesCalc = new Worker('./Canvas/Lines.js');

		this.linesCalc.onmessage = (e) => {
			this.lines = e.data;
		}
	}

	initCalculateDotMoveNext = () => {
		const gpu = new GPU();

		return gpu.createKernel(function(prev_pos, height, width, deep) {

			if (this.thread.x === 0) {
				if (prev_pos[this.thread.y][0] + prev_pos[this.thread.y][3] < 0)
					return width;
				if (prev_pos[this.thread.y][0] + prev_pos[this.thread.y][3] > width)
					return 0;
				return prev_pos[this.thread.y][0] + prev_pos[this.thread.y][3]
			} else if (this.thread.x === 1) {
				if (prev_pos[this.thread.y][1] + prev_pos[this.thread.y][4] < 0)
					return height;
				if (prev_pos[this.thread.y][1] + prev_pos[this.thread.y][4] > height)
					return 0;
				return prev_pos[this.thread.y][1] + prev_pos[this.thread.y][4]
			} else if (this.thread.x === 2) {
				if (prev_pos[this.thread.y][2] + prev_pos[this.thread.y][5] < 0)
					return deep;
				if (prev_pos[this.thread.y][2] + prev_pos[this.thread.y][5] > deep)
					return 0;
				return prev_pos[this.thread.y][2] + prev_pos[this.thread.y][5]
			} else if (this.thread.x === 3) {
				return prev_pos[this.thread.y][3];
			} else if (this.thread.x === 4) {
				return prev_pos[this.thread.y][4];
			} else if (this.thread.x === 5) {
				return prev_pos[this.thread.y][5];
			}
		}).setOutput([6, this.dot_nb]);
	}

	initRotateGrid = () => {
		const gpu = new GPU();

		return gpu.createKernel(function(prev_pos, height, width, deep, deltaAngle) {

			const x_angle = deltaAngle[0];
			const y_angle = deltaAngle[1];
			const z_angle = deltaAngle[2];

			const point = [prev_pos[this.thread.y][0], prev_pos[this.thread.y][1], prev_pos[this.thread.y][2]];

			const xMatrix1R = [1, 0, 0];
			const xMatrix2R = [0, Math.cos(x_angle), -Math.sin(x_angle)];
			const xMatrix3R = [0, Math.sin(x_angle), Math.cos(x_angle)];

			const yMatrix1R = [Math.cos(y_angle), 0, Math.sin(y_angle)];
			const yMatrix2R = [0, 1, 0];
			const yMatrix3R = [-Math.sin(y_angle), 0, Math.cos(y_angle)];

			const zMatrix1R = [Math.cos(z_angle), -Math.sin(z_angle), 0];
			const zMatrix2R = [Math.sin(z_angle), Math.cos(z_angle), 0];
			const zMatrix3R = [0, 0, 1];

			const newCoord = [
				point[0] - width / 2,
				point[1] - height / 2,
				point[2] - deep / 2,
			];


			newCoord = [
				(newCoord[0] * xMatrix1R[0]) + (newCoord[1] * xMatrix1R[1]) + (newCoord[2] * xMatrix1R[2]),
				(newCoord[0] * xMatrix2R[0]) + (newCoord[1] * xMatrix2R[1]) + (newCoord[2] * xMatrix2R[2]),
				(newCoord[0] * xMatrix3R[0]) + (newCoord[1] * xMatrix3R[1]) + (newCoord[2] * xMatrix3R[2])
			];

			newCoord = [
				(newCoord[0] * yMatrix1R[0]) + (newCoord[1] * yMatrix1R[1]) + (newCoord[2] * yMatrix1R[2]),
				(newCoord[0] * yMatrix2R[0]) + (newCoord[1] * yMatrix2R[1]) + (newCoord[2] * yMatrix2R[2]),
				(newCoord[0] * yMatrix3R[0]) + (newCoord[1] * yMatrix3R[1]) + (newCoord[2] * yMatrix3R[2])
			];

			newCoord = [
				(newCoord[0] * zMatrix1R[0]) + (newCoord[1] * zMatrix1R[1]) + (newCoord[2] * zMatrix1R[2]),
				(newCoord[0] * zMatrix2R[0]) + (newCoord[1] * zMatrix2R[1]) + (newCoord[2] * zMatrix2R[2]),
				(newCoord[0] * zMatrix3R[0]) + (newCoord[1] * zMatrix3R[1]) + (newCoord[2] * zMatrix3R[2])
			];

			newCoord = [
				newCoord[0] + width / 2,
				newCoord[1] + height / 2,
				newCoord[2] + deep / 2,
			];


			if (this.thread.x === 0) {

				return newCoord[0];

			} else if (this.thread.x === 1) {

				return newCoord[1];

			} else if (this.thread.x === 2) {

				return newCoord[2];

			} else if (this.thread.x === 3) {

				return prev_pos[this.thread.y][3];

			} else if (this.thread.x === 4) {

				return prev_pos[this.thread.y][4];

			} else if (this.thread.x === 5) {

				return prev_pos[this.thread.y][5];

			}

		}).setOutput([6, this.dot_nb]);
	}

	calculateDotMoveNext = () => {
		this.arr = this.calc_move_dot(this.arr, this.height, this.width, this.deep);
	}

	rotateGrid = () => {
		this.arr = this.calc_rotation_dot(this.arr, this.height, this.width, this.deep, this.angle);
	}

	drawDot = (state) => {
		this.draw_dot = state;
	}

	drawLines = (state) => {
		this.draw_lines = state;
	}

	moveDot = (state) => {
		this.move_dot = state;
	}

	rotDot = (state) => {
		this.rot_dot = state;
	}

	renderDots = () => {
		this.arr.forEach(e => {
			const fin_color = this.color_dot(e, {height: this.height, width: this.width, deep: this.deep});

			this.ctx.fillStyle = fin_color;
			this.ctx.strokeStyle = fin_color;
			const size_deep = this.dot_size;
			this.ctx.arc(e[0], e[1], 2 * size_deep * 0.1 * Math.PI, 0, 2 * Math.PI);
			this.ctx.fill();
			this.ctx.stroke();
			this.ctx.beginPath();
		});
	}

	renderLines = () => {
		this.ctx.lineWidth = this.line_width;
		this.lines.forEach(e => {

			const coord1 = this.arr[e[0]];
			const coord2 = this.arr[e[1]];

			const fin_color = this.color_line(coord1, coord2, {height: this.height, width: this.width, deep: this.deep});

			this.ctx.fillStyle = fin_color;
			this.ctx.strokeStyle = fin_color;

			const x_abs = coord1[0] - coord2[0];
			const y_abs = coord1[1] - coord2[1];
			const z_abs = coord1[2] - coord2[2];


			const curr_distance = Math.sqrt((x_abs * x_abs) + (y_abs * y_abs) + (z_abs * z_abs));

			if (curr_distance > this.lines_length) return;

			this.ctx.moveTo(coord1[0], coord1[1]);
			this.ctx.lineTo(coord2[0], coord2[1]);
			this.ctx.stroke();
			this.ctx.beginPath();
		});
	}

	draw = () => {
		if (this.move_dot)
			this.calculateDotMoveNext();

		if (this.rot_dot)
			this.rotateGrid();

		this.linesCalc.postMessage({arr: this.arr, length: this.lines_length});

		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
		this.ctx.beginPath();

		this.ctx.fillStyle = this.color_back;
		this.ctx.fillRect(0, 0, canvas.width, canvas.height);

		this.ctx.beginPath();
		// this.ctx.fillStyle = '#8831b7'
		// this.ctx.strokeStyle = '#8831b7'

		this.ctx.fillStyle = this.color_dot;
		this.ctx.strokeStyle = this.color_dot;

		if (this.draw_dot)
			this.renderDots();

		this.ctx.fillStyle = this.color_line;
		this.ctx.strokeStyle = this.color_line;
		if (this.draw_lines)
			this.renderLines();

	}

	render = () => {
		this.draw();
		window.requestAnimationFrame(this.render);
	}
}