//Select type
export const initTypePage = () => {
	const typeContainer = document.querySelector('.type-container');
	const nextBtn = document.querySelector('.next-btn');

	nextBtn.classList.add('disabled');
	nextBtn.style.pointerEvents = 'none';
	nextBtn.style.opacity = '0.5';

	const setSelectedType = (event) => {
		if (event.target.classList.contains('type')) {
			const typeBtn = event.target;
			const type = event.target.dataset.type;
			localStorage.setItem('type', type);
			const allTypeBtns = document.querySelectorAll('.type');
			allTypeBtns.forEach((el) => el.classList.remove('selected'));
			typeBtn.classList.add('selected');

			nextBtn.classList.remove('disabled');
			nextBtn.style.pointerEvents = 'auto';
			nextBtn.style.opacity = '1';
		}
	};

	typeContainer.addEventListener('click', setSelectedType);
};
