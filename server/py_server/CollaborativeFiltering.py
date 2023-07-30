import requests
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

class CollaborativeFiltering:
    def __init__(self, user_id, server_port):
        self.user_id = user_id
        self.server_address = f"http://localhost:{server_port}"
        self.user_view_history = self.get_user_view_history()
        self.user_item_matrix = self.create_user_item_matrix()

    def get_user_view_history(self):
        # your code to get all users' view history
        pass

    def create_user_item_matrix(self):
        # your code to create the user-item matrix
        pass

    def calculate_similarity(self, matrix, kind='user'):
        if kind == 'user':
            return cosine_similarity(matrix)
        if kind == 'item':
            return cosine_similarity(matrix.T)

    def get_recommendations(self, kind='user'):
        similarity_matrix = self.calculate_similarity(self.user_item_matrix, kind=kind)

        if kind == 'user':
            user_index = self.user_item_matrix.index.get_loc(self.user_id)
            user_similarities = similarity_matrix[user_index]
            # then, you can recommend items from users with highest similarity scores
        elif kind == 'item':
            # for each item the user has interacted with, 
            # recommend items that are most similar to that item
            pass
