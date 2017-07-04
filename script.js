var car = document.querySelector("#car");
var finishLine = document.querySelector("#finish-line");
var hiddenMessage = document.querySelector("#hidden-message");
var closeHiddenMessageButton = document.querySelector("#close-hidden-message");
var movementLength= 10;
var position = {
	X: 0,
	Y: 0
};
var opositeDirection = {
	X: 'Y',
	Y: 'X'
};
var finishPosition = {
	X: finishLine.getBoundingClientRect().left + 30,
	Y: finishLine.getBoundingClientRect().top + 20
}
function checkIfWonRace() {
	if (car.getBoundingClientRect().bottom > finishPosition.Y && car.getBoundingClientRect().right > finishPosition.X) {
		hiddenMessage.style.display = 'block';
	}
}

function move(direction, initialPosition, finalPosition) {
	var animation = car.animate([
		{ transform: 'translate' + direction + '(' + initialPosition  + 'px) translate'+ opositeDirection[direction] +'(' + position[opositeDirection[direction]]+'px)' },
		{ transform: 'translate' + direction + '(' + finalPosition + 'px) translate'+ opositeDirection[direction] +'('+position[opositeDirection[direction]]+'px)' }
	], { duration: 100, fill: 'forwards' });
	animation.onfinish = checkIfWonRace;
}

function moveRight() {
	var initialPosition = position.X;
	position.X += movementLength;
	move('X', initialPosition, position.X);
}

function moveLeft() {
	var initialPosition = position.X;
	position.X -= movementLength;
	move('X', initialPosition, position.X);	
}

function moveUp() {
	var initialPosition = position.Y;
	position.Y -= movementLength;
	move('Y', initialPosition, position.Y);
}

function moveDown() {
	var initialPosition = position.Y;
	position.Y += movementLength;
	move('Y', initialPosition, position.Y);
}

function closeHiddenMessage() {
	hiddenMessage.style.display = 'none';
}

function onKeydown(e) {
	switch(e.key){
		case 'ArrowRight': { 
			moveRight();
			break;
		}
		case 'ArrowLeft': { 
			moveLeft();
			break;
		}
		case 'ArrowUp': { 
			moveUp();
			break;
		}
		case 'ArrowDown': { 
			moveDown();
			break;
		}
		case 'Escape': {
			closeHiddenMessage();
			break;
		}
	}
}

(function attachEvents() {
	document.addEventListener('keydown', onKeydown);
	closeHiddenMessageButton.addEventListener('click', closeHiddenMessage);
})()