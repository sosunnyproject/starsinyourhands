import oscP5.*;
import netP5.*;
OscP5 oscP5;
NetAddress universe2;

//-------------------------------------------
//Arduino to Processing----------------------
import processing.serial.*; //import the Serial library

int end = 10;    // the number 10 is ASCII for linefeed (end of serial.println), later we will look for this to break up individual messages
String serial;   // declare a new string called 'serial' . A string is a sequence of characters (data type know as "char")
Serial port;  // The serial port, this is a new instance of the Serial class (an Object)
//---------------------------------------------

int a0val, a1val, a2val, a3val, a4val;
float a0, a1, a2, a3, a4;

void setup() {
  size(400,400);
  frameRate(25);
  
  /* start oscP5, listening for incoming messages at port 12000 */
  oscP5 = new OscP5(this,9000);  
 // myRemoteLocation = new NetAddress("127.0.0.1",7700);
  universe2 = new NetAddress("127.0.0.1",7701);

  //----------------------------------------
  //Arduino to Processing
  port = new Serial(this, Serial.list()[0], 9600); // initializing the object by assigning a port and baud rate (must match that of Arduino)
  port.clear();  // function from serial library that throws out the first reading, in case we started reading in the middle of a string from Arduino
  serial = port.readStringUntil(end); // function that reads the string from serial port until a println and then assigns string to our string variable (called 'serial')
  serial = null; // initially, the string will be null (empty)
  //----------------------------------------
}


void draw() {
  background(0);  
    //Arduino to Processing Serial
   while (port.available() > 0) { //as long as there is data coming from serial port, read it and store it 
    serial = port.readStringUntil(end);
  }
    if (serial != null) {  //if the string is not empty, print the following
    
    /*  Note: the split function used below is not necessary if sending only a single variable. However, it is useful for parsing (separating) messages when
        reading from multiple inputs in Arduino. Below is example code for an Arduino sketch
    */
      //Spliting the String from Arduino into array.
      //Making substrings out of arrays, so that Processing doesn't read ln
      String[] a = split(serial, ",");  //a new array (called 'a') that stores values into separate cells (separated by commas specified in your Arduino program)
      String A1 = a[1].substring(0,1);  
      String A2 = a[2].substring(0,1);
      String A3 = a[3].substring(0,1);
      String A4 = a[4].substring(0,1);
      println(a[0]+","+a[1]+","+a[2]+","+a[3]+","+a[4]); 
      
      //Converting strings into INT
      a0val = parseInt(a[0]);   //now this is potPin value
      a1val = parseInt(A1);
      a2val = parseInt(A2);
      a3val = parseInt(A3);
      a4val = parseInt(A4);
      
      //Mapping single digit values into float values
      a0 = map(a0val, 0, 9, 0, 1);
      a1 = map(a1val, 0, 9, 0, 1);
      a2 = map(a2val, 0, 9, 0, 1);
      a3 = map(a3val, 0, 9, 0, 1);
      a4 = map(a4val, 0, 9, 0, 1); 
    }

  OscMessage pan = new OscMessage("/2/fader1");
  OscMessage tilt = new OscMessage("/2/fader2");
  OscMessage col = new OscMessage("/2/fader3");
  OscMessage gobo = new OscMessage("/2/fader4");
  OscMessage goboMove = new OscMessage("/2/fader5");

  pan.add(a0); /* Map the mouse position to a value between 0 and 1 */
  tilt.add(a1);
  col.add(a2);
  gobo.add(a3);
  goboMove.add(a4);
 
   /* send the message */
  oscP5.send(pan, universe2);
  oscP5.send(tilt, universe2);
  oscP5.send(col, universe2);
  oscP5.send(gobo, universe2);
  oscP5.send(goboMove, universe2);
 
  print("### sent an osc message.");
  print(" addrpattern: "+ pan.addrPattern());
  println(" typetag: "+ pan.typetag());
  println(" value: "+ pan.get(0).floatValue());
//  }
}

/* incoming osc message are forwarded to the oscEvent method. */
void oscEvent(OscMessage theOscMessage) {
  /* print the address pattern and the typetag of the received OscMessage */
  //print("### received an osc message.");
  //print(" addrpattern: "+theOscMessage.addrPattern());
  //println(" typetag: "+theOscMessage.typetag());
  //println(" value: "+theOscMessage.get(0).floatValue());
}