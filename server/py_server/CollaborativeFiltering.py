import requests
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import tensorflow as tf
import numpy as np


class CollaborativeFiltering:
    def __init__(self, user_id, server_port):
        self.user_id = user_id
        self.server_address = f"http://localhost:{server_port}"
        self.all_user_view_history = self.get_all_users_view_history()
        self.user_item_matrix = self.create_user_item_matrix()

    def get_user_view_history(self, user_id):
        # Get user view history from the server
        try:
            response = requests.get(
                self.server_address + f"/view-history/all-view-history/{user_id}"
            )
            response.raise_for_status()
            user_view_history = response.json()
            return [
                sneaker["_id"]
                for sneaker in user_view_history["viewHistory"]["viewedSneakers"]
            ]
        except requests.exceptions.HTTPError as err:
            print(f"HTTP error occurred: {err}")
            return []

    def get_all_users_view_history(self):
        try:
            # getting all users
            response = requests.get(self.server_address + f"/users/all-users/")
            response.raise_for_status()
            all_users = response.json()
            all_users_view_history = {}
            for user in all_users["users"]:
                all_users_view_history[user["_id"]] = self.get_user_view_history(
                    user["_id"]
                )
            return all_users_view_history
        except requests.exceptions.HTTPError as err:
            print(f"HTTP error occurred: {err}")
            return {}

    def create_user_item_matrix(self):
        # Initialize a user-item matrix with all zeros
        unique_sneaker_ids = set(
            sneaker_id
            for view_history in self.all_user_view_history.values()
            for sneaker_id in view_history
        )
        user_item_matrix = pd.DataFrame(
            0, index=self.all_user_view_history.keys(), columns=list(unique_sneaker_ids)
        )

        # Fill up the matrix with actual view counts
        for user_id, view_history in self.all_user_view_history.items():
            for sneaker_id in view_history:
                user_item_matrix.loc[user_id, sneaker_id] += 1

        return user_item_matrix

    def calculate_similarity(self, matrix, kind="user"):
        if kind == "user":
            return cosine_similarity(matrix)
        if kind == "item":
            return cosine_similarity(matrix.T)

    def get_recommendations(self, kind="user", num_recommendations=10):
        similarity_matrix = self.calculate_similarity(self.user_item_matrix, kind=kind)

        if kind == "user":
            user_index = self.user_item_matrix.index.get_loc(self.user_id)
            user_similarities = pd.Series(
                similarity_matrix[user_index], index=self.user_item_matrix.index
            )

            # sort users by similarity
            sorted_user_similarities = user_similarities.sort_values(ascending=False)

            # remove own user_id
            sorted_user_similarities = sorted_user_similarities.loc[
                sorted_user_similarities.index != self.user_id
            ]

            # get top 10 most similar users
            top_similar_users = sorted_user_similarities.head(10).index

            # get the items viewed by these users
            top_users_items = self.user_item_matrix.loc[top_similar_users]

            # remove items already viewed by the user
            user_viewed_items = self.user_item_matrix.loc[self.user_id]
            top_users_items = top_users_items.loc[:, user_viewed_items == 0]

            # recommend the items viewed by most of these users
            recommended_items = (
                top_users_items.sum().sort_values(ascending=False).index.tolist()
            )

        elif kind == "item":
            # get items the user has viewed
            user_items = self.user_item_matrix.columns[
                self.user_item_matrix.loc[self.user_id] > 0
            ]

            # calculate similarity scores for these items
            item_similarities = pd.DataFrame(
                similarity_matrix,
                index=self.user_item_matrix.columns,
                columns=self.user_item_matrix.columns,
            ).loc[user_items]

            # sort by similarity
            sorted_item_similarities = item_similarities.sum().sort_values(
                ascending=False
            )

            # remove items already viewed by the user
            recommended_items = sorted_item_similarities.loc[
                ~sorted_item_similarities.index.isin(user_items)
            ].index.tolist()

        return recommended_items[:num_recommendations]
