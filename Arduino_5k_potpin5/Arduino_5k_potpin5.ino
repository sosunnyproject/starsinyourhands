/*
  Modified from Arduino public example: Analog input, analog output, serial output by Tom Igoe
Original Sketch memo:
 Reads an analog input pin, maps the result to a range from 0 to 255
 and uses the result to set the pulsewidth modulation (PWM) of an output pin.
 Also prints the results to the serial monitor.

 The circuit:
 * potentiometer connected to analog pin 0.
   Center pin of the potentiometer goes to the analog pin.
   side pins of the potentiometer go to +5V and ground
 * LED connected from digital pin 9 to ground

 */

// These constants won't change.  They're used to give names
// to the pins used:
const int pin1 = A0;
const int pin2 = A1;
const int pin3 = A2;
const int pin4 = A3;
const int pin5 = A4; 

int val1 = 0;        // value read from the pot
int val2 = 0;        // value read from the pot
int val3 = 0;        // value read from the pot
int val4 = 0;        // value read from the pot
int val5 = 0;  
String output1;        // value output to the PWM (analog out)
String output2;    
String output3;    
String output4;    
String output5;    


void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
  pinMode(pin1, INPUT);
  pinMode(pin2, INPUT);
  pinMode(pin3, INPUT);
  pinMode(pin4, INPUT);
  pinMode(pin5, INPUT);
}

void loop() {
  // read the analog in value:
  val1 = analogRead(pin1);
  val2 = analogRead(pin2);
  val3 = analogRead(pin3);
  val4 = analogRead(pin4);
  val5 = analogRead(pin5);
  
  // map it to the range of the analog out:
  val1 = map(val1, 0, 1023, 0, 9);
  val2 = map(val2, 0, 1023, 0, 9);
  val3 = map(val3, 0, 1023, 0, 9);
  val4 = map(val4, 0, 1023, 0, 9);
  val5 = map(val5, 0, 1023, 0, 9);

  //Change to the String to println to Processing Serial Comm
  output1 = String(val1);
  output2 = String(val2);
  output3 = String(val3);
  output4 = String(val4);
  output5 = String(val5);  
//  
  // print the results to the serial monitor:
  Serial.println(output1 + "," + output2 + "," + output3 + "," + output4 + "," + output5);

  delay(5);
  //delay may or may not help what you want to achieve

 //Ignore the code below..
  // wait 2 milliseconds before the next loop
  // for the analog-to-digital converter to settle
  // after the last reading:
// readAndSendPotentiometerDataIfChanged();
}

//void readAndSendPotentiometerDataIfChanged(void) {
//
//  //Potentiometer One
//  int newPotentiometerOneValue = analogRead(A0) / 10.2;   
//  if (newPotentiometerOneValue != lastPotentiometerOneValue) {
//      Serial.print("!pos1");
//      Serial.print(newPotentiometerOneValue);
//      Serial.print(";");
//      lastPotentiometerOneValue = newPotentiometerOneValue;
//  }
//
//  //Potentiometer Two
//  int newPotentiometerTwoValue = analogRead(A1) / 10.2; 
//  if (newPotentiometerTwoValue != lastPotentiometerTwoValue) {
//      Serial.print("!pos2");
//      Serial.print(newPotentiometerTwoValue);
//      Serial.print(";");
//      lastPotentiometerTwoValue = newPotentiometerTwoValue;
//  }
