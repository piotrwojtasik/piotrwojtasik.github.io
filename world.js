import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

//const canvas = document.querySelector('.webgl')
/* const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');


            const loader = new GLTFLoader();
            loader.load('world/scene.gltf', function(gltf){
                console.log(gltf )
                const root = gltf.scene;
                root.scale.set(2, 2, 2);
                scene.add(root)
            }, function(xhr){
                console.log((xhr.loaded/xhr.total * 100) + "% loaded")
            }, function(error){
                console.log('An error occured')
            })



            const light = new THREE.DirectionalLight(0xffffff);
            light.position.set(0,1,1).normalize()
            scene.add(light)

            const sizes = {
                width: window.innerWidth,
                height: window.innerHeight
            }

            const fov = 45;
            const aspect = 2;
            const near = 0.1;
            const far = 100;
			const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
            camera.position.set(0, 10, 20)

            const controls = new OrbitControls(camera, canvas);
            controls.target.set(0, 5, 0);
            controls.update();
            
            
			const renderer = new THREE.WebGLRenderer({canvas});
			renderer.setSize( sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            renderer.shadowMap.enabled = true;
            renderer.gammaOutput = true;
			document.body.appendChild( renderer.domElement );

         
			function animate() {
                render()
				requestAnimationFrame( animate );
				
			};

            function render() {
                renderer.render( scene, camera);
            }

			animate(); */

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();

  scene.background = new THREE.Color("#1d1d1d");

  {
    const planeSize = 10;

    const loader = new THREE.TextureLoader();
    const texture = loader.load("");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh);
  }

  {
    const skyColor = 0xb1e1ff; // light blue
    const groundColor = 0xb1e1ff; // brownish orange
    const intensity = 1.5;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xffffff;
    const intensity = 2;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 1, 20);
    scene.add(light);
    scene.add(light.target);
  }

  function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.Math.degToRad(camera.fov * 0.5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
    // compute a unit vector that points in the direction the camera is now
    // in the xz plane from the center of the box
    const direction = new THREE.Vector3()
      .subVectors(camera.position, boxCenter)
      .multiply(new THREE.Vector3(1, 0, 1))
      .normalize();

    // move the camera to a position distance units way from the center
    // in whatever direction the camera was from the center already
    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

    // pick some near and far values for the frustum that
    // will contain the box.
    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.updateProjectionMatrix();

    // point the camera to look at the center of the box
    camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  }

  {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("world/scene.gltf", (gltf) => {
      const root = gltf.scene;
      scene.add(root);
      function animate() {
        requestAnimationFrame(animate);
        root.rotation.z += 0.0002;
        root.rotation.y += 0.00001;
        root.rotation.x += 0.00001;

        renderer.render(scene, camera);
      }
      animate();

      // compute the box that contains all the stuff
      // from root and below
      const box = new THREE.Box3().setFromObject(root);

      const boxSize = box.getSize(new THREE.Vector3()).length();
      const boxCenter = box.getCenter(new THREE.Vector3());

      // set the camera to frame the box
      frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

      // update the Trackball controls to handle the new size
      controls.maxDistance = boxSize * 10;
      controls.target.copy(boxCenter);
      controls.update();
    });
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
