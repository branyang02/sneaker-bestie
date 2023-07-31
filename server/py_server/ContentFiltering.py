import requests


class ContentFilter:
    def __init__(self, user_id, server_port):
        self.user_id = user_id
        self.server_address = f"http://localhost:{server_port}"
        self.view_history = self.get_user_view_history()

    def get_user_view_history(self):
        # Get user view history from the server
        try:
            response = requests.get(
                self.server_address + f"/view-history/all-view-history/{self.user_id}"
            )
            response.raise_for_status()
            user_view_history = response.json()
            # print("This is the user view history: ", user_view_history)
            # print("list: ", user_view_history["viewHistory"]["viewedSneakers"])
            return [
                sneaker["_id"]
                for sneaker in user_view_history["viewHistory"]["viewedSneakers"]
            ]
        except requests.exceptions.HTTPError as err:
            print(f"HTTP error occurred: {err}")
            return []

    def _get_sneaker_details(self, sneaker_id):
        try:
            response = requests.get(
                self.server_address + f"/sneakers/view-sneaker/{sneaker_id}"
            )
            response.raise_for_status()
            sneaker_details = response.json()
            return sneaker_details
        except requests.exceptions.HTTPError as err:
            print(f"HTTP error occurred: {err}")
            return []

    def calculate_similarity(self, product):
        score = 0
        # Assuming 'viewedSneakers' in self.view_history are full sneaker objects and not just the IDs
        for sneaker_id in self.view_history:
            viewed_sneaker = self._get_sneaker_details(sneaker_id)
            if viewed_sneaker["brand"] == product["brand"]:
                score += 1
            if viewed_sneaker["productType"] == product["productType"]:
                score += 1
            if (
                viewed_sneaker["productAttributes"]["gender"]
                == product["productAttributes"]["gender"]
            ):
                score += 1
            if (
                viewed_sneaker["productAttributes"]["season"]
                == product["productAttributes"]["season"]
            ):
                score += 1
            if (
                abs(
                    viewed_sneaker["productAttributes"]["retailPrice"]
                    - product["productAttributes"]["retailPrice"]
                )
                <= 10
            ):
                score += 1
            if (
                viewed_sneaker["productAttributes"]["color"]
                == product["productAttributes"]["color"]
            ):
                score += 1
        return score

    def get_recommendations(self, limit):
        try:
            response = requests.get(self.server_address + "/sneakers/view-all")
            response.raise_for_status()
            all_products = response.json()["sneakers"]
        except requests.exceptions.HTTPError as err:
            print(f"HTTP error occurred: {err}")
            return []
        # print("This is all products: ", all_products)
        scores = []
        for product in all_products:
            if product["_id"] not in self.view_history:
                similarity_score = self.calculate_similarity(product)
                scores.append((product, similarity_score))

        # Sort products based on the similarity score and return the top 'limit' products
        scores.sort(key=lambda x: x[1], reverse=True)
        return [product["_id"] for product, score in scores[:limit]]
