///////////////////////////////////////////////////////////////////////////////
//                                  Myo.js setup
///////////////////////////////////////////////////////////////////////////////
Myo.connect('com.myojs.poseDetector');

Myo.on('status', function(data){
  console.log("Status: " + data['type']);
})

var accumulate;

//Whenever we get a pose event, we'll update the image sources with the active version of the image
Myo.on('pose', function(pose){
  if(pose === 'fist'){
    fist = true;
    // Increases the fistCounter by 1 every second
    accumulate = setInterval(function(){fistCounter += 1;}, 1000);
  } else if (pose === "double_tap"){
    fistCounter = 0;
  }
  console.log("Pose: " + pose + " on");
})

//Opposite of above. We also revert the main img to the unlocked state
Myo.on('pose_off', function(pose){
  if(pose === 'fist'){
    fist = false;
    clearInterval(accumulate);
  }
  console.log("Pose off: " + pose + " off");
});

//Whenever a myo locks we'll switch the main image to a lock image
Myo.on('locked', function(){
  console.log("Locked");
});

//Whenever a myo unlocks we'll switch the main image to a unlock image
Myo.on('unlocked', function(){
  console.log("Unlocked");
});

//Fist handler
Myo.on('fist', function(){

});

/** Possibility to use myo data stream */
// //Check if the myo is connected
// Myo.on('connected', function(){
//   console.log('connected');
//   this.streamEMG(true);
// });
//
// Myo.on('emg', function(data){
//   // console.log(data);
// });

///////////////////////////////////////////////////////////////////////////////
//                                  P5 setup
///////////////////////////////////////////////////////////////////////////////

// Shared variables between two frameworks
var fist = false;
var fistCounter = 0;
var firstLoad = true;


// variable to hold a reference to our A-Frame world
var world, goku1, goku2, goku3;
var walkerArray = [];
var goku_list = [];

function setup() {
  // no canvas needed
  // environment setup
  createCanvas(500,500);
  noiseDetail(24);

  // Aframe setup
  world = new World('VRScene');
  // Create and load Goku forms objects
  goku1 = new OBJ({
    asset: 'goku1_obj',
    mtl: 'goku1_mtl',
    x: 0,
    y: 0,
    z: 3,
    rotationX:0,
    rotationY:0,
    scaleX:0.1,
    scaleY:0.1,
    scaleZ:0.1,
    visible:true,
  });
  goku2 = new OBJ({
    asset: 'goku2_obj',
    mtl: 'goku2_mtl',
    x: 0,
    y: 0,
    z: 3,
    rotationX:0,
    rotationY:0,
    scaleX:0.1,
    scaleY:0.1,
    scaleZ:0.1,
    visible:true,
  });
  goku3 = new OBJ({
    asset: 'goku3_obj',
    mtl: 'goku3_mtl',
    x: 0,
    y: 0,
    z: 3,
    rotationX:0,
    rotationY:0,
    scaleX:0.1,
    scaleY:0.1,
    scaleZ:0.1,
    visible:true,
  });
  world.add(goku1);
  world.add(goku2);
  world.add(goku3);
  // goku_list.push(goku1, goku2, goku3);

  // fill the walker array with 10 walkers!
  for (var i = 0; i < 100; i++) {
    var kiBall = new Sphere({
      x: random(-1,1),
      y: random(-1,2),
      z: random(1,2.5),
      red: 255,
      green: 255,
      blue: 0,
      radius: 0.05
    });
    walkerArray.push(kiBall);
    world.add(kiBall);
  }
}

function draw() {
  // Showing 3 different Goku forms based on fist gesture counter
  // Base state
  if (fistCounter < 5) {
    goku1.show();
    goku2.hide();
    goku3.hide();
  }
  // Super Sayan 1
  else if (fistCounter < 10) {
    goku1.hide();
    goku2.show();
    goku3.hide();
  }
  // Super Sayan 2
  else {
    goku1.hide();
    goku2.hide();
    goku3.show();
  }

  // State changed based on myo gesture (fist) input
  if(fist) {
      // Moving all the ki balls using Perlin Noise
      for (var index = 0; index < walkerArray.length; index ++){
        var walker = walkerArray[index];
        walker.show();
        var xNoiseOffset = random(1000);
        var yNoiseOffset = random(2000,3000);
        var zNoiseOffset = random(4000,5000);
        var moveX = map(noise(xNoiseOffset), 0, 1, -0.1, 0.1);
        var moveY = map(noise(yNoiseOffset), 0, 1, 0, 0.1);
        var moveZ = map(noise(zNoiseOffset), 0, 1, -0.1, 0.1);
        if (walker.getY() > 2) {
          walker.setY(-1);
        }
        walker.nudge(moveX, moveY, moveZ);
      };
  } else {
    // Reset walkers
    for (var index = 0; index < walkerArray.length; index ++){
      var walker = walkerArray[index];
      walker.hide();
    }
  }
}
