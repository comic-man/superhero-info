from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import requests

app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)  # Enable CORS

# Superhero API key and base URL
API_KEY = "89e9bb2a28a8870a2b32ae61e214dc76"
BASE_URL = "https://superheroapi.com/api"


# Route to serve the homepage
@app.route('/')
def index():
    return render_template('index.html')


# Route to fetch superhero data by ID or full name
@app.route('/SuperHeroAPICall', methods=['POST'])
def get_superhero():
    superhero_id = request.form.get('superhero_id')  # Get superhero ID from the form
    full_name = request.form.get('full_name')

    if superhero_id:
        url = f"{BASE_URL}/{API_KEY}/{superhero_id}"
    elif full_name:
        url = f"{BASE_URL}/{API_KEY}/search/{full_name}"
    else:
        return jsonify({'error': 'No superhero ID provided'}), 400

    # Make the API call to fetch superhero data
    response = requests.get(url)

    if response.status_code == 200:
        return jsonify(response.json())  # Send the superhero data as JSON
    else:
        return jsonify({'error': 'Superhero not found'}), 404


# Route to search character by name and return character ID
@app.route('/name', methods=['GET'])
def search_by_name():
    name = request.args.get('name')
    if not name:
        return jsonify({'error': 'Name parameter is required'}), 400

    url = f"{BASE_URL}/{API_KEY}/search/{name}"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        if 'results' in data:
            character_ids = [character['id'] for character in data['results']]
            return jsonify({'character_ids': character_ids})
        else:
            return jsonify({'error': 'Character not found'}), 404
    else:
        return jsonify({'error': 'API request failed'}), 500


if __name__ == '__main__':
    app.run(debug=True)
