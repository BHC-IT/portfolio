var textReady = false;

function startAnimation(hand, animation) {
	let animationOngoing = true;
	let i = 0;

	function continueAnimation() {
		if (!animationOngoing)
			return;

		hand.className = animation[i % animation.length].name;
		setTimeout(continueAnimation, animation[i % animation.length].duration);
		i++;
	}

	continueAnimation();

	return (() => {
		animationOngoing = false;
	});
}


function mobileText(callback, skip) {
	const textZone = document.getElementsByClassName('textZone')[0];
	const keyZone = document.getElementsByClassName('ButtonKeyboardShow')[0];
	const nextButton = document.getElementById('nextButtonTouchable');

	const hand = document.getElementById('hand');

	let current = null;
	let next = null;

	let animation = null;

	keyZone.style.display = 'none';
	nextButton.style.display = 'none';

	const welcomeText = new progressiveText({
		text: 'Welcome',
		time: 500,
		space: textZone,
	});

	const moveText = new progressiveText({
		text: 'You can swipe up or down to go from one project to another',
		time: 1000,
		space: textZone,
	});

	const moreText = new progressiveText({
		text: 'If a project interests you, swipe left to learn more',
		time: 1000,
		space: textZone,
	});

	const backText = new progressiveText({
		text: 'Swipe right to go back',
		time: 1000,
		space: textZone,
	});

	const dummyEnd = new progressiveText({
		text: ' ',
		time: 1,
		space: textZone,
	});

	const handleKeyDown = (event) => {
		if (event.keyCode == 13 || event.keyCode == 32) {
			if (current)
				current.supp();
			if (next)
				next.write();
		}
	}

	welcomeText.onFinish = () => {
		setTimeout(() => {
			welcomeText.supp();
			moveText.write();

		}, 1000);
	};

	moveText.onStart = () => {
		keyZone.style.display = 'block';
		nextButton.style.display = 'block';


		animation = startAnimation(hand, [{name: 'handMoveUp', duration: 2200}, {name: 'handMoveDown', duration: 2200}]);
	}

	moveText.onFinish = () => {
		current = moveText;
		next = moreText;
	}

	moreText.onStart = () => {
		current = null;
		next = null;

		animation();
		animation = startAnimation(hand, [{name: 'handMoveLeft', duration: 2000}, {name: 'handStayLeft', duration: 200}]);
	}

	moreText.onFinish = () => {
		current = moreText;
		next = backText;
	}

	backText.onStart = () => {
		current = null;
		next = null;

		animation();
		animation = startAnimation(hand, [{name: 'handMoveRight', duration: 2000}, {name: 'handStayRight', duration: 200}]);
	}

	backText.onFinish = () => {
		current = backText;
		next = dummyEnd;
	}

	dummyEnd.onStart = () => {
		animation();
		keyZone.style.display = 'none';
		nextButton.style.display = 'none';

		document.removeEventListener('keydown', handleKeyDown);
		callback();
	}

	nextButton.onmouseover = () => {
		nextButton.style.backgroundColor = 'silver';
	}
	nextButton.onmouseout = () => {
		nextButton.style.backgroundColor = 'gray';
	}

	nextButton.onclick = () => {
		if (current)
			current.supp();
		if (next)
			next.write();
	}

	document.addEventListener('keydown', handleKeyDown);

	if (skip) moveText.write();
	else setTimeout(() => welcomeText.write(), 750);
}

function desktopText(callback, skip) {
	const textZone = document.getElementsByClassName('textZone')[0];
	const keyZone = document.getElementsByClassName('ButtonKeyboardShow')[0];
	const nextButton = document.getElementById('nextButtonTouchable');

	const upKey = document.getElementById('up');
	const downKey = document.getElementById('down');
	const rightKey = document.getElementById('right');
	const leftKey = document.getElementById('left');

	let current = null;
	let next = null;

	keyZone.style.display = 'none';
	nextButton.style.display = 'none';

	const welcomeText = new progressiveText({
		text: 'Welcome',
		time: 500,
		space: textZone,
	});

	const moveText = new progressiveText({
		text: 'You can use up and down key or scroll to go from one project to another',
		time: 1000,
		space: textZone,
	});

	const moreText = new progressiveText({
		text: 'If a project interests you, use the right key to learn more',
		time: 1000,
		space: textZone,
	});

	const backText = new progressiveText({
		text: 'Use the left key to go back',
		time: 1000,
		space: textZone,
	});

	const dummyEnd = new progressiveText({
		text: ' ',
		time: 1,
		space: textZone,
	});

	const handleKeyDown = (event) => {
		if (event.keyCode == 13 || event.keyCode == 32) {
			if (current)
				current.supp();
			if (next)
				next.write();
		}
	}

	welcomeText.onFinish = () => {
		setTimeout(() => {
			welcomeText.supp();
			moveText.write();

		}, 1000);
	};

	moveText.onStart = () => {
		keyZone.style.display = 'block';
		nextButton.style.display = 'block';

		upKey.className = 'buttonKeyActive';
		downKey.className = 'buttonKeyActive';
	}

	moveText.onFinish = () => {
		current = moveText;
		next = moreText;
	}

	moreText.onStart = () => {
		current = null;
		next = null;

		upKey.className = 'buttonKey';
		downKey.className = 'buttonKey';

		rightKey.className = 'buttonKeyActive';
	}

	moreText.onFinish = () => {
		current = moreText;
		next = backText;
	}

	backText.onStart = () => {
		current = null;
		next = null;

		rightKey.className = 'buttonKey';
		leftKey.className = 'buttonKeyActive';
	}

	backText.onFinish = () => {
		current = backText;
		next = dummyEnd;
	}

	dummyEnd.onStart = () => {
		leftKey.className = 'buttonKey';
		keyZone.style.display = 'none';
		nextButton.style.display = 'none';

		document.removeEventListener('keydown', handleKeyDown);
		callback();
	}

	nextButton.onmouseover = () => {
		nextButton.style.backgroundColor = 'silver';
	}
	nextButton.onmouseout = () => {
		nextButton.style.backgroundColor = 'gray';
	}

	nextButton.onclick = () => {
		if (current)
			current.supp();
		if (next)
			next.write();
	}

	document.addEventListener('keydown', handleKeyDown);

	if (skip) moveText.write();
	else setTimeout(() => welcomeText.write(), 750);
}

function startText(callback, skip = false) {

	document.getElementsByClassName('tutoArea')[0].style.display = 'flex';

	if (window.mobileCheck()) mobileText(callback, skip);
	else desktopText(callback, skip);
}


textReady = true;
