import requests;
import time;
from flask import Flask, render_template, jsonify;
ISS_API = 'http://api.open-notify.org/iss-now.json'

app = Flask(__name__)


def get_location():
    try:
        response = requests.get(ISS_API)
        data = response.json()

        longitude = data['iss_position']['longitude']
        latitude = data['iss_position']['latitude']

        return longitude, latitude
    except Exception as e:
        print("Error fetching ISS location:", e)


@app.route('/')
def index():
      return render_template('index.html')

@app.route('/get_location')
def get_location_api():
    longitude, latitude = get_location()
    if longitude and latitude:
        return jsonify({"longitude": longitude, "latitude": latitude})
    else:
        return jsonify({"error": "Unable to fetch ISS location"})

if __name__=="__main__":
    app.run(debug=True)

