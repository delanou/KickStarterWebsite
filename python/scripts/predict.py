import pickle
import sys
import os
from sklearn import tree
import graphviz 
import json

if __name__ == "__main__":
    # get the arguments
    classifier = None
    dataArray = [int(element) for element in sys.argv[1].split(",")]

    FAIL_INDEX = 0
    PASS_INDEX = 1

    #print("data array = " + str(dataArray))

    # load the model from the pickle file
    PICKLE_PATH = os.path.join(os.getcwd(), "python", "classifier", "decisionTree.p") 
    #print("PICKLE_PATH = " + str(PICKLE_PATH))

    with open(PICKLE_PATH, "rb") as pickleFile:

        #print("in predict.py")
        classifier = pickle.load(pickleFile)
        #dot_data = tree.export_graphviz(classifier, out_file="classifier.dot", feature_names=["name", "category", "goal", "deadlineMonth", "launchedMonth", "pledgedAmount", "backers", "country"]) 

        # call the predict method of the classifier
        #prediction = classifier.predict([dataArray])
        probabilities = classifier.predict_proba([dataArray])[0]

        prediction = -1

        if probabilities[PASS_INDEX] > probabilities[FAIL_INDEX]:
            prediction = 1
        else:
            prediction = 0

        # print out result
        #print("before prediction")
        #print("done with predicting the probability")
        print(json.dumps({"prediction": prediction, "probability": probabilities[prediction]}))
        #print("after prediction")  