import sys
import requests
from bs4 import BeautifulSoup


url = sys.argv[1]

rawContent = requests.get(url).content
print(url)

html = BeautifulSoup(rawContent, 'html.parser')
print(html)