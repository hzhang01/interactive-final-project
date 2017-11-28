/**
@author Han Zhang
@author Peter Guo
Dragon Ball Power Sensor 1.0
*/

// Global variables
var particles = [];

// Classes
/**
Class: Particle
Parameters: x, y, z, speed
Methods: move
*/
function Particle (x,z) {
  this.x = x;
  this.y = 1;
  this.z = z;
  this.speed = 0.5;
  // moves the particle up
  this.move = function () {
   // TODO: write the function
  }
}

function setup() {
  // TODO: Setup the particle array and populate
  // TODO: Create a container3D object to hold all the moving particles
}

function draw() {
  // TODO: Move the particles up
  // TODO: Increase the number of particles
}
