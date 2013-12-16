function init(){var e=45,t=width/height,n=.1,r=1e4,i=document.getElementById("three");renderer=new THREE.WebGLRenderer;renderer.setSize(width,height);renderer.setClearColorHex(263172,1);i.appendChild(renderer.domElement);scene=new THREE.Scene;camera=new THREE.PerspectiveCamera(e,t,n,r);scene.add(camera);camera.position.z=1e3;controls=new THREE.OrbitControls(camera,renderer.domElement);var s=new THREE.SphereGeometry(25,1,1),o=new THREE.MeshLambertMaterial({opacity:0,transparent:!0});mainCube=new THREE.Mesh(s,o);scene.add(mainCube);for(var u=0;u<11;u++){orbit=new THREE.Object3D;centerOrbit.push(orbit);mainCube.add(centerOrbit[u])}pointLight=new THREE.PointLight(16119021,1);pointLight.position.set(10,100,130);scene.add(pointLight);var a=new THREE.SpotLight(16447981,1,0,Math.PI/2,10);a.position.set(-1e3,30,700);scene.add(a);var f=new THREE.SpotLight(16447981,.7,0,Math.PI/2,10);f.position.set(1e3,30,700);scene.add(f);hemiLight=new THREE.HemisphereLight(16777215);var l=new THREE.JSONLoader;satelliteOrbit=new THREE.Object3D;mainCube.add(satelliteOrbit);var c=function(e,t,n,r,i,s,o){var u=t,a=new THREE.Mesh(e,u);a.position.set(n,r,i);a.scale.set(o,o,o);a.rotation.set(0,0,s);a.overdraw=!0;satelliteOrbit.add(a)},h=THREE.ImageUtils.loadTexture("img/textures/spacejam/satellite.jpg"),p=new THREE.MeshPhongMaterial({map:h});callbackKey=function(e){c(e,p,0,500,0,degToRad(50),60)};l.load("js/obj/satellite.js",callbackKey);var d=function(e,t,n,r,i,s,o,u){var a=n,f=new THREE.Mesh(e,a);f.position.set(r,i,s);f.scale.set(u,u,u);f.rotation.set(0,0,o);f.overdraw=!0;planetNames.push(f);planetPositions[t].add(f)},v=new THREE.MeshLambertMaterial({color:14273556});callbackKey=function(e){d(e,0,v,-40,10,120,degToRad(5),15)};l.load("js/obj/jamcentral.js",callbackKey);callbackKey=function(e){d(e,1,v,-40,40,50,degToRad(-20),15)};l.load("js/obj/planetbball.js",callbackKey);callbackKey=function(e){d(e,2,v,-60,40,150,degToRad(-50),15)};l.load("js/obj/lunartunes.js",callbackKey);callbackKey=function(e){d(e,3,v,-35,0,110,degToRad(-80),15)};l.load("js/obj/jumpstation.js",callbackKey);callbackKey=function(e){d(e,4,v,-22,-100,110,degToRad(-108),15)};l.load("js/obj/warnerstudiostore.js",callbackKey);callbackKey=function(e){d(e,5,v,42,-100,80,degToRad(-150),15)};l.load("js/obj/behindthejam.js",callbackKey);callbackKey=function(e){d(e,6,v,40,-80,10,degToRad(-190),15)};l.load("js/obj/sitemap.js",callbackKey);callbackKey=function(e){d(e,7,v,90,-5,60,degToRad(-230),15)};l.load("js/obj/stellarsouvenirs.js",callbackKey);callbackKey=function(e){d(e,8,v,40,50,0,degToRad(-265),15)};l.load("js/obj/juniorjam.js",callbackKey);callbackKey=function(e){d(e,9,v,20,50,10,degToRad(-295),15)};l.load("js/obj/thelineup.js",callbackKey);callbackKey=function(e){d(e,10,v,-40,75,10,degToRad(-322),15)};l.load("js/obj/pressboxshuttle.js",callbackKey);var m=function(e,t){var n=t,r=new THREE.Mesh(e,n);r.position.set(10,40,0);r.scale.set(4.2,4.2,4.2);r.rotation.set(0,0,degToRad(-5));r.overdraw=!0;mainCube.add(r)},g=THREE.ImageUtils.loadTexture("img/textures/spacejam/spacejam_disc.png"),y=new THREE.MeshPhongMaterial({map:g}),b=new THREE.ImageUtils.loadTexture("img/textures/spacejam/spacejam_front.png"),w=new THREE.MeshPhongMaterial({map:b,ambient:1201228,specular:3355443,shininess:100,reflectivity:100}),E=new THREE.MeshPhongMaterial({color:10066329,ambient:10066329,specular:5592405,shininess:100,reflectivity:100});callbackKey=function(e){m(e,w)};l.load("js/obj/spacejam_front.js",callbackKey);callbackKey=function(e){m(e,E)};l.load("js/obj/spacejam_outlines.js",callbackKey);callbackKey=function(e){m(e,y)};l.load("js/obj/spacejam_disc.js",callbackKey);starGeometry=new THREE.Geometry;sprite=THREE.ImageUtils.loadTexture("img/star1.png");starGeometryLarge=new THREE.Geometry;spriteLarge=THREE.ImageUtils.loadTexture("img/star.png");for(u=0;u<8e3;u++){var S=new THREE.Vector3;S.x=5e3*Math.random()-2500;S.y=5e3*Math.random()-2500;S.z=5e3*Math.random()-2500;starGeometry.vertices.push(S);color=new THREE.Color(16777215);color.setHSL(0,0,1);starColors.push(color);offset=Math.random()*Math.PI*2;starOffsets.push(offset)}for(u=0;u<2e3;u++){var S=new THREE.Vector3;S.x=5e3*Math.random()-2500;S.y=5e3*Math.random()-2500;S.z=5e3*Math.random()-2500;starGeometryLarge.vertices.push(S);color=new THREE.Color(16777215);color.setHSL(0,0,1);starColorsLarge.push(color);offset=Math.random()*Math.PI*2;starOffsetsLarge.push(offset)}starGeometry.colors=starColors;starGeometryLarge.colors=starColorsLarge;starMaterial=new THREE.ParticleSystemMaterial({size:8,sizeAttenuation:!1,map:sprite,vertexColors:!0,transparent:!0});starMaterial.color.setHSL(1,0,.9);starMaterialLarge=new THREE.ParticleSystemMaterial({size:11,sizeAttenuation:!1,map:spriteLarge,vertexColors:!0,transparent:!0});starMaterialLarge.color.setHSL(1,0,.9);particles=new THREE.ParticleSystem(starGeometry,starMaterial);particles.sortParticles=!0;scene.add(particles);particlesLarge=new THREE.ParticleSystem(starGeometryLarge,starMaterialLarge);particlesLarge.sortParticles=!0;scene.add(particlesLarge);for(var u=0;u<11;u++){var x=new THREE.SphereGeometry(40,32,32),T=new THREE.Color(16777215);T.setRGB(1,1,1);var N=THREE.ImageUtils.loadTexture("img/textures/moon/moon.jpg");N.repeat.set(4,2);N.wrapS=N.wrapT=THREE.RepeatWrapping;N.anisotropy=16;var C=THREE.ImageUtils.loadTexture("img/textures/moon/moon_bump.jpg");C.repeat.set(4,2);C.wrapS=C.wrapT=THREE.RepeatWrapping;C.anisotropy=16;var k=new THREE.MeshPhongMaterial({map:N,bump:C,bumpScale:.4,color:T}),L=new THREE.Mesh(x,k);L.position.set(0,300,0);planets.push(L);var A=new THREE.Object3D;A.position.x=L.position.x;A.position.y=L.position.y;A.position.z=L.position.z;planetPositions.push(A);centerOrbit[u].add(planets[u]);centerOrbit[u].add(planetPositions[u])}centerOrbit[0].rotation.set(0,0,degToRad(-5));planets[0].position.set(0,280,0);planets[0].material.map=new THREE.ImageUtils.loadTexture("img/textures/earth/earth_color.jpg");planets[0].material.bumpMap=new THREE.ImageUtils.loadTexture("img/textures/earth/earth_bump.jpg");planets[0].material.bumpScale=.05;planets[0].material.specularMap=new THREE.ImageUtils.loadTexture("img/textures/earth/earth_spec.jpg");planets[0].material.specular=new THREE.Color(3355443);moonOrbit=new THREE.Object3D;planets[0].add(moonOrbit);var O=new THREE.SphereGeometry(7,32,32),M=new THREE.ImageUtils.loadTexture("img/textures/earth/moon.jpg"),_=new THREE.ImageUtils.loadTexture("img/textures/earth/moon_bump.jpg"),D=new THREE.MeshPhongMaterial({map:M,bumpMap:_,bumpScale:.05}),P=new THREE.Mesh(O,D);P.position.set(40,40,0);moonOrbit.add(P);planets[1].scale.set(.9,.9,.9);planets[1].position.set(0,320,0);centerOrbit[1].rotation.set(0,0,degToRad(22));planets[1].material.map=new THREE.ImageUtils.loadTexture("img/textures/basketball/basketball.jpg");planets[1].material.bumpMap=new THREE.ImageUtils.loadTexture("img/textures/basketball/basketball_bump.jpg");planets[1].material.bumpScale=.05;planets[1].material.specularMap=new THREE.ImageUtils.loadTexture("img/textures/basketball/basketball_spec.jpg");planets[1].material.specular=new THREE.Color(1118481);centerOrbit[2].rotation.set(0,0,degToRad(52));planets[2].scale.set(1.2,1.2,1.2);planets[2].position.set(0,350,0);planets[2].material.map=new THREE.ImageUtils.loadTexture("img/textures/rock/rock.jpg");planets[2].material.bumpMap=new THREE.ImageUtils.loadTexture("img/textures/rock/rock_bump.jpg");planets[2].material.bumpScale=.1;planets[2].material.specular=new THREE.Color(4473924);var T=new THREE.Color(35307);planets[2].material.color=T;var H=function(e,t,n,r,i,s,o,u){var a=t,f=new THREE.Mesh(e,a);f.position.set(r,i,s);f.scale.set(u,u,u);f.rotation.set(90,0,o);f.overdraw=!0;planets[n].add(f)},B=new THREE.MeshPhongMaterial({color:15213367,transparent:!0,opacity:.6});callbackKey=function(e){H(e,B,2,0,0,0,degToRad(-40),15)};l.load("js/obj/disc.js",callbackKey);planets[3].position.set(0,350,0);planets[3].scale.set(.65,.65,.65);centerOrbit[3].rotation.set(0,0,degToRad(80));planets[3].material.map=new THREE.ImageUtils.loadTexture("img/textures/cloud/cloud.jpg");planets[3].material.specular=new THREE.Color(0);var T=new THREE.Color(8780325);planets[3].material.color=T;centerOrbit[4].rotation.set(0,0,degToRad(108));planets[4].position.set(0,320,0);planets[4].scale.set(1.05,1.05,1.05);planets[4].material.map=new THREE.ImageUtils.loadTexture("img/textures/tigerstripe/tigerstripe_orange.jpg");planets[4].material.bumpMap=new THREE.ImageUtils.loadTexture("img/textures/tigerstripe/tigerstripe_orange_bump.jpg");planets[4].material.bumpScale=.05;planets[4].material.specular=new THREE.Color(3355443);centerOrbit[5].rotation.set(0,0,degToRad(150));planets[5].position.set(0,290,0);planets[5].scale.set(.9,.9,.9);planets[5].material.map=new THREE.ImageUtils.loadTexture("img/textures/tigerstripe/tigerstripe_blue.jpg");planets[5].material.bumpMap=new THREE.ImageUtils.loadTexture("img/textures/tigerstripe/tigerstripe_blue_bump.jpg");planets[5].material.bumpScale=.2;planets[5].material.specular=new THREE.Color(1118481);var j=function(e,t,n,r){var i=n,s=new THREE.Mesh(e,i);s.position.set(0,r,0);s.scale.set(6.5,6.5,6.5);s.overdraw=!0;centerOrbit[t].add(s)},F=THREE.ImageUtils.loadTexture("img/textures/spacejam/sitemap.jpg"),I=new THREE.MeshPhongMaterial({map:F,ambient:10066329,specular:5592405,shininess:100,reflectivity:100});callbackKey=function(e){j(e,6,I,285)};l.load("js/obj/sitemap_mesh.js",callbackKey);centerOrbit[6].rotation.set(0,0,degToRad(190));planets[6].position.set(0,290,0);planets[6].scale.set(1,1,1);planets[6].material.opacity=0;planets[6].material.transparent=!0;centerOrbit[7].rotation.set(0,0,degToRad(230));planets[7].position.set(0,290,0);planets[7].scale.set(1.3,1.3,1.3);planets[7].material.map=new THREE.ImageUtils.loadTexture("img/textures/cloud/cloud.jpg");planets[7].material.specular=new THREE.Color(0);var T=new THREE.Color(2278898);planets[7].material.color=T;centerOrbit[8].rotation.set(0,0,degToRad(265));planets[8].position.set(0,320,0);planets[8].scale.set(.8,.8,.8);planets[8].material.map=new THREE.ImageUtils.loadTexture("img/textures/tigerstripe/tigerstripe_green.jpg");planets[8].material.bumpMap=new THREE.ImageUtils.loadTexture("img/textures/tigerstripe/tigerstripe_green_bump.jpg");planets[8].material.bumpScale=.03;planets[8].material.specular=new THREE.Color(2236962);centerOrbit[9].rotation.set(0,0,degToRad(295));planets[9].position.set(0,310,0);planets[9].scale.set(.75,.75,.75);planets[9].material.map=new THREE.ImageUtils.loadTexture("img/textures/moon/moon.jpg");planets[9].material.bumpMap=new THREE.ImageUtils.loadTexture("img/textures/moon/moon_bump.jpg");planets[9].material.bumpScale=.3;planets[9].material.specular=new THREE.Color(1118481);var T=new THREE.Color(15538760);planets[9].material.color=T;var q=new THREE.MeshPhongMaterial({color:1632242,transparent:!0,opacity:.6});callbackKey=function(e){H(e,q,9,0,0,0,degToRad(-40),15)};l.load("js/obj/disc.js",callbackKey);var R=THREE.ImageUtils.loadTexture("img/textures/spacejam/ship.jpg"),U=new THREE.MeshPhongMaterial({map:R,ambient:10066329,specular:5592405,shininess:100,reflectivity:100});callbackKey=function(e){j(e,10,U,310)};l.load("js/obj/ship.js",callbackKey);centerOrbit[10].rotation.set(0,0,degToRad(322));planets[10].position.set(0,310,0);planets[10].scale.set(1,1,1);planets[10].material.opacity=0;planets[10].material.transparent=!0;var z=function(e,t,n,r){var i=new THREE.Geometry,s;r?s=new THREE.LineDashedMaterial({linewidth:3,color:n,dashSize:3,gapSize:3}):s=new THREE.LineBasicMaterial({linewidth:3,color:n});i.vertices.push(e.clone());i.vertices.push(t.clone());i.computeLineDistances();var o=new THREE.Line(i,s,THREE.LinePieces);return o},W=function(e){var t=new THREE.Object3D;t.add(z(new THREE.Vector3(0,0,0),new THREE.Vector3(e,0,0),"red",!1));t.add(z(new THREE.Vector3(0,0,0),new THREE.Vector3(-e,0,0),"red",!0));t.add(z(new THREE.Vector3(0,0,0),new THREE.Vector3(0,e,0),"blue",!1));t.add(z(new THREE.Vector3(0,0,0),new THREE.Vector3(0,-e,0),"blue",!0));t.add(z(new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,e),"green",!1));t.add(z(new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,-e),"green",!0));return t}}function animate(){camera.position.x>1900&&(camera.position.x=1900);camera.position.x<-1900&&(camera.position.x=-1900);camera.position.y>1900&&(camera.position.y=1900);camera.position.y<-1900&&(camera.position.y=-1900);camera.position.z>1900&&(camera.position.z=1900);camera.position.z<-1900&&(camera.position.z=-1900);satelliteOrbit.rotation.set(theta*.2,0,theta*.3);satelliteOrbit.children[0]!=null&&satelliteOrbit.children[0].rotation.set(0,-theta*.6,theta);planets[0].rotation.set(degToRad(-35),theta,0);planets[1].rotation.set(0,0,-theta*2.5);planets[2].rotation.set(0,0,-theta*.2);planets[3].rotation.set(theta*.5,0,0);planets[4].rotation.set(-theta*.8,degToRad(-20),degToRad(-50));planets[5].rotation.set(0,theta*.4,0);centerOrbit[6].children[2].rotation.set(0,0,theta*.1);planets[7].rotation.set(0,0,theta);planets[8].rotation.set(theta*.5,0,degToRad(-70));planets[9].rotation.set(0,0,theta*.7);centerOrbit[10].children[2]!=null&&centerOrbit[10].children[2].rotation.set(theta*.2,theta*.3,0);for(var e=0;e<starGeometry.colors.length;e++){var t=Math.sin(theta*4+starOffsets[e]),n=map_range(t,-1,1,.3,1);starGeometry.colors[e].r=n;starGeometry.colors[e].g=n;starGeometry.colors[e].b=n}for(var e=0;e<starGeometryLarge.colors.length;e++){var t=Math.sin(theta*4+starOffsets[e]),n=map_range(t,-1,1,.3,1);starGeometryLarge.colors[e].r=n;starGeometryLarge.colors[e].g=n;starGeometryLarge.colors[e].b=n}moonOrbit.rotation.set(1,0,theta*3);theta+=.005;requestAnimationFrame(animate);renderer.render(scene,camera);controls.update()}function getRandomInt(e,t){return Math.floor(Math.random()*(t-e+1))+e}function map_range(e,t,n,r,i){return r+(i-r)*(e-t)/(n-t)}function degToRad(e){return-e*(Math.PI/180)}function onWindowResize(){camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight)}var loading=function(){var e=document.getElementById("loading");e.classList.remove("loader");e.classList.add("loader-hidden")},width=window.innerWidth,height=window.innerHeight,renderer,scene,camera,controls,pointLight,mainCube,starMaterial,starGeometry,starColors=new Array,starOffsets=new Array,starMaterialLarge,starGeometryLarge,starColorsLarge=new Array,starOffsetsLarge=new Array,planets=new Array,planetPositions=new Array,planetNames=new Array,logoTitle,logoDisc,satelliteOrbit,centerOrbit=new Array,moonOrbit,cloudMesh,planetTheta=.001,theta=0;init();window.onload=function(){loading();animate()};