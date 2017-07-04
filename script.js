var car = document.querySelector("#car");
var finishLine = document.querySelector("#finish-line");
var grass = document.querySelector("#grass");
var shortcutMessage = document.querySelector("#short-cut-message");
var grass2 = document.querySelector("#grass-2");
var shortcutMessage2 = document.querySelector("#short-cut-message-2");
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
	left: finishLine.getBoundingClientRect().left + 30,
	bottom: finishLine.getBoundingClientRect().bottom - 30,
	top: finishLine.getBoundingClientRect().top + 20
}
var grassPosition = {
	X: grass.getBoundingClientRect().left + 30,
	Y: grass.getBoundingClientRect().bottom - 20
}
var grassPosition2 = {
	Y: grass2.getBoundingClientRect().top + 20
}
var orientationDegree = {
	'right': 0,
	'down': 90,
	'left': 180,
	'up': 270
};
var currentOrientation = 'right';
var showedHiddenMessage = false;

function checkIfStepOnGrass() {
	if (car.getBoundingClientRect().top < grassPosition.Y && car.getBoundingClientRect().right > grassPosition.X) {
		shortcutMessage.style.display = 'block';
	} else {
		shortcutMessage.style.display = 'none';
	}
}

function checkIfStepOnGrass2() {
	if (car.getBoundingClientRect().bottom > grassPosition2.Y) {
		shortcutMessage2.style.display = 'block';
	} else {
		shortcutMessage2.style.display = 'none';
	}
}

function checkIfWonRace() {
	var carPosition = car.getBoundingClientRect();
	if (carPosition.bottom > finishPosition.top && carPosition.top < finishPosition.bottom && carPosition.right > finishPosition.left) {
		if (!showedHiddenMessage) {
			hiddenMessage.style.display = 'block';
			showedHiddenMessage = true;
		}
	} else {
		showedHiddenMessage = false;
	}
}

function move(orientation, direction, initialPosition, finalPosition) {
	var previousOrientation = currentOrientation;
	currentOrientation = orientation;
	var animation = car.animate([
		{ transform: 'translate' + direction + '(' + initialPosition  + 'px) translate'+ opositeDirection[direction] +'(' + position[opositeDirection[direction]]+'px) rotate(' + orientationDegree[previousOrientation] + 'deg)' },
		{ transform: 'translate' + direction + '(' + finalPosition + 'px) translate'+ opositeDirection[direction] +'('+position[opositeDirection[direction]]+'px) rotate(' + orientationDegree[orientation] + 'deg)' }
	], { duration: 100, fill: 'forwards' });
	animation.onfinish = function() {
		checkIfStepOnGrass();
		checkIfStepOnGrass2();
		checkIfWonRace();
	};
}

function moveRight() {
	var initialPosition = position.X;
	position.X += movementLength;
	move('right', 'X', initialPosition, position.X);
}

function moveLeft() {
	var initialPosition = position.X;
	position.X -= movementLength;
	move('left' ,'X', initialPosition, position.X);	
}

function moveUp() {
	var initialPosition = position.Y;
	position.Y -= movementLength;
	move('up' ,'Y', initialPosition, position.Y);
}

function moveDown() {
	var initialPosition = position.Y;
	position.Y += movementLength;
	move('down' ,'Y', initialPosition, position.Y);
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