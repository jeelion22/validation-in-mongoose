const mongoose = require("mongoose");

const bookShema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,

  publicationYear: {
    type: Number,
    min: 1800,
    max: 4000,
  },
  genre: {
    type: [String],
    enum: ["Fiction", "Sci-fi", "Thriller", "Action", "Comedy", "Family"],
  },
  createdAt: Date,
});

bookShema.path("title").validate(async function (value) {
  const count = await this.constructor.countDocuments({ title: value });
  return !count;
}, "Title must be unique");

bookShema.pre("save", function (next) {
  if (this.publicationYear > new Date().getFullYear()) {
    return next(new Error("Publication year cannot be in the future"));
  }

  next();
});

module.exports = mongoose.model("Book", bookShema);
