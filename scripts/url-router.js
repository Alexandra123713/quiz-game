import { initCategoriesPage } from './categories.js';
import { initDifficultyPage } from './difficulty.js';
import { initTypePage } from './type.js';
import { initGamePage } from './script.js';

const urlPageTitle = 'Quiz Game';
const BASE_PATH = '/quiz-game';

document.addEventListener('click', (event) => {
	const anchor = event.target.closest('a');
	if (!anchor || !anchor.href.startsWith(window.location.origin)) return;
	event.preventDefault();
	urlRoute(anchor.getAttribute('href'));
});

const urlRoutes = {
	404: {
		template: './pages/404.html',
		title: '404 | ' + urlPageTitle,
		description: 'Page not found',
	},
	[`${BASE_PATH}/`]: {
		template: './pages/home.html',
		title: 'Home | ' + urlPageTitle,
		description: 'This is the homepage',
	},
	[`${BASE_PATH}/categories`]: {
		template: './pages/categories.html',
		title: 'Categories | ' + urlPageTitle,
		description: 'This is the categories page',
	},
	[`${BASE_PATH}/difficulty`]: {
		template: './pages/difficulty.html',
		title: 'Difficulty | ' + urlPageTitle,
		description: 'This is the difficulty page',
	},
	[`${BASE_PATH}/type`]: {
		template: './pages/type.html',
		title: 'Type | ' + urlPageTitle,
		description: 'This is the type page',
	},
	[`${BASE_PATH}/game`]: {
		template: './pages/game.html',
		title: 'Game | ' + urlPageTitle,
		description: 'This is the game page',
	},
};

const urlRoute = (url) => {
	window.history.pushState({}, '', `${BASE_PATH}${url}`);
	urlLocationHandler();
};

const urlLocationHandler = async () => {
	let location = window.location.pathname;

	if (location.startsWith(BASE_PATH)) {
		location = location.slice(BASE_PATH.length);
		if (location === '') location = '/';
	}

	const routeKey = `${BASE_PATH}${location}`;
	const route = urlRoutes[routeKey] || urlRoutes['404'];

	const html = await fetch(route.template).then((r) => r.text());
	document.querySelector('main').innerHTML = html;

	if (routeKey.includes('/categories')) initCategoriesPage();
	if (routeKey.includes('/difficulty')) initDifficultyPage();
	if (routeKey.includes('/type')) initTypePage();
	if (routeKey.includes('/game')) initGamePage();

	document.title = route.title;
	document
		.querySelector('meta[name="description"]')
		.setAttribute('content', route.description);
};

document.addEventListener('DOMContentLoaded', () => {
	urlLocationHandler();
});

window.addEventListener('popstate', urlLocationHandler);
