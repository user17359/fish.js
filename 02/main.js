import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

var width = 100;
var height = 56;

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const loader = new FBXLoader();

loader.load( '/models/Koi_Tri.fbx', function ( object ) {
    object.rotateY(3.14/2)
    object.scale.set(.015, .015, .015)
	scene.add( object );
}, undefined, function ( error ) {
	console.error( error );
} );

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.7)
scene.add( ambientLight )

scene.background = new THREE.Color(0x7788ff)

camera.position.z = 5;

function animate() {
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );