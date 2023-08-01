import openai

openai.api_key = "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"
messages = [{"role": "system", "content": "You are a intelligent assistant."}]

n = 0
while True:
    if n == 0:
        message = """
generate data that looks like this for a different product, make sure your productId is different. All the different fields could be different. Random all fields. 
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
    else:
        message = "Give me 8 more. All of them should be sneaker related. Add a comma at the end of each one."
    if message:
        messages.append(
            {"role": "user", "content": message},
        )
        chat = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)
    reply = chat.choices[0].message.content
    print(f"ChatGPT: {reply}")
    messages.append({"role": "assistant", "content": reply})
    n += 1
