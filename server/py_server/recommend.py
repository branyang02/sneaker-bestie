class Recommend:
    def __init__(self, user_info):
        self.user_info = user_info

    def get_recommendations(self):
        # Your recommendation algorithm implementation based on user_info
        user_id = self.user_info.get("user_id")
        gender = self.user_info.get("gender")
        shoe_size = self.user_info.get("shoe_size")
        preferred_shoe_type = self.user_info.get("preferred_shoe_type")
        preferred_colors = self.user_info.get("preferred_colors")
        brand_preferences = self.user_info.get("brand_preferences")
        style_preferences = self.user_info.get("style_preferences")
        activity = self.user_info.get("activity")
        budget_range = self.user_info.get("budget_range")

        # Perform your recommendation logic here based on user_info
        # For illustration purposes, let's assume the recommendations are hardcoded.
        recommendations = [
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
                    "color": "purple",
                },
            }
        ]

        return recommendations
