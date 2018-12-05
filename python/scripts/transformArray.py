import sys
import json
import os
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# gather arguments
arguments = sys.argv

name = arguments[1]
category = arguments[2]
goal = arguments[3]
deadlineMonth = arguments[4]
launchedMonth = arguments[5]
pledgedAmount = arguments[6]
backers = arguments[7]
country = arguments[8]

#print(f"{name},{category},{goal},{deadlineMonth},{launchedMonth},{pledgedAmount},{backers},{country}")

# perform sentiment analysis
sid = SentimentIntensityAnalyzer()
entimentScores = sid.polarity_scores(name)
emotion = max(entimentScores, key=entimentScores.get)

# convert sentiment to numerical
sentimentMapping = ""
sentimentJsonPath = os.path.join(os.getcwd(), "python", "mappings", "title_sentiment.json") 

with open(sentimentJsonPath) as f:
    sentimentMapping = json.loads(f.read())

numericalSentiment = sentimentMapping[emotion]

# convert category to numerical
categoryMapping = ""
categoryJsonPath = os.path.join(os.getcwd(), "python", "mappings", "main_category.json")

with open(categoryJsonPath) as f:
    categoryMapping = json.loads(f.read())

numericalCategory = categoryMapping[category]

# convert country to numerical
countryMapping = ""
countryJsonPath = os.path.join(os.getcwd(), "python", "mappings", "country.json")

with open(countryJsonPath) as f:
    countryMapping = json.loads(f.read())

numericalCountry = countryMapping[country]

"""
result = {
    "main_category": int(numericalCategory),
    "goal": int(goal),
    "pledged": int(pledgedAmount),
    "backers": int(backers),
    "country": int(numericalCountry),
    "title sentiment": int(numericalSentiment),
    "deadline_month": int(deadlineMonth),
    "launched_month": int(launchedMonth)
}
"""


result = ",".join([str(numericalCategory), str(goal), str(pledgedAmount), str(backers), str(numericalCountry), str(numericalSentiment), str(deadlineMonth), str(launchedMonth)])

# CONVERT FROM PYTHON DICTIONARY TO JSON STRING!!!!!!!!!!!
#resultString = json.dumps(result)

print(result)