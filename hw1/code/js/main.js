var adjectiveIndex = 0;
var nounIndex = 0;
var verbIndex = 0;

var adjective = [ "stubborn" , "innovative", "bacon-appreciating", "punctual", "happy", "nostalgic", "book-hoarding", "contemplative", "drama-loving" ];
var noun = [ "folk music connoiseur", "Mad Men fan", "information designer", "GIF-addict", "Texan", "dog-lover", "creative coder", "motion graphics guy" ];
var verb = [ "make things pretty." , "solve problems.", "drink craft beer." , "program every once in a while.", "buy nice shoes.", "visualize interesting data.", "explore the ironic.", "quote Bob Dylan." ];

function setRandom() {

	adjectiveIndex = Math.floor(Math.random() * (adjective.length));
	nounIndex = Math.floor(Math.random() * (noun.length));
	verbIndex = Math.floor(Math.random() * (verb.length));

	document.getElementById("adjectiveWord").innerHTML = adjective[adjectiveIndex];
	document.getElementById("nounWord").innerHTML = noun[nounIndex];
	document.getElementById("verbWord").innerHTML = verb[verbIndex];
}

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
		console.log(adjectiveIndex);
		if (adjectiveIndex == adjective.length-1) {
			adjectiveIndex = 0;
		}
		else {
			adjectiveIndex++;
		}
	}

	document.getElementById("adjectiveWord").innerHTML = adjective[adjectiveIndex];
}

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
