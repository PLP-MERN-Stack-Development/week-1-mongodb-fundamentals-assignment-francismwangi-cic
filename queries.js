
// Basic Queries
db.books.find({ genre: "Fiction" });
db.books.find({ published_year: { $gt: 1950 } });
db.books.find({ author: "George Orwell" });

// Update and Delete
db.books.updateOne({ title: "1984" }, { $set: { price: 17.99 } });
db.books.deleteOne({ title: "Moby Dick" });

// Filter, Projection, Sorting, Pagination
db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } },
  { _id: 0, title: 1, author: 1, price: 1 }
);

db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 }).sort({ price: 1 });
db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 }).sort({ price: -1 });

db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 }).sort({ price: 1 }).skip(0).limit(5);
db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 }).sort({ price: 1 }).skip(5).limit(5);

// Aggregation Pipelines

// Average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } },
  { $project: { _id: 0, genre: "$_id", averagePrice: { $round: ["$averagePrice", 2] } } }
]);

// Author with most books
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 },
  { $project: { _id: 0, author: "$_id", bookCount: 1 } }
]);

// Group by publication decade
db.books.aggregate([
  {
    $addFields: {
      decade: {
        $concat: [
          { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } },
          "s"
        ]
      }
    }
  },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $project: { _id: 0, decade: "$_id", count: 1 } },
  { $sort: { decade: 1 } }
]);

// Indexes
db.books.createIndex({ title: 1 });
db.books.createIndex({ author: 1, published_year: -1 });

// Explain Query Performance

// Before index (run this before creating index to compare)
// db.books.find({ title: "1984" }).explain("executionStats");

db.books.find({ title: "1984" }).explain("executionStats");
db.books.find({ author: "George Orwell", published_year: { $gt: 1900 } }).explain("executionStats");

// View all indexes
db.books.getIndexes();

