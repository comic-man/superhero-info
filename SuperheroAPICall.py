from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS

# Superhero API key and base URL
API_KEY = "89e9bb2a28a8870a2b32ae61e214dc76"
BASE_URL = "https://superheroapi.com/api"

# Route to serve the homepage
@app.route('/')
def index():
    return render_template('index.html')

# Route to fetch superhero data
@app.route('/SuperHeroAPICall', methods=['POST'])
def get_superhero():
    superhero_id = request.form.get('superhero_id')  # Get superhero ID from the form
    if not superhero_id:
        return jsonify({'error': 'No superhero ID provided'}), 400

    # Make the API call to fetch superhero data
    url = f"{BASE_URL}/{API_KEY}/{superhero_id}"
    response = requests.get(url)

    if response.status_code == 200:
        return jsonify(response.json())  # Send the superhero data as JSON
    else:
        return jsonify({'error': 'Superhero not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)