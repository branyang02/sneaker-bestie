# app.py
from flask import Flask, request, jsonify
from recommend import Recommend
import requests
import json
from ContentFiltering import ContentFilter
from CollaborativeFiltering import CollaborativeFiltering
from TFRS import TFRS

app = Flask(__name__)


@app.route("/recommend", methods=["POST"])
def recommend():
    # Read the nodemon.json file
    with open("nodemon.json", "r") as f:
        config = json.load(f)
    port = config["env"]["PORT"]
    data = request.get_json()
    user_id = data.get("userID")

    print("--------------------")
    # Content Filtering
    content_filter = ContentFilter(user_id, port)
    content_filter_recommendations = content_filter.get_recommendations(10)
    print("Recommendations from Content Filtering \n: ", content_filter_recommendations)

    print("--------------------")
    # Collaborative Filtering
    collab_filter = CollaborativeFiltering(user_id, port)
    user_item_matrix = collab_filter.user_item_matrix
    collab_filter_recommendations = collab_filter.get_recommendations()
    print(
        "Recommendations from Collaborative Filtering \n: ",
        collab_filter_recommendations,
    )

    # print("--------------------")
    # Deep Learning Recommendation
    # tfrs = TFRS(user_item_matrix)
    # tfrs.train(epochs=10)
    # tfrs_recommendations = tfrs.get_recommendations(user_id, n=10)
    # print("TFRS recommendations: ", tfrs_recommendations)

    # Combine recommendations
    recommendations, rec_set = [], set()
    for sneaker_id in content_filter_recommendations:
        if sneaker_id not in rec_set:
            rec_set.add(sneaker_id)
            recommendations.append({"sneaker_id": sneaker_id})
    for sneaker_id in collab_filter_recommendations:
        if sneaker_id not in rec_set:
            rec_set.add(sneaker_id)
            recommendations.append({"sneaker_id": sneaker_id})
    # for sneaker_id in tfrs_recommendations:
    #     recommendations.append({"sneaker_id": sneaker_id})

    print("--------------------")
    print("combined recommendations: \n", recommendations)

    return jsonify(recommendations)


if __name__ == "__main__":
    app.run(port=5000, debug=True)
