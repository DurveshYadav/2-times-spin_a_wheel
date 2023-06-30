alert('You can only spin the wheel onces')

// Code for spin

const wheel = document.querySelector('.wheel');
const startButton = document.querySelector('.button');
const arrow = document.querySelector('.pin');

let deg = 0;
let spinCount = 0;


// startButton.addEventListener('click', () => {
// 	startButton.style.pointerEvents = 'none';
// 	deg = Math.floor(5000 + Math.random() * 5000);
// 	wheel.style.transition = 'all 10s ease-out';
// 	wheel.style.transform = `rotate(${deg}deg)`;
// 	wheel.classList.add('blur');
// 	playSound()
// });
startButton.addEventListener('click', () => {
	if (spinCount === 0) {
	  // First spin
	  startButton.style.pointerEvents = 'none';
	  deg = Math.floor(5000 + Math.random() * 5000);
	  wheel.style.transition = 'all 10s ease-out';
	  wheel.style.transform = `rotate(${deg}deg)`;
	  wheel.classList.add('blur');
	  playSound();
	  startButton.textContent = 'Try Again';
	} else if (spinCount === 1) {
	  // Second spin
	  startButton.style.pointerEvents = 'none';
	  // Calculate the prize position (e.g., 0 degrees for gift card)
	  deg = 0; // Modify this value with the desired position for the gift card
	  wheel.style.transition = 'all 10s ease-out';
	  wheel.style.transform = `rotate(${deg}deg)`;
	  wheel.classList.add('blur');
	  playSound();
	  startButton.textContent = 'Spinning...';
	} else {
	  // Additional spins
	  startButton.style.pointerEvents = 'none';
	  startButton.textContent = 'Spinning...';
	  // Adjust the code for subsequent spins as needed
	}
  
	spinCount++;
  });
// ......Piece...Piece..  


// wheel.addEventListener('transitionend', () => {
// 	wheel.classList.remove('blur')
// 	startButton.style.pointerEvents = 'none';
// 	wheel.style.transition = 'none';
// 	const actualDeg = deg % 360;
// 	wheel.style.transform = `rotate(${actualDeg}deg)`;
// 	stopSound();
// 	arrow.classList.add('bounce')
// 	update();
// 	draw();
// });
wheel.addEventListener('transitionend', () => {
	wheel.classList.remove('blur');
	startButton.style.pointerEvents = 'auto';
	wheel.style.transition = 'none';
	const actualDeg = deg % 360;
	wheel.style.transform = `rotate(${actualDeg}deg)`;
	stopSound();
	arrow.classList.add('bounce');
	update();
	draw();
  
	if (spinCount === 1) {
	  // First spin completed
	  startButton.style.pointerEvents = 'auto';
	  startButton.textContent = 'Try Again';
	} else if (spinCount === 2) {
	  // Second spin completed
	  startButton.style.pointerEvents = 'auto';
	  startButton.textContent = 'Claim Gift Card';
	  // Display gift card or perform other actions
	} else {
	  // Additional spins completed
	  startButton.style.pointerEvents = 'auto';
	  startButton.textContent = 'Try Again';
	  // Perform actions for subsequent spins as needed
	}
  });

//   ...Piece.apply.call.bind.call.bind.

let audio = new Audio('tick.mp3')

function playSound()
{
        audio.currentTime = 0;
        audio.play();
        audio.loop = true;
}

function stopSound()
{
	audio.pause();
}

// Code for Confetti

let canvas = document.getElementById('confetti');
canvas.width = 1320;


let ctx = canvas.getContext('2d');
let pieces = [];
let numberOfPieces = 100;
let lastUpdateTime = Date.now();

function randomColor() {
	let colors = ['#f00', '#0f0', '#00f', '#0ff', '#f0f', '#ff0'];
	return colors[Math.floor(Math.random() * colors.length)];
}

function update() {

	let now = Date.now(),
		dt = now - lastUpdateTime;


	for (let i = pieces.length - 1; i >= 0; i--) {
		let p = pieces[i];

		if(p.y > canvas.height) {
			pieces.splice(i, 1);
			continue;
		}

		p.y += p.gravity * dt;
		p.rotation += p.rotationSpeed * dt;
	}

	while (pieces.length < numberOfPieces) {
		pieces.push(new Piece(Math.random() * canvas.width, -20));
	}

	lastUpdateTime = now;

	setTimeout(update, 1);

}

function draw() {

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	pieces.forEach(function (p) {
		ctx.save();

		ctx.fillStyle = p.color;

		ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
		ctx.rotate(p.rotation);

		ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
		ctx.restore();
	});

	requestAnimationFrame(draw);
}

function Piece(x, y) {
	this.x = x;
	this.y = y;
	this.size = (Math.random() * 0.5 + 0.75) * 15;
	this.gravity = (Math.random() * 0.5 + 0.75) * 0.03;
	this.rotation = (Math.PI * 2) * Math.random();
	this.rotationSpeed = (Math.PT * 2) * Math.random() * 0.0001;
	this.color = randomColor();
}

while(pieces.length < numberOfPieces) {
	pieces.push(new Piece(Math.random() * canvas.width, Math.random() * canvas.height));
}