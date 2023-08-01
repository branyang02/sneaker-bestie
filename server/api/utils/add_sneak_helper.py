import requests


def call_api_for_sneaker(data_item, endpoint_url, api_key):
    try:
        response = requests.post(endpoint_url, json=data_item)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error calling the API: {e}")
        return None


def main():
    api_key = "YOUR_API_KEY_HERE"
    endpoint_url = "http://localhost:1234/sneakers/add-sneaker-from-data"

    data = [
        {
    "productId": "3e1f788a-132b-42de-b67a-4cd9fb7d06b3",
    "urlKey": "grey-running-shoes",
    "styleId": "MN3456",
    "productType": "running shoes",
    "title": "Under Armour HOVR Phantom 2",
    "brand": "Under Armour",
    "productAttributes": {
      "gender": "men",
      "season": "FW21",
      "releaseDate": "2021-03-10",
      "retailPrice": 149,
      "colorway": "Mod Gray/Black",
      "color": "grey"
    }
},
{
    "productId": "9a4e4ead-1be1-4d90-b031-77944aa8c686",
    "urlKey": "white-casual-sneakers",
    "styleId": "OP4567",
    "productType": "casual sneakers",
    "title": "Superga 2750 Cotu Classic",
    "brand": "Superga",
    "productAttributes": {
      "gender": "unisex",
      "season": "SS20",
      "releaseDate": "2019-05-01",
      "retailPrice": 65,
      "colorway": "White",
      "color": "white"
    }
},
{
    "productId": "688f9eaf-1157-44de-9d16-5ecf6a3dd62d",
    "urlKey": "navy-blue-skate-shoes",
    "styleId": "QR5678",
    "productType": "skate shoes",
    "title": "DC Shoes Court Graffik",
    "brand": "DC Shoes",
    "productAttributes": {
      "gender": "men",
      "season": "FW20",
      "releaseDate": "2018-09-05",
      "retailPrice": 75,
      "colorway": "Navy Blue",
      "color": "blue"
    }
},
{
    "productId": "cfb9ba4d-038c-49e6-a745-39aa6f449f60",
    "urlKey": "black-basketball-shoes",
    "styleId": "ST7890",
    "productType": "basketball shoes",
    "title": "Under Armour Curry 7",
    "brand": "Under Armour",
    "productAttributes": {
      "gender": "men",
      "season": "SS21",
      "releaseDate": "2020-01-20",
      "retailPrice": 129,
      "colorway": "Black/Red",
      "color": "black"
    }
},
{
    "productId": "5a1eab7f-72e7-4c6d-a7d4-a0e46c6ff6d9",
    "urlKey": "purple-tennis-shoes",
    "styleId": "UV9012",
    "productType": "tennis shoes",
    "title": "Wilson Rush Pro 3.0",
    "brand": "Wilson",
    "productAttributes": {
      "gender": "unisex",
      "season": "FW19",
      "releaseDate": "2017-11-30",
      "retailPrice": 109,
      "colorway": "Purple/Black",
      "color": "purple"
    }
},
{
    "productId": "bd1ff4df-be9d-4178-a3c0-7422e29102f9",
    "urlKey": "green-athletic-shoes",
    "styleId": "WZ1234",
    "productType": "athletic shoes",
    "title": "Salomon Speedcross 5",
    "brand": "Salomon",
    "productAttributes": {
      "gender": "unisex",
      "season": "SS20",
      "releaseDate": "2019-09-02",
      "retailPrice": 159,
      "colorway": "Green",
      "color": "green"
    }
},
{
    "productId": "07e59f3c-745b-4f1c-b542-ef184bd44a96",
    "urlKey": "pink-running-sneakers",
    "styleId": "XY5678",
    "productType": "running sneakers",
    "title": "ASICS Gel-Kayano 27",
    "brand": "ASICS",
    "productAttributes": {
      "gender": "women",
      "season": "FW21",
      "releaseDate": "2020-05-18",
      "retailPrice": 159,
      "colorway": "Pink Cameo/Pink Cameo",
      "color": "pink"
    }
},
{
    "productId": "9997317a-63e1-4ec4-91d9-9c7e95c4466a",
    "urlKey": "black-high-top-sneakers",
    "styleId": "AB7890",
    "productType": "high-top sneakers",
    "title": "Converse Chuck 70",
    "brand": "Converse",
    "productAttributes": {
      "gender": "unisex",
      "season": "SS19",
      "releaseDate": "2016-08-19",
      "retailPrice": 85,
      "colorway": "Black Mono",
      "color": "black"
    }
},
{
    "productId": "46b64f9b-2b8c-412e-a6e4-394dc5f10a47",
    "urlKey": "grey-lifestyle-sneakers",
    "styleId": "CD9012",
    "productType": "lifestyle sneakers",
    "title": "Reebok Club C 85",
    "brand": "Reebok",
    "productAttributes": {
      "gender": "unisex",
      "season": "SS18",
      "releaseDate": "2015-01-14",
      "retailPrice": 75,
      "colorway": "Ash Grey/White",
      "color": "grey"
    }
},
{
    "productId": "5b99ee6a-1246-45ed-b36a-3b40039f9e41",
    "urlKey": "purple-running-shoes",
    "styleId": "BC3456",
    "productType": "running shoes",
    "title": "Brooks Ghost 14",
    "brand": "Brooks",
    "productAttributes": {
      "gender": "women",
      "season": "FW21",
      "releaseDate": "2021-06-15",
      "retailPrice": 129,
      "colorway": "Purple/Pink",
      "color": "purple"
    }
},
{
    "productId": "a573852b-7f0e-4caa-b001-9a47b5d2acdb",
    "urlKey": "white-athletic-sneakers",
    "styleId": "DE4567",
    "productType": "athletic sneakers",
    "title": "Adidas Ultraboost 21",
    "brand": "Adidas",
    "productAttributes": {
      "gender": "unisex",
      "season": "SS20",
      "releaseDate": "2019-12-23",
      "retailPrice": 180,
      "colorway": "White/Core Black",
      "color": "white"
    }
},
{
    "productId": "b5c0ba31-18e6-4087-be9f-5c425fed4518",
    "urlKey": "black-skate-shoes",
    "styleId": "FG5678",
    "productType": "skate shoes",
    "title": "Nike SB Zoom Stefan Janoski",
    "brand": "Nike",
    "productAttributes": {
      "gender": "men",
      "season": "FW20",
      "releaseDate": "2018-07-01",
      "retailPrice": 85,
      "colorway": "Black/White",
      "color": "black"
    }
},
{
    "productId": "2a2f3139-2d91-4b96-89d2-6385437a9690",
    "urlKey": "red-basketball-shoes",
    "styleId": "HI7890",
    "productType": "basketball shoes",
    "title": "Nike LeBron 18",
    "brand": "Nike",
    "productAttributes": {
      "gender": "men",
      "season": "SS21",
      "releaseDate": "2020-10-01",
      "retailPrice": 200,
      "colorway": "University Red/Black",
      "color": "red"
    }
},
{
    "productId": "827f9a62-04ac-4e62-9cad-199f2f260fdb",
    "urlKey": "yellow-tennis-sneakers",
    "styleId": "JK9012",
    "productType": "tennis sneakers",
    "title": "FILA Axilus Energized",
    "brand": "FILA",
    "productAttributes": {
      "gender": "unisex",
      "season": "FW19",
      "releaseDate": "2017-09-05",
      "retailPrice": 89,
      "colorway": "Yellow/Black",
      "color": "yellow"
    }
},
{
    "productId": "2f5b0e3d-ab95-43c9-96e5-a9a441d618b2",
    "urlKey": "blue-athletic-sneakers",
    "styleId": "LM5678",
    "productType": "athletic sneakers",
    "title": "New Balance FuelCell Rebel",
    "brand": "New Balance",
    "productAttributes": {
      "gender": "unisex",
      "season": "SS20",
      "releaseDate": "2019-07-10",
      "retailPrice": 129,
      "colorway": "Blue/White",
      "color": "blue"
    }
},
    ]

    for item in data:
        response = call_api_for_sneaker(item, endpoint_url, api_key)
        if response:
            print("Successfully added sneaker:", response)
        else:
            print("Failed to add sneaker.")


if __name__ == "__main__":
    main()
