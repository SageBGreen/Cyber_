
//declairing all images into the game before setup
let sta;
let gov;
let ship;
let back;
let enemy;
let bar;
let clearOne;
let clearTwo;
let enemyTwoL;
let enemyTwoR;
let enemyThree;
let winScreen;



//declairing all sounds into the game before setup
let titleMusic;
let firing;
let beam;
let charging;
let wobble;
let bossOne;
let bossZ;
let final;
let win;



function preload() {
  //preloading all graphix
  sta = loadImage('Player/title.png');
  gov = loadImage('Player/gover.png');
  ship = loadImage('Player/ship2.png');
  back = loadImage('Player/background.png');
  enemy = loadImage('Player/enemy.png');
  bar = loadImage('Player/healthbar.png');
  clearOne = loadImage('Player/stage1.png');
  clearTwo = loadImage('Player/stage2.png');
  enemyTwoL = loadImage('Player/enemytwoL.png');
  enemyTwoR = loadImage('Player/enemytwoR.png');
  enemyThree = loadImage('Player/enemythree.png');
  winScreen = loadImage('Player/endscreen.png');
  
  //preloading all sound files
   titleMusic = loadSound('Sound/TitleBig.mp3');
   fireing = loadSound('Sound/lazerBig.mp3');
   charging = loadSound('Sound/chargingBig.mp3');
   beam = loadSound('Sound/beamBig.mp3');
   wobble = loadSound('Sound/wobbleBig.mp3');
   bossOne = loadSound('Sound/bossOneBig.mp3');
   bossZ = loadSound('Sound/bossZBig.mp3');
   final = loadSound('Sound/finaleBig.mp3');
   win = loadSound('Sound/endSBig.mp3');
  
}

//creates the canvis all else drawn on top
function setup() {
  createCanvas(500, 730);
  

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




//de2 = second enemy death flag
let de2 = 0;
//et = does enemy need to go left or right?
let et = 0;
//xe2 = enemy 2 x position
let xe2 = 0;
//ye2 = enemy 2 y position
let ye2 = 50;
//ew2 = enemy 2 width
let ew2 = 550;
//eh2 = enemy 2 hight
let eh2 = 50;
//variables for sinusoidal movement
let a = 0.0;
let inc = 6.28318 / 25.0;
//t = a timeing variable for fire delay
let t = 0;



//enemy 3 death flag
let de3 = 0;
//position of enemy 3
let xe3 = 50;
let ye3 = 100;
//size of enemy 3
let ew3 = 400;
let eh3 = 70;
//does the nemy need to go up or down?
let et2 = 0;
//position of enemy 3 projectile
let xep3 = 0;
let yep3 = 0;
let xep35 = 0;
//c is a clock varible used for timing
let c = 501;
//to high indicator for player
let th = 0;



function draw() {
  
 
  
  //create background (image)
  //enumb ensures it only displays at an apropriate time
  if (enumb != 2 && enumb != 4){
   background(back); 
  }
  
  
  //starts music if mouse is pressed to fix not playing in server prob
  if (mouseIsPressed){
    //plays start screen music only once  
    if (music == 0){
      bossOne.loop();
      music = 1;
    }
  }
  
  //plays start screen music only once  
    if (music == 0){
      bossOne.loop();
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
    //////////////////////////////////////////////////////////////////////////
                           //player controll  
  
  
  //checks if player is dead if not runs player controoll 1 = dead
  if (dp == (1)){
    
    //ensures player cant shoot
    xp = -50;
    yp = -50;
    
    //displays image of kill screen 
  image(gov, 0, 0, canx, cany); 
    
    //kills enemy
  de = 1;
  de2 = 1;
  de3 = 1;
    
    //checks to see if enter is pressed to reset game
  if (keyIsDown (32)) {
    start = 0;
    de = 0;
    de2 = 0;
    de3 = 0;
    dp = 0;
    enumb = 0;
    t = 0;
    c = 501;
    y = cany - 50;
    x = canx - 200;
    th = 0;
    music = 0;
    bossOne.stop();
    titleMusic.stop();
    bossZ.stop();
    final.stop();
    win.stop();
    
  }
    
  } else {  
  
  //Create player ship
  //image (picture,X,Y,width,hight)
    //enumb ensures only displayed when apropriate
  if(enumb != 2 && enumb != 4){
   image(ship, x, y, 85, 85); 
  }
  
    
  
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
   
   
   
  // stops title music sets music flag to 2  
  if (music == 1)  {
    bossOne.stop(); 
    music = 2;
 }
   
   //plays enemy 1 music sets flag to 3
      if (music == 2){
      titleMusic.loop();
      titleMusic.setVolume(0.3);
        
      music = 3;
    }
   
   
   
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
   
   //removes enemy hit box
   xe = -1000;
   ye = -1000;
   
   //incraments enemy number
   if (enumb < 2 && dp == 0){
     enumb = enumb + 1;
   }
   
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
    
        //fireing sound effect
fireing.play();
fireing.setVolume(0.3);   
    
    
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
  
 
 ////////////////////////////////////////////////////////////
                //transition 1
    
  //if after defeating first enemy
   if (enumb == 2){
     
 
         //ensures player cant shoot
    xp = -50;
    yp = -50;
     
     //draw clear screen 1
     setTimeout(clearFirst, 1000);
     
     // sets enemy 2 hp
      ehp = 50;
     
     
     //incrament to next time stamp
    setTimeout(incrament, 3000);
   
   }
  ////////////////////////////////////////////////////////////////
    
     
  ////////////////////////////////////////////////////////////////
                    //enemy 2
    
    if(de2 == 0 && enumb == 3){
 
      
       // stops title music sets music flag to 4  
  if (music == 3)  {
    titleMusic.stop(); 
    music = 4;
 }
   
   //plays enemy 2 music sets flag to 5
      if (music == 4){
      bossZ.loop();
     bossZ.setVolume(0.5);
        
      music = 5;
    }
      
      
      if(y > sin(a + 180) * ye2 + 185){
          th = 1;
        } else {
          th = 0;
        }
      
      
      
      
//incraments angle of sinusoide
    a = a + (inc / 4);
      
   
  //creates and updates enemy helth bar ehp is scaled with a number to make the bar cross the screen nicely 
  fill(252, 3, 28);
  rect (25, 10, ehp * 9.02, 10);
   
  image (bar, 0, 10, canx, 10);  
      
      
      
      //draws right enemys
  image(enemyTwoR, 27 - xe2, sin(a + 180) * ye2 + 100, ew2, eh2); 
      //draws left enemys
  image(enemyTwoL, xe2 - 22.5,  sin(a) * ye2 + 100, ew2, eh2);
      
      //determines timing of charge / fireing
      t = t + 11;
      if (t > 2000){
        t = 0;
      }
      
      //colors projectiles
        fill(255, 255, 0);
      
      
      
      //plays charging sound
      if (t > 1000 && t < 1015){
        charging.play();
      }
      
      if (t > 1000 && t < 1500){
             //draws charge indicators 
      ellipse( 139.45 - xe2, sin(a + 180) * ye2 + 150, 25, 20);
      ellipse( 320.45 - xe2, sin(a + 180) * ye2 + 150, 25, 20);
      ellipse( 501.45 - xe2, sin(a + 180) * ye2 + 150, 25, 20); 
      }

            //plays charging sound
      if (t < 15){
        charging.play();
      }
      
      if (t < 500){
             //draws charge indicators
      ellipse( xe2 - 0.5, sin(a) * ye2 + 150, 25, 20);
      ellipse( xe2 + 180.5, sin(a) * ye2 + 150, 25, 20);
      ellipse( xe2 + 361.5, sin(a) * ye2 + 150, 25, 20); 
      }

 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      //determines if you shot the enemy
      
      
            //hit detection for hitting enemy xp = projectile position ,,,, xe = enemy position ehp = enemy hp ,,,,, de = death flag
 if (xp > xe2 - 23.5 && xp < xe2 + 21.4 && yp < sin(a) * ye2 + 175.5 && yp > sin(a) * ye2 + 100){
   yp = -50;
   xp = -50;
   ehp = ehp - 1; 
 }
      
             //hit detection for hitting enemy xp = projectile position ,,,, xe = enemy position ehp = enemy hp ,,,,, de = death flag
 if (xp > xe2 + 157.5 && xp < xe2 + 202.4 && yp < sin(a) * ye2 + 175.5 && yp > sin(a) * ye2 + 100){
   yp = -50;
   xp = -50;
   ehp = ehp - 1; 
 }     
      
      
               //hit detection for hitting enemy xp = projectile position ,,,, xe = enemy position ehp = enemy hp ,,,,, de = death flag
 if (xp > xe2 + 338.5 && xp < xe2 + 383.4 && yp < sin(a) * ye2 + 175.5 && yp > sin(a) * ye2 + 100){
   yp = -50;
   xp = -50;
   ehp = ehp - 1; 
 }    
    
      
      
                     // hit detection for hitting enemy xp = projectile position ,,,, xe = enemy position ehp = enemy hp ,,,,, de = death flag
 if (xp > 297 - xe2 && xp < 343 - xe2 && yp < sin(a + 180) * ye2 + 175 && yp > sin(a + 180) * ye2 + 100){
   yp = -50;
   xp = -50;
   ehp = ehp - 1;  
 } 
      
   
                        // hit detection for hitting enemy xp = projectile position ,,,, xe = enemy position ehp = enemy hp ,,,,, de = death flag
 if (xp > 116 - xe2 && xp < 162 - xe2 && yp < sin(a + 180) * ye2 + 175 && yp > sin(a + 180) * ye2 + 100){
   yp = -50;
   xp = -50;
   ehp = ehp - 1; 
 }    
         
      
                        // hit detection for hitting enemy xp = projectile position ,,,, xe = enemy position ehp = enemy hp ,,,,, de = death flag
 if (xp > 478 - xe2 && xp < 524 - xe2 && yp < sin(a + 180) * ye2 + 175 && yp > sin(a + 180) * ye2 + 100){
   yp = -50;
   xp = -50;
   ehp = ehp - 1;
    
 }    
      
      
      //kills enemy if hp runs out
     if (ehp < 1){
    de2 = 1; 
    t = 0;
    enumb = enumb + 1;
     }
      
   //+++++++++++++++++++++++++++++++++++++++++++++++   
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++    
      //plays beam sound
    if (t > 1500 && t < 1515) {
      beam.play();
      beam.setVolume(0.3);
    } 
      
 if (t > 1500){
   
             //draws lazer
      rect( 126.95 - xe2, sin(a + 180) * ye2 + 150, 25, 700);
      rect( 307.95 - xe2, sin(a + 180) * ye2 + 150, 25, 700);
      rect( 488.95 - xe2, sin(a + 180) * ye2 + 150, 25, 700); 
   
   // lazer hit detection
   if(x > 76 - xe2 && x < 119.5 - xe2){
    dp = 1;  
      }
   if(x > 257 - xe2 && x < 300.5 - xe2){
    dp = 1;  
      }
   if(x > 438 - xe2 && x < 481.5 - xe2){
    dp = 1;  
      }
      }

      
      //plays beam sound
          if (t > 500 && t < 515) {
      beam.play();
      beam.setVolume(0.3);
    } 
      
      
      if (t < 1000 && t > 500){
             //draws lazer
      rect( xe2 - 12.5, sin(a) * ye2 + 150, 25, 700);
      rect( xe2 + 168, sin(a) * ye2 + 150, 25, 700);
      rect( xe2 + 349, sin(a) * ye2 + 150, 25, 700); 
        
        // lazer hit detection
   if(x > xe2 - 63.45 && x < xe2 - 19.95){
    dp = 1;  
      }
   if(x > xe2 + 117.05 && x < xe2 + 160.55){
    dp = 1;  
      }
   if(x > xe2 + 298.05 && x < xe2 + 341.55){
    dp = 1;  
      }
      }
      
      
      
      //determines if the enemy should go left or right
      if (xe2 < 0){
        et = 0;
          }
      if (xe2 > 49){
        et = 1;
      }
      
      
      //moves enemys left then right
      if (et == 0){
     xe2 = xe2 + 1;
      } else {
     xe2 = xe2 - 1;
      }
      
           
      //prevents the player form going to high up the screen
      if (y < sin(a + 180) * ye2 + 100 || y < sin(a) * ye2 + 100){
        dp = 1;  
          }
      
      
    }
    
    
  ////////////////////////////////////////////////////////////////
    
     ////////////////////////////////////////////////////////////
                //transition 2
    
  //if after defeating first enemy
   if (enumb == 4){
    
     
         //ensures player cant shoot
    xp = -50;
    yp = -50;
     
     //draw clear screen 1
   setTimeout(clearSecond, 1000);
     
     // sets enemy 3 hp
     ehp = 10;
     
     
     //incrament to next time stamp
   setTimeout(incramentTwo, 3000);
   
   }
  ////////////////////////////////////////////////////////////////
    
  
  /////////////////////////////////////////////////////////////////
              //enemy 3
    
      if(de3 == 0 && enumb == 5){
 
               // stops title music sets music flag to 4  
  if (music == 5)  {
    bossZ.stop(); 
    music = 6;
 }
   
   //plays enemy 2 music sets flag to 5
      if (music == 6){
      final.loop();
      final.setVolume(0.4);
      music = 7;
    }
        
        
        //stops the player from shooting to close to enemy 3
        if(y > ye3 + 85){
          th = 1;
        } else {
          th = 0;
        }
        
        

        //draws enemy 3
    image(enemyThree, xe3, ye3, ew3, eh3);
      
    //creates and updates enemy helth bar ehp is scaled with a number to make the bar cross the screen nicely 
  fill(252, 3, 28);
  rect (25, 10, ehp * 4.51, 10);
  image (bar, 0, 10, canx, 10);  
        
    //determines if enemy ship has been hit
      if(xp > xe3 + 160 && xp < xe3 + 240 && yp < ye3 + 85 && yp > ye3){
        //moves player projectile and hurts enemy
        yp = -50;
        xp = -50;
        ehp = ehp - 1; 
         }  
        

        
        
        //caps clock and realighns projectiles to craft
        if (c > 500){
          
          //plays firing sound
          wobble.play();
          wobble.setVolume(0.4);
          
          c = 0;
          xep3 = xe3;
          xep35 = xe3;
          yep3 = ye3;
        } //clock variable for projrctiles
        c = c + 1.6;
        
        
        //determines if projectiles travel left or right
        if (t > 100){
            t = 0;
        }
        t = t + 0.5;
        
          //incraments projectile position
        if (t < 50){
              xep3 = xep3 + 2;
              xep35 = xep35 - 2;
              yep3 = yep3 + 2; 
               
            }
        
        if (t > 50){
              xep3 = xep3 - 2;
              xep35 = xep35 + 2;
              yep3 = yep3 + 2; 
              
            }
        
        
        //colors projectiles
        fill(51, 51, 255);
        
        //draws projectiles
        ellipse( xep3, yep3 + 35.5, 20, 20);
        ellipse( xep3 + 85.5, yep3 + 70, 20, 20);
        ellipse( xep3 + 200.1, yep3 + 70, 20, 20);
        ellipse( xep3 + 316, yep3 + 70, 20, 20);
        ellipse( xep3 + 400, yep3 + 35.5, 20, 20);
        
       
         //draws mirror projectiles
        ellipse( xep35, yep3 + 35.5, 20, 20);
        ellipse( xep35 + 85.5, yep3 + 70, 20, 20);
        ellipse( xep35 + 200.1, yep3 + 70, 20, 20);
        ellipse( xep35 + 316, yep3 + 70, 20, 20);
        ellipse( xep35 + 400, yep3 + 35.5, 20, 20);
        
        
        
                        //determines if player was shot down mirror
        if(x > xep35 + 24.5 && x < xep35 + 61 && y < yep3 + 26.5 && y > yep3 - 11){
           dp = 1;
           }
        
        if(x > xep35 + 339 && x < xep35 + 375.5 && y < yep3 - 8 && y > yep3 - 45.5){
           dp = 1;
           }
        
        if(x > xep35 + 255 && x < xep35 + 291.5 && y < yep3 + 26.5 && y > yep3 - 11){
           dp = 1;
           }
        
        if(x > xep35 + 139.1 && x < xep35 + 175.6 && y < yep3 + 26.5 && y > yep3 - 11){
           dp = 1;
           }
        
        if(x > xep35 - 61 && x < xep35 - 24.5 && y < yep3 - 8 && y > yep3 - 45.5){
           dp = 1;
           }
        
        
        
                //determines if player was shot down
        if(x > xep3 + 24.5 && x < xep3 + 61 && y < yep3 + 26.5 && y > yep3 - 11){
           dp = 1;
           }
        
        if(x > xep3 + 339 && x < xep3 + 375.5 && y < yep3 - 8 && y > yep3 - 45.5){
           dp = 1;
           }
        
        if(x > xep3 + 255 && x < xep3 + 291.5 && y < yep3 + 26.5 && y > yep3 - 11){
           dp = 1;
           }
        
        if(x > xep3 + 139.1 && x < xep3 + 175.6 && y < yep3 + 26.5 && y > yep3 - 11){
           dp = 1;
           }
        
        if(x > xep3 - 61 && x < xep3 - 24.5 && y < yep3 - 8 && y > yep3 - 45.5){
           dp = 1;
           }
        

      
        //determines if player colided with enemy 3
        if(x > xe3 - 50 && x < xe3 + 360 && y < ye3 + 18 && y > ye3 - 70){
          dp = 1;
          de3 = 1;
           }
        
        
               //kills enemy if hp runs out
     if (ehp < 1){
    de3 = 1; 
    t = 0;
    enumb = enumb + 1;
     } 
        
        
      //determines if the enemy should go left or right
      if (xe3 < 0){
        et = 0;
          }
      if (xe3 > 100){
        et = 1;
      }
      
      //moves enemys left then right
      if (et == 0){
     xe3 = xe3 + 1;
      } else {
     xe3 = xe3 - 1;
      }
    
        //determines if the enemy should go up if down
      if (ye3 < 40){
        et2 = 0;
          }
      if (ye3 > 220){
        et2 = 1;
      }
      
      //moves enemys up or down
      if (et2 == 0){
     ye3 = ye3 + 1;
      } else {
     ye3 = ye3 - 1;
      }
    
      }
    
   ////////////////////////////////////////////////////////////////////
    
  ///////////////////////////////////////////////////////
         //win screen
    if(enumb ==6){
        
    // stops title music sets music flag to 8  
  if (music == 7)  {
    final.stop(); 
    music = 8;
 }
   
   //plays win music sets flag to 9
      if (music == 8){
      win.loop();
     win.setVolume(0.5);
      music = 9;
    }
      
      
      
          //ensures player cant shoot
    xp = -50;
    yp = -50;
      
        //displays win screen 
  image(winScreen, 0, 0, canx, cany);
      
      
      }
    
    ///////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
          //fire controll projectile

  //prevents the player from shooting at point blank range
 if (x > xe - 45 && x < xe + 45 && y < ye + 150 && th == 1) {
   
 } else {
   
   
  
  // has the player pressed the fire key for the first time?
  if (keyCode === (74) && f == 0) {
    f = 1; 
    
    //fireing sound effect
fireing.play();
    
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
  
     //projectile resets if fire button is held unless player two high
 if (yp <= (0) && keyIsDown(74) && y > 280){
  
   if(dp == 0 && enumb != 2 && enumb != 4 && enumb != 6){
        //fireing sound effect
   fireing.play(); 
      }

   
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



//incraments game time stamp
function incrament(){
  if (enumb == 2){
      enumb = enumb + 1;
  }

}

//incraments game time stamp
function incramentTwo(){
  if (enumb == 4){
      enumb = enumb + 1;
  }

}


//function
function clearFirst() {
  if (enumb == 2){
      //displays image of clear screen 1 
  image(clearOne, 0, 0, canx, cany);
      }
  
}



//function
function clearSecond() {
  if (enumb == 4){
      //displays image of clear screen 2 
  image(clearTwo, 0, 0, canx, cany);
      }
  
}




