//Fetch questions

import { createTimerBar } from './timer.js';

export async function initGamePage() {
	const category = localStorage.getItem('selectedCategory');
	const parsedCategory = JSON.parse(category);
	const categoryId = parsedCategory.id;

	const difficulty = localStorage.getItem('difficulty');

	const type = localStorage.getItem('type');

	const getQuestions = async () => {
		const params = new URLSearchParams({
			amount: 10,
			category: categoryId,
		});

		if (difficulty !== 'any') params.append('difficulty', difficulty);
		if (type !== 'any') params.append('type', type);

		const res = await fetch(`https://opentdb.com/api.php?${params}`);

		const data = await res.json();

		if (!data.results || data.results.length === 0) {
			const gameContainer = document.querySelector('.game-container');
			gameContainer.innerHTML = `
					<div class="no-questions">
						<h2>Sorry, there are no questions for this category, difficulty or type.</h2>
						<p>Please select another one.</p>
						<a href="/" class="new-game-btn">Go Back</a>
					</div>
				`;
			throw new Error('No questions found for the selected options');
		}
		return data;
	};

	const decodeHTML = (html) => {
		const text = document.createElement('textarea');
		text.innerHTML = html;
		return text.value;
	};

	const shuffleArray = (array) => {
		return array.sort(() => Math.random() - 0.5);
	};

	const showQuestions = async () => {
		const gameContainer = document.querySelector('.game-container');
		const data = await getQuestions();
		let index = 0;
		let scoreCounter = 0;
		let stopTimer = null;

		const showNextQuestion = () => {
			if (index >= data.results.length) {
				const gameOverContainer = document.createElement('div');
				const gameOverText = document.createElement('h2');
				gameOverText.classList.add('game-over-text');
				gameOverText.textContent = 'Game Over';
				const newGameBtn = document.createElement('a');
				newGameBtn.textContent = 'New Game';
				newGameBtn.href = '/';
				newGameBtn.classList = 'new-game-btn';
				const score = document.createElement('div');
				score.classList.add('score');
				score.textContent = `Score: ${scoreCounter} from ${data.results.length}`;
				gameOverContainer.appendChild(gameOverText);
				gameOverContainer.appendChild(score);
				gameOverContainer.appendChild(newGameBtn);

				gameContainer.innerHTML = '';
				gameContainer.appendChild(gameOverContainer);
				return;
			}

			if (stopTimer) stopTimer();
			gameContainer.innerHTML = '';
			const current = data.results[index];

			const questionContainer = document.createElement('div');
			questionContainer.classList.add('question-container');

			const timerContainer = document.createElement('div');
			gameContainer.appendChild(timerContainer);

			stopTimer = createTimerBar(30000, timerContainer, () => {
				index++;
				showNextQuestion();
			});

			const question = decodeHTML(current.question);
			const questionContent = document.createElement('h4');
			questionContent.textContent = question;

			gameContainer.appendChild(questionContent);

			const answers = [current.correct_answer, ...current.incorrect_answers];
			const shuffledAnswers = shuffleArray(answers);

			const answersContainer = document.createElement('div');
			answersContainer.classList.add('answers-container');

			shuffledAnswers.forEach((ans) => {
				const btn = document.createElement('button');
				btn.textContent = decodeHTML(ans);
				btn.classList.add('answer-btn');

				btn.addEventListener('click', () => {
					if (stopTimer) stopTimer();
					const allBtns = answersContainer.querySelectorAll('button');
					allBtns.forEach((btn) => (btn.disabled = true));

					if (ans === current.correct_answer) {
						btn.classList.add('correct');
						index++;
						scoreCounter++;
						setTimeout(showNextQuestion, 800);
					} else {
						btn.classList.add('wrong');
						allBtns.forEach((btn) => {
							if (btn.textContent === decodeHTML(current.correct_answer)) {
								btn.classList.add('correct');
							}
						});
						index++;
						setTimeout(showNextQuestion, 2000);
					}
				});
				answersContainer.appendChild(btn);
			});
			questionContainer.appendChild(answersContainer);
			gameContainer.appendChild(questionContainer);
		};

		showNextQuestion();
	};

	showQuestions();
}
