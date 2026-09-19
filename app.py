from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/style.css")
def style():
    return send_from_directory(BASE_DIR, "style.css")


@app.route("/script.js")
def script():
    return send_from_directory(BASE_DIR, "script.js")


@app.route("/api/health")
def health():
    return jsonify({
        "status": "success",
        "message": "Urban Heat Escape is running!"
    })


@app.route("/api/heat-info")
def heat_info():
    return jsonify({
        "heat_level": "High",
        "temperature": 38,
        "recommendation": "Stay hydrated and avoid direct sunlight during peak afternoon hours.",
        "safe": True
    })


if __name__ == "__main__":
    app.run(debug=True)