// create a variable to hold our world object
var world;

// create variables to hold our markers
var markerHiro;

// where our player is current hanging out at
var playerX, playerY;

// artwork for our player
var playerArtwork;


var rectList = [];

var currentNumber = 1;
var numRects = 5;

function preload() {
  playerArtwork = loadImage("wand.png");

}

function setup() {
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');

  // grab a reference to our two markers that we set up on the HTML side (connect to it using its 'id')
  markerHiro = world.getMarker('hiro');

  // place the player in the middle of the screen
  playerX = width/2;
  playerY = height/2;

  noCursor();

	for(var i=0; i<numRects;i++){
		rectList.push(new square(i+1));
	}

	console.log(rectList);
}


function draw() {
  // erase the background
  world.clearDrawingCanvas();

  // use the markers as positional controllers
  if (markerHiro.isVisible() == true) {
    // get the position of this marker
    var hiroPosition = markerHiro.getScreenPosition();

    // update the player position
    playerX = hiroPosition.x;
    playerY = hiroPosition.y;
  }

  // draw all coins

  // draw the player
  imageMode(CENTER);
	fill(0);
	rect(0, 0, width, height);
  image(playerArtwork, playerX, playerY, 150,120);

	for(var i=0; i<rectList.length; i++){
		rectList[i].display();
	}

	checkHit();
	connectSquares();


}

function connectSquares() {
	previousRect = rectList[0];
	for(var i=1; i<rectList.lengh;i++){
		if(rectList[i].marked==true){
			line(previousRect.x, previousRect.y, rectList[i].x, rectList[i].y);
			previousRect = rectList[i];
		} else {
			break;
		}
	}
}

function resetSquares() {
	rectList = [];
	numRects ++;
	// write for loop to generate squares and add to rectList
}

function square(number) {
	this.x= random(0,width);
	this.y=random(0,height);
	this.number= number;
	this.marked = false;

	this.display= function(){
		fill(255);
		rect(this.x, this.y, 20,20);
		text(this.number,this.x,this.y);
	}
}

function checkHit(){
	for(var i = 1; i < rectList.length; i++){
		if((rectList[i].number==currentNumber) && (dist(rectList[i].x, rectList[i].y, playerX, playerY)<50)){
			fill("green");
			currentNumber++;
		}
	}

}
