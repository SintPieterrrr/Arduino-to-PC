int led = 7;
int prevVal;
int val;


void setup() {
  pinMode(led, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if(Serial.available() > 0) {
    char ledState = Serial.read();
    if(ledState == '1'){
      digitalWrite(led, HIGH);
    }
    if(ledState == '0'){
      digitalWrite(led, LOW);
    }
  }

  val = round(analogRead(A0));
 
  if(val != prevVal) {
    prevVal = val;
    Serial.println(val);
  }
  delay(100);
}
