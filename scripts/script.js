const categoriesContainer = document.querySelector('.categories-container');

const getCategories = async () => {
	const res = await fetch('https://opentdb.com/api_category.php');
	const data = await res.json();
	return data.trivia_categories;
};

const createCategories = () => {
	getCategories().then((categories) => {
		categories.forEach((el) => {
			const category = document.createElement('div');
			category.textContent = el.name;
			categoriesContainer.insertAdjacentElement('beforeEnd', category);
		});
	});
};

createCategories();
