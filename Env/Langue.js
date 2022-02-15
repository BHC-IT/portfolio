let langue = !navigator.language ? 'Fr' : navigator.language === 'fr' ? 'Fr' : 'En';

const getLangue = () => langue;
const setLangue = (newLangue) => {
	if (newLangue === 'En') langue = newLangue;
	else langue = 'Fr';
}

const switchLang = () => {
	const elemNew = document.getElementById('langSelectorText');
	const elemOld = document.getElementById('langSelectorTextSelected');
	setLangue(getLangue() === 'Fr' ? 'En' : 'Fr');
	elemNew.id = 'langSelectorTextSelected';
	elemOld.id = 'langSelectorText';
	elemOld.onclick = switchLang;

	const tutoTxtToChange = document.getElementById('restartText');
	tutoTxtToChange.innerHTML = getLangue() === 'Fr' ? 'Montrer le tutoriel' : 'Show tutorial';
	initPaginer();
}

const txtsFR = {
	pages: [
		{name: 'Home',		urlImg: './Assets/Images/bhc_logo_1920.png',
			title: 'Acceuil',
			normal:
				`<p>Welcome. This site is a portfolio showing most of our previous and upcoming work.</p>
				<p>The site is built with vanilla HTML, CSS and JavaScript. With only one library for gpu rendering.</p>
				<p>You can see the source code on <a href="https://github.com/BHC-IT/portfolio" style="color:grey" nofollow noreferee > GitHub</a>.</p>`,
			more: null},
		{name: 'Dosismart',	urlImg: './Assets/Images/dosismart_logo.png',
			title: 'Dosismart',
			normal:
				`<p >Dosismart is a mobile application distributed on iOS and Android. It helps radiologists calculate and understand risks related to radionucleides.</p>
				<p><a href="https://beta.dosismart.com" style="color: grey;" >Visit the web site.</a><p>`,
			more: [
				`Dosismart is built with the help of <a href="https://dosimex.fr" style="color:grey">dosimex</a>. They kindly share with us their physics and nuclear engineering background.
				Dosimex, as an excel based software, already have a huge adoption in the french industry. We build on this to add modern features: historics, import/export, user group and more.
				The application is the first mobile solution to modelize gamma ray exposition.
				We are currently in private beta and we will release a public beta soon.`,

				`The project is built with a microservice architecture. Most services are coded in typescript, with c++ modules binded with node-gyp. The physics calculus service is developed in Haskell.
				All front applications (mobile app, landing page, dashboard) are made with react.`
			]
		},
		{name: 'Auth',		urlImg: './Assets/Images/OAuth_logo.png',
			title: `API d'authentification`,
			normal: `<p>Our Auth API provides fast and reliable authentication for end user or automated services.</p>`,
			more: [
				`The API is built with security and reliability in mind. Supporting a well-known protocol and following specification allows use to craft a service in wich you can be confident.
				Performances are automatically tracked to reduce bottleneck and create horizontal scaling to provide the fastest authentification available.
				Following GDPR, Auth API only uses most needed data and do not bloat with unnecessary informations, keeping the database as light as possible.`,

				`Built with TypeScript and mongoDB, the API offers a fast and scalable way to sign-in user. OAuth2 is currently the only protocol supported, but more are to come.
				Tests, linting, deployment and feedback are entirely automated with GitHub actions. Regressions or potential failures can't go unnoticed.
				A configuration file can be given to set-up each node in a specific way. Furthermore, most features can have their rules overloaded by another service for specific needs.`
			]
		},
		{name: 'BKC',		urlImg: './Assets/Images/Blockchain.svg',
			title: 'BKC',
			normal: `<p >BKC is a high velocity blockchain software develop for Monkey Money.</p>`,
			more: [
				`BKC was built for Monkey Money. The goal was to give french local currencies associations the ability to digitalise their money.
				The association owners needed to run the chaine nodes on cheap machines, and could register huge spike on specific days without the possibility to scale. We thinked BKC just for that, beeing as low consuming as possible while handling large amounts of transactions at the same time.
				Also, association had only a few Desktop to spare to serve as node for the chain. If one node crashed, it could mean a huge loss in capacity for them. The software was made to handle any bad that could happen, as long as the PC is running.`,

				`Build from scratch in C++ with an actor model, BKC is heavily optimised to run on multi-core CPU and can handle high loads efficiently.
				Knowing the chain would be run in private environnement, we used a lazy approach to transactions, allowing thousands of requests to be handled by the chain.
				Using strict concurrency model such as actor and pi calculus, the process can recover from anything and will, at worse, delay treatment`
			]
		},
		{name: 'Arya',		urlImg: './Assets/Images/Arya_logo.png',
			title: 'Application mobile Arya',
			normal: `<p>Our first client ! Mobile App in react Native. We met Etienne, Nalyssa's Director, a company based in Jakarta with wich we collaborated on this project. We agreed on a mutally beneficial partenership because we loved working together.</p>`,
			more: [
				`Arya is a social application.
				It allows trading amateurs to discuss around the news and the best practices, the good choices to make.`,

				`The application was built in react native with a back-end in Firebase.`
			]
		},
		{name: 'BLC-BFC',	urlImg: './Assets/Images/Library.png',
			title: 'BLC - BFC',
			normal: `<p>A C++ actor oriented library and Framework</p>`,
			more: [
				`Optimise and automate distribution.
				Our goal is to normalize the use of distribution by simplifying it.
				We will add a packet manager to C++ like npm.`,

				`blc offers different tools needed to kickstart a project with concurency and network in mind. Some objects were early implementation of C++20 specifications and have since became outdated.
				bfc is a framework designed around the actor model. It offers a way to easily develop software with concurency and prevent mistake and errors like deadlock.
				One goal of bfc is to streamline dependecies managment and docker into the build and run process, and offers different distribution algorithm preimplemented as modules.`
			]
		},
		{name: 'Distribution',			urlImg: './Assets/Images/Cloud.png',
			title: 'Distribution automatique',
			normal: `<p>Our goal is to create a collection of tools that would allow replication and distribution.</p>`,
			more: [
				`We aim to provide easier way to distribute and handle large pool with efficient tools.
				Our objectif is to make distribution and high capacity servers easier to develop and maintain.`,

				`One of the tools will be a distributed ledger without leader capable of handling data in an efficient and flexible way.
				Many sdk and modules will be built to support any runtime or compiled language.`
			]
		},
		{name: 'J4',		urlImg: './Assets/Images/j4.png',
			title: 'En développement : J4',
			normal: `<p>We are creating a new programing language.</p>`,
			more: [
				`J4 is a fonctionnal oriented language.
				It is designed with regard of current language theory.`,

				`J4 implements dependent sub typing.
				You can define arbitrary pieces of syntax with the use of mixfix expressions.`
			]
		},
		{name: 'Contact',	urlImg: '',
			title: 'Contact',
			normal:
				`<p>Thank you for reading!</p>
				<h1>You have a question, a project ? Contact us.</h1>
				<p>By mail at <a href="mailto:contact@bhc-it.com" style="color:grey" >contact@bhc-it.com</a></p>
				<p>On our <a href="https://www.linkedin.com/company/bhc-it" style="color:grey">LinkedIn</a></p>
				<p>On our <a href="https://github.com/BHC-IT" style="color:grey">GitHub</a></p>`,
			more: null},
	],
	tuto: {
		welcomeText: 'Bienvenue',
		moveText: `Vous pouvez utiliser les flèches du haut et du bas (swipe sur mobile) pour naviger d'un projet à un autre`,
		moreText: 'If a project interests you, use the right key to learn more',
		backText: 'Use the left key to go back',
	},
}

const txtsEN = {
	pages: [
		{name: 'Home',		urlImg: './Assets/Images/bhc_logo_1920.png',
			title: 'Home',
			normal:
				`<p>ENGLICH VERSION !</p>
				<p>Welcome. This site is a portfolio showing most of our previous and upcoming work.</p>
				<p>The site is built with vanilla HTML, CSS and JavaScript. With only one library for gpu rendering.</p>
				<p>You can see the source code on <a href="https://github.com/BHC-IT/portfolio" style="color:grey" nofollow noreferee > GitHub</a>.</p>`,
			more: null},
		{name: 'Dosismart',	urlImg: './Assets/Images/dosismart_logo.png',
			title: 'Dosismart',
			normal:
				`<p >Dosismart is a mobile application distributed on iOS and Android. It helps radiologists calculate and understand risks related to radionucleides.</p>
				<p><a href="https://beta.dosismart.com" style="color: grey;" >Visit the web site.</a><p>`,
			more: [
				`Dosismart is built with the help of <a href="https://dosimex.fr" style="color:grey">dosimex</a>. They kindly share with us their physics and nuclear engineering background.
				Dosimex, as an excel based software, already have a huge adoption in the french industry. We build on this to add modern features: historics, import/export, user group and more.
				The application is the first mobile solution to modelize gamma ray exposition.
				We are currently in private beta and we will release a public beta soon.`,

				`The project is built with a microservice architecture. Most services are coded in typescript, with c++ modules binded with node-gyp. The physics calculus service is developed in Haskell.
				All front applications (mobile app, landing page, dashboard) are made with react.`
			]
		},
		{name: 'Auth',		urlImg: './Assets/Images/OAuth_logo.png',
			title: `API d'authentification`,
			normal: `<p>Our Auth API provides fast and reliable authentication for end user or automated services.</p>`,
			more: [
				`The API is built with security and reliability in mind. Supporting a well-known protocol and following specification allows use to craft a service in wich you can be confident.
				Performances are automatically tracked to reduce bottleneck and create horizontal scaling to provide the fastest authentification available.
				Following GDPR, Auth API only uses most needed data and do not bloat with unnecessary informations, keeping the database as light as possible.`,

				`Built with TypeScript and mongoDB, the API offers a fast and scalable way to sign-in user. OAuth2 is currently the only protocol supported, but more are to come.
				Tests, linting, deployment and feedback are entirely automated with GitHub actions. Regressions or potential failures can't go unnoticed.
				A configuration file can be given to set-up each node in a specific way. Furthermore, most features can have their rules overloaded by another service for specific needs.`
			]
		},
		{name: 'BKC',		urlImg: './Assets/Images/Blockchain.svg',
			title: 'BKC',
			normal: `<p >BKC is a high velocity blockchain software develop for Monkey Money.</p>`,
			more: [
				`BKC was built for Monkey Money. The goal was to give french local currencies associations the ability to digitalise their money.
				The association owners needed to run the chaine nodes on cheap machines, and could register huge spike on specific days without the possibility to scale. We thinked BKC just for that, beeing as low consuming as possible while handling large amounts of transactions at the same time.
				Also, association had only a few Desktop to spare to serve as node for the chain. If one node crashed, it could mean a huge loss in capacity for them. The software was made to handle any bad that could happen, as long as the PC is running.`,

				`Build from scratch in C++ with an actor model, BKC is heavily optimised to run on multi-core CPU and can handle high loads efficiently.
				Knowing the chain would be run in private environnement, we used a lazy approach to transactions, allowing thousands of requests to be handled by the chain.
				Using strict concurrency model such as actor and pi calculus, the process can recover from anything and will, at worse, delay treatment`
			]
		},
		{name: 'Arya',		urlImg: './Assets/Images/Arya_logo.png',
			title: 'Application mobile Arya',
			normal: `<p>Our first client ! Mobile App in react Native. We met Etienne, Nalyssa's Director, a company based in Jakarta with wich we collaborated on this project. We agreed on a mutally beneficial partenership because we loved working together.</p>`,
			more: [
				`Arya is a social application.
				It allows trading amateurs to discuss around the news and the best practices, the good choices to make.`,

				`The application was built in react native with a back-end in Firebase.`
			]
		},
		{name: 'BLC-BFC',	urlImg: './Assets/Images/Library.png',
			title: 'BLC - BFC',
			normal: `<p>A C++ actor oriented library and Framework</p>`,
			more: [
				`Optimise and automate distribution.
				Our goal is to normalize the use of distribution by simplifying it.
				We will add a packet manager to C++ like npm.`,

				`blc offers different tools needed to kickstart a project with concurency and network in mind. Some objects were early implementation of C++20 specifications and have since became outdated.
				bfc is a framework designed around the actor model. It offers a way to easily develop software with concurency and prevent mistake and errors like deadlock.
				One goal of bfc is to streamline dependecies managment and docker into the build and run process, and offers different distribution algorithm preimplemented as modules.`
			]
		},
		{name: 'Distribution',			urlImg: './Assets/Images/Cloud.png',
			title: 'Distribution automatique',
			normal: `<p>Our goal is to create a collection of tools that would allow replication and distribution.</p>`,
			more: [
				`We aim to provide easier way to distribute and handle large pool with efficient tools.
				Our objectif is to make distribution and high capacity servers easier to develop and maintain.`,

				`One of the tools will be a distributed ledger without leader capable of handling data in an efficient and flexible way.
				Many sdk and modules will be built to support any runtime or compiled language.`
			]
		},
		{name: 'J4',		urlImg: './Assets/Images/j4.png',
			title: 'En développement : J4',
			normal: `<p>We are creating a new programing language.</p>`,
			more: [
				`J4 is a fonctionnal oriented language.
				It is designed with regard of current language theory.`,

				`J4 implements dependent sub typing.
				You can define arbitrary pieces of syntax with the use of mixfix expressions.`
			]
		},
		{name: 'Contact',	urlImg: '',
			title: 'Contact',
			normal:
				`<p>Thank you for reading!</p>
				<h1>You have a question, a project ? Contact us.</h1>
				<p>By mail at <a href="mailto:contact@bhc-it.com" style="color:grey" >contact@bhc-it.com</a></p>
				<p>On our <a href="https://www.linkedin.com/company/bhc-it" style="color:grey">LinkedIn</a></p>
				<p>On our <a href="https://github.com/BHC-IT" style="color:grey">GitHub</a></p>`,
			more: null},
	],
	tuto: {
		welcomeText: 'Welcome',
		moveText: 'You can use up and down key or scroll (swipe on mobile) to go from one project to another',
		moreText: 'If a project interests you, use the right key to learn more',
		backText: 'Use the left key to go back',
	},
}

const getGoodTxts = () => getLangue() === 'Fr' ? txtsFR : txtsEN;

const findPageContent = (pageName) => {
	let retour = null;
	let txtsToUse = getGoodTxts();
	txtsToUse.pages.map((e, i) => {
		if (e.name === pageName) {
			retour = e;
		}
	});
	return retour;
}
