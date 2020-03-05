#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
get_ipython().run_line_magic('matplotlib', 'inline')

#importing dataset
aut = pd.read_csv('dataset.csv')
aut.head(6)#slicing
X = aut.iloc[:, :-1].values
y = aut.iloc[:, 20].values#one hot encoding to avoid strings
for a in range(0, 703):
    if y[a] == "NO":
        y[a] = 0
    else:
        y[a] = 1
y = y.astype(int)for b in range(0, 703):
    if X[b][11] ==  'm':
        X[b][11] = 1
    else:
        X[b][11] = 0
    
    if X[b][13] == 'no':
        X[b][13] = 0
    else:
        X[b][13] = 1
        
    if X[b][14] == 'no':
        X[b][14] = 0
    else:
        X[b][14] = 1
        
    if X[b][16] == 'no':
        X[b][16] = 0
    else:
        X[b][16] = 1

        
from sklearn.preprocessing import LabelEncoder
labelencoder_X = LabelEncoder()

#label encoding

X[:, 15] = labelencoder_X.fit_transform(X[:, 15])
X[:, 19] = labelencoder_X.fit_transform(X[:, 19])
        
X = np.delete(X, 12, 1)
X = np.delete(X, 17, 1)

for c in range(0, 703):
    if X[c][10] == '?':
        X[c][10] = 0
        
X = X.astype(int)#spliting train and test dataset 
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.27)

import keras
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import Dropout

classifier = Sequential()
#creating neural network
#binary_crossentropy measures performance of model whose output is in the range (0,1) 
classifier.add(Dense(15, input_shape = (18,), activation = 'relu'))
classifier.add(Dropout(0.2))
classifier.add(Dense(15, activation = 'relu'))
classifier.add(Dropout(0.4))
classifier.add(Dense(1, activation = 'sigmoid'))
classifier.compile(optimizer = 'adam', loss = 'binary_crossentropy', metrics = ['accuracy'])

#train model
classifier.fit(X_train, y_train, batch_size = 10, nb_epoch = 1000)
y_pred = classifier.predict(X_test)
y_pred = (y_pred > 0.5)

#performance of classifier
from sklearn.metrics import confusion_matrix
cm = confusion_matrix(y_test, y_pred)

#balance between recall and precision 
from sklearn.metrics import f1_score
f1_score(y_test, y_pred, average='binary')y_pred=aut.iloc[:, 20].valuesy_predy_pred[2]for a in range(0, 703):
    if y_pred[a] == "NO":
        y_pred[a] = 0
    else:
        y_pred[a] = 1
y_pred = y_pred.astype(int)y_pred

