import processing.serial.*;
Serial myPort;

String inputVal = "";
Float sensorVal = 0.0;

void setup(){
  size(300, 300);
  myPort = new Serial(this, "COM4", 9600);
  myPort.bufferUntil('\n');
}
void serialEvent (Serial myPort){
  if ( myPort.available() > 0) {
    inputVal = myPort.readStringUntil('\n');
  }
  
  try {
    sensorVal = Float.valueOf(inputVal.trim());
  }
  catch(Exception e) {
  }
  
  sensorVal = (sensorVal/1024) * 256;
    
  println(sensorVal);
}

void draw(){
  background(sensorVal,0,0); 
    
  if(mousePressed && (mouseButton == LEFT)){
    myPort.write('1');
  }
  if (mousePressed && (mouseButton == RIGHT)){
    myPort.write('0');
  }    
}
