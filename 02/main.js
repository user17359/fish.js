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
    object.rotateY(Math.PI/2)
    object.translateX(10)
    object.scale.set(.015, .015, .015)
    object.name = "koi_fish"
	scene.add( object );
}, undefined, function ( error ) {
	console.error( error );
} );

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.7)
scene.add( ambientLight )

scene.background = new THREE.Color(0x7788ff)

camera.position.z = 5;

var mouse = new THREE.Vector3()

function OnMouseMove(e){
	mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    mouse.z = -1;
    mouse.unproject(camera);
}

var current_rotation = 0;

var fish_rot_speed = 0.03;
var fish_max_rot_acc = 0.05;
var fish_step_rot_acc = 0.0001;
var fish_current_rot_acc = 0.0;

var fish_move_speed = 0.15;
var fish_magnitude_speed_factor = 0.005;

var direction = true;
var flip = true;

var current_y_steps = 0;
var y_steps = 30;

function animate() {

    const koi_fish = scene.getObjectByName("koi_fish");

    if(koi_fish) {
        var target_angle = Math.atan2(mouse.y - koi_fish.position.y, mouse.x - koi_fish.position.x);
        var diff_rot = current_rotation - target_angle;
        
        console.log(current_rotation)

        while(diff_rot < -Math.PI){
            diff_rot += 2 * Math.PI;
        }
        while(diff_rot > Math.PI){
            diff_rot -= 2 * Math.PI;
        }

        if(current_y_steps == 0 && flip && (target_angle < -Math.PI / 2 || target_angle > Math.PI / 2)) {
            current_y_steps = y_steps;
            flip = false;
        }
        else if(current_y_steps == 0 && !flip && (target_angle >= -Math.PI / 2 && target_angle <= Math.PI / 2)) {
            current_y_steps = y_steps;
            flip = true;
        }

        if(current_y_steps != 0){
            current_y_steps -= 1;
            if(flip){
                koi_fish.rotateY(Math.PI / y_steps);
            }
            else{
                koi_fish.rotateY(-Math.PI / y_steps);
            }
        }
        else{
            if(diff_rot > 0){
                if(direction){
                    if(fish_current_rot_acc + fish_step_rot_acc < fish_max_rot_acc){
                        fish_current_rot_acc += fish_step_rot_acc;
                    }
                    else {
                        fish_current_rot_acc = fish_max_rot_acc;
                    }
                }
                else {
                    fish_current_rot_acc = 0.0;
                }
                koi_fish.rotateX(fish_rot_speed + fish_current_rot_acc);
                
                if(flip) current_rotation -= (fish_rot_speed + fish_current_rot_acc);
                else current_rotation += (fish_rot_speed + fish_current_rot_acc);
        
                direction = true;
            }
            else {
                if(!direction){
                    if(fish_current_rot_acc + fish_step_rot_acc < fish_max_rot_acc){
                        fish_current_rot_acc += fish_step_rot_acc;
                    }
                    else {
                        fish_current_rot_acc = fish_max_rot_acc;
                    }
                }
                else {
                    fish_current_rot_acc = 0.0;
                }
                koi_fish.rotateX(-(fish_rot_speed + fish_current_rot_acc));
                if(flip) current_rotation += (fish_rot_speed + fish_current_rot_acc);
                else current_rotation -= (fish_rot_speed + fish_current_rot_acc);
                direction = false;
            }

            koi_fish.translateZ(fish_move_speed + koi_fish.position.distanceTo(mouse) * fish_magnitude_speed_factor);
        }
    }

	renderer.render( scene, camera );
}

window.addEventListener( 'mousemove', OnMouseMove, false );
renderer.setAnimationLoop( animate );