const int r = 9;              
const int y = 10;          
const int g = 11;          
const int sec = 1000;       
void setup() 
  {
    pinMode(r,OUTPUT);
    pinMode(y,OUTPUT);
    pinMode(g,OUTPUT);
    delay(sec);
  }

void loop()
    {
        digitalWrite(r,HIGH) ;
        delay(sec*5);
        digitalWrite(r,LOW) ;
        digitalWrite(y,HIGH) ;
        delay(sec*5);
        digitalWrite(y,LOW) ;
        digitalWrite(g,HIGH) ;
        delay(sec*5);
        digitalWrite(g,LOW) ;
        
    }
