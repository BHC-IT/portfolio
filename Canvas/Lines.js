
function calculate_lines(arr, distance) {
	const lines = [];
	arr.forEach((e, i) => {
		for (let j = i; j != arr.length; j++) {
			const to_point = arr[j];

			const x_abs = e[0] - to_point[0];
			const y_abs = e[1] - to_point[1];


			const curr_distance = Math.sqrt((x_abs * x_abs) + (y_abs * y_abs));


			if (curr_distance < distance && i !== j) {
				lines.push([i, j]);
			} else {
			}

		}
	});

	return lines;
}

onmessage = function(e) {
	const lines = calculate_lines(e.data.arr, e.data.length);

	postMessage(lines);
}