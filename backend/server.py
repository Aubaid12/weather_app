from flask import Flask, request, jsonify
import requests
from flask_cors import CORS



app = Flask (__name__)
CORS(app)

@app.route("/weather",methods = ["GET"])
def return_weather():
    city = request.args.get("city")
    API_KEY = "d5949535d8aca23e9a6fb0d540afe8fd"
    base_url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(base_url)
    data = response.json()
    return jsonify(data)
    
app.run(debug = True)

