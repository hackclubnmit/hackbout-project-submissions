# Hackbout_Albatross
This repository is a part of [**Hackbout Hackathon**](https://www.hackbout.tech)

```
    void HackBout(){
        while (36Hrs){
            If (Alive){
                Print ("I ♥‿♥ Hacking at NMIT.");
            }
            else{
                drink_redbull (get_wings);
                continue;
            }
        }
    }
```

In this project we have worked on implementing the **Dynamic Pricing Strategies** into the E-commerce domain. In this project we have worked on **Airbnb open dataset** provided for the **New York city**.


### How to run the project?
 - To run the project on local host the first requirement is a Python3.x environment.
 - Secondly any of the IDE that support the python environment is required. (Jupyter Notebook used here).
 - Clone the repository from the link [https://github.com/paras009/Hackbout_Albatross.git](https://github.com/paras009/Hackbout_Albatross.git)
 - Run all the cells in .ipynb file by keeping the file structure as provided.
 - The final result of the process will result in dynamic pricing of hotel room bookings.


### Steps for Implementation:
 - The data source is taken from the open data published by **Airbnb** at their official website.
 - For the data extracted, **wrangling** is done to make the data clean and understandable to machine.
 - **Exploratory Data Analysis(EDA)** is performed using different graphical analysis to understand the insights from the data.
 - **Feature Engineering** is implemented on various features of the dataset to get the importance of each feature present in the data.
 - Now the clean data is used to implement **Machine Learning training** to the various regression models and the final ouptut is the **dynamic pricing predictions** for all the hotels. To get the model accuracy, **R2-score** for each model is calculated.
 - Total of 5 Regression models have been implemented, out of which **ElasticNet Regression Model** showed the least Loss score and out-performed the other models.


### Final Result:

<img src="results.png" alt="alt text" width="800"/>

