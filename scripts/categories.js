//Fetch categories
export const initCategoriesPage = () => {
	const categoriesContainer = document.querySelector('.categories-container');
	const nextBtn = document.querySelector('.next-btn');
	if (!categoriesContainer || !nextBtn) return;
	
	nextBtn.classList.add('disabled');
	nextBtn.style.pointerEvents = 'none';
	nextBtn.style.opacity = '0.5';

	const getCategories = async () => {
		const res = await fetch('https://opentdb.com/api_category.php');
		const data = await res.json();
		return data.trivia_categories;
	};

	const clearCategories = async () => {
		const categories = await getCategories();
		const cleanedCategories = categories.map((el) => ({
			...el,
			name: el.name.replace('Science: ', '').replace('Entertainment: ', ''),
		}));
		return cleanedCategories;
	};
	clearCategories();

	const createCategories = async () => {
		const categories = await clearCategories();
		categories.forEach((el) => {
			const category = document.createElement('div');
			category.textContent = el.name;
			category.className = 'category';
			category.dataset.id = el.id;
			categoriesContainer.insertAdjacentElement('beforeEnd', category);
		});
	};

	createCategories();

	//Select categories
	const setSelectedCategory = (event) => {
		if (event.target.classList.contains('category')) {
			const categoryBtn = event.target;
			const categoryId = event.target.dataset.id;
			const categoryName = event.target.textContent;
			const category = {
				id: categoryId,
				name: categoryName,
			};
			localStorage.setItem('selectedCategory', JSON.stringify(category));

			const allCtegoriesBtns = document.querySelectorAll('.category');
			allCtegoriesBtns.forEach((el) => {
				el.classList.remove('selected');
			});

			categoryBtn.classList.add('selected');
			nextBtn.classList.remove('disabled');
			nextBtn.style.pointerEvents = 'auto';
			nextBtn.style.opacity = '1';
		}
	};

	categoriesContainer.addEventListener('click', setSelectedCategory);
};
