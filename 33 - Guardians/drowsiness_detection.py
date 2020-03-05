import os,cv2
from keras.models import load_model
from pygame import mixer
import time

mixer.init()
sound = mixer.Sound('alarm.wav')

def eye_detection(img):
  """
  returns the detected eyes from the given image.
  """  
  face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

  eye_cascade = cv2.CascadeClassifier('haarcascade_eye.xml')
  final=[]
  gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
  face = face_cascade.detectMultiScale(gray, 1.05, 3)
  for (x,y,w,h) in face:
    roi_gray = gray[y:y+h, x:x+w]
    roi_colour = img[y:y+h, x:x+w]
    eyes = eye_cascade.detectMultiScale(roi_gray)
    for (x,y,w,h) in eyes:
      cv2.rectangle(roi_colour , (x, y), (x+w, y+h), (0, 127, 255), 2)
      final.append(roi_colour[y:y+h , x : x+w])
      cv2.imshow('00',roi_colour[y:y+h , x : x+w])
      cv2.waitKey(0)
      if(len(final)==2):
        break
  return final
if __name__=="__main__":
	cap = cv2.VideoCapture('kal.mp4')
	score = 0
	while(1):
    	ret , img = cap.read()
    	img1,img2 = eye_detection(img)
		model = load_model(final.h5)
		if (model.predict(img1) == 0):
			score += 1
		else:
			score -= 1
		if(score > 20):
			sound.play()
		elif score < 0:
			score = 0
		cv2.imshow('frame',frame)
    	if cv2.waitKey(1) & 0xFF == ord('q'):
        	break
		
