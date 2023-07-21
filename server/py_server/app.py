# py_server/app.py
from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    user_name = data.get('userName')
    categories = data.get('categories')

    # Generate recommendations based on user_name and categories...
    recommendations = ["news1", "news2", "news3"]

    return jsonify(recommendations)


if __name__ == '__main__':
    app.run(port=5000)
