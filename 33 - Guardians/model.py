# Convolutional Neural Network

# Part 1 - Building CNN

# Importing the Keras libraries and packages
from keras.models import Sequential
from keras.layers import *

# Initialising the CNN
classifier = Sequential()

# Step 1 - Convolution
classifier.add(Convolution2D(32, 3, 3, input_shape = (24,24,3), activation = 'relu')) # For tensorflow backend but For Theano backend input_shape(3,64,64)      
classifier.add(BatchNormalization())
# Step 2 - Pooling and adding extra convolutional
classifier.add(MaxPooling2D(pool_size=(1,1)))                                
classifier.add(Convolution2D(32, 3, 3, activation = 'relu'))
classifier.add(BatchNormalization())
classifier.add(MaxPooling2D(pool_size=(1,1)))
# Step 3 - Flattening
Dropout(0.1)
classifier.add(Flatten())

# Step 4 - Full Connection

classifier.add(Dense(output_dim = 128, activation = 'relu'))
Dropout(0.2)
classifier.add(Dense(output_dim = 1, activation = 'sigmoid'))

# Compiling the CNN
classifier.compile(optimizer = 'adam', loss = 'binary_crossentropy', metrics = ['accuracy'])

# Part 2 - Fitting the CNN to the images
# Image augmentation should be done to avoid overfitting
# below code should be taken from "https://keras.io/preprocessing/image/"
from keras.preprocessing.image import ImageDataGenerator

train_datagen = ImageDataGenerator(
        rescale=1./255,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True)

test_datagen = ImageDataGenerator(rescale=1./255)

training_set = train_datagen.flow_from_directory(
        'roDataset/training_set',
        target_size=(24, 24),
        batch_size=16,
	shuffle = True,
        class_mode='binary')

test_set = test_datagen.flow_from_directory(
        'roDataset/test_set',
        target_size=(24, 24),
	shuffle = True,
	batch_size=16,
        class_mode='binary')

classifier.fit_generator(
        training_set,
        steps_per_epoch=len(training_set.classes)//16,
        epochs=10,
        validation_data=test_set,
        validation_steps=len(test_set.classes)//16, verbose = 1)
classifier.save('final.h5')
