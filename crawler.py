import requests
from bs4 import BeautifulSoup
import random
import string

# Function to generate a random URL
def generate_random_url():
    letters = string.ascii_lowercase
    random_domain = ''.join(random.choice(letters) for i in range(8))
    return f"http://{random_domain}.com"

# Function to check if a URL is valid
def is_valid_url(url):
    try:
        response = requests.get(url, timeout=5)
        return response.status_code == 200
    except requests.RequestException:
        return False

# Function to crawl and update sites.txt
def crawl_and_update():
    with open("sites.txt", "a") as file:
        for _ in range(10):  # Adjust the number of URLs to crawl
            url = generate_random_url()
            if is_valid_url(url):
                file.write(url + "\n")
                print(f"Added: {url}")

if __name__ == "__main__":
    crawl_and_update()
