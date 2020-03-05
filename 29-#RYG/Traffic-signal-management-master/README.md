# Traffic-signal-management

PROBLEM STATEMNET:

 In our traditional traffic signal system, the indicators were set for fixed time. Though the time intervals are fixed after assessing the average lane traffic, many times it is found that, vehicles in one direction have to unnecessarily wait for the Green signal even though no other vehicles in the opposite directions. This creates a problem for emergency vehicles. An intelligent traffic signal system is to be developed, that asses the real time traffic in that road/lane and control the traffic to avoid unnecessary waiting time. Through this information, we can also give directions to emergency vehicle through bot.

STEPS TO BE FOLLOWED:

1)First to run this project run the file traffic_video.py</br>
2)When the file is runnning you can find the first step as uploading the video (https://learnml.s3.eu-north-1.amazonaws.com/road.mp4)</br>

3)Then we start with background subtraction from the video which results the foreground image by removing the background.</br>

4)Object detection by contours</br>

5)Then we filter this result and remove the noises and disturbances present in the pre-acquired image.</br>

6)Building processing pipeline for further data manipulation</br>

7)In our final step it counts the number of vehicles going through and calculating the traffic density.</br>

Demo video on how the sensor works
link:https://youtu.be/_dzZxWf6W2U
