import firebase from "firebase/app";
import "firebase/database";

// Configure Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

// Write data to the database
function writeData(data) {
  const ref = database.ref("products");
  ref.push(data);
}

// Sample data for 10 products
const products = [
  {
    image: "https://example.com/image1.jpg",
    title: "Product 1",
    description: "Product 1 Description",
    price: 9.99,
  },
  {
    image: "https://example.com/image2.jpg",
    title: "Product 2",
    description: "Product 2 Description",
    price: 19.99,
  },
  {
    image: "https://example.com/image3.jpg",
    title: "Product 3",
    description: "Product 3 Description",
    price: 29.99,
  },
  {
    image: "https://example.com/image4.jpg",
    title: "Product 4",
    description: "Product 4 Description",
    price: 39.99,
  },
  {
    image: "https://example.com/image5.jpg",
    title: "Product 5",
    description: "Product 5 Description",
    price: 49.99,
  },
  {
    image: "https://example.com/image6.jpg",
    title: "Product 6",
    description: "Product 6 Description",
    price: 59.99,
  },
  {
    image: "https://example.com/image7.jpg",
    title: "Product 7",
    description: "Product 7 Description",
    price: 69.99,
  },
  {
    image: "https://example.com/image8.jpg",
    title: "Product 8",
    description: "Product 8 Description",
    price: 79.99,
  },
  {
    image: "https://example.com/image9.jpg",
    title: "Product 9",
    description: "Product 9 Description",
    price: 89.99,
  },
  {
    image: "https://example.com/image10.jpg",
    title: "Product 10",
    description: "Product 10 Description",
    price: 99.99,
  },
];

// Write the product data to the database
products.forEach((product) => {
  writeData(product);
});
