var width = window.innerWidth,
	height = window.innerHeight;

var renderer, scene, camera, controls;
var pointLight, mainCube;

var starMaterial, starGeometry;
var starColors = new Array();
var starOffsets = new Array();

var starMaterialLarge, starGeometryLarge;
var starColorsLarge = new Array();
var starOffsetsLarge = new Array();

var planets = new Array(); //Actual planet meshes
var planetPositions = new Array();
var planetNames = new Array(); //Array of titles for the different planets

var logoTitle, logoDisc; //Meshes for the logo

var centerOrbit = new Array(); //Main orbits for the planets
var moonOrbit;

var cloudMesh;

var planetTheta = 0.001;

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

	camera.position.z = 1000;

	// Add OrbitControls so that we can pan around with the mouse.
	controls = new THREE.OrbitControls(camera, renderer.domElement);

	//Create basic geometry and material for a cube. Position it and add to the scene.
	var mainCubeGeometry = new THREE.SphereGeometry(25, 1, 1);
	var mainCubeMaterial = new THREE.MeshLambertMaterial({ opacity: 0, transparent: true });
    mainCube = new THREE.Mesh( mainCubeGeometry, mainCubeMaterial );
	scene.add( mainCube );

	//Add a point in which to orbit around
	for (var i = 0; i < 11; i++) {
		orbit = new THREE.Object3D();
		//orbit.rotation.set(0, 0, Math.PI * 2 * Math.random());
		centerOrbit.push( orbit );
		mainCube.add( centerOrbit[i] );
	}

	pointLight = new THREE.PointLight(0xF5F4ED, 1.0);
	pointLight.position.set( 10, 100, 130 );
	scene.add( pointLight );

	var spotLightKey = new THREE.SpotLight(0xFAF9ED, 1.0, 0, Math.PI/2, 10.0);
	spotLightKey.position.set(-1000, 30, 700);
	scene.add( spotLightKey );

	var spotLightFill = new THREE.SpotLight(0xFAF9ED, 0.7, 0, Math.PI/2, 10.0);
	spotLightFill.position.set(1000, 30, 700);
	scene.add( spotLightFill );

	hemiLight = new THREE.HemisphereLight(0xFFFFFF);
	//scene.add(hemiLight);

	/*********LOAD OBJ*********************/
	var loader = new THREE.JSONLoader();
 
	var createTextMesh = function( geometry, i, material, pX, pY, pZ, rZ, s )
	{
		var zMat = material;
	    var zmesh = new THREE.Mesh( geometry, zMat );
	    zmesh.position.set( pX, pY, pZ );
	    zmesh.scale.set( s, s, s );
	    zmesh.rotation.set(0, 0, rZ);
	    zmesh.overdraw = true;
	    planetNames.push( zmesh );
	    planetPositions[i].add( zmesh );
	};

	var textMat = new THREE.MeshLambertMaterial({ color: 0xD9CC14 })
 
 	//Load all of the site names
	callbackKey = function(geometry) {createTextMesh(geometry, 0, textMat, 0, 15, 50, degToRad(5), 15)};
	loader.load( "js/obj/jamcentral.js", callbackKey );

	callbackKey = function(geometry) {createTextMesh(geometry, 1, textMat, 0, 50, 50, degToRad(-20), 15)};
	loader.load( "js/obj/planetbball.js", callbackKey );

	callbackKey = function(geometry) {createTextMesh(geometry, 2, textMat, -40, 70, 90, degToRad(-50), 15)};
	loader.load( "js/obj/lunartunes.js", callbackKey );

	callbackKey = function(geometry) {createTextMesh(geometry, 3, textMat, -45, -20, 20, degToRad(-80), 15)};
	loader.load( "js/obj/jumpstation.js", callbackKey );

	callbackKey = function(geometry) {createTextMesh(geometry, 4, textMat, -20, -100,  -10, degToRad(-108), 15)};
	loader.load( "js/obj/warnerstudiostore.js", callbackKey );

	callbackKey = function(geometry) {createTextMesh(geometry, 5, textMat, 40, -100, 20, degToRad(-150), 15)};
	loader.load( "js/obj/behindthejam.js", callbackKey );

	callbackKey = function(geometry) {createTextMesh(geometry, 6, textMat, 40, -80, -30, degToRad(-190), 15)};
	loader.load( "js/obj/sitemap.js", callbackKey );

	callbackKey = function(geometry) {createTextMesh(geometry, 7, textMat, 90, -15, 0, degToRad(-230), 15)};
	loader.load( "js/obj/stellarsouvenirs.js", callbackKey );

	callbackKey = function(geometry) {createTextMesh(geometry, 8, textMat, 40, 30, 0, degToRad(-265), 15)};
	loader.load( "js/obj/juniorjam.js", callbackKey );

	callbackKey = function(geometry) {createTextMesh(geometry, 9, textMat, 20, 50, -30, degToRad(-295), 15)};
	loader.load( "js/obj/thelineup.js", callbackKey );

	callbackKey = function(geometry) {createTextMesh(geometry, 10, textMat, -40, 75, 20, degToRad(-322), 15)};
	loader.load( "js/obj/pressboxshuttle.js", callbackKey );

	var createLogoMesh = function( geometry, material )
	{
		var zMat = material;
	    var zmesh = new THREE.Mesh( geometry, zMat );
	    zmesh.position.set( 10, 40, 0 );
	    zmesh.scale.set( 4.2, 4.2, 4.2 );
	    zmesh.rotation.set(0, 0, degToRad(-5));
	    zmesh.overdraw = true;
	    mainCube.add( zmesh );
	};

	var discText = THREE.ImageUtils.loadTexture("img/textures/spacejam/spacejam_disc.png");
	var discMat = new THREE.MeshPhongMaterial({ map: discText });

	var frontText = new THREE.ImageUtils.loadTexture("img/textures/spacejam/spacejam_front.png");

	var logoFrontMat = new THREE.MeshPhongMaterial({ map: frontText, ambient: 0x12544C, specular:0x333333, shininess: 100, reflectivity: 100 });
	var logoOutlineMat = new THREE.MeshPhongMaterial( { color: 0x999999, ambient: 0x999999, specular:0x555555, shininess: 100, reflectivity: 100 } )

	callbackKey = function(geometry) {createLogoMesh(geometry, logoFrontMat)};
	loader.load( "js/obj/spacejam_front.js", callbackKey );

	callbackKey = function(geometry) {createLogoMesh(geometry, logoOutlineMat)};
	loader.load( "js/obj/spacejam_outlines.js", callbackKey );

	callbackKey = function(geometry) {createLogoMesh(geometry, discMat)};
	loader.load( "js/obj/spacejam_disc.js", callbackKey );

	/*******ADD PARTICLES********/
	starGeometry = new THREE.Geometry();
	sprite = THREE.ImageUtils.loadTexture( "img/star1.png" );

	starGeometryLarge = new THREE.Geometry();
	spriteLarge = THREE.ImageUtils.loadTexture( "img/star.png" );

	for ( i = 0; i < 8000; i ++ ) {

		var vertex = new THREE.Vector3();
		vertex.x = 5000 * Math.random() - 2500;
		vertex.y = 5000 * Math.random() - 2500;
		vertex.z = 5000 * Math.random() - 2500;

		starGeometry.vertices.push( vertex );

		color = new THREE.Color(0xFFFFFF);
		color.setHSL(0, 0, 1.0);
		starColors.push( color );

		offset = Math.random() * Math.PI * 2;
		starOffsets.push( offset );

	}

	for ( i = 0; i < 2000; i ++ ) {

		var vertex = new THREE.Vector3();
		vertex.x = 5000 * Math.random() - 2500;
		vertex.y = 5000 * Math.random() - 2500;
		vertex.z = 5000 * Math.random() - 2500;

		starGeometryLarge.vertices.push( vertex );

		color = new THREE.Color(0xFFFFFF);
		color.setHSL(0, 0, 1.0);
		starColorsLarge.push( color );

		offset = Math.random() * Math.PI * 2;
		starOffsetsLarge.push( offset );
	}

	starGeometry.colors = starColors;
	starGeometryLarge.colors = starColorsLarge;

	starMaterial = new THREE.ParticleSystemMaterial( { size: 8, sizeAttenuation: false, map: sprite, vertexColors: true, transparent: true } );
	starMaterial.color.setHSL( 1.0, 0.0, 0.9 );
	starMaterialLarge = new THREE.ParticleSystemMaterial( { size: 11, sizeAttenuation: false, map: spriteLarge, vertexColors: true, transparent: true } );
	starMaterialLarge.color.setHSL( 1.0, 0.0, 0.9 );

	particles = new THREE.ParticleSystem( starGeometry, starMaterial );
	particles.sortParticles = true;
	scene.add( particles );
	particlesLarge = new THREE.ParticleSystem( starGeometryLarge, starMaterialLarge );
	particlesLarge.sortParticles = true;
	scene.add( particlesLarge );


	for (var i = 0; i < 11; i++) {
		var planetGeometry = new THREE.SphereGeometry(40, 32, 32);

		var c = new THREE.Color( 0xFFFFFF );
		//c.setRGB( Math.random(), Math.random(), Math.random() );
		c.setRGB(1.0,1.0,1.0);

		var planetTexture = THREE.ImageUtils.loadTexture("img/textures/moon.png");
		planetTexture.repeat.set( 4, 2 );
		planetTexture.wrapS = planetTexture.wrapT = THREE.RepeatWrapping;
		planetTexture.anisotropy = 16;

		var planetBump = THREE.ImageUtils.loadTexture("img/textures/moon_bump.png");
		planetBump.repeat.set( 4, 2 );
		planetBump.wrapS = planetBump.wrapT = THREE.RepeatWrapping;
		planetBump.anisotropy = 16;

		var planetMaterial = new THREE.MeshPhongMaterial( { map: planetTexture, bump: planetBump, bumpScale: 0.4, color: c });
		var planet = new THREE.Mesh( planetGeometry, planetMaterial );

		planet.position.set( 0, 300, 0);
		planets.push( planet );

		var planetPos = new THREE.Object3D();
		planetPos.position.x = planet.position.x;
		planetPos.position.y = planet.position.y;
		planetPos.position.z = planet.position.z;
		planetPositions.push( planetPos );

		centerOrbit[i].add( planets[i] );
		centerOrbit[i].add( planetPositions[i] );
	}
	/***************************************************************************/
	/*****************************Planet 0 - Jam Central******************************/
	/***************************************************************************/
	centerOrbit[0].rotation.set(0, 0, degToRad(-5));

	planets[0].position.set(0, 280, 0);

	planets[0].material.map = new THREE.ImageUtils.loadTexture("img/textures/earth/earth_color.png");
	planets[0].material.bumpMap = new THREE.ImageUtils.loadTexture("img/textures/earth/earth_bump.png");
	planets[0].material.bumpScale = 0.05;
	planets[0].material.specularMap = new THREE.ImageUtils.loadTexture("img/textures/earth/earth_spec.png");
	planets[0].material.specular = new THREE.Color( 0x333333 );

	//Add clouds to Earth;
	var cloudTexture = new THREE.ImageUtils.loadTexture("img/textures/earth/earth_cloud_trans.png");
	var cloudGeometry   = new THREE.SphereGeometry(40.1, 32, 32)
	var cloudMaterial  = new THREE.MeshPhongMaterial({
	  map     : cloudTexture,
	  side        : THREE.DoubleSide,
	  opacity     : 0.3,
	  transparent : true,
	  depthWrite  : false,
	})
	cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)
	planets[0].add(cloudMesh)

	moonOrbit = new THREE.Object3D();
	planets[0].add( moonOrbit );

	//Add moon to Earth
	var moonGeometry = new THREE.SphereGeometry( 7, 32, 32);
	var moonTexture = new THREE.ImageUtils.loadTexture("img/textures/earth/moon.png");
	var moonBump = new THREE.ImageUtils.loadTexture("img/textures/earth/moon_bump.png");
	var moonMaterial = new THREE.MeshPhongMaterial( { map: moonTexture, bumpMap: moonBump, bumpScale: 0.05 } );
	var moon = new THREE.Mesh( moonGeometry, moonMaterial );
	moon.position.set( 40, 40, 0);

	moonOrbit.add( moon );
	/***************************************************************************/
	/***************************************************************************/
	/***************************************************************************/



	/***************************************************************************/
	/*****************************Planet 1 - Planet B-Ball******************************/
	/***************************************************************************/
	planets[1].scale.set(0.9, 0.9, 0.9);
	planets[1].position.set(0,320,0);

	centerOrbit[1].rotation.set( 0, 0, degToRad(22) );

	planets[1].material.map = new THREE.ImageUtils.loadTexture("img/textures/basketball/basketball.png");
	planets[1].material.bumpMap = new THREE.ImageUtils.loadTexture("img/textures/basketball/basketball_bump.png");
	planets[1].material.bumpScale = 0.05;
	planets[1].material.specularMap = new THREE.ImageUtils.loadTexture("img/textures/basketball/basketball_spec.png");
	planets[1].material.specular = new THREE.Color( 0x111111 );
	/***************************************************************************/
	/***************************************************************************/
	/***************************************************************************/



	/***************************************************************************/
	/**************************Planet 2 - Lunar Tunes***************************/
	/***************************************************************************/
	centerOrbit[2].rotation.set( 0, 0, degToRad(52) );

	planets[2].scale.set(1.2, 1.2, 1.2);
	planets[2].position.set(0, 350, 0);

	planets[2].material.map = new THREE.ImageUtils.loadTexture("img/textures/rock/rock.png");
	planets[2].material.bumpMap = new THREE.ImageUtils.loadTexture("img/textures/rock/rock_bump.png");
	planets[2].material.bumpScale = 0.1;
	planets[2].material.specular = new THREE.Color( 0x444444 );
	var c = new THREE.Color( 0x0089EB ); //lightish blue
	planets[2].material.color = c;

	var saturnRing = new THREEx.Planets._RingGeometry(60, 80, 512);
	var ringMaterial = new THREE.MeshPhongMaterial( { 
		color: 0xE8235E,
		side : THREE.DoubleSide,
		transparent: true,
		opacity: 0.5 
	});
	var ringMesh = new THREE.Mesh( saturnRing, ringMaterial );
	ringMesh.rotation.set(Math.PI / 6, -Math.PI / 9, 0);
	planets[2].add( ringMesh );
	/***************************************************************************/
	/***************************************************************************/
	/***************************************************************************/



	/***************************************************************************/
	/**************************Planet 3 - Jump Station**************************/
	/***************************************************************************/
	planets[3].position.set(0, 350, 0);
	planets[3].scale.set(0.65, 0.65, 0.65);

	centerOrbit[3].rotation.set( 0, 0, degToRad(80) );

	planets[3].material.map = new THREE.ImageUtils.loadTexture("img/textures/cloud/cloud.png");
	planets[3].material.specular = new THREE.Color( 0x000000 );
	var c = new THREE.Color( 0x85FA25 ); //lightish blue
	planets[3].material.color = c;
	/***************************************************************************/
	/***************************************************************************/
	/***************************************************************************/



	/***************************************************************************/
	/**********************Planet 4 - Warner Studio Store************************/
	/***************************************************************************/
	centerOrbit[4].rotation.set( 0, 0, degToRad(108) );

	planets[4].position.set( 0, 320, 0 );
	planets[4].scale.set(1.05, 1.05, 1.05);

	planets[4].material.map = new THREE.ImageUtils.loadTexture("img/textures/tigerstripe/tigerstripe_orange.png");
	planets[4].material.bumpMap = new THREE.ImageUtils.loadTexture("img/textures/tigerstripe/tigerstripe_orange_bump.png");
	planets[4].material.bumpScale = 0.05;
	planets[4].material.specular = new THREE.Color( 0x333333 );
	/***************************************************************************/
	/***************************************************************************/
	/***************************************************************************/



	/***************************************************************************/
	/************************Planet 5 - Behind the Jam**************************/
	/***************************************************************************/
	centerOrbit[5].rotation.set( 0, 0, degToRad(150) );

	planets[5].position.set( 0, 290, 0 );
	planets[5].scale.set( 0.9, 0.9, 0.9 );

	planets[5].material.map = new THREE.ImageUtils.loadTexture("img/textures/tigerstripe/tigerstripe_blue.png");
	planets[5].material.bumpMap = new THREE.ImageUtils.loadTexture("img/textures/tigerstripe/tigerstripe_blue_bump.png");
	planets[5].material.bumpScale = 0.2;
	planets[5].material.specular = new THREE.Color( 0x111111 );
	/***************************************************************************/
	/***************************************************************************/
	/***************************************************************************/



	/***************************************************************************/
	/***************************Planet 6 - Site Map*****************************/
	/***************************************************************************/
	var createPlanetMesh = function( geometry, i, material, y )
	{
		var zMat = material;
	    var zmesh = new THREE.Mesh( geometry, zMat );
	    zmesh.position.set( 0, y, 0 );
	    zmesh.scale.set( 6.5, 6.5, 6.5 );
	    zmesh.overdraw = true;
	    centerOrbit[i].add( zmesh );
	};

	var siteMapText = THREE.ImageUtils.loadTexture("img/textures/spacejam/sitemap.png");
	var siteMapMat = new THREE.MeshPhongMaterial( { map: siteMapText, ambient: 0x999999, specular:0x555555, shininess: 100, reflectivity: 100 } )

	callbackKey = function(geometry) {createPlanetMesh(geometry, 6, siteMapMat, 285)};
	loader.load( "js/obj/sitemap_mesh.js", callbackKey );

	centerOrbit[6].rotation.set( 0, 0, degToRad(190) );

	planets[6].position.set( 0, 290, 0 );
	planets[6].scale.set( 1, 1, 1 );
	planets[6].material.opacity = 0.0;
	planets[6].material.transparent = true;
	/***************************************************************************/
	/***************************************************************************/
	/***************************************************************************/



	/***************************************************************************/
	/***********************Planet 7 - Stellar Souvenirs************************/
	/***************************************************************************/
	centerOrbit[7].rotation.set( 0, 0, degToRad(230) );

	planets[7].position.set( 0, 290, 0 );
	planets[7].scale.set( 1.3, 1.3, 1.3 );

	planets[7].material.map = new THREE.ImageUtils.loadTexture("img/textures/cloud/cloud.png");
	planets[7].material.specular = new THREE.Color( 0x000000 );

	var c = new THREE.Color( 0x22C5F2 ); //light cyan
	planets[7].material.color = c;
	/***************************************************************************/
	/***************************************************************************/
	/***************************************************************************/



	/***************************************************************************/
	/**************************Planet 8 - Junior Jam****************************/
	/***************************************************************************/
	centerOrbit[8].rotation.set( 0, 0, degToRad(265) );

	planets[8].position.set( 0, 320, 0 );
	planets[8].scale.set( 0.8, 0.8, 0.8 );

	planets[8].material.map = new THREE.ImageUtils.loadTexture("img/textures/tigerstripe/tigerstripe_green.png");
	planets[8].material.bumpMap = new THREE.ImageUtils.loadTexture("img/textures/tigerstripe/tigerstripe_green_bump.png");
	planets[8].material.bumpScale = 0.03;
	planets[8].material.specular = new THREE.Color( 0x222222 );
	/***************************************************************************/
	/***************************************************************************/
	/***************************************************************************/



	/***************************************************************************/
	/**************************Planet 9 - The Lineup****************************/
	/***************************************************************************/
	centerOrbit[9].rotation.set( 0, 0, degToRad(295) );

	planets[9].position.set(0, 310, 0);
	planets[9].scale.set(0.75, 0.75, 0.75);

	planets[9].material.map = new THREE.ImageUtils.loadTexture("img/textures/moon/moon.png");
	planets[9].material.bumpMap = new THREE.ImageUtils.loadTexture("img/textures/moon/moon_bump.png");
	planets[9].material.bumpScale = 0.3;
	planets[9].material.specular = new THREE.Color( 0x111111 );

	var c = new THREE.Color( 0xED1A48 );
	planets[9].material.color = c;

	var saturnRing = new THREEx.Planets._RingGeometry(60, 80, 256);
	var ringMaterial = new THREE.MeshPhongMaterial( { 
		color: 0x18E7F2,
		side : THREE.DoubleSide,
		transparent: true,
		opacity: 0.5 
	});
	var ringMesh = new THREE.Mesh( saturnRing, ringMaterial );
	ringMesh.rotation.set(Math.PI / 6, -Math.PI / 9, 0);
	planets[9].add( ringMesh );
	/***************************************************************************/
	/***************************************************************************/
	/***************************************************************************/



	/***************************************************************************/
	/**********************Planet 10 - Press Box Shuttle************************/
	/***************************************************************************/
	var shipText = THREE.ImageUtils.loadTexture("img/textures/spacejam/ship.png");
	var shipMat = new THREE.MeshPhongMaterial( { map: shipText, ambient: 0x999999, specular:0x555555, shininess: 100, reflectivity: 100 } )

	callbackKey = function(geometry) {createPlanetMesh(geometry, 10, shipMat, 310)};
	loader.load( "js/obj/ship.js", callbackKey );

	centerOrbit[10].rotation.set( 0, 0, degToRad(322) );

	planets[10].position.set(0, 310, 0);
	planets[10].scale.set(1, 1, 1);
	planets[10].material.opacity = 0.0;
	planets[10].material.transparent = true;

	/***************************************************************************/
	/***************************************************************************/
	/***************************************************************************/


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

	//scene.add(createAxes(500));
}

function animate() {

	//pointLight.position.x = Math.cos(theta) * 800;
	//pointLight.position.z = Math.sin(theta) * 800;

	for (var i = 0; i < planets.length; i++) {
		//centerOrbit[i].rotation.z += planetTheta;
	}

	planets[0].rotation.set(degToRad(-35), theta, 0);
	planets[1].rotation.set(0, 0, -theta * 2.5);
	planets[2].rotation.set(0, -theta * 0.2, 0);
	planets[3].rotation.set(theta * 0.5, 0, 0);
	planets[4].rotation.set(-theta * 0.8, degToRad(-20), degToRad(-50));
	planets[5].rotation.set( 0, theta * 0.4, 0 );
	centerOrbit[6].children[2].rotation.set(0,0,theta * 0.1);
	planets[7].rotation.set(0, 0, theta);
	planets[8].rotation.set(theta * 0.5, 0, degToRad(-70));
	planets[9].rotation.set(0, theta * 0.7, 0);
	if (centerOrbit[10].children[2] != null){
		centerOrbit[10].children[2].rotation.set(theta*0.2,theta*0.3,0);
	}

	for (var i = 0; i < starGeometry.colors.length; i++) {
		var brightness = Math.sin(theta * 4 + starOffsets[i]);
		var newBrightness = map_range(brightness, -1, 1, 0.3, 1.0);
		starGeometry.colors[i].r = newBrightness;
		starGeometry.colors[i].g = newBrightness;
		starGeometry.colors[i].b = newBrightness;
	}

	for (var i = 0; i < starGeometryLarge.colors.length; i++) {
		var brightness = Math.sin(theta * 4 + starOffsets[i]);
		var newBrightness = map_range(brightness, -1, 1, 0.3, 1.0);
		starGeometryLarge.colors[i].r = newBrightness;
		starGeometryLarge.colors[i].g = newBrightness;
		starGeometryLarge.colors[i].b = newBrightness;
	}

	moonOrbit.rotation.set(1, 0, theta*3.0);

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

//Simple function to map values (similar to Processing's map() function)
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

//Simple function that converts degrees to radians. Returns negative for aesthetic simplicities sake. 
function degToRad(deg) {
	return -deg * (Math.PI / 180);
}

init();
window.onload = function() {
	animate();
}