var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var ground,background, backgroundImage, score;

function preload(){
 playerImage = loadImage("images/player.png");
  
  backgroundImage = loadImage("images/background.jpg");
  
  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.jpg");
  obstacle3 = loadImage("images/obstacle3.png");
  obstacle4 = loadImage("images/obstacle4.jpg");
  obstacle5 = loadImage("images/obstacle5.png");
  obstacle6 = loadImage("images/obstacle6.jpg");
}

function setup() {
  createCanvas(600, 200);

  player = createSprite(200,200,50,50);
  player.addImage(playerImage);
  player.scale = 1.0;

  ground = createSprite(200,200,800,20);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  score = 0;
  
}

function draw() {
  background(backgroundImage);
  //displaying score
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){

    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& player.y >= 100) {
        player.velocityY = -12;
    }
    
    //add gravity
    player.velocityY = player.velocityY + 0.8;
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(player)){
        gameState = END;
      
    }
  }
   else if (gameState === END) {

      ground.velocityX = 0;
      player.velocityY = 0
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    
   }
  player.collide(invisibleGround);
  drawSprites();
}

function reset(){
  gameState = PLAY;
  score = 0;
  obstaclesGroup.destroyEach();
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }        
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}
