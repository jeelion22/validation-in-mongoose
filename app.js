const mongoose = require("mongoose");
const Book = require("./Book");

mongoose
  .connect("mongodb://127.0.0.1/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Error connectiong to MongoDB", err);
  });

run();

async function run() {
  try {
    const newBook = new Book({
      title: "Peace of Mind",
      author: "Ian Lee",
      publicationYear: 2015,
      genre: ["Fiction", "Family", "Action"],
    });

    await newBook.save();

    console.log("New Book recorded: ", newBook);
  } catch (err) {
    console.error("Error", err.message);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
}
