// timer.js
export function createTimerBar(duration, container, onTimeUp) {
const bar = document.createElement('div')
bar.classList.add('timer-bar')
container.innerHTML = '';
container.appendChild(bar);

let width = 100;
const step = 100/ (duration/100)

const intervalId = setInterval(()=>{
	width -= step;
	if(width < 0) width = 0;

	bar.style.width = width + '%';

	if(width <= 0){
		clearInterval(intervalId);
		onTimeUp?.();
	}
}, 100)
return () => clearInterval(intervalId);
}
