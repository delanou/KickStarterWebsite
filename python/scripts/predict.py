import pickle
import sys
import os
from sklearn import tree
import graphviz 

# get the arguments
classifier = None
dataArray = [int(element) for element in sys.argv[1].split(",")]

#print("data array = " + str(dataArray))

# load the model from the pickle file
PICKLE_PATH = os.path.join(os.getcwd(), "python", "classifier", "decisionTree.p") 
with open(PICKLE_PATH, "rb") as pickleFile:

    #print("in predict.py")
    classifier = pickle.load(pickleFile)
    #dot_data = tree.export_graphviz(classifier, out_file="classifier.dot", feature_names=["name", "category", "goal", "deadlineMonth", "launchedMonth", "pledgedAmount", "backers", "country"]) 

    # call the predict method of the classifier
    prediction = classifier.predict([dataArray])

    # print out result
    #print("before prediction")
    print(prediction[0])
    #print("after prediction")