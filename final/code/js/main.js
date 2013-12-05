var width = window.innerWidth,
	height = window.innerHeight;

var renderer, scene, camera, controls;
var pointLight, mainCube;

var smallCubes = new Array();

var centerOrbit = new Array(); //Main orbits for the planets
var moonOrbit;

//To move light
var theta = 0;

function init() {

	//Camera attributes.
	var viewAngle = 45,
		aspect = width / height,
		near = 0.1,
		far = 10000;

	//Container variable - where we are drawing the THREE.js scene
	var container = document.getElementById("three");

	//Create a renderer and set its size, and add it to our page
	renderer = new THREE.WebGLRenderer();

	renderer.setSize(width, height);
	renderer.setClearColorHex(0x040404, 1.0);

	container.appendChild(renderer.domElement);

	//Create the main scene
	scene = new THREE.Scene();

	//Create a camera with previously defined attributes. Add the camera to the scene and position it
	camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);

	scene.add( camera );

	camera.position.z = 300;

	// Add OrbitControls so that we can pan around with the mouse.
	controls = new THREE.OrbitControls(camera, renderer.domElement);

	//Create basic geometry and material for a cube. Position it and add to the scene.
	var mainCubeGeometry = new THREE.CubeGeometry(100, 100, 100, 10, 10, 10);
	var mainCubeMaterial = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
    mainCube = new THREE.Mesh( mainCubeGeometry, mainCubeMaterial );
	scene.add( mainCube );

	//Add a point in which to orbit around
	for (var i = 0; i < 11; i++) {
		orbit = new THREE.Object3D();
		orbit.rotation.set(Math.PI * Math.random(), Math.PI * Math.random(), 0);
		centerOrbit.push( orbit );
		mainCube.add( centerOrbit[i] );
	}

	pointLight = new THREE.PointLight(0xFFFFFF, 2.0);

	pointLight.position.x = 10;
	pointLight.position.y = 100;
	pointLight.position.z = 130;

	scene.add( pointLight );

	hemiLight = new THREE.HemisphereLight(0xFFFFFF);
	//scene.add(hemiLight);

	for (var i = 0; i < 11; i++) {
		var smallCubeGeometry = new THREE.SphereGeometry(Math.random() * 25 + 25, 64, 64);

		var c = new THREE.Color( 0xFFFFFF );
		c.setRGB( Math.random(), Math.random(), Math.random() );

		var smallCubeTexture = THREE.ImageUtils.loadTexture("img/textures/moon.png");
		smallCubeTexture.repeat.set( 4, 2 );
		smallCubeTexture.wrapS = smallCubeTexture.wrapT = THREE.RepeatWrapping;
		smallCubeTexture.anisotropy = 16;

		var smallCubeBump = THREE.ImageUtils.loadTexture("img/textures/moon_bump.png");
		smallCubeBump.repeat.set( 4, 2 );
		smallCubeBump.wrapS = smallCubeBump.wrapT = THREE.RepeatWrapping;
		smallCubeBump.anisotropy = 16;

		var smallCubeMaterial = new THREE.MeshPhongMaterial( { map: smallCubeTexture, bump: smallCubeBump, bumpScale: 1000, color: c });
		var smallCube = new THREE.Mesh( smallCubeGeometry, smallCubeMaterial );

		smallCube.position.set( getRandomInt(250, 500), getRandomInt(250, 500), 0);
		smallCubes.push( smallCube );

		centerOrbit[i].add( smallCubes[i] );
	}

	moonOrbit = new THREE.Object3D();
	smallCubes[0].add( moonOrbit );

	var moonGeometry = new THREE.SphereGeometry( 10, 32, 32);
	var moonMaterial = new THREE.MeshPhongMaterial( { color: 0xFF0000 } );
	var moon = new THREE.Mesh( moonGeometry, moonMaterial );
	moon.position.set( 50, 50, 0);

	moonOrbit.add( moon );


	//The following code lets us draw axes in the scene
	//Code from http://rohitghatol.com/?p=388
	var createAxis=function(src,dst,colorHex,dashed){
	    var geom = new THREE.Geometry(),
	        mat; 

	    if(dashed) {
	        mat = new THREE.LineDashedMaterial(
	            { 
	                linewidth: 3, 
	                color: colorHex, 
	                dashSize: 3, 
	                gapSize: 3 
	             });
	    } 
	    else {
	        mat = new THREE.LineBasicMaterial(
	            { 
	                linewidth: 3, 
	                color: colorHex 
	            });
	    }

	    geom.vertices.push( src.clone() );
	    geom.vertices.push( dst.clone() );
	    // This one is SUPER important, otherwise 
	    // dashed lines will appear as simple plain 
	    // lines
	    geom.computeLineDistances(); 

	    var axis = new THREE.Line( 
	        geom, mat, THREE.LinePieces );

	    return axis;
	}
	var createAxes = function(length) {
	    var axes = new THREE.Object3D();

	    axes.add( createAxis( 
	        new THREE.Vector3( 0, 0, 0 ), 
	        new THREE.Vector3( length, 0, 0 ), 
	        'red', false ) ); // +X

	    axes.add( createAxis( 
	        new THREE.Vector3( 0, 0, 0 ), 
	        new THREE.Vector3( -length, 0, 0 ), 
	        'red', true) ); // -X

	    axes.add( createAxis( 
	        new THREE.Vector3( 0, 0, 0 ), 
	        new THREE.Vector3( 0, length, 0 ), 
	        'blue', false ) ); // +Y

	    axes.add( createAxis( 
	        new THREE.Vector3( 0, 0, 0 ), 
	        new THREE.Vector3( 0, -length, 0 ),
	        'blue', true ) ); // -Y

	    axes.add( createAxis( 
	        new THREE.Vector3( 0, 0, 0 ), 
	        new THREE.Vector3( 0, 0, length ), 
	        'green', false ) ); // +Z

	    axes.add( createAxis( 
	        new THREE.Vector3( 0, 0, 0 ), 
	        new THREE.Vector3( 0, 0, -length ), 
	        'green', true ) ); // -Z

	     return axes;
	}

	scene.add(createAxes(500));


}

function animate() {

	//pointLight.position.x = Math.cos(theta) * 800;
	//pointLight.position.z = Math.sin(theta) * 800;

	for (var i = 0; i < smallCubes.length; i++) {
		centerOrbit[i].rotation.z = theta;
	}

	moonOrbit.rotation.z = theta*6.0;

	theta += 0.005;

    requestAnimationFrame(animate);
 
    // Render the scene.
    renderer.render(scene, camera);
    controls.update();
}

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 * From Mozilla Developer Center
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

init();
animate();