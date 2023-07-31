import numpy as np
import tensorflow as tf
import tensorflow_recommenders as tfrs


class TFRS:
    def __init__(self, user_item_matrix):
        self.user_item_matrix = user_item_matrix

        # Create tf dataset
        self.dataset = self.create_tf_dataset()

        # Create unique user and item arrays for the model
        self.unique_user_ids = self.user_item_matrix.index.values
        self.unique_item_ids = self.user_item_matrix.columns.values

        # Create user and item models
        self.user_model = self.UserModel(self.unique_user_ids)
        self.item_model = self.ItemModel(self.unique_item_ids)

        # Create TFRS model
        self.model = self.SneakersModel(self.user_model, self.item_model, self.dataset)
        self.model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.1))

    def create_tf_dataset(self):
        # First, we melt the user-item matrix to long format
        user_item_df = self.user_item_matrix.reset_index().melt(
            id_vars="index", value_name="views"
        )
        user_item_df.columns = ["user_id", "item_id", "views"]

        # We only keep rows where there was at least one view
        user_item_df = user_item_df[user_item_df["views"] > 0]

        # We convert our DataFrame to a TensorFlow dataset
        dataset = tf.data.Dataset.from_tensor_slices(
            {
                "user_id": user_item_df["user_id"].values.astype(
                    str
                ),  # TFRS expects both user ids and item ids to be strings
                "item_id": user_item_df["item_id"].values.astype(str),
                "views": user_item_df["views"].values.astype(
                    np.float32
                ),  # Weights should be floats
            }
        )

        return dataset

    class UserModel(tf.keras.Model):
        def __init__(self, unique_user_ids):
            super().__init__()
            self.user_embedding = tf.keras.Sequential(
                [
                    tf.keras.layers.StringLookup(
                        vocabulary=unique_user_ids, mask_token=None
                    ),
                    tf.keras.layers.Embedding(len(unique_user_ids) + 1, 32),
                ]
            )

        def call(self, inputs):
            return self.user_embedding(inputs)

    class ItemModel(tf.keras.Model):
        def __init__(self, unique_item_ids):
            super().__init__()
            self.item_embedding = tf.keras.Sequential(
                [
                    tf.keras.layers.StringLookup(
                        vocabulary=unique_item_ids, mask_token=None
                    ),
                    tf.keras.layers.Embedding(len(unique_item_ids) + 1, 32),
                ]
            )

        def call(self, inputs):
            return self.item_embedding(inputs)

    class SneakersModel(tfrs.models.Model):
        def __init__(self, user_model, item_model, dataset):
            super().__init__()
            self.user_model = user_model
            self.item_model = item_model
            self.task = tfrs.tasks.Retrieval(
                metrics=tfrs.metrics.FactorizedTopK(
                    candidates=dataset.batch(128).map(
                        lambda x: self.item_model(x["item_id"])
                    )
                )
            )

        def compute_loss(self, features, training=False):
            user_embeddings = self.user_model(features["user_id"])
            item_embeddings = self.item_model(features["item_id"])
            return self.task(user_embeddings, item_embeddings)

    def train(self, epochs=10):
        self.model.fit(self.dataset.batch(256), epochs=epochs)

    def get_recommendations(self, user_id, n=10):
        # Use brute force to find top N recommendations
        index = tfrs.layers.factorized_top_k.BruteForce(self.user_model)
        index.index(self.item_model(self.unique_item_ids), self.unique_item_ids)

        # Get recommendations
        _, items = index(tf.constant([user_id] * n))
        return items[0, :n].numpy()
