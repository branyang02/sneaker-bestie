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
            print("This is the user view history: ", user_view_history)
            print("list: ", user_view_history["viewHistory"]["viewedSneakers"])
            return [
                sneaker["_id"]
                for sneaker in user_view_history["viewHistory"]["viewedSneakers"]
            ]
        except requests.exceptions.HTTPError as err:
            print(f"HTTP error occurred: {err}")
            return []

    def calculate_similarity(self, product):
        # Placeholder function: update this to calculate similarity based on the user's viewing history
        return 1

    def get_recommendations(self, limit):
        try:
            response = requests.get(self.server_address + "/sneakers/view-all")
            response.raise_for_status()
            all_products = response.json()
        except requests.exceptions.HTTPError as err:
            print(f"HTTP error occurred: {err}")
            return []

        scores = []
        for product in all_products:
            if str(product["_id"]["$oid"]) not in self.view_history:
                similarity_score = self.calculate_similarity(product)
                scores.append((product, similarity_score))

        # Sort products based on the similarity score and return the top 'limit' products
        scores.sort(key=lambda x: x[1], reverse=True)
        return [product for product, score in scores[:limit]]
