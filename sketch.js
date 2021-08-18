var END =0;
var PLAY =1;
var gameState = PLAY;

var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var warship, warshipImg;
var coin1,coin2,coin3;
var coin1Img,coin2Img,coin3Img;
var invisibleBlockGroup, invisibleBlock;
var oops, oopsImg;

var coin1G,coin2G,coin3G,oopsG;



var score=0;
var Coins=0;
var gameOver, restart;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  
  warshipImg = loadImage("warship.gif");
  coin1Img = loadImage("coin1.gif");
  coin2Img = loadImage("coin2.gif");
  coin3Img = loadImage("coin3.gif");
  oopsImg = loadImage("oops.gif");

  gameOverImg = loadImage("gameOver.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  warship = createSprite(300,500);
  warship.addImage("warship",warshipImg);
  warship.scale = 0.3;

  warship.setCollider("circle",0,0,300);

  gameOver = createSprite(300,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;
  
  warship.setCollider("circle",0,0,100);
  //warship.debug = true;

  coin1G = new Group();
  coin2G = new Group();
  coin3G = new Group();
  oopsG = new Group();
  
}


function draw() {
  background(200);

if(gameState===PLAY){

  score = score + Math.round(getFrameRate()/50);
  tower.velocityY = (6 + 2*score/150);

  warship.x = World.mouseX;
  
  edges= createEdgeSprites();
  warship.collide(edges);
 
  //creating continous enemies
  var select_coin1 = Math.round(random(1,5));
  if (World.frameCount % 10 == 0) {
    if (select_coin1 === 1){ 
      coin01();
    }
    else if (select_coin1 === 2){ 
     coin02();
   }
   else if (select_coin1 === 3){ 
     coin03();
   }
   else{
   oops1();
   }
   }
  
  
 if(tower.y >400){
   tower.y = height/2
 }
   
  spookySound.play();



if(warship.isTouching(coin1G)){
  Coins = Coins + 1;
  coin1G.destroyEach(); 
}

if(warship.isTouching(coin2G)){
  Coins = Coins + 1;
  coin2G.destroyEach(); 
}

if(warship.isTouching(coin3G)){
  Coins = Coins + 1;
  coin3G.destroyEach(); 
}

if(warship.isTouching(oopsG)){
  gameState = END;
}


 
}else if (gameState === END) {
  gameOver.visible = true;
  //Add code to show restart game instrution in text here
  text("Press UP_ARROW to reset the game", 300,300)
  

  tower.velocityY = 0;
  warship.velocityX = 0;
  

  coin1G.setVelocityYEach(0);
  coin1G.setLifetimeEach(-1);

  coin2G.setVelocityYEach(0);
  coin2G.setLifetimeEach(-1);

  coin3G.setVelocityYEach(0);
  coin3G.setLifetimeEach(-1);

  oopsG.setVelocityYEach(0);
  oopsG.setLifetimeEach(-1);



  //write condition for calling reset( )
  if(keyIsDown(UP_ARROW)){
    reset();
  }
}

drawSprites();
fill("black");
textSize(30);
text("Score : " + score , 100,50);
textSize(30);
text("Coins : " + Coins ,100,100);


} 

function coin01(){
  coin1 = createSprite(random(50,350),40,10,10);
  coin1.addImage(coin1Img);
  coin1.scale = 0.09;
  coin1.velocityY = 6;
  //add sprite to the group
  coin1G.add(coin1);
}
function coin02(){
  coin2 = createSprite(random(50,350),40,10,10);
  coin2.addImage(coin2Img);
  coin2.scale = 0.09;
  coin2.velocityY = 6;
  coin2G.add(coin2);
}
function coin03(){
  coin3 = createSprite(random(50,350),40,10,10);
  coin3.addImage(coin3Img);
  coin3.scale = 0.09;
  coin3.velocityY = 6;
  coin3G.add(coin3);
}

function oops1(){
  oops = createSprite(random(50,350),40,10,10);
  oops.addImage(oopsImg);
  oops.scale = 0.09;
  oops.velocityY = 6;
  oopsG.add(oops);
}

//create reset function here
function reset(){
  gameState = PLAY;
  gameOver.visible = false;

  coin1G.destroyEach();
  coin2G.destroyEach();
  coin3G.destroyEach();
  oopsG.destroyEach();
  score = 0;
  Coins = 0;
}

