const express = require('express');
const path = require('path');
const connectDB = require('./config');

connectDB();

const app = express();
app.use(express.json());

// Serve React frontend
app.use(express.static(path.join(__dirname, '../client/build')));

// API route
app.get('/api', (req, res) => res.json({ message: 'API running...' }));

// Catch-all route to serve React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  