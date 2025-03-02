from flask import Flask, request, jsonify
import requests
import threading
import random
import string

app = Flask(__name__)

def generate_random_url():
    letters = string.ascii_lowercase
    random_domain = ''.join(random.choice(letters) for i in range(8))
    return f"http://{random_domain}.com"

def is_valid_url(url):
    try:
        response = requests.get(url, timeout=5)
        return response.status_code == 200
    except requests.RequestException:
        return False

def crawl_and_update():
    with open("sites.txt", "a") as file:
        for _ in range(10):  # Adjust the number of URLs to crawl
            url = generate_random_url()
            if is_valid_url(url):
                file.write(url + "\n")
                print(f"Added: {url}")

@app.route('/add-url', methods=['POST'])
def add_url():
    data = request.get_json()
    url = data.get('url')
    if not url:
        return jsonify({'error': 'URL is required'}), 400

    with open('sites.txt', 'a') as f:
        f.write(url + '\n')

    return jsonify({'message': 'URL added successfully'}), 200

@app.route('/run-crawler', methods=['GET'])
def run_crawler():
    threading.Thread(target=crawl_and_update).start()
    return jsonify({'message': 'Crawler started'}), 200

if __name__ == '__main__':
    app.run(debug=True)
