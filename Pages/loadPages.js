function loadPage(page) {
	return new Promise((resolve, reject) => {
		var xhr= new XMLHttpRequest();
		xhr.open('GET', page, true);
		xhr.onreadystatechange = function() {
			if (this.readyState !== 4) return;
			if (this.status !== 200) reject(new Error(`could not load page : ${window.location.href}/${page}`));
			resolve(this.responseText);
		};
		xhr.send();
	});
}