/**
@author Peter Guo, Han Zhang
Harry Potter Wand Game 1.0
*/

// create a variable to hold our world object
var world;
// create variables to hold our markers
var markerHiro;
// player x and y positions
var playerX, playerY;
// artwork for our player
var playerArtwork;
var pic_owl, pic_dobby, pic_hat, pic_broom, pic_snitch;
// videos
var video1;

// system variables
var mode = "development";
var state;
var level = 1;
var dots = [];
var dots_level1_owl = [];
var currentNumber = 1;

var playing = false;
// var numRects = 5;

function preload() {
  playerArtwork = loadImage("wand.png");
  pic_owl = loadImage("pic/owl.png");
  pic_dobby = loadImage("pic/dobby.png");
  pic_hat = loadImage("pic/hat.ico");
  pic_broom = loadImage('pic/broom.png');
  pic_snitch = loadImage('pic/snitch.png');
}

function setup() {
  // P5 setup
  noCursor();
  imageMode(CENTER);

  // A-frame setup
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');
  // grab a reference to our two markers that we set up on the HTML side (connect to it using its 'id')
  markerHiro = world.getMarker('hiro');
  // place the player in the middle of the screen
  playerX = width / 2;
  playerY = height / 2;

  // Game setup
  // Level 1 dots setup
  dots_level1_owl.push(new Dot(150, 150, pic_owl, 1, 8));
  dots_level1_owl.push(new Dot(300, 200, pic_owl, 2));
  dots_level1_owl.push(new Dot(400, 300, pic_owl, 3));
  dots_level1_owl.push(new Dot(500, 200, pic_owl, 4));
  dots_level1_owl.push(new Dot(650, 150, pic_owl, 5));
  dots_level1_owl.push(new Dot(250, 450, pic_owl, 6));
  dots_level1_owl.push(new Dot(550, 450, pic_owl, 7));

  switch (level) {
    case 1: dots = dots_level1_owl; break;
  }
  state = "play";
}

function draw() {
  // Game states
  if (state === "play"){
    // Development visual aids
    if (mode === "development") {
      stroke(20);
      noFill();
      for (var i = 0; i < width; i = i + 50){
        for (var j = 0; j < height; j = j + 50){
          rect(i,j,50,50);
        }
      }
      noStroke();
    }
    // Check marker
    if (markerHiro.isVisible() == true) {
      // get the position of this marker
      var hiroPosition = markerHiro.getScreenPosition();

      // update the player position
      playerX = hiroPosition.x;
      playerY = hiroPosition.y;
    }
    // draw the player
    // Fade style
    background(0, 0, 0, 50);
    fill(255);
    ellipse(width - playerX, playerY, 50, 50);
    // draw lines
    for (var i = 0; i < dots.length; i++) {
      if(i !== 0 && currentNumber - 1 > i) {
        stroke(100);
        fill('green');
        line(dots[i - 1].x, dots[i - 1].y, dots[i].x, dots[i].y);
        noStroke();
        noFill();
      }
    }
    // draw last line / puzzle complete
    if (dots[0].lastChecked) {
      var last = dots.length - 1;
      stroke(40);
      fill('green');
      line(dots[last].x, dots[last].y, dots[0].x, dots[0].y);
      noStroke();
      noFill();
      state = "video";
    }
    // draw dots
    for (var i = 0; i < dots.length; i++) {
      dots[i].checkHit();
      dots[i].show();
    }
  }
  else if (state === "video"){
    if (!playing) {
      video1 = createVideo("pic/video1.mp4");
      video1.autoplay();
      video1.onended( function () {
        video1.hide();
        state = 'play';
      });
      playing = true;
    }
  }
}

// Classes
// Class: Dot, for representing each dot on the screen
function Dot (xPos, yPos, artwork, number, altNumber) {
  // Initial properties
  this.x = xPos;
  this.y = yPos;
  this.artwork = artwork;
  this.number = number;
  if(altNumber) {
    this.altNumber = altNumber;
  } else {
    this.altNumber = 0;
  }
  // Conditional properties
  this.checked = false;
  this.lastChecked = false;

  // Check if the player is connecting the right dot at the right time
  this.checkHit = function () {
    if(!this.checked
      && dist(this.x, this.y, width - playerX, playerY) < 50) {
        if(this.number === currentNumber) {
          this.checked = true;
    			currentNumber++;
      }
    } else if (this.altNumber === currentNumber
              && dist(this.x, this.y, width - playerX, playerY) < 50) {
      this.lastChecked = true;
    }
  }
  // Display the dot
  this.show = function () {
    // Draw green circle if the dot has been checked
    if(this.checked) {
      fill('green');
      ellipse(this.x, this.y, 50, 50, 100, 100);
      noFill();
    }
    image(this.artwork, this.x, this.y, 50, 50);
    textSize(30);
    if(this.altNumber !== 0){
      text(this.number + " / " + this.altNumber,this.x + 25, this.y);
    } else {
      text(this.number,this.x + 25, this.y);
    }

  }
}
