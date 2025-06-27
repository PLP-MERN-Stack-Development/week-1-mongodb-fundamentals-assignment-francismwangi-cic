// insert_books.js - Script to populate MongoDB with sample book data

// Import MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI (replace with your MongoDB connection string if using Atlas)
const uri = 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Sample book data
db.books.insertMany([
    {
      title: "The Time Machine",
      author: "H.G. Wells",
      genre: "Science Fiction",
      published_year: 1895,
      price: 9.99,
      in_stock: true,
      pages: 120,
      publisher: "Penguin Classics"
    },
    {
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      published_year: 1949,
      price: 14.99,
      in_stock: true,
      pages: 328,
      publisher: "Secker & Warburg"
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      published_year: 1960,
      price: 12.99,
      in_stock: false,
      pages: 281,
      publisher: "J.B. Lippincott & Co."
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      published_year: 1813,
      price: 10.99,
      in_stock: true,
      pages: 279,
      publisher: "T. Egerton"
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      published_year: 1925,
      price: 13.50,
      in_stock: true,
      pages: 180,
      publisher: "Scribner"
    },
    {
      title: "Moby Dick",
      author: "Herman Melville",
      genre: "Adventure",
      published_year: 1851,
      price: 11.00,
      in_stock: false,
      pages: 635,
      publisher: "Harper & Brothers"
    },
    {
      title: "Brave New World",
      author: "Aldous Huxley",
      genre: "Dystopian",
      published_year: 1932,
      price: 13.25,
      in_stock: true,
      pages: 311,
      publisher: "Chatto & Windus"
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      published_year: 1937,
      price: 15.00,
      in_stock: true,
      pages: 310,
      publisher: "George Allen & Unwin"
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Fiction",
      published_year: 1951,
      price: 10.75,
      in_stock: true,
      pages: 214,
      publisher: "Little, Brown and Company"
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      genre: "Adventure",
      published_year: 1988,
      price: 16.99,
      in_stock: true,
      pages: 197,
      publisher: "HarperTorch"
    }
  ]);
  

// Function to insert books into MongoDB
async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Get database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if collection already has documents
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(`Collection already contains ${count} documents. Dropping collection...`);
      await collection.drop();
      console.log('Collection dropped successfully');
    }

    // Insert the books
    const result = await collection.insertMany(books);
    console.log(`${result.insertedCount} books were successfully inserted into the database`);

    // Display the inserted books
    console.log('\nInserted books:');
    const insertedBooks = await collection.find({}).toArray();
    insertedBooks.forEach((book, index) => {
      console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.published_year})`);
    });

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the function
insertBooks().catch(console.error);

/*
 * Example MongoDB queries you can try after running this script:
 *
 * 1. Find all books:
 *    db.books.find()
 *
 * 2. Find books by a specific author:
 *    db.books.find({ author: "George Orwell" })
 *
 * 3. Find books published after 1950:
 *    db.books.find({ published_year: { $gt: 1950 } })
 *
 * 4. Find books in a specific genre:
 *    db.books.find({ genre: "Fiction" })
 *
 * 5. Find in-stock books:
 *    db.books.find({ in_stock: true })
 */ 
