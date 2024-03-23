from flask import Flask, jsonify
from dotenv import load_dotenv
import os

import requests

load_dotenv()  # take environment variables from .env.
app = Flask(__name__)
url = "http://api.nessieisreal.com"
api_key = os.getenv("API_KEY")


@app.route('/')
def test():
    return 'Hello, World!'

@app.route('/customers')
def get_all_customers():
    res = requests.get(url + "/customers?key=" + api_key)
    return jsonify(res.json())

# Get a customer by id
@app.route('/customers/<customer_id>')
def get_customer_by_id(customer_id):
    res = requests.get(url + "/customers/" + customer_id + "?key=" + api_key)
    return jsonify(res.json())

# post a new customer
@app.route('/customers', methods=['POST'])
def create_customer():
    data = requests.get_json()
    res = requests.post(url + "/customers?key=" + api_key, json=data)
    return jsonify(res.json())

if __name__ == '__main__':
    app.run(port=os.getenv('PORT', 5000), debug=os.getenv('DEBUG', True))
