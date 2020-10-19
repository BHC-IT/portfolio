const idx_point = [];

function calculate_lines(arr, distance) {
	const lines = [];
	arr.map((e, i) => {
		for (let j = i; j != arr.length; j++) {
			const to_point = arr[j];

			const x_abs = e[0] - to_point[0];
			const y_abs = e[1] - to_point[1];
			const z_abs = e[2] - to_point[2];


			const curr_distance = Math.sqrt((x_abs * x_abs) + (y_abs * y_abs) + (z_abs * z_abs));

			const idx = idx_point.find(p => p[0] === i && p[1] === j);

			if (curr_distance < distance) {
				if (idx !== -1) {
				} else {
					idx_point.push([i, j]);
				}
				lines.push([i, j]);
			} else {
				if (idx !== -1) {
					idx_point.splice(idx, 1);
				} else {
				}
			}

		}
	});

	return lines;
}

onmessage = function(e) {
	const lines = calculate_lines(e.data.arr, e.data.length);

	postMessage(lines);
}