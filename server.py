from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/add-url', methods=['POST'])
def add_url():
    data = request.get_json()
    url = data.get('url')
    if not url:
        return jsonify({'error': 'URL is required'}), 400

    with open('sites.txt', 'a') as f:
        f.write(url + '\n')

    return jsonify({'message': 'URL added successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
