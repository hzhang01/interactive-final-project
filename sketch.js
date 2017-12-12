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
var sound1, sound2, sound3;
var background1;
// videos
var video1;

// system variables
var mode = "production";
var state;
var level = 5;
var score = 5000;
var finalScore = 0;
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
  sound1 = loadSound("pic/button.mp3");
  sound2 = loadSound("pic/theme.mp3");
  sound3 = loadSound("pic/Help.mp3");
  background1 = loadImage("pic/background3.jpg");
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
  // // place the player in the middle of the screen
  // playerX = width / 2;
  // playerY = height / 2;

  // Game setup
  // Level dots setup
  dots_level1_broom.push(new Dot(400, 150, pic_broom, 1));
  dots_level1_broom.push(new Dot(200, 300, pic_broom, 2));
  dots_level1_broom.push(new Dot(600, 300, pic_broom, 3));
  dots_level1_broom.push(new Dot(400, 450, pic_broom, 4, 5));

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
  dots_level4_dobby.push(new Dot(150, 450, pic_dobby, 2));
  dots_level4_dobby.push(new Dot(250, 350, pic_dobby, 3));
  dots_level4_dobby.push(new Dot(350, 400, pic_dobby, 4));
  dots_level4_dobby.push(new Dot(450, 350, pic_dobby, 5));
  dots_level4_dobby.push(new Dot(550, 450, pic_dobby, 6));
  dots_level4_dobby.push(new Dot(550, 150, pic_dobby, 7));
  dots_level4_dobby.push(new Dot(450, 250, pic_dobby, 8));
  dots_level4_dobby.push(new Dot(350, 200, pic_dobby, 9));
  dots_level4_dobby.push(new Dot(250, 250, pic_dobby, 10));

  dots_level5_snitch.push(new Dot(400, 150, pic_snitch, 1));
  dots_level5_snitch.push(new Dot(200, 450, pic_snitch, 2));
  dots_level5_snitch.push(new Dot(600, 450, pic_snitch, 3));
  dots_level5_snitch.push(new Dot(500, 300, pic_snitch, 4, 7));
  dots_level5_snitch.push(new Dot(300, 300, pic_snitch, 5));
  dots_level5_snitch.push(new Dot(400, 450, pic_snitch, 6));



  state = "start";

  sound2.play();
}

function draw() {
  // level dots loading
  switch (level) {
    case 1: dots = dots_level1_broom; break;
    case 2: dots = dots_level2_owl;break;
    case 3: dots = dots_level3_hat; break;
    case 4: dots = dots_level4_dobby; break;
    case 5: dots = dots_level5_snitch; break;
  }
  // Game states
  if (state === "start") {
    background(0, 0, 0, 50);
    image(background1, width/2, height/2, 800, 600);
    // Check marker
    if (markerHiro.isVisible() == true) {
      // get the position of this marker
      var hiroPosition = markerHiro.getScreenPosition();

      // update the player position
      playerX = hiroPosition.x;
      playerY = hiroPosition.y;
      fill(240,128,128);
      ellipse(width - playerX, playerY, 20, 20);
    }
    if (dist(playerX, playerY, width/2, height/2) < 50){
      fill('green');
      ellipse(width/2, height/2, 50, 50);
      state = 'play';
    }
    // Buttons
    fill(240,128,128);
    textSize(50);
    text("Play", width/2 - 40, height/2);
  }
  else if (state === "end") {
    background(0, 0, 0, 50);
    if (markerHiro.isVisible() == true) {
      // get the position of this marker
      var hiroPosition = markerHiro.getScreenPosition();

      // update the player position
      playerX = hiroPosition.x;
      playerY = hiroPosition.y;
      fill(240,128,128);
      ellipse(width - playerX, playerY, 20, 20);
    }
    fill('white');
    text("Congratulation!", width/2 - 100, height/2 - 100);
    text("You are now officially part of Hogwarts!", width/2 - 250, height/2 - 50);
    text("Final Score: " + finalScore + "/25000", width/2 - 150, height/2);
    if (dist(playerX, playerY, width/2, height/2 + 150) < 30){
      fill('green');
      ellipse(width/2, height/2, 50, 50);
      // Reset the game
      state = 'start';
      currentNumber = 0;
      level = 1;
      playing = false;
      score = 5000;
      finalScore = 0;
    }
    // Buttons
    fill(240,128,128);
    text("Replay", width/2 - 40, height/2 + 150);
  }
  else if (state === "play"){
    sound2.stop();
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
      fill(240,128,128);
      ellipse(width - playerX, playerY, 20, 20);
    }
    // draw the player
    // Fade style
    fill(255);
    text("Round: " + level, 20, 450);
    text("Score: " + score, 20, 500);
    score -= 1;
    if(score < 5000 && score % 400 === 0){
      sound3.play();
    }

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
        playing = false;
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
      background(0);
      finalScore += score;
      var video1 = createVideo("pic/video" + level + ".mp4");
      var video1DOM = document.querySelector("video[crossorigin='anonymous']");
      console.log(video1DOM);
      video1DOM.height = 858;
      video1DOM.width = 1520;
      video1.autoplay();
      scrollTo(0,1000);
      video1.onended(function () {
        document.body.removeChild(video1DOM);
        // video1.hide();
        scrollTo(0, 0);
        level += 1;
        score = 5000;
        currentNumber = 1;
        if(level < 6) {
          state = "play";
        } else {
          state = "end";
        }
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
          sound1.play();
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
