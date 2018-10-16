import sys
import requests
from bs4 import BeautifulSoup

url = sys.argv[1]

requestObject = requests.get(url)
html = requestObject.text
soup = BeautifulSoup(html, 'html.parser')
#print(soup.prettify().encode('UTF-8'))
print(soup.title)

# from here get the title
# pledged amount
# goal
# backers
# deadline month

# can get city -> make api call to determine country -> make api call to get abbreviation

# then navigate to url + /faq
# from here get the launched month