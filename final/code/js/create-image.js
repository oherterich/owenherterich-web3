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
var current_bg = Math.floor(Math.random() * numImg);
bgImg.src = bg[ current_bg ];

var current_character = Math.floor(Math.random() * numImg);
characterImg.src = character[ current_character ];

var current_text = Math.floor(Math.random() * numImg);
textImg.src = text[ current_text ];

//Listen for mouse hover on the buttons
var hoverListener = function() {
	var arrowList = document.getElementsByClassName( "arrow" );
	
	for (var i = 0; i < arrowList.length; i++) {
		var arrow = arrowList.item(i);

		arrow.addEventListener( "mouseover", function( evt ) {
			var thisLabel = this.parentNode.children[2];
			thisLabel.classList.remove("label-hidden");
			thisLabel.classList.add("label");
		});

		arrow.addEventListener( "mouseout", function( evt ) {
			var thisLabel = this.parentNode.children[2];
			thisLabel.classList.remove("label");
			thisLabel.classList.add("label-hidden");
		});

		arrow.addEventListener( "click", function( evt ) {
			evt.preventDefault();
			evt.stopPropagation();

			if (this.classList[1] == "arrow-left") {
				var thisImage = this.parentNode.children[0];
				if (thisImage.id == "bgImg") {
					if (current_bg <= 0) {
						current_bg = numImg - 1;
					}
					else {
						current_bg -= 1;
					}
					thisImage.src = bg[ current_bg ];
				}
				else if (thisImage.id == "characterImg") {
					if (current_character <= 0) {
						current_character = numImg - 1;
					}
					else {
						current_character -= 1;
					}
					thisImage.src = character[ current_character ];
				}
				else if (thisImage.id == "textImg") {
					if (current_text <= 0) {
						current_text = numImg - 1;
					}
					else {
						current_text -= 1;
					}
					thisImage.src = text[ current_text ];
				}
			}

			if (this.classList[1] == "arrow-right") {
				var thisImage = this.parentNode.children[0];
				if (thisImage.id == "bgImg") {
					if (current_bg >= numImg - 1) {
						current_bg = 0;
					}
					else {
						current_bg += 1;
					}
					thisImage.src = bg[ current_bg ];
				}
				else if (thisImage.id == "characterImg") {
					if (current_character >= numImg - 1) {
						current_character = 0;
					}
					else {
						current_character += 1;
					}
					thisImage.src = character[ current_character ];
				}
				else if (thisImage.id == "textImg") {
					if (current_text >= numImg - 1) {
						current_text = 0;
					}
					else {
						current_text += 1;
					}
					thisImage.src = text[ current_text ];
				}
			}
		});
	}
}

hoverListener();
