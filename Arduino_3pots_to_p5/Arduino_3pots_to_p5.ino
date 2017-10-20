//ITPsummerProject
//Fade in and out the LED of the knob/button
//knob sending the signal to the master to change the color

int pot1, pot2, pot3; //analog pin used to connect the potentiometer
int map1, map2, map3;
String m1, m2, m3;

void setup() {
  Serial.begin(9600);
}

void loop() {

  //-------------------------------------
  //Potentiometer Value
  pot1 = analogRead(A1);
  pot2 = analogRead(A3);
  pot3 = analogRead(A5);
  
  int map1= map(pot1, 0 , 1023, 8, 25);
  int map2= map(pot2, 0 , 1023, 0, 255);
  int map3= map(pot3, 0 , 1023, 10, 50);

  m1 = String(map1);
  m2 = String(map2);
  m3 = String(map3);

  Serial.print(m1);
  Serial.print(",");
  Serial.print(m2);
  Serial.print(",");
  Serial.println(m3);

  delay(100);
}
