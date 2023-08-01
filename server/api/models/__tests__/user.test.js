const mongoose = require("mongoose");
const User = require("../user"); // Adjust path as needed

describe("User Model Test", () => {

  beforeAll(async () => {
    await mongoose.connect(
      "mongodb+srv://jqm9ba:" +
        process.env.MongoDB_PASSWORD +
        "@cluster0.yiy71nq.mongodb.net/?retryWrites=true&w=majority"
    );
  });
  

  it("create & save user successfully", async () => {
    const userData = {
      _id: new mongoose.Types.ObjectId(),
      email: "test1@test1.com",
      password: "securePassword",
    };
    const validUser = new User(userData);
    const savedUser = await validUser.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
  });

  // Drop the created document
  afterEach(async () => {
    await User.deleteOne({ email: 'test1@test1.com' });
    await mongoose.connection.close();
  });
  
});
