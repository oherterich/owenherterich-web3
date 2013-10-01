var square = document.querySelectorAll(".square");

var cover = document.querySelectorAll(".cover");

for (var i = 0; i < square.length; i++) {
	var e = square.item(i);
	var thisCover = cover.item(i);
	e.addEventListener('click', function(evt) {
		evt.preventDefault();
			console.log(e);

		evt.stopPropagation();
		this.classList.toggle("is-large");
		this.classList.toggle("square");
		console.log(i);
		thisCover.classList.toggle("is-noCover");
	});
}

// for (var i = 0; i < cover.length; i++) {
// 	var c = cover.item(i);
// 	c.addEventListener('click', function(evt) {
// 		evt.preventDefault();
// 		evt.stopPropagation();
// 		this.classList.toggle("is-noCover");
// 	});
// }