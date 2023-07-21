import sys
import json
import base64

def recommend_news(user_data):
    print(user_data)
    # # Here you can do whatever you want with your input
    # print(f"User name: {user_data['userName']}")
    # print("Categories:")
    # for category in user_data['categories']:
    #     print(f"- {category}")

if __name__ == "__main__":
    base64_input = sys.argv[1]
    decoded_input = base64.b64decode(base64_input).decode()
    user_data = json.loads(decoded_input)  # Convert JSON string back to dictionary
    recommend_news(user_data)
