# app.py
from flask import Flask, request, jsonify
from recommend import Recommend

app = Flask(__name__)


@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    user_info = data.get("user_info", {})
    recommend = Recommend(user_info)
    recommendations = recommend.get_recommendations()
    return jsonify(recommendations)


if __name__ == "__main__":
    app.run(port=5000)
