# HackBout-2020

HackBout 2020 submission

## Team ID: 16
## Team name: pip install npm
## Track: Open innovation

# Basic Idea

There has been a huge upsurge of vehicles in India, with it comes the problem of people parking irresponsibly on the roads. Also, vehicles are abandoned after being used for illegal activities or sometimes a vehicle breaks down in the middle of a road.

To solve these issues, we have come up with an app to report such vehicles by taking a picture of it. Vehicle detection is performed on the image using Tensorflow-lite on the phone and the user can select which vehicle to report through the interface. After submitting the picture, the cloud server performs number plate detection and OCR on the image to extract the number plate from it. The user can then submit more info about the vehicle such as severity of report, vehicle model, vehicle company, type of report (Abandonment, Illegal Parking or Temporary Breakdown)

![Architecture](images/Architecture.png)

# Mobile App

This was made using React Native CLI. Firstly, the app has login support which is implemented using Firebase (with support for "Forgot Password" email link too). After logging in, the user can choose an image to upload and an interface will be shown with the detected vehicles and the user can click on the vehicle they want to report. The image is uploaded to a Firebase storage bucket and other details are pushed to a Firebase database. Then the user is asked to enter additional details, some details like vehicle type and number plate are automatically filled by Deep Learning models from either TF-lite or cloud-based object detection.

![Frontend](images/Frontend.png)

# Geospatial Analysis

To get the user IDs of the users in a 5km radius when someone reports a vehicle, we use geopandas. Firstly, the co-ordinates are converted from a EPSG:4326 projection (normal latitude longitude projection) to a EPSG:3395 projection (which is the mercator projection) so that distances between two points can be calculated easily in meters. All the user's data is first entered into a GeoDataFrame and using R-trees, the points in the radius can be easily found out. This allows us to send a notification to all the users in a certain radius around which the vehicle was reported. The notifications are sent through Firebase Cloud Messaging (FCM).

![GeoSpatial Indexing and MapMyIndia](images/GeoSpatial-Indexing-and-MapMyIndia.png)

# Number plate detection and OCR

After the images are sent to the database, a cloud API detects the number plate in the image and crops out that part. The detection is done through a custom trained Tensorflow-based SSD MobileNet v2 model which was trained on around 700 images. After the number plate is cropped, it is sent to a Google Cloud Vision Text Detection API which extracts the text from it. Thus the registration number is extracted and sent to the app.

![Object detection](images/Tflite-OCR-model.png)

# OSINT (Open Source Intelligence)

Since the registration details of any vehicle is public, it is easy to get details of the vehicle and its owner. We scrape [vahan](https://vahan.nic.in/nrservices/faces/user/searchstatus.xhtml) using Selenium to get the details of a registration number. This allows authorities to quickly identify the person whose vehicle it is. Also, using Selenium on Truecaller we can find the person's phone number and email.

# Database Portal for Police

A web application for administrators and police to access the database. It also includes a Map My India API integration to visualise the reports on a map.

![Database Portal](images/Website-for-Police-Login.png)

Checkout the complete code [here](https://github.com/Samyak2/HackBout-2020/).
