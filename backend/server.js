const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Basic route definition
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start listening for incoming connections
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});