
//declairing all images into the game before setup
let sta;
let gov;
let ship;
let back;
let enemy;
let bar;

//declairing all sounds into the game before setup
let titleMusic;
let lazerSound;


function preload() {
  //preloading all graphix
  sta = loadImage('Player/title.png');
  gov = loadImage('Player/gover.png');
  ship = loadImage('Player/ship2.png');
  back = loadImage('Player/background.png');
  enemy = loadImage('Player/enemy.png');
  bar = loadImage('Player/healthbar.png');
 
  
  //preloading all sound files
   titleMusic = loadSound('Sound/TitleBig.mp3');
   lazerSound = loadSound('Sound/lazerBig.mp3');
}

//creates the canvis all else drawn on top
function setup() {
  createCanvas(500, 730);
  
  //sets soundefect mode to restart if sound already playing
   lazerSound.playMode('restart');
}

//variables for canvis size
let canx = 500;
let cany = 730;
//rand = used whenever a randome value is needed
let rand = 0;
//start = game start flag
let start = 0;
//music flag prevents music from playing more than once
let music = 0;



//y = player y coordinate
let y = cany - 50;
//x = player x coordinate
let x = canx - 200;
//yp = player projectile y coordinate
let yp = y;
//xp = player projectile x coordinate
let xp = x;
//s = player speed
let s = 3;
//dp = player death flag
let dp = 0;
//f = fire flag
let f = 0;


//x offset for enemy
let xoff = 0.0;
//y offset for enemy
let yoff = 0.0;
//xe = enemy x position
let xe = 0;
//ye = enemy y position
let ye = 0;
//yep = enemy projectile y
let yep = 0;
//xep = enemy projectile x
let xep = -10;
//ehp = enemy helth
let ehp = 0;
//enumb = what enemy are we on increase by one every enemy 
//also used to initially set hp of enemy on first pass
let enumb = 0;
//de = enemy death flag
let de = 0;
//ef = chance enemy will fire
let ef = 0;
//ep = enemy projectile in air
let ep = 0; 
//ew = enemy hight
let ew = 0;
//eh = enemy hight
let eh = 0;




function draw() {
  
 
  
  //create background (image)
  background(back);
  
//plays start screen music only once  
    if (music == 0){
      titleMusic.loop();
      music = 1;
    }
  
   //checks to see if enter is pressed to start game
  if (keyIsDown (13)) {
    start = 1;
  }
  
  
  //If start has not ben set stay on start screen
  if (start == 0){
 
    //displays image of start screen 
  image(sta, 0, 0, canx, cany); 
    
    
  } else {
    
    
  //stops title music resets music flag to 0  
  if (music == 1)  {
    titleMusic.stop(); 
    music = 0;
  }
    //////////////////////////////////////////////////////////////////////////
                           //player controll  
  
  
  //checks if player is dead if not runs player controoll 1 = dead
  if (dp == (1)){
    
    //displays image of kill screen 
  image(gov, 0, 0, canx, cany); 
    
    //kills enemy
  de = 1;
    
    //checks to see if enter is pressed to reset game
  if (keyIsDown (32)) {
    start = 0;
    de = 0;
    dp = 0;
    enumb = 0;
    y = cany - 50;
    x = canx - 200;
  }
    
  } else {  
  
  //Create player ship
  //image (picture,X,Y,width,hight)
  image(ship, x, y, 85, 85);
    
  
   //ensures X player vales stays in box
  if (x > canx - 85) {
    x = canx - 85
  }
  if (x < 0) {
    x = 0
  }  
    //ensures y player vales stays in box
  if (y > cany - 85) {
    y = cany - 85
  }
  if (y < 0) {
    y = 0
  }   
  
                      //controlls player movement
  
  if (keyIsDown(65) && keyIsDown(87)) {
    x -= s;
    y -= s;
  } else if (keyIsDown(65) && keyIsDown(83)) {
    x -= s;
    y += s;
  } else if (keyIsDown(68) && keyIsDown(87)) {
    x += s;
    y -= s;
  } else if (keyIsDown(68) && keyIsDown(83)) {
    x += s;
    y += s;
  } else if (keyIsDown(65)) {
    x -= s;
  } else if (keyIsDown(68)) {
    x += s;
  } else if (keyIsDown(87)) {
    y -= s;
  } else if (keyIsDown(83)) {
    y += s;
  }
  
  }
  
////////////////////////////////////////////////////////////////////
  
  
/////////////////////////////////////////////////////////////////////////////
                //enemy module
    //sets enemy hight and width
    ew = 85;
    eh = 85;
  
  //check if enemy is dead 0 = alive
 if (de == 0){
   
   
   //increases the enumb by one and sets enemy hp
   if (enumb == 0){
     ehp = 10;
     enumb = enumb + 1;
   } 
   
  //creates and updates enemy helth bar ehp is scaled with a number to make the bar cross the screen nicely 
  fill(252, 3, 28);
  rect (25, 10, ehp * 45.1, 10);
   
  image (bar, 0, 10, canx, 10);
   
   
  //Creates noise used for enemy movement and contrains that noise to top of screen
  xoff = xoff + 0.024;
  yoff = yoff + 0.01;
  xe = noise(xoff) * (width - 85);
  ye = noise(yoff) * 365;
  

  //draws enemy
  image(enemy, xe, ye, ew, eh);
  
  
 //If death flag is set this death code runs
 } else {
    
    //draws enemy
  image(enemy, -100, -100, ew, eh);
  }
  
  //-----------------------------------------------------------
  //-----------------------------------------------------------
         //enemy fire controll

  
  //ensures enemy is alive and no projectile is on screen
  if (de == 0 && ep == 0){
   
    //gets randome number smaller than 1 ef = frieing chanse after a delay
setTimeout(randome, 1000);
      
    
    //if firiing chance high enouth spawn projectile at enemy location
  if(ef > (0.47))  {
    
    
    ep = 1;
    xep = xe + 42.5;
    yep = ye + 100;
    
  }
   
  }
  
  
    
  //if enemy projectile is on screen draw it and move it else set projectile flag to 0 -- no projectile
  if (yep <= cany + 45){
    yep = yep + 15; 
    fill(212, 0, 11);
    ellipse (xep, yep, 5, 40)
  } else {
    ep = 0;
  }
           
      
   // dp = death of player ,,,,  ep = enemy projectile\
  //detects if player was hit by projectile
 if (xep > x + 31 && xep < x + 54 && yep < y + 88 && yep > y + 36)  {
   
     ep = 0;
     dp = 1;   
   }
    
      //hit detection for enemy xp = projectile position ,,,, xe = enemy position ehp = enemy hp ,,,,, de = death flag
 if (xp > xe - 2.5 && xp < xe + ew + 2.5 && yp < ye + eh + 20 && yp > ye - 20){
   yp = -50;
   xp = -50;
   ehp = ehp - 1;
   if (ehp == 0){
    de = 1; 
   }
 
   
 }
  
  //------------------------------------------------------------
  //------------------------------------------------------------
  
/////////////////////////////////////////////////////////////////////////// 
  
  
  ////////////////////////////////////////////////////////////////////////
          //fire controll projectile

  //prevents the player from shooting at point blank range or while dead
 if (x > xe - 45 && x < xe + 45 && y < ye + 150 && y > ye + 85 || dp == 1) {
   
 } else {
  
  // has the player pressed the fire key for the first time?
  if (keyCode === (74) && f == 0) {
    f = 1; 

  }
  //if not fired before projectile tracks ship
   if (f == 0) {
    yp = y - 10;
    xp = x + 42.5;
     
  }
  //if fired before projectile moves forward untill just out of screen
  if (f == 1) 
  {
    if (yp >= -50){
    yp = yp - 11;}
    fill(212, 0, 11);
    ellipse (xp, yp, 5, 40)
}
  
     //projectile resets if fire button is held
 if (yp <= (0) && keyIsDown(74)){
  
   yp = y - 10;
   xp = x + 42.5;
   
  }
      
}
    
    //collision detection for player contact with enemy ew = enemy width,,,, eh = enemy hight
     if (x > xe - 85 && x < xe + ew && y < ye + eh && y > ye - 85){
    dp = 1;

  } 
    
/////////////////////////////////////////////////////////////////////////// 
  
  }
}


//function for finding a randome variable created so a delay can happen before the first enemy fires
function randome() {
  rand = rand + 0.01;
  ef = noise(rand);
}


