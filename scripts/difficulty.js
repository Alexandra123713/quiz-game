//Select dificulty

export const initDifficultyPage = () => {
	const difficultyContainer = document.querySelector('.difficulty-container');
	const nextBtn = document.querySelector('.next-btn');

	nextBtn.classList.add('disabled');
	nextBtn.style.pointerEvents = 'none';
	nextBtn.style.opacity = '0.5';

	const setSelectedDifficulty = (event) => {
		if (event.target.classList.contains('difficulty')) {
			const selectedBtn = event.target;
			const difficulty = event.target.dataset.difficulty;
			localStorage.setItem('difficulty', difficulty);
			const allDifficultyBtns = document.querySelectorAll('.difficulty');
			allDifficultyBtns.forEach((el) => {
				el.classList.remove('selected');
			});

			selectedBtn.classList.add('selected');
			nextBtn.classList.remove('disabled');
			nextBtn.style.pointerEvents = 'auto';
			nextBtn.style.opacity = '1';
		}
	};

	difficultyContainer.addEventListener('click', setSelectedDifficulty);
};
