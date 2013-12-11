var numImg = 5;

var bg = new Array();
var character = new Array();
var text = new Array();

for (var i = 0; i < numImg; i++) {
	bg.push( "img/create-image/bg/bg" + i + ".png" );
	character.push( "img/create-image/character/character" + i + ".png" );
	text.push( "img/create-image/text/text" + i + ".png" );
}

var bgImg = document.getElementById("bgImg");
var characterImg = document.getElementById("characterImg");
var textImg = document.getElementById("textImg");

//Random images are generated when the page loads.
bgImg.src = bg[ Math.floor(Math.random() * numImg) ];
characterImg.src = character[ Math.floor(Math.random() * numImg) ];
textImg.src = text[ Math.floor(Math.random() * numImg) ];

//Listen for mouse hover on the buttons
var hoverListener = function() {
	//BACKGROUND HOVER
	var bgLabel = document.getElementById("bgLabel");

	var bgLeft = document.getElementById("bgLeft");
	bgLeft.addEventListener( "mouseover", function( evt ) {
		bgLabel.classList.remove("label-hidden");
		bgLabel.classList.add("label");
	});

	bgLeft.addEventListener( "mouseout", function( evt ) {
		bgLabel.classList.remove("label");
		bgLabel.classList.add("label-hidden");
	});

	var bgRight = document.getElementById("bgRight");
	bgRight.addEventListener( "mouseover", function( evt ) {
		bgLabel.classList.remove("label-hidden");
		bgLabel.classList.add("label");
	});

	bgRight.addEventListener( "mouseout", function( evt ) {
		bgLabel.classList.remove("label");
		bgLabel.classList.add("label-hidden");
	});

	//CHARACTER HOVER
	var characterLabel = document.getElementById("characterLabel");

	var characterLeft = document.getElementById("characterLeft");
	characterLeft.addEventListener( "mouseover", function( evt ) {
		characterLabel.classList.remove("label-hidden");
		characterLabel.classList.add("label");
	});

	characterLeft.addEventListener( "mouseout", function( evt ) {
		characterLabel.classList.remove("label");
		characterLabel.classList.add("label-hidden");
	});

	var characterRight = document.getElementById("characterRight");
	characterRight.addEventListener( "mouseover", function( evt ) {
		characterLabel.classList.remove("label-hidden");
		characterLabel.classList.add("label");
	});

	characterRight.addEventListener( "mouseout", function( evt ) {
		characterLabel.classList.remove("label");
		characterLabel.classList.add("label-hidden");
	});

	//TEXT HOVER
	var textLabel = document.getElementById("textLabel");

	var textLeft = document.getElementById("textLeft");
	textLeft.addEventListener( "mouseover", function( evt ) {
		textLabel.classList.remove("label-hidden");
		textLabel.classList.add("label");
	});

	textLeft.addEventListener( "mouseout", function( evt ) {
		textLabel.classList.remove("label");
		textLabel.classList.add("label-hidden");
	});

	var textRight = document.getElementById("textRight");
	textRight.addEventListener( "mouseover", function( evt ) {
		textLabel.classList.remove("label-hidden");
		textLabel.classList.add("label");
	});

	textRight.addEventListener( "mouseout", function( evt ) {
		textLabel.classList.remove("label");
		textLabel.classList.add("label-hidden");
	});
}

hoverListener();
