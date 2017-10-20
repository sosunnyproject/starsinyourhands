//3 potentiometers from Arduino
//Serial App should opened


var serial; // variable to hold an instance of the serialport library
var portName = "COM7";

var stepSize, pixSpeed, count;
var potRadius, potColor, potRotate;

//combining with puppy pixels
var img;
var images = [];

function preload() {
  
  // //----------------------
    for (var i = 1; i < 6; i++) {
    images[i] = loadImage("img" + i + ".jpg");
  }
}

function setup() {
 //---------------------------------------
 //serial communication
 serial = new p5.SerialPort(); // make a new instance of the serialport library
 serial.on('list', printList); // set a callback function for the serialport list event
 serial.on('connected', serverConnected);
 serial.on('open', portOpen);
 serial.on('data', serialEvent);
 serial.on('error', serialError);
 serial.on('close', portClose);
 
 serial.list(); // list the serial ports
 serial.open(portName);
 serial.clear();
 //---------------------------------------
 //NextImage
  createCanvas(640, 640); 
  background(0);
  //image(images[1], 0, 0 , windowWidth, windowHeight);
  
  //------------------------------------
  //Drawing Pixels
  noFill();
  frameRate(30);
  colorMode(RGB);
  
  img = loadImage("img1.jpg");
  count = 1;
  stepSize = 20;
  pixSpeed = 10;
}

function serialEvent() {
  //print out the values of the potentiometer, same to Serial Monitor of Arduino
  //to reduce the gap of draw and serial data coming in 
  // read a string from the serial port:
  var inString = serial.readStringUntil('\r\n');
  
  // check to see that there's actually a string there:
  if (inString.length > 0 ) {
    inString = trim(inString);
    var sensors = split(inString, ',');   //split the string of inData
    
    print(sensors[0]);
    if (sensors.length > 2) {       // three input elements [0][1][2]
      potRadius = Number(sensors[0]);
      potColor = Number(sensors[1]);
      potRotate = Number(sensors[2]);
      
      print("stepSize " + potRadius + " color " + potColor + " Speed " + potRotate);

      //potRadius = map(potRadius, 0, 255, 5, 25);
      stepSize = potRadius;

      // potColor = map(potColor, 0, 255, 0, 100);
      
      //potRotate = map(potRotate, 0, 255, 10, 50);
      pixSpeed = potRotate;
    }
  }
}

function draw() {
//  img = images[count];
  
  if (frameCount % 100 === 0 && count !== 6) {
  count++;
  img =  loadImage("img" + count + ".jpg");
  }
  else if(count == 6) {
    count = 1;
  }
  
  img.loadPixels();
  background(255);
  //opens the localhost:3000 window and prints out
 
  //roatePixelsTest

  for (var x = 0; x < img.width; x += stepSize) {
    for (var y = 0; y < img.height; y += stepSize) {
        //index for each pixel[]
       // var ind = y * img.width + x;
  
   push();
   
      //index for the pixel color values, 4 elements in one array of pixels
      var index = ((int(x) + int(y) * img.width) * 4);
    //filling the color for each pixel
      var r = img.pixels[index];
      var g = img.pixels[index+1];
      var b = img.pixels[index+2];
      var c = color(r + potColor * 0.3, g - potColor * 0.5, b + potColor * 0.2);
      stroke(c);
      strokeWeight(3);
      //-----------------------------------
      // rect size
      var avg = (r + g + b) / 3;
      var bright = map(avg, 0, 255, 0, 20);
      //-----------------------------------
      //Redrawing the Pixels and Rotate
      translate(x + 100, y + 100);
      rotate( sin(frameCount * 0.01) * pixSpeed );
      
      rectMode(CENTER);
      rect(0, 0, bright + stepSize/2, bright + stepSize/2);
      //ellipse(0,0, brightness, brightness);
      //triangle(30, 75, 58 + bright, 20 + bright, 86 + bright, 75 + bright);
      
      pop();
    }
  }
}
//-----------------------------------
//Serial Communication ---------------

// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

function serverConnected() {
  print('connected to server');
}

function portOpen() {
  print('the serial port opened');
}


function serialError(err) {
  print('Something went wrong with the serial port');
}

function portClose() {
  print('The serial port close.');
}
 
