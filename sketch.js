
//preloads all images into the game before setup
let sta;
let gov;
let ship;
let back;
let enemy;

function preload() {
  sta = loadImage('Player/title.png');
  gov = loadImage('Player/gover.png');
  ship = loadImage('Player/ship2.png');
  back = loadImage('Player/background.png');
  enemy = loadImage('Player/enemy.png');
}

//creates the canvis all else drawn on top
function setup() {
  createCanvas(400, 400);
}

//variables for canvis size
let canx = 400;
let cany = 400;
//rand = used whenever a randome value is needed
let rand = 0;
//start = game start flag
let start = 0;



//y = player y coordinate
let y = cany - 50;
//x = player x coordinate
let x = canx - 200;
//yp = player projectile y coordinate
let yp = y;
//xp = player projectile x coordinate
let xp = x;
//s = player speed
let s = 3.5;
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




function draw() {
  
 
  
  //create background (image)
  background(back);
  
   //checks to see if enter is pressed to start game
  if (keyIsDown (13)) {
    start = 1;
  }
  
  //If start has not ben set stay on start screen
  if (start == 0){
    
    //displays image of start screen 
  image(sta, 0, 0, 400, 400); 
    
    
  } else {
    
  
   //////////////////////////////////////////////////////////////////////////
                           //player controll  
  
  
  //checks if player is dead if not runs player controoll 1 = dead
  if (dp == (1)){
    
    //displays image of kill screen 
  image(gov, 0, 0, 400, 400); 
    
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
  image(ship, x, y, 50, 50);
    
  
   //ensures X player vales stays in box
  if (x > canx - 50) {
    x = canx - 50
  }
  if (x < 0) {
    x = 0
  }  
    //ensures y player vales stays in box
  if (y > cany - 50) {
    y = cany - 50
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
  
  //collision detection for contact with enemy
  if (x > xe - 50 && x < xe + 50 && y < ye + 50 && y > ye - 50){
    dp = 1;
  }
    
  }
  
////////////////////////////////////////////////////////////////////
  
  
/////////////////////////////////////////////////////////////////////////////
                //enemy module
  
  //check if enemy is dead 0 = alive
 if (de == 0){
   
   
   //increases the enumb by one and sets enemy hp
   if (enumb == 0){
     ehp = 10;
     enumb = enumb + 1;
   } 
   
  //creates and updates enemy helth bar ehp is scaled with a number to make the bar cross the screen nicely 
  fill(252, 3, 28);
  rect (0, 0, ehp * 40.1, 10);
   
  //Creates noise used for enemy movement
  xoff = xoff + 0.024;
  yoff = yoff + 0.01;
  xe = noise(xoff) * width;
  ye = noise(yoff) * 250;
  
  //restrains enemy movement to top of screen
   if (xe < (0)) {
    xe = 0;
  }
  if (xe > (canx-50)) {
    xe = 350;
  }
  if (ye < (0)) {
    ye = 0;
  } 
  if (ye > (cany - 250)) {
    ye = cany - 250;
  }
  
  //draws enemy
  image(enemy, xe, ye, 50, 50);
  
 //If death flag is set this death code runs
 } else {
    
    //draws enemy
  image(enemy, -100, -100, 50, 50);
  }
  
  //-----------------------------------------------------------
  //-----------------------------------------------------------
         //enemy fire controll
  
  
  //ensures enemy is alive and no projectile is on screen
  if (de == 0 && ep == 0){
   
    //gets randome number smaller than 1 ef = frieing chanse
  rand = rand + 0.01;
  ef = noise(rand);
      
  if(ef > (0.48))  {
    
    ep = 1;
    xep = xe + 25;
    yep = ye + 39;
    
  }
   
  }
    
    
  //if enemy projectile is on screen draw it and move it else set projectile flag to 0 -- no projectile
  if (yep <= cany + 50){
    yep = yep + 5;
    fill(212, 0, 11);
    rect (xep, yep, 5, 40)
  } else {
    ep = 0;
  }
  
  
   //hit detection for enemy xp = projectile position ,,,, xe = enemy position ehp = enemy hp ,,,,, de = death flag
 if (xep > x - 5 && xep < x + 50 && yep < y + 55 && yep > y - 40.5)  {
   
     ep = 0;
     dp = 1;
   }
    
    
 
    
 

  
  //------------------------------------------------------------
  //------------------------------------------------------------
  
/////////////////////////////////////////////////////////////////////////// 
  
  
  ////////////////////////////////////////////////////////////////////////
          //fire controll projectile

  //prevents the player from shooting at point blank range or while dead
 if (x > xe - 50 && x < xe + 50 && y < ye + 85 && y > ye - 50 || dp == 1) {
   
 } else {
  
  // has the player pressed the fire key for the first time?
  if (keyCode === (74) && f == 0) {
    f = 1;  
  }
  //if not fired before projectile tracks ship
   if (f == 0) {
    yp = y - 28;
    xp = x + 23;
  }
  //if fired before projectile moves forward untill just out of screen
  if (f == 1) 
  {
    if (yp >= -50){
    yp = yp - 11;}
    fill(212, 0, 11);
    rect (xp, yp, 5, 40)
}
  
     //projectile resets if fire button is held
 if (yp <= (0) && keyIsDown(74)){
   yp = y - 28;
   xp = x + 23;

  }
      
  //hit detection for enemy xp = projectile position ,,,, xe = enemy position ehp = enemy hp ,,,,, de = death flag
 if (xp > xe - 5 && xp < xe + 50 && yp < ye +55 && yp > ye - 25){
   yp = -50;
   xp = -50;
   ehp = ehp - 1;
   if (ehp == 0){
    de = 1; 
   }

 }

}
/////////////////////////////////////////////////////////////////////////// 
  
  }
}