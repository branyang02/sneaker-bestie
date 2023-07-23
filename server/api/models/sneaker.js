const mongoose = require("mongoose");

// create a Schema
const sneakerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  urlKey: {
    type: String,
    required: true,
    //TODO:
    /*
This error suggests that you have a unique index set on urlKey in your MongoDB collection. This was created when you first created the collection with the unique constraint in the Mongoose schema.

When you modify your Mongoose schema, it doesn't automatically update the indexes in your MongoDB database. You'll need to drop the index manually from your MongoDB collection.

You can do this by running a command on your MongoDB shell, or through a MongoDB GUI like MongoDB Compass or Atlas.

Here's how to do it using the MongoDB shell:

Connect to your MongoDB shell.
Switch to your database. For example, if your database is named test, you can switch to it using use test.
Drop the index from your collection. If your collection is named sneakers and your index is named urlKey_1, you can drop it using db.sneakers.dropIndex("urlKey_1").
After you run these commands, MongoDB will no longer enforce that the urlKey values must be unique.

Remember to be careful when manipulating indexes, as it can have big impacts on your database's performance and the functionality of your application.
*/
  },
  styleId: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  productAttributes: {
    gender: {
      type: String,
      required: true,
    },
    season: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    retailPrice: {
      type: Number,
      required: true,
    },
    colorway: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
});

// convert Schema to a Model
module.exports = mongoose.model("Sneaker", sneakerSchema);
