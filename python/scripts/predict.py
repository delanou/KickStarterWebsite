import pickle
import sys
import os
import json


# get the arguments
classifier = None
data=json.loads(sys.argv[1])

dataArray = []

# load the model from the pickle file
PICKLE_PATH = os.path.join(os.getcwd(), "python", "classifier", "decisionTree.p") 
with open(PICKLE_PATH, "rb") as pickleFile:
    classifier = pickle.load(pickleFile)

    print(classifier)

# call the predict method of the classifier


# print out result