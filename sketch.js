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
var mode = "production";
var state;
var level = 1;
var dots = [];
var dots_level1_broom = [];
var dots_level2_owl = [];
var dots_level3_hat =[];
var dots_level4_dobby= [];
var dots_level5_snitch = [];
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
  // Level dots setup
  dots_level1_broom.push(new Dot(400, 150, pic_broom, 1));
  dots_level1_broom.push(new Dot(200, 300, pic_broom, 2));
  dots_level1_broom.push(new Dot(600, 300, pic_broom, 3));
  dots_level1_broom.push(new Dot(200, 450, pic_broom, 4, 5));

  dots_level2_owl.push(new Dot(150, 150, pic_owl, 1, 8));
  dots_level2_owl.push(new Dot(300, 200, pic_owl, 2));
  dots_level2_owl.push(new Dot(400, 300, pic_owl, 3));
  dots_level2_owl.push(new Dot(500, 200, pic_owl, 4));
  dots_level2_owl.push(new Dot(650, 150, pic_owl, 5));
  dots_level2_owl.push(new Dot(250, 450, pic_owl, 6));
  dots_level2_owl.push(new Dot(550, 450, pic_owl, 7));

  dots_level3_hat.push(new Dot(150, 150, pic_hat, 1, 8));
  dots_level3_hat.push(new Dot(300, 300, pic_hat, 2));
  dots_level3_hat.push(new Dot(250, 400, pic_hat, 3));
  dots_level3_hat.push(new Dot(400, 450, pic_hat, 4));
  dots_level3_hat.push(new Dot(550, 400, pic_hat, 5));
  dots_level3_hat.push(new Dot(450, 300, pic_hat, 6));
  dots_level3_hat.push(new Dot(650, 150, pic_hat, 7));

  dots_level4_dobby.push(new Dot(150, 150, pic_dobby, 1,11));
  dots_level4_dobby.push(new Dot(150, 650, pic_dobby, 2));
  dots_level4_dobby.push(new Dot(250, 500, pic_dobby, 3));
  dots_level4_dobby.push(new Dot(300, 550, pic_dobby, 4));
  dots_level4_dobby.push(new Dot(450, 500, pic_dobby, 5));
  dots_level4_dobby.push(new Dot(500, 650, pic_dobby, 6));
  dots_level4_dobby.push(new Dot(500, 150, pic_dobby, 7));
  dots_level4_dobby.push(new Dot(450, 300, pic_dobby, 8));
  dots_level4_dobby.push(new Dot(300, 250, pic_dobby, 9));
  dots_level4_dobby.push(new Dot(250, 300, pic_dobby, 10));

  dots_level5_snitch.push(new Dot(300, 150, pic_snitch, 1,4));
  dots_level5_snitch.push(new Dot(100, 450, pic_snitch, 2));
  dots_level5_snitch.push(new Dot(500, 450, pic_snitch, 3));
  dots_level5_snitch.push(new Dot(300, 450, pic_snitch, 5,8));
  dots_level5_snitch.push(new Dot(200, 300, pic_snitch, 6));
  dots_level5_snitch.push(new Dot(400, 300, pic_snitch, 7));

  state = "play";
}

function draw() {
  // level dots loading
  switch (level) {
    case 1: dots = dots_level1_broom; break;
    case 2: dots= dots_level2_owl;break;
    case 3: dots = dots_level3_hat; break;
    case 4: dots= dots_levle4_dobby; break;
    case 5: dots= dots_level5_snitch; break;
  }
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
    background(0, 0, 0, 50);
    // Check marker
    if (markerHiro.isVisible() == true) {
      // get the position of this marker
      var hiroPosition = markerHiro.getScreenPosition();

      // update the player position
      playerX = hiroPosition.x;
      playerY = hiroPosition.y;
      fill(255);
      ellipse(width - playerX, playerY, 50, 50);
    }
    // draw the player
    // Fade style


    // draw lines
    for (var i = 0; i < dots.length; i++) {
      if(i !== 0 && currentNumber - 1 > i) {
        stroke(100);
        fill('green');
        line(dots[i - 1].x, dots[i - 1].y, dots[i].x, dots[i].y);
        noStroke();
        noFill();

      }
      // draw last line / puzzle complete
      if (dots[i].lastChecked) {
        var last = dots.length - 1;
        stroke(40);
        fill('green');
        line(dots[last].x, dots[last].y, dots[0].x, dots[0].y);
        noStroke();
        noFill();
        state = "video";
      }
    }
    // draw dots
    for (var i = 0; i < dots.length; i++) {
      dots[i].checkHit();
      dots[i].show();
    }
  }
  else if (state === "video"){
    if (!playing) {
      video1 = createVideo("pic/video" + level + ".mp4");
      video1.autoplay();
      video1.onended( function () {
        video1.hide();
        state = 'play';
        level += 1;
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
    fill("white");
    image(this.artwork, this.x, this.y, 50, 50);
    textSize(30);
    if(this.altNumber !== 0){
      text(this.number + " / " + this.altNumber,this.x + 25, this.y);
    } else {
      text(this.number,this.x + 25, this.y);
    }
  }
}
