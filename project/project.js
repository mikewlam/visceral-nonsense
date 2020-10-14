//Sketch began on 26th of September, by Michael W. Lam
//Project Visceral Nonsense for Slave to the Algorithm Studio, 
//lead by Karen Ann Donnachie and Andy Simionato

//sketch set up
var bgcolor, bgbase;
var F1, F2, F3;
var textInput;
var mode;
var textEntry, textStatement, rita, answer;
var statement = 'V SCERAL\nN NSENSE';
var start = 'CLICK TO START/REFRESH';
var textDisplay = [];
var field;
let xpos;


//Generative Part
var particles = [];
var x0, x1, x2, x3, x4, x5;
var xhsb;

//input analysis
var resultValue, resultWord, result, vowels, notWord;

//Daniel Shiffman How to Loop Animation, found at https://www.youtube.com/watch?v=ZI1dmHv3MeM

//Drawing Circle, closed.
let phase = 0;
let zoff = 0;
let maxP = 3600;

//RiTa Qestions Variable
var lexicon;
var output1 = [];
var output2 = [];
var words = [];
var cIndex = 0;


function preload() {
   F2=loadFont('data/ABCFavoritEduMono-Medium.otf');
   F3=loadFont('data/ABCFavoritEduMono-Book.otf');
}


function setup() {
  mode = 1; 
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  lexicon = new RiLexicon();
  smooth();
  bgcolor = color(6, 9, 34);
  bgbase = 240;
        background(bgbase);
        textSize(30);
        fill(bgcolor);
                                        
      //landing page
      if (mode == 1) {
        fill(bgcolor);  
        textSize(120);
        textFont(F2);
        textAlign(CENTER, BOTTOM);
        textLeading(105);
        textStatement=text(statement, windowWidth*0.5, windowHeight*0.45);
        fill(150);
        text(" I      \n O      ", windowWidth*0.5, windowHeight*0.45);
        textSize(windowHeight*0.030);
        fill(bgcolor);
        textFont(F3);
        textLeading(windowHeight*0.042);
        text('An exploration into communicating without meaning.\nHow can words provide substance beyond its definitions?\nWhat if a human & alien interaction generates an\nexperience that is purely visceral...', windowWidth*0.5, windowHeight*0.65);
        textSize(18);
        fill(bgcolor);
        textFont(F2);
        textStart=text(start, windowWidth/2, windowHeight*0.75);
        }
        
          //Answer Field
        field=createInput();
        field.size(windowWidth*0.5, windowHeight*0.05);
      
        field.style("text-align", CENTER);
        field.style("font-size", windowHeight*0.025);
        field.style("padding", 20);
        field.style("text-font", F2);
      
        field.position(windowWidth*0.25, windowHeight*0.52);
        field.changed(textData);
        field.hide();
             
}


//RESIZE CODE FOR LANDING AND MAIN PAGE
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  if (mode == 1) {
    background(bgbase);
    field.position(windowWidth*0.25, windowHeight*0.55);
    field.size(windowWidth*0.5, 50);
    textFont(F2);
    textSize(45);
    fill(bgcolor);
    textAlign(CENTER, BOTTOM);
    text (rita, windowWidth*0.5, windowHeight*0.35);
  }
}

//===================================================================================================//
//=============================================TEXT-ANALYSIS=========================================//        
//===================================================================================================//

function textData() {
  
  //background(bgbase);
  field.hide();
  var data = field.value();
 
  //RiTa Analysis
      //creating a new rita string from (data)
  result = new RiString(data); 
      //qty of words in result
  resultWord = result.words().length;
      //qty of characters in result
  resultValue = result.length();
      //match specific character
  vowels = result.match(/(a|e|i|o|u)/g).length;
  notWords = result.match(/(\W|\d)/g).length;
  words = result.split('');
  
  //Generative Variables
  //Exterior  
  x0 = map(resultValue, 3, 70, 1.5, 25);
  x1 = map(resultWord, 1, 12, 1, 15);
  x1a = map(resultWord, 1, 10, -200, windowHeight*0.65);
  //Details
  x2 = map(resultValue, 0, 100, 0.025, 0.15); //
  x3 = map(notWords, 0, 15, 0, 0.01); //animate
  x4 = map(noise(vowels, notWords), 0, 10, 0.75, 5);
  x5 = map(resultValue, 3, 70, 0.7, 3.5);

  noiseSeed(random(10)); 

  //clear input value
  field.value('');
}


function draw() {
  let time = frameCount%200;
                if (mode == 3 && resultValue > 2) {           
                  //Sound Variables
                  //playing=true;
                translate(windowWidth/2, windowHeight/2);
                background(bgcolor);
                let m = 2000;
                let t = 1*(frameCount-1)/time;
                
//===================================================================================================//
//============================================PROPER-ANSWER==========================================//        
//===================================================================================================//
                for (let a=0; a<360; a+=0.12) { //a is the amount of dots

                   let noiseMax = map(random(a+x1), 0, 360, 0.1, x0);
                   //stroke(xr, xg, xb, 6);
                   let xoff = map(cos(a), -1, 1, 0, noiseMax); //this value controls the sharpness of angle
                   let yoff = map(sin(a), -1, 1, 0, noiseMax);
                   let r = map(noise(xoff, yoff, zoff), 0, 1, x1a, windowHeight*0.5);
                   let x = -r * cos(a)+sin(xoff);// + random(cos(TWO_PI*t), -cos(TWO_PI*t));
                   let y = r * sin(a)+cos(yoff);// + random(sin(TWO_PI*t), -sin(TWO_PI*t));
                   let z = random(1, 2.5);
                   
                   particles.push(new generative(x, y, z));  

                     if (particles.length>maxP) {
                       particles.splice(0, 1);
                   }
  }                    fill(bgbase);
                       textSize(24);
                       textFont(F2);
                       noStroke();
                       textAlign(CENTER, BOTTOM);
                       answer = text(result, 0, windowHeight*0.45);
//===================================================================================================//
//===================================================================================================//        
//===================================================================================================//                           

//===================================================================================================//
//============================================FALSE-RESPONSE=========================================//        
//===================================================================================================//
  }                else if (mode == 3 && resultValue <= 2) {
                      translate(windowWidth/2, windowHeight/2);
                      background(bgcolor);
                   for (let b=0; b<360; b+=0.2) { //a is the amount of dots
                             let noiseMax = map(random(b), 0, 360, 0.1, 0.2);
                             let xoff1 = map(cos(b), -1, 1, 0, noiseMax); //this value controls the sharpness of angle
                             let yoff1 = map(sin(b), -1, 1, 0, noiseMax);
                             let r1 = map(noise(xoff1, yoff1, zoff), 0, 1, 200, windowHeight*0.2);
                             let x = -r1 * cos(b)+sin(xoff1);// + random(cos(TWO_PI*t), -cos(TWO_PI*t));
                             let y = r1 * sin(b)+cos(yoff1);// + random(sin(TWO_PI*t), -sin(TWO_PI*t));
                             let z = random(0.7, 1.5);
                             
                             particles.push(new generative(x, y, z));
                             
                             if (particles.length>maxP) {
                                 particles.splice(0, 1);
                             }
                }              fill(bgbase);
                               textSize(24);
                               textFont(F2);
                               noStroke();
                               textAlign(CENTER, BOTTOM);
                               text('[Longer Response Required]', 0, windowHeight*0.35);
  }
//===================================================================================================//
//===================================================================================================//        
//===================================================================================================//
 if (zoff < x5) {
 zoff+=x2;
 } else if (zoff => x5) {
   x2=0;
 } 
 //console.log(zoff);
 //console.log(x2);
 

   textFont(F3);
   textSize(18);
   textAlign(LEFT, BOTTOM);
   text('ESCAPE:  RETURN\nSPACE:   SAVE', -windowWidth/2*0.95, -windowHeight*0.42);

//===================================================================================================//
//==========================================CLASS-CONSTRUCTOR========================================//        
//===================================================================================================//

  for (var i=0; i<textDisplay.length; i++) {
    textDisplay[i].display();
    }
  //Loop for particles class
  for (var j=0; j<particles.length; j++) {
    //particles[j].move();
    particles[j].display();
  }
  

}
          
//===================================================================================================//
//====================================MOUSE-CLICK-RITA-QUESTION======================================//        
//===================================================================================================//
function mousePressed() {
  if (mode == 1 && mouseX>0 && mouseX<windowWidth && mouseY<windowHeight*0.52 || mouseY > windowHeight*0.59 && mode == 1) {
  background(bgbase);

            //RiTa Syntax for Questions
             output1 = "Q. " + lexicon.randomWord("wrb").toUpperCase()+" DO YOU "+
                       lexicon.randomWord("vb").toUpperCase()+" "+
                       lexicon.randomWord("rb").toUpperCase()+"?";
            
             output2 = "Q. " + lexicon.randomWord("cc",1).toUpperCase()+" "+
                       lexicon.randomWord("md").toUpperCase()+" YOU "+
                       lexicon.randomWord("rb").toUpperCase()+" "+
                       lexicon.randomWord("vb").toUpperCase()+"?";
            
             rita = random([output1, output1, output1, output2]);

  fill(bgcolor);
  noStroke();
  textAlign(CENTER, BOTTOM);
  background(bgbase);
  textFont(F2);
  textSize(windowHeight*0.05);
  fill(bgcolor);
  text (rita, windowWidth*0.5, windowHeight*0.4);
  field.show();
         textSize(18);
         fill(bgcolor);
         textFont(F3);
         textAlign(CENTER, BOTTOM);
         textStart=text('\"ANSWER\" + ENTER', windowWidth/2, windowHeight*0.5);
      }
}
//===================================================================================================//
//====================================KEY-PRESS-MODE-CHANGE==========================================//        
//===================================================================================================//
function keyPressed () {
  let loading;
    //Interactive page
    // 27 is ESC
     if (keyCode === 27 && mode == 3) {
       background(bgbase);
       playing=false;
       colorMode(RGB);
       translate (-windowWidth/2, -windowHeight/2);
           //Remove Generative Sketch
           particles.splice(0, maxP);
           textDisplay.splice(0, 800);

      mode = 1;
      zoff=0;

 output1 = "Q. " + lexicon.randomWord("wrb").toUpperCase()+" DO YOU "+
           lexicon.randomWord("vb").toUpperCase()+" "+
           lexicon.randomWord("rb").toUpperCase()+"?";

 output2 = "Q. " + lexicon.randomWord("cc",1).toUpperCase()+" "+
           lexicon.randomWord("md").toUpperCase()+" YOU "+
           lexicon.randomWord("rb").toUpperCase()+" "+
           lexicon.randomWord("vb").toUpperCase()+"?";

 rita = random([output1, output2, output2, output2]);
      fill(bgcolor);
      noStroke();
      textAlign(CENTER, BOTTOM);
     
      fill(bgcolor);
      textFont(F2);
      textSize(windowHeight*0.05);
      text (rita, windowWidth*0.5, windowHeight*0.4);
      field.show();
         textSize(18);
         fill(bgcolor);
         textFont(F3);
         textAlign(CENTER, BOTTOM);
         textStart=text('\"ANSWER\" + ENTER', windowWidth/2, windowHeight*0.5);
     } 
//===================================================================================================//
//====================================KEY-PRESS-MODE-CHANGE==========================================//        
//===================================================================================================//     
       else if (keyCode === 32 && mode == 3) {
       saveCanvas('TextualNonsense', 'jpg');
//===================================================================================================//
//====================================KEY-PRESS-MODE-CHANGE==========================================//        
//===================================================================================================//
     } else if (keyCode === 27 && mode == 1) {
         background(bgbase);
         textSize(18);
         fill(bgcolor);
         textFont(F3);
         textAlign(CENTER, BOTTOM);
         textStart=text(start, windowWidth/2, windowHeight*0.5);
         field.hide();
      }   else if (keyCode === ENTER && mode == 1) {
         mode = 3;
       }
      //add copyWrite object here for ESC
      noStroke();
      //fill(180);
      //textDisplay.push(new copyWrite(windowWidth/2, windowHeight*0.96, 'ESC to restart at any point | ENTER to generate response', 12, F2));
     
     }
//===================================================================================================//
//=======================================CLASS-CONSTRUCTORS==========================================//        
//===================================================================================================//
class generative {
    constructor (x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
    display () {
      fill(bgbase);
      strokeWeight(random(x4));
      
      //stroke(255, 120, 0, this.lifespan);
      //potentially adding fill or some color here
      ellipse(this.x, this.y, this.z);
    }
}

class copyWrite {
  constructor (x, y, letter, size, font) {
    this.x= x;
    this.y= y;
    this.letter= letter;
    this.textSize= size;
    this.textFont= font;
  }
  display (){
    smooth();
    textSize(this.textSize);
    textFont(this.textFont);
    noStroke();
    text(this.letter, this.x, this.y);
  }
}
