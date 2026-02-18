 Quiz Game

A modern, responsive Quiz Game built with Vanilla JavaScript, SCSS, and a custom URL router.
The application allows users to select a category, difficulty, and question type, then play a timed quiz with score tracking.

 Live Demo

View Live Project: https://quiz-game-pink-gamma.vercel.app/

 Features

- Category selection (fetched from Open Trivia API)

- Difficulty and question type selection

- 30-second timer per question

- Score tracking

- Fully responsive design

- Modern UI with gradients and animations

- Custom routing (SPA-like behavior)

- Session management using sessionStorage

- Category caching for improved performance

- Error handling for:

expired session

no available questions

 Tech Stack

HTML5

- SCSS (modular structure)

- JavaScript (ES6 modules)

- Open Trivia Database API

- Custom URL Router

- Vercel (deployment)

 How It Works

1. User selects:

- Category

- Difficulty

- Question Type

2. Selections are saved in sessionStorage

3. Questions are fetched from the Open Trivia API

4. A timer starts for each question

5. Answers are shuffled

6. Score is calculated dynamically

7. Game Over screen displays final score

 Performance Optimizations

- Categories cached in sessionStorage

- Reduced unnecessary API calls

- Controlled SPA navigation to prevent duplicate fetches

- Mobile animations disabled for better performance

 API Used

Open Trivia Database
https://opentdb.com/


