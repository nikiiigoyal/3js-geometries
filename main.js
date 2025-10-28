	import * as THREE from 'three';

			import Stats from 'three/addons/libs/stats.module.js';
	import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
			import { plane, klein, mobius } from 'three/addons/geometries/ParametricFunctions.js';
// scene
let scene = new THREE.Scene();
// camera
let camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,1,2000);
camera.position.y = 500;

// lights
const ambientLight = new THREE.AmbientLight( 0xcccccc, 1.5 );
				scene.add( ambientLight );

const pointLight = new THREE.PointLight( 0xffffff, 2.5, 0, 0 );
				camera.add( pointLight );
				scene.add( camera );

        const map = new THREE.TextureLoader().load( 'textures/textures.jpg' );
				map.wrapS = map.wrapT = THREE.RepeatWrapping;
				map.anisotropy = 16;
				map.colorSpace = THREE.SRGBColorSpace;

				const material = new THREE.MeshPhongMaterial( { map: map, side: THREE.DoubleSide })

// object 

  let object = new THREE.Mesh(new THREE.SphereGeometry(75,20,10), material)
 object.position.set(-300,0,300);
 scene.add(object)


 let geometry = new ParametricGeometry( plane, 10, 10 );
				geometry.scale( 100, 100, 100 );
				geometry.center();
				object = new THREE.Mesh( geometry, material );
				object.position.set( - 100, 0, - 300 );
				scene.add( object );

//  renderer

 let renderer = new THREE.WebGLRenderer({antialias: true});
 renderer.setPixelRatio(Window.devicePixelRatio);
 renderer.setSize(window.innerWidth, window.innerHeight);
 renderer.setAnimationLoop(animate);
 document.body.appendChild(renderer.domElement);

 let stats = new Stats();
 document.body.appendChild(stats.dom )

 window.addEventListener('resize', onWindowResize)

 function animate () {
  render();
  stats.update();
 }
 function render() {
  console.log("rendering",Date.now())
  const timer = Date.now() * 0.0001;
  camera.position.x = Math.cos(timer) * 800;
  camera.position.z = Math.sin(timer) * 800
  camera.lookAt(scene.position);
  scene.traverse(function (object) {
    if (object.isMesh === true) {
      object.rotation.x = timer * 5;
      object.rotation.y = timer * 2.5;
    }
  })
  renderer.render(scene,camera);
 }
