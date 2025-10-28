import * as THREE from 'three';

// scene
let scene = new THREE.Scene();
// camera
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,1,2000);
camera.position.z = 5;

// lights
// const ambientLight = new THREE.AmbientLight( 0xcccccc, 1.5 );
//  				scene.add( ambientLight );

//  const pointLight = new THREE.PointLight( 0xffffff, 2.5, 0, 0 );
//  camera.add( pointLight );
// scene.add( camera );

        const map = new THREE.TextureLoader().load( 'textures/textures.jpg' );
				map.wrapS = map.wrapT = THREE.RepeatWrapping;
				map.anisotropy = 16;
				map.colorSpace = THREE.SRGBColorSpace;

				const material = new THREE.MeshBasicMaterial( { map: map, side: THREE.DoubleSide })

// object 

  let geometry = new THREE.SphereGeometry(75,20,10)
  let mesh = new THREE.Mesh(geometry,material)

 mesh.position.set(-300,0,300);
 scene.add(mesh)


 

//  renderer

 let renderer = new THREE.WebGLRenderer({antialias: true});
 renderer.setPixelRatio(Window.devicePixelRatio);
 renderer.setSize(window.innerWidth, window.innerHeight);
 renderer.setAnimationLoop(animate);
 document.body.appendChild(renderer.domElement);

 

 window.addEventListener('resize', onWindowResize)

 function animate () {
  render();
  
 }
 function render() {
  console.log("rendering",Date.now())
  const timer = Date.now() * 0.0001;
  camera.position.x = Math.cos(timer) * 800;
  camera.position.z = Math.sin(timer) * 800
  camera.lookAt(scene.position);
  scene.traverse(function (object) {
    // if (object.isMesh === true) 
      mesh.rotation.x = timer * 5;
      mesh.rotation.y = timer * 2.5;
      
    
  })
  renderer.render(scene,camera);
 }
