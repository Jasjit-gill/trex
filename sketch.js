var trex1, trex2, trex3,ground,groundImage,iGround,cloudImage,cloudsGroup,ob1,ob2,ob3,ob4,ob5,ob6,obstaclesGroup,gameState,restart,restartImage,gameover,gameoverImage,score,diesound,jumpsound,checkpointsound;
localStorage.highScore=0
function preload(){
  trex1=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  ob1=loadImage("obstacle1.png")
  ob2=loadImage("obstacle2.png")
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png")
  trex3=loadAnimation("trex_collided.png");
  gameoverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  diesound=loadSound("die.mp3");
  jumpsound=loadSound("jump.mp3");
  checkpointsound=loadSound("checkPoint.mp3");

}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180);
  trex.addAnimation("run",trex1);
  trex.addAnimation("stop",trex3);
  trex.scale = 0.5;
  ground = createSprite(200,180,400,10);
  ground.addImage(groundImage);
  
  iGround = createSprite(200,195,400,5);
  iGround.visible = false;
  gameState="play";
  cloudsGroup=new Group();
  obstaclesGroup=new Group();
  
    gameover = createSprite(300,100);
     restart = createSprite(300,140);
    
    gameover.addImage(gameoverImage);
    gameover.scale = 0.5;
    restart.addImage(restartImage);
    restart.scale = 0.5;
    
    gameover.visible = false;
    restart.visible = false;
  
    score=0;
}

function draw() {
  background(190);
  fill("black");
  text("score: "+score,500,50);
  if(localStorage.highScore>0){
    text("high score:"+localStorage.highScore,350,50);
  }
  
 // console.log(trex.y);
  if(gameState==="play"){
      if(keyDown("space")&&trex.y>=169){
          trex.velocityY = -10;
          jumpsound.play();
      }
      trex.velocityY=trex.velocityY+0.5; 
      ground.velocityX = -6;
      if(ground.x<0){
        ground.x=ground.width/2;
      }
      spawnClouds();
      spawnobstacles();
      
    score=Math.round(getFrameRate()/60)+score;
    
      if(score%100===0&&score>0){
        checkpointsound.play();
      }
    
    
      if(trex.isTouching(obstaclesGroup)){
        gameState="end";
        diesound.play();
        
      }
  }else
    if(gameState==="end"){
      ground.velocityX=0;
      trex.changeAnimation("stop",trex3);
      cloudsGroup.setVelocityXEach(0);
      obstaclesGroup.setVelocityXEach(0);
      
      obstaclesGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
      
      gameover.visible = true;
    restart.visible = true;

      
    }
  
    if(mousePressedOver(restart)){
      reset();
    }
  
 
  trex.collide(iGround);
  
  drawSprites();
}
function spawnClouds(){
  if(frameCount%60===0){
    var cloud = createSprite(600,70,20,20);
    cloud.addImage(cloudImage);
    cloud.velocityX = -6;
    cloud.scale = 0.5;
    cloud.y = random(80,120);
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    cloud.lifetime = 100;
    cloudsGroup.add(cloud);
  }
}
function spawnobstacles(){
  if(frameCount%60===0){
    var obstacle = createSprite(600,165,20,40);
    obstacle.velocityX = -6;
    var rand = Math.round(random(1,6));
    switch (rand) {
  case 1:
        
   obstacle.addImage(ob1);
    break;
  case 2:
    obstacle.addImage(ob2);
    break;
  case 3:
    obstacle.addImage(ob3);
    break;
  case 4:
    obstacle.addImage(ob4);
    break;
  case 5:
    obstacle.addImage(ob5);
    break;
  case 6:
    obstacle.addImage(ob6);
        
}
    obstacle.lifetime = 100;
    obstacle.scale = 0.5;
    obstaclesGroup.add(obstacle);
  }
  
}
function reset(){
  gameState="play";
  if(localStorage.highScore<score){
    localStorage.highScore=score;
  }
  score=0;
  trex.changeAnimation("run",trex1);
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  gameover.visible=false;
  restart.visible=false;
  
}
