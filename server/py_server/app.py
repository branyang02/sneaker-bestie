# app.py
from flask import Flask, request, jsonify
from recommend import Recommend
import requests
import json
from ContentFiltering import ContentFilter
from CollaborativeFiltering import CollaborativeFiltering

app = Flask(__name__)


@app.route("/recommend", methods=["POST"])
def recommend():
    """
    1. Get user preferences from the database
    2. Get user view history from the database
    3. Recommend
    4. Add to recommend collection
    """

    # Read the nodemon.json file
    with open("nodemon.json", "r") as f:
        config = json.load(f)
    port = config["env"]["PORT"]
    data = request.get_json()
    user_id = data.get("userID")
    print("This is the User ID: ", user_id)

    # Content Filtering
    content_filtering = ContentFilter(user_id, port)
    print(
        "these are the new recommendations: ", content_filtering.get_recommendations(10)
    )

    # Collaborative Filtering
    collaborative_filtering = CollaborativeFiltering(user_id, port)

    return jsonify(
        [
            {
                "sneaker_id": "64be7e2bcdaa0bdaa603d329",
            },
            {
                "sneaker_id": "64be7f6fda5bca158b505dd4",
            },
        ]
    )

    # server_address = "http://localhost:{}".format(port)

    # # Get user preferences from the database
    # try:
    #     response = requests.get(
    #         server_address + "/user-preferences/view-preferences",
    #         headers={"Authorization": f"Bearer {token}"},
    #         params={"userID": user_id},
    #     )
    #     response.raise_for_status()
    #     user_preferences = response.json()
    #     print("This is the user preference: ", user_preferences)
    # except requests.exceptions.RequestException as e:
    #     print(e)
    #     return (
    #         jsonify({"error": "Failed to fetch user preferences from Node.js server"}),
    #         500,
    #     )

    # # Get user view history from the database
    # try:
    #     response = requests.get(
    #         server_address + "/view-history/all-view-history",
    #         headers={"Authorization": f"Bearer {token}"},
    #         params={"userID": user_id},
    #     )
    #     response.raise_for_status()
    #     user_view_history = response.json()
    #     print("This is the user view history: ", user_view_history)
    # except requests.exceptions.RequestException as e:
    #     print(e)
    #     user_view_history = None

    # if user_view_history is None:
    #     # do a simple search based on user preferences
    #     pass
    # else:
    #     # recommend
    #     pass
    # # Recommend

    # print(content_filtering.view_history)


if __name__ == "__main__":
    app.run(port=5000, debug=True)
