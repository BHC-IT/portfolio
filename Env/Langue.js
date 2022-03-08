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
				`<p>Bienvenue. Ce site est notre potfolio montrant la plupart de nos précédents et prochains projets.</p>
				<p>Ce site est construit en vanilla HTML, CSS et Javascript avec une seule librairie pour le GPU rendering.</p>
				<p>Vous trouverez le code source sur <a href="https://github.com/BHC-IT/portfolio" style="color:grey" nofollow noreferee > GitHub</a>.</p>`,
			more: null},
		{name: 'Dosismart',	urlImg: './Assets/Images/dosismart_logo.png',
			title: 'Dosismart',
			normal:
				`<p>Dosismart est une application distribuée sur IOS et Android. Elle calcule pour les radiologistes les risques liés aux radionucléides.</p>
				<p><a href="https://beta.dosismart.com" style="color: grey;" >Visiter le site web.</a><p>`,
			more: [
				`Dosismart a été créé avec l’aide de <a href="https://dosimex.fr" style="color:grey">dosimex</a> qui nous a partagé ses calculs pour
				le modèle physique nucléaire. Dosimex, en tant que software Excel est adopté sur son marché francais.
				Dosismart vise a ajouter des fonctionnalités modernes: historique, import/export de données, groupes d’utilisateurs… etc.
				C’est la première solution mobile qui modélize l’exposition aux rayons gamma.
				L’application n’est actuellement disponible que par l’achat d’une clef Dosimex.`,

				`Le projet est construit en architecture microservice. La plupart des services sont codés en Typescript avec des modules
				C++ assignés via node-gyp. Le service de calculs est développé en Haskell.
				Toutes les applications front utilisent react (application mobile, site vitrine, dashboard).`
			]
		},
		{name: 'Auth',		urlImg: './Assets/Images/OAuth_logo.png',
			title: `API d'authentification`,
			normal: `<p>Notre API fournit une rapide et fiable authentification pour les utilisateurs ou les services automatisés.</p>`,
			more: [
				`L'API est conçue dans un souci de sécurité et de fiabilité. La prise en charge d'un protocole bien connu et des spécifications
				suivantes permet de créer un service dans lequel vous pouvez avoir confiance. Les performances sont automatiquement suivies pour
				réduire les goulots d'étranglement et créer une mise à l'échelle horizontale pour fournir l'authentification la plus rapide disponible.
				Conformément au RGPD, l'API Auth n'utilise que les données les plus nécessaires et ne gonfle pas d'informations inutiles,
				en gardant la base de données aussi légère que possible.`,

				`Construite avec TypeScript et mongoDB, l'API offre un moyen rapide et évolutif de se connecter à l'utilisateur.
				OAuth2 est actuellement le seul protocole pris en charge, mais d'autres sont à venir.
				Les tests, le linting, le déploiement et les commentaires sont entièrement automatisés avec les actions GitHub.
				Les régressions ou les échecs potentiels ne peuvent pas passer inaperçus.
				Un fichier de configuration peut être donné pour configurer chaque nœud d'une manière spécifique.
				De plus, la plupart des fonctionnalités peuvent voir leurs règles surchargées par un autre service pour des besoins spécifiques.`
			]
		},
		{name: 'BKC',		urlImg: './Assets/Images/Blockchain.svg',
			title: 'BKC',
			normal: `<p>BKC est un logiciel de blockchain à haute vitesse développé pour Monkey Money.</p>`,
			more: [
				`BKC a été construit pour Monkey Money. L'objectif était de donner aux associations françaises de monnaies locales la possibilité de
				numériser leur argent. Les propriétaires de l'association avaient besoin d'exécuter les nœuds de la chaîne sur des machines bon
				marché et pouvaient enregistrer d'énormes pics certains jours sans possibilité de mise à l'échelle. Nous avons pensé BKC juste pour
				cela, étant aussi peu consommateur que possible tout en traitant de grandes quantités de transactions en même temps.
				De plus, l'association ne disposait que de quelques Desktop pour servir de nœud à la chaîne. Si un nœud tombait en panne,
				cela pourrait signifier une énorme perte de capacité pour eux. Le logiciel a été conçu pour gérer toute erreur possible,
				tant que le PC est en cours d'exécution.`,

				`Construit à partir de zéro en C++ en modèle acteur, BKC est fortement optimisé pour fonctionner sur un processeur multicœur et
				peut gérer efficacement des charges élevées. Sachant que la chaîne serait gérée dans un environnement privé, nous avons utilisé
				une approche paresseuse des transactions, permettant à des milliers de demandes d'être traitées par la chaîne.
				En utilisant un modèle de concurrence strict tel que l'acteur et le calcul pi, le processus peut récupérer de n'importe quoi et,
				au pire, retardera le traitement`
			]
		},
		{name: 'Arya',		urlImg: './Assets/Images/Arya_logo.png',
			title: 'Application mobile Arya',
			normal: `<p>Notre premier client ! Application mobile en réaction native. Nous avons rencontré Etienne, le directeur de Nalyssa, une entreprise basée à Jakarta avec qui nous avons collaboré sur ce projet. Nous nous sommes mis d'accord sur un partenariat mutuellement bénéfique car nous aimions travailler ensemble.</p>`,
			more: [
				`Arya est une application sociale. Il permet aux amateurs de trading d'échanger autour de l'actualité et des bonnes pratiques,
				des bons choix à faire.`,

				`L'application a été construite en React Native avec un back-end Firebase.`
			]
		},
		{name: 'BLC-BFC',	urlImg: './Assets/Images/Library.png',
			title: 'BLC - BFC',
			normal: `<p>Une bibliothèque et un framework orientés acteurs C++</p>`,
			more: [
				`Optimisez et automatisez la distribution. Notre objectif est de normaliser l'utilisation de la distribution en la simplifiant.
				Nous ajouterons un gestionnaire de paquets à C++ comme npm.`,

				`blc propose différents outils nécessaires pour démarrer un projet en gardant à l'esprit la concurrence et le réseau.
				Certains objets étaient des implémentations précoces des spécifications C++20 et sont depuis devenus obsolètes.
				bfc est un framework conçu autour du modèle d'acteur.
				Il offre un moyen de développer facilement des logiciels avec concurrence et d'éviter les erreurs telles que les deadlocks.
				L'un des objectifs de bfc est de rationaliser la gestion des dépendances et docker dans le processus de construction et d'exécution,
				et propose différents algorithmes de distribution pré-implémentés sous forme de modules.`
			]
		},
		{name: 'Distribution',			urlImg: './Assets/Images/Cloud.png',
			title: 'Distribution automatique',
			normal: `<p>Notre objectif est de créer une collection d'outils qui permettraient la réplication et la distribution.</p>`,
			more: [
				`Notre objectif est de fournir un moyen plus simple de distribuer et de gérer une grande piscine avec des outils efficaces.
				Notre objectif est de faciliter le développement et la maintenance des serveurs de distribution et de grande capacité.`,

				`L'un des outils sera un grand livre distribué ,sans leader, capable de gérer les données de manière efficace et flexible.
				De nombreux sdk et modules seront construits pour prendre en charge n'importe quel interpreteur ou langage compilé.`
			]
		},
		{name: 'Irie',		urlImg: './Assets/Images/j4.png',
			title: 'En développement : Irie',
			normal: `<p>Nous créons un nouveau langage de programmation.</p>`,
			more: [
				`Irie est un langage orienté fonctionnel. Il est conçu au regard de la théorie actuelle du langage.`,

				`Irie implémente le sous-typage dépendant.
				 Vous pouvez définir des éléments de syntaxe arbitraires à l'aide d'expressions mixfix. `
			]
		},
		{name: 'Contact',	urlImg: './Assets/Images/contact.png',
			title: 'Contact',
			normal:
				`<p>Nous espérons avoir eveillé votre curiosité !</p>
				<h1>Vous avez une question, un projet ? Contactez-nous.</h1>
				<p>Par mail à <a href="mailto:contact@bhc-it.com" style="color:grey" >contact@bhc-it.com</a></p>
				<p>Sur notre <a href="https://www.linkedin.com/company/bhc-it" style="color:grey">LinkedIn</a></p>
				<p>Sur notre <a href="https://github.com/BHC-IT" style="color:grey">GitHub</a></p>`,
			more: null},
	],
	tuto: {
		welcomeText: 'Welcome',
		moveText: 'You can use up and down key or scroll (swipe on mobile) to go from one project to another',
		moreText: 'If a project interests you, use the right key to learn more',
		backText: 'Use the left key to go back',
	},
}

const txtsEN = {
	pages: [
		{name: 'Home',		urlImg: './Assets/Images/bhc_logo_1920.png',
			title: 'Home',
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
			normal: `<p >BKC is a high velocity blockchain software develope for Monkey Money.</p>`,
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
		{name: 'Irie',		urlImg: './Assets/Images/j4.png',
			title: 'En développement : Irie',
			normal: `<p>We are creating a new programing language.</p>`,
			more: [
				`Irie is a fonctionnal oriented language.
				It is designed with regard of current language theory.`,

				`Irie implements dependent sub typing.
				You can define arbitrary pieces of syntax with the use of mixfix expressions.`
			]
		},
		{name: 'Contact',	urlImg: './Assets/Images/contact.png',
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
