//Variables to keep track of the active words on the page, acccording to the index of the array.
var adjectiveIndex = 0;
var nounIndex = 0;
var verbIndex = 0;

//Array of words that will be displayed on the page.
var adjective = [ "stubborn" , "innovative", "bacon-appreciating", "punctual", "happy", "nostalgic", "book-hoarding", "contemplative", "drama-loving" ];
var noun = [ "folk music connoiseur", "Mad Men fan", "information designer", "GIF-addict", "Texan", "dog-lover", "creative coder", "motion graphics guy" ];
var verb = [ "make things pretty." , "solve problems.", "drink craft beer." , "program every once in a while.", "buy nice shoes.", "visualize interesting data.", "explore the ironic.", "quote Bob Dylan." ];


//Functionality for generating random words. Works with spacebar, left arrow, and right arrow.
document.onkeydown=function(e) {
	if (e.which == 32 || e.which == 37 || e.which == 39) {
		setRandom();
	}
}


//This function generates a random number for use in the index of each word array and changes the HTML accordingly.
function setRandom() {

	adjectiveIndex = Math.floor(Math.random() * (adjective.length));
	nounIndex = Math.floor(Math.random() * (noun.length));
	verbIndex = Math.floor(Math.random() * (verb.length));

	document.getElementById("adjectiveWord").innerHTML = adjective[adjectiveIndex];
	document.getElementById("nounWord").innerHTML = noun[nounIndex];
	document.getElementById("verbWord").innerHTML = verb[verbIndex];
}

//This function changes the adjective on the page if the user clicked the arrow buttons or the word itself.
function changeAdjective(div) {
	var id = div.id;

	if (id == "adLeft") {
		if (adjectiveIndex == 0) {
			adjectiveIndex = adjective.length-1;
		}
		else {
			adjectiveIndex--;
		}
	}

	if (id == "adRight") {
		if (adjectiveIndex == adjective.length-1) {
			adjectiveIndex = 0;
		}
		else {
			adjectiveIndex++;
		}
	}

	if (id == "adjectiveWord") {
		if (adjectiveIndex == adjective.length-1) {
			adjectiveIndex = 0;
		}
		else {
			adjectiveIndex++;
		}
	}

	document.getElementById("adjectiveWord").innerHTML = adjective[adjectiveIndex];
}

//This function changes the noun on the page if the user clicked the arrow buttons or the word itself.
function changeNoun(div) {
	var id = div.id;

	if (id == "nounLeft") {
		if (nounIndex == 0) {
			nounIndex = noun.length-1;
		}
		else {
			nounIndex--;
		}
	}

	if (id == "nounRight") {
		if (nounIndex == noun.length-1) {
			nounIndex = 0;
		}
		else {
			nounIndex++;
		}
	}

	if (id == "nounWord") {
		if (nounIndex == noun.length-1) {
			nounIndex = 0;
		}
		else {
			nounIndex++;
		}
	}

	document.getElementById("nounWord").innerHTML = noun[nounIndex];
}

//This function changes the verb on the page if the user clicked the arrow buttons or the word itself.
function changeVerb(div) {
	var id = div.id;

	if (id == "verbLeft") {
		if (verbIndex == 0) {
			verbIndex = verb.length-1;
		}
		else {
			verbIndex--;
		}
	}

	if (id == "verbRight") {
		if (verbIndex == verb.length-1) {
			verbIndex = 0;
		}
		else {
			verbIndex++;
		}
	}

	if (id == "verbWord") {
		if (verbIndex == verb.length-1) {
			verbIndex = 0;
		}
		else {
			verbIndex++;
		}
	}

	document.getElementById("verbWord").innerHTML = verb[verbIndex];
}
