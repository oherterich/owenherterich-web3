var square = document.querySelectorAll(".square");

var cover = document.querySelectorAll(".cover");

for (var i = 0; i < square.length; i++) {
	var e = square.item(i);
	var thisCover = cover.item(i);
	e.addEventListener('click', function(evt) {
		evt.preventDefault();
		evt.stopPropagation();

		this.classList.toggle("is-large");
		this.classList.toggle("square");

		var c = this.querySelector(".coveranchor");
		console.log(c);
		c.classList.toggle("cover");
		c.classList.toggle("is-noCover");

		var q = document.querySelector("#quick");
		q.className = "is-hidden";


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