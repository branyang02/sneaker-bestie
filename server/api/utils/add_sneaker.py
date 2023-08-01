import openai
import json
import re


openai.api_key = ""
# messages = [{"role": "system", "content": "You are a intelligent assistant."}]

import requests


def call_api_for_sneaker(data_item, endpoint_url, api_key):
    try:
        response = requests.post(endpoint_url, json=data_item)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error calling the API: {e}")
        return None


while True:
    message = """
generate data that looks like this for a different product, make sure your productId is different. All the different fields could be different. Random all fields. ONLY GIVE ME THE JSON. 
{
    "productId": "bf364c53-eb77-4522-955c-6a6ce952cc6f",
    "urlKey": "purple-hand-bag-leather",
    "styleId": "BY9109",
    "productType": "handbags",
    "title": "Gucci Duchessa Boston Bag",
    "brand": "Nike",
    "productAttributes": {
      "gender": "women",
      "season": "SS21",
      "releaseDate": "2017-09-14",
      "retailPrice": 456,
      "colorway": "String/Black-Villain Red-Neptune Green",
      "color": "purple"
    }
}
"""
    if message:
        messages = [
            {"role": "system", "content": "You are a intelligent assistant."},
            {"role": "user", "content": message},
        ]
        chat = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)
    reply = chat.choices[0].message.content
    print(reply)

    endpoint_url = "http://localhost:1234/sneakers/add-sneaker-from-data"
    # item = json.loads(reply)

    # Use regular expression to find the outer JSON
    pattern = r"{.*?{.*?}.*?}"
    match = re.search(pattern, reply, re.DOTALL)

    if match:
        outer_json = match.group()
        data_dict = json.loads(outer_json)
        print(data_dict)
    else:
        print("No valid JSON data found.")

    response = call_api_for_sneaker(data_dict, endpoint_url, " ")
    if response:
        print("Successfully added sneaker:", response)
    else:
        print("Failed to add sneaker.")

    # messages.append({"role": "assistant", "content": reply}
