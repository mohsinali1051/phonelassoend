const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000; // Define the port for your server

// Serve the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Define your API routes here
app.get('/api/someEndpoint', (req, res) => {
  // Handle API logic and send responses
});

// Handle other routes by serving the React app's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});